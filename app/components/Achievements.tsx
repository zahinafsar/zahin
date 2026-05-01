"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./About";

const wins = [
  {
    rank: "9th",
    label: "Winner",
    event: "Code Samurai 2024",
    desc: "Top teams nationwide — built a high-impact, scalable software solution under competitive constraints.",
  },
  {
    rank: "2nd",
    label: "1st Runner-up",
    event: "Web Xtreme Hackathon",
    desc: "Feature-rich web app focused on performance, UX, and real-world problem solving.",
  },
  {
    rank: "3rd",
    label: "2nd Runner-up",
    event: "Neo Fest Hackathon",
    desc: "Fast-paced collaboration to deliver an innovative, technically sound product.",
  },
];

const contribs = [
  "Active Stack Overflow contributor — practical answers to frontend & web problems.",
  "Maintainer of OSS tools used by other developers.",
  "Mentor to students learning React, Next.js, and modern frontend architecture.",
];

export default function Achievements() {
  return (
    <section className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Recognition & community.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {wins.map((w, i) => (
            <motion.div
              key={w.event}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-tight text-accent-gradient">
                  {w.rank}
                </span>
                <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
                  {w.label}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {w.event}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)]">
            Contributions
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {contribs.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
