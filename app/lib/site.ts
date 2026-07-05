export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://zahinafsar.com").replace(/\/$/, ""),
  name: "Zahin Afsar",
  title: "Zahin Afsar, Software Engineer in Bangladesh",
  description:
    "Md. Zahin Afsar is a full-stack software engineer in Bangladesh building fast, modern products with TypeScript, React, and Next.js for startups across South Asia and worldwide. Senior-level engineering at outstanding value.",
  author: {
    name: "Md. Zahin Afsar",
    email: "afsarzahin@gmail.com",
    twitter: "@ZahinAfsar",
    github: "https://github.com/zahinafsar",
    linkedin: "https://www.linkedin.com/in/zahin-afsar-498392184/",
    calendly: "https://calendly.com/afsarzahin/zahin-afsar-full-stack-software-engineer",
    image: "/logo-v2.png",
    country: "Bangladesh",
    countryCode: "BD",
    areaServed: ["Bangladesh", "South Asia", "Worldwide"],
  },
  locale: "en_US",
  language: "en",
} as const;
