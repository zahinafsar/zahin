"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./About";

const groups = [
  { title: "Languages", items: ["JavaScript", "TypeScript"] },
  { title: "Front-End", items: ["Next.js", "React", "React Native", "D3.js"] },
  { title: "Back-End", items: ["Node.js", "GraphQL", "CubeCloud", "Strapi"] },
  { title: "Database & ORM", items: ["PostgreSQL", "MongoDB", "Firebase", "Supabase"] },
  { title: "Tools", items: ["Docker", "Git", "GitHub", "CI/CD", "Nginx"] },
];

const ticker = [
  "React",
  "Next.js",
  "TypeScript",
  "GraphQL",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
  "Three.js",
  "React Native",
  "Firebase",
  "Supabase",
  "Docker",
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          The toolkit.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`bg-[var(--bg)] p-6 md:p-8 ${i < 3 ? "md:col-span-2" : "md:col-span-3"}`}
            >
              <div className="text-xs uppercase tracking-widest text-[var(--accent)]">
                {g.title}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-24 overflow-hidden border-y border-[var(--border)] bg-[var(--bg-soft)] py-6">
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-3xl font-semibold tracking-tight md:text-5xl">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className={i % 2 === 0 ? "text-white" : "text-[var(--muted)]"}>
              {t} <span className="text-[var(--accent)]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
