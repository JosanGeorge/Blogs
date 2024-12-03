const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Josan George",
    image: "/chillguy.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Penetration Tester & Cybersecurity Enthusiast",
    bio: "You good bro?",
    email: "josangeorge27@gmail.com",
    linkedin: "josan-george-a86370227",
    github: "josangeorge",
    portfolio: "https://josangeorge.github.io/Portfolio/",
    instagram: "https://www.instagram.com/josan.george/",
    youtube: "https://www.youtube.com/@Wh4tTh3H4ck",
    medium: "https://medium.com/@josangeorge27",
    hackthebox: "https://app.hackthebox.com/profile/798539",
    tryhackme: "https://tryhackme.com/r/p/MRxROBOT",
    discord: "https://discord.gg/6p3ZmHHZm9",
  },
  projects: [
    {
      name: `Portfolio`,
      href: "https://josangeorge.github.io/Portfolio/",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Josan George - Writeups",
    description: "Some of my CTF Writeups and Blogs!",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://josangeorge.vercel.app",
  since: 2022, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
