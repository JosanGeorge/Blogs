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
    instagram: "josan.george/",
    youtube: "https://www.youtube.com/@Wh4tTh3H4ck",
    medium: "https://medium.com/@josangeorge27",
    hackthebox: "https://profile.hackthebox.com/profile/019d6882-4a23-71cd-ac5a-53e0834a8a8d?tab=badges",
    tryhackme: "https://tryhackme.com/r/p/MRxROBOT",
    discord: "https://discord.gg/6p3ZmHHZm9",
    // Bug Bounty platforms – set URL to enable, leave empty to hide
    hackerone: "https://hackerone.com/josan_george?type=user",
    bugcrowd: "https://bugcrowd.com/h/Josan_George",
  },
  projects: [],
  // CVE discoveries – add entries here to display in the sidebar CVE card
  cves: [
    {
      id: "CVE-2026-54506",
      description: "Stored XSS via sanitizeHTML() bypass in Vvveb CMS user profile bio field",
      severity: "High",
      url: "https://github.com/givanz/Vvveb/security/advisories/GHSA-5cg7-phhv-4qjr",
    },
    {
      id: "CVE-2026-32994",
      description: "Unauthorized cross-room message disclosure via missing access control in Rocket.Chat autotranslate endpoint",
      severity: "Medium",
      url: "https://nvd.nist.gov/vuln/detail/CVE-2026-32994",
    },
    {
      id: "CVE-2026-56736",
      description: "Stored XSS in Admin FAQ Editor via HTML Entity Bypass in Frontend FAQ Submission in phpMyFAQ",
      severity: "High",
      url: "https://github.com/thorsten/phpMyFAQ/security/advisories/GHSA-pgwp-vc7q-cvj3",
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
