import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const canonical = `${siteConfig.siteUrl}/about`;
  return {
    title: "关于",
    description: `关于 ${siteConfig.author.name} - ${siteConfig.description}`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `关于 | ${siteConfig.title}`,
      description: siteConfig.description,
      type: "profile",
      url: canonical,
      siteName: siteConfig.title,
      locale: "zh_CN",
    },
  };
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-4 pb-14 pt-8 md:px-8 md:pt-10">
      {/* 头部介绍 */}
      <section className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50 p-6 md:p-8 dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* 头像 */}
          <div className="shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 md:h-32 md:w-32">
              {/* 你可以替换为自己的头像图片 */}
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-zinc-400">
                {siteConfig.author.name[0]}
              </div>
            </div>
          </div>

          {/* 介绍文字 */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl dark:text-zinc-100">
              {siteConfig.author.name}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              AI Developer + Web3 超级个体
            </p>

            {/* 社交链接 */}
            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
              <SocialLink href={siteConfig.social.github} label="GitHub">
                <GitHubIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.twitter} label="X">
                <XIcon />
              </SocialLink>
              <SocialLink href={`mailto:${siteConfig.author.email}`} label="Email">
                <EmailIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* 简介 */}
        <div className="mt-6 border-t border-zinc-200/60 pt-6 dark:border-zinc-800/60">
          <p className="text-lg leading-8 text-zinc-800 [font-family:var(--font-serif-cn)] dark:text-zinc-200">
            我是刘泽辉，一名专注于人工智能和 Web3 领域的开发者。
            热衷于探索前沿技术，构建创新产品，追求数字游民的自由生活方式。
          </p>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            这个博客记录我的技术探索、项目实践和生活思考。欢迎交流！
          </p>
        </div>
      </section>

      {/* 技能标签 */}
      <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">技能领域</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {["人工智能", "Web3", "区块链", "React", "Node.js", "TypeScript", "智能合约", "全栈开发"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">联系我</h2>
        <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>
            <span className="font-medium">邮箱：</span>
            <a href={`mailto:${siteConfig.author.email}`} className="text-violet-600 hover:underline dark:text-violet-400">
              {siteConfig.author.email}
            </a>
          </li>
          <li>
            <span className="font-medium">GitHub：</span>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline dark:text-violet-400">
              @{siteConfig.author.github}
            </a>
          </li>
          <li>
            <span className="font-medium">X / Twitter：</span>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline dark:text-violet-400">
              @{siteConfig.author.twitterUsername}
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

// 社交链接组件
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
    >
      {children}
    </a>
  );
}

// 图标组件
function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
