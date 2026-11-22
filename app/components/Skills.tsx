"use client";

import Image from "next/image";
import {
  Cloud,
  Database,
  Drama,
  HardDrive,
  Inbox,
  Infinity as InfinityIcon,
  SquareFunction,
  type LucideIcon,
} from "lucide-react";

type Item = { name: string; icon: string | LucideIcon; color?: string };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "Front-End",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs/white" },
      { name: "Vue", icon: "vuedotjs" },
      { name: "Nuxt.js", icon: "nuxt" },
      { name: "React Native", icon: "react" },
      { name: "Framer Motion", icon: "framer" },
      { name: "GSAP", icon: "gsap" },
      { name: "D3.js", icon: "d3" },
      { name: "Three.js", icon: "threedotjs/white" },
    ],
  },
  {
    title: "Back-End",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "GraphQL", icon: "graphql" },
      { name: "tRPC", icon: "trpc" },
      { name: "Strapi", icon: "strapi" },
      { name: "Shopify", icon: "shopify" },
      { name: "AWS Lambda", icon: SquareFunction, color: "#FF9900" },
      { name: "DynamoDB", icon: Database, color: "#4053D6" },
      { name: "S3", icon: HardDrive, color: "#569A31" },
      { name: "SQS", icon: Inbox, color: "#FF4F8B" },
    ],
  },
  {
    title: "Database & ORM",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Playwright", icon: Drama, color: "#2EAD33" },
      { name: "Cypress", icon: "cypress" },
      { name: "Jest", icon: "jest" },
      { name: "Vitest", icon: "vitest" },
      { name: "Storybook", icon: "storybook" },
    ],
  },
  {
    title: "Tools & Infra",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD", icon: InfinityIcon, color: "#2088FF" },
      { name: "Nginx", icon: "nginx" },
      { name: "Vercel", icon: "vercel/white" },
      { name: "AWS", icon: Cloud, color: "#FF9900" },
    ],
  },
];

function SkillIcon({ icon, color }: { icon: string | LucideIcon; color?: string }) {
  if (typeof icon === "string") {
    return (
      <Image
        src={`https://cdn.simpleicons.org/${icon}`}
        alt=""
        width={14}
        height={14}
        unoptimized
        className="h-3.5 w-3.5 shrink-0"
      />
    );
  }
  const Icon = icon;
  return <Icon size={14} color={color} aria-hidden className="shrink-0" />;
}

// const ticker = [
//   "React",
//   "Next.js",
//   "TypeScript",
//   "GraphQL",
//   "Node.js",
//   "PostgreSQL",
//   "Tailwind",
//   "Three.js",
//   "React Native",
//   "Firebase",
//   "Supabase",
//   "Docker",
// ];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          The toolkit.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 transition hover:border-white/20 md:p-7"
            >
              <div className="pointer-events-none absolute -inset-px -z-10 bg-gradient-to-br from-[#ff6b3d]/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-baseline gap-3">
                {/* <span className="font-mono text-sm text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span> */}
                <span className="text-sm uppercase tracking-widest text-[var(--accent)]">
                  {g.title}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <SkillIcon icon={it.icon} color={it.color} />
                    {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="relative mt-24 overflow-hidden border-y border-[var(--border)] bg-[var(--bg-soft)] py-6">
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-3xl font-semibold tracking-tight md:text-5xl">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className={i % 2 === 0 ? "text-white" : "text-[var(--muted)]"}>
              {t} <span className="text-[var(--accent)]">·</span>
            </span>
          ))}
        </div>
      </div> */}
    </section>
  );
}
