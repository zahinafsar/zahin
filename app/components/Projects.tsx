"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./About";

const projects = [
  {
    name: "Coodeen",
    tag: "Desktop · AI",
    desc: "Open-source AI coding assistant as a native desktop app. Focused UI on top of the opencode agent — chat panel drives the agent; right panel rotates between live preview, design canvas, file explorer, and git; built-in terminal slides under the preview.",
    accent: "from-[#b8ff3e]/20 to-transparent",
    href: "https://github.com/zahinafsar/coodeen",
  },
  {
    name: "Next-TS-API",
    tag: "Library · Next.js",
    desc: "End-to-end type safety for Next.js 13+ API routes. Closes the TypeScript gap left by Server Actions when data fetching needs caching, RESTful architecture, or third-party integrations.",
    accent: "from-[#ff6b3d]/20 to-transparent",
    href: "https://github.com/zahinafsar/next-ts-api",
  },
  {
    name: "Hippo-UI",
    tag: "Library · React",
    desc: "Lightweight React component library focused on accessibility, composability, and developer ergonomics.",
    accent: "from-[#3d8bff]/20 to-transparent",
    href: "https://github.com/zahinafsar/hippo-ui",
  },
  {
    name: "Ant Design CSS Utilities",
    tag: "Library · CSS",
    desc: "CSS utility library for Ant Design that streamlines styling and ensures visual consistency across UI components.",
    accent: "from-[#b8ff3e]/20 to-transparent",
    href: "https://github.com/zahinafsar/antd-css-utilities",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Selected open-source work.
            </h2>
          </div>
          <a
            href="https://github.com/zahinafsar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-white hover:text-white"
          >
            github.com/zahinafsar →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-8 transition hover:border-white/20"
            >
              <div className={`absolute -inset-px -z-10 bg-gradient-to-br ${p.accent} opacity-0 transition group-hover:opacity-100`} />
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                    {p.tag}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                    {p.name}
                  </h3>
                </div>
                <div className="text-2xl text-[var(--muted)] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">
                  ↗
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                {p.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
