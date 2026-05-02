export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://zahinafsar.com").replace(/\/$/, ""),
  name: "Zahin Afsar",
  title: "Zahin Afsar — Software Engineer",
  description:
    "Software engineer building performant, modern products with JavaScript, TypeScript, React, and Next.js.",
  author: {
    name: "Md. Zahin Afsar",
    email: "afsarzahin@gmail.com",
    twitter: "@ZahinAfsar",
    github: "https://github.com/zahinafsar",
    linkedin: "https://www.linkedin.com/in/zahin-afsar-498392184/",
    image: "/logo-v2.png",
  },
  locale: "en_US",
  language: "en",
} as const;
