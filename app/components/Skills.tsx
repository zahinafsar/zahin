"use client";

const groups = [
  { title: "Languages", items: ["JavaScript", "TypeScript"] },
  {
    title: "Front-End",
    items: [
      "React",
      "Next.js",
      "Vue",
      "Nuxt.js",
      "React Native",
      "Framer Motion",
      "GSAP",
      "D3.js",
      "Three.js",
    ],
  },
  {
    title: "Back-End",
    items: [
      "Node.js",
      "GraphQL",
      "tRPC",
      "Strapi",
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "SQS",
    ],
  },
  {
    title: "Database & ORM",
    items: ["PostgreSQL", "MongoDB", "Firebase", "Supabase"],
  },
  {
    title: "Testing",
    items: ["Playwright", "Cypress", "Jest", "Vitest", "Storybook"],
  },
  {
    title: "Tools & Infra",
    items: ["Docker", "Git", "GitHub Actions", "CI/CD", "Nginx", "Vercel", "AWS"],
  },
];

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
                <span className="font-mono text-xs text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-widest text-[var(--accent)]">
                  {g.title}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {it}
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
