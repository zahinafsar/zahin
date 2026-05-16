"use client";

import { motion } from "motion/react";
import SceneClient from "./SceneClient";

const stack = ["Next.js", "React", "TypeScript", "GraphQL", "Node.js", "PostgreSQL"];

const phrases = [
  "turning users into customers.",
  "lifting conversion rates.",
  "shipping MVPs in weeks.",
  "scaling startups to millions.",
  "delivering on tight deadlines.",
];

const longestPhrase = phrases.reduce((a, b) => (a.length >= b.length ? a : b));

function Typewriter() {
  return (
    <span className="tw-wrap">
      <span aria-hidden className="invisible">{longestPhrase}</span>
      {phrases.map((p, i) => (
        <span key={p} className={`tw-phrase tw-phrase-${i + 1} text-accent-gradient`}>
          {p}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[120px] blob" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[var(--accent-2)]/10 blur-[120px] blob" style={{ animationDelay: "-6s" }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="text-gradient whitespace-nowrap">Software engineer</span>
            <Typewriter />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-lg text-base leading-relaxed text-[var(--muted)] md:text-lg"
          >
            I&apos;m <span className="text-white">Md. Zahin Afsar</span> — a software engineer from Bangladesh, building performant, accessible products with JavaScript & TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-[var(--accent)]"
            >
              View my work
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-white transition hover:border-white"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 pt-4"
          >
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-1 h-[420px] w-full md:h-[560px] lg:order-2 lg:h-[640px]"
        >
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[var(--accent)]/40 blur-[80px]" />
          <SceneClient />
        </motion.div>
      </div>

    </section>
  );
}
