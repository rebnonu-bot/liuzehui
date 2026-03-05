#!/usr/bin/env node
/**
 * 生成文章 AI 摘要和 SEO 数据
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const contentDir = join(rootDir, "content/posts");
const dataDir = join(rootDir, "data");

// AI 配置
const AI_CONFIG = {
  baseUrl: process.env.AI_BASE_URL || "https://api.siliconflow.cn/v1",
  apiKey: process.env.AI_API_KEY,
  model: process.env.AI_MODEL || "Pro/deepseek-ai/DeepSeek-V3.2",
};

// 读取现有数据
function loadData(filename) {
  const filepath = join(dataDir, filename);
  if (!existsSync(filepath)) return { articles: {} };
  try {
    return JSON.parse(readFileSync(filepath, "utf-8"));
  } catch {
    return { articles: {} };
  }
}

// 保存数据
function saveData(filename, data) {
  writeFileSync(join(dataDir, filename), JSON.stringify(data, null, 2) + "\n");
}

// 调用 AI API
async function callAI(messages) {
  if (!AI_CONFIG.apiKey) {
    throw new Error("AI_API_KEY not set");
  }

  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 生成文章摘要
async function generateSummary(slug, content) {
  const prompt = `请为以下博客文章生成摘要和标签：

${content.slice(0, 3000)}

请返回以下格式的 JSON：
{
  "summary": "一句话摘要（50-80字）",
  "abstract": "详细摘要（150-300字）",
  "tags": ["标签1", "标签2", "标签3"]
}`;

  const response = await callAI([
    { role: "system", content: "你是一个专业的内容编辑，擅长提炼文章精华。" },
    { role: "user", content: prompt },
  ]);

  try {
    const data = JSON.parse(response.trim());
    return {
      summary: data.summary || "",
      abstract: data.abstract || "",
      tags: data.tags || [],
      keyPoints: [],
      generatedAt: new Date().toISOString(),
      model: AI_CONFIG.model,
    };
  } catch {
    // 如果解析失败，返回简化版
    return {
      summary: response.trim().slice(0, 80),
      abstract: response.trim(),
      tags: [],
      keyPoints: [],
      generatedAt: new Date().toISOString(),
      model: AI_CONFIG.model,
    };
  }
}

// 生成 SEO 数据
async function generateSEO(slug, title, content) {
  const prompt = `请为以下博客文章生成 SEO 元数据：

标题：${title}
内容：${content.slice(0, 3000)}

请返回以下格式的 JSON：
{
  "metaTitle": "优化后的标题（60字以内）",
  "metaDescription": "优化后的描述（150字以内）",
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "ogDescription": "适合社交分享的简短描述"
}`;

  const response = await callAI([
    { role: "system", content: "你是一个 SEO 专家，擅长优化内容搜索排名。" },
    { role: "user", content: prompt },
  ]);

  try {
    const seoData = JSON.parse(response.trim());
    return {
      ...seoData,
      generatedAt: new Date().toISOString(),
      model: AI_CONFIG.model,
    };
  } catch {
    // 如果解析失败，返回简化版
    return {
      metaTitle: title,
      metaDescription: content.slice(0, 150) + "...",
      keywords: [],
      ogDescription: content.slice(0, 100) + "...",
      generatedAt: new Date().toISOString(),
      model: AI_CONFIG.model,
    };
  }
}

// 处理单个文章
async function processArticle(slug) {
  const filepath = join(contentDir, `${slug}.md`);
  if (!existsSync(filepath)) {
    console.error(`Article not found: ${slug}`);
    process.exit(1);
  }

  const raw = readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  console.log(`Processing: ${data.title}`);

  // 加载现有数据
  const summaries = loadData("ai-summaries.json");
  const seo = loadData("ai-seo.json");

  // 生成摘要
  console.log("  Generating summary...");
  const summary = await generateSummary(slug, content);
  summaries.articles[slug] = {
    data: summary,
    generatedAt: summary.generatedAt,
  };

  // 生成 SEO
  console.log("  Generating SEO data...");
  const seoData = await generateSEO(slug, data.title, content);
  seo.articles[slug] = {
    data: seoData,
    generatedAt: seoData.generatedAt,
  };

  // 保存数据
  saveData("ai-summaries.json", summaries);
  saveData("ai-seo.json", seo);

  console.log(`✓ Done: ${slug}`);
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find((arg) => arg.startsWith("--slug="));

  if (!slugArg) {
    console.log("Usage: node generate-ai-content.mjs --slug=article-slug");
    process.exit(1);
  }

  const slug = slugArg.replace("--slug=", "");

  try {
    await processArticle(slug);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
