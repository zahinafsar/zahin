"use client";

import { motion } from "motion/react";

const stats = [
  { v: "5+", l: "Years building for the web" },
  { v: "1.2K+", l: "Contributions last year" },
  { v: "9th", l: "Code Samurai 2024 — nationwide" },
  { v: "OSS", l: "Libraries used by other devs" },
];

export default function About() {
  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--muted)] md:text-2xl"
        >
          For the past three years I&apos;ve led frontend work across Shopify integrations, peer-to-peer marketplaces, and internal dashboards — turning fuzzy requirements into resilient TypeScript codebases while finishing my B.Sc. in CSE at Green University of Bangladesh, and looking to take on bigger, more challenging problems as a <span className="text-accent-gradient">software engineer</span>.
        </motion.p>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[var(--bg)] p-6 md:p-8"
            >
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                {s.v}
              </div>
              <div className="mt-2 text-xs leading-snug text-[var(--muted)]">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
      <span className="h-px w-8 bg-[var(--border)]" />
      {children}
    </div>
  );
}
