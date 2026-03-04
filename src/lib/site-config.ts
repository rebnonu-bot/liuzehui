export const siteConfig = {
  // Site基本信息
  title: "刘泽辉的博客",
  description:
    "AI Developer + Web3 超级个体。分享人工智能、Web3、编程开发和数字游民生活。",
  siteUrl: "https://liuzehui.com",

  // 作者信息
  author: {
    name: "刘泽辉",
    email: "rebnonu@gmail.com",
    github: "rebnonu-bot",
    twitterUsername: "liuzehui9",
    unsplash: "",
  },

  // 社交链接
  social: {
    github: "https://github.com/rebnonu-bot",
    twitter: "https://x.com/liuzehui9",
    youtube: "",
    bilibili: "",
  },

  // 统计和分析 (Umami)
  umamiWebsiteId: "0cbc664d-cf20-44ef-b4c7-6f1157762d65" as const,
  umamiScriptUrl: "https://cloud.umami.is/script.js" as const,
  googleAnalyticsId: "" as const,
  analyticsApiUrl: "/api/analytics/hits",

  // 评论系统 (Artalk)
  comments: {
    server: "https://artalk.is26.com",
    siteName: "刘泽辉的博客",
    gravatarMirror: "https://cravatar.cn/avatar/",
  },

  // 备案信息
  beian: "",

  // 内容仓库（用于编辑链接）
  contentRepo: {
    owner: "rebnonu-bot",
    repo: "liuzehui",
    branch: "main",
    contentPath: "content/posts",
  },
} as const;

export const categoryMap = [
  { text: "hot", name: "热门", isHome: true },
  { text: "ai", name: "AI", isHome: true },
  { text: "web3", name: "Web3", isHome: true },
  { text: "code", name: "编程", isHome: true },
  { text: "nomad", name: "数字游民", isHome: true },
  { text: "lifestyle", name: "生活", isHome: true },
  { text: "tech", name: "科技", isHome: false },
  { text: "crypto", name: "加密", isHome: false },
] as const;

export const articlePageSize = 16;
export const hotArticleViews = 5000;
