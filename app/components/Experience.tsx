"use client";

import { motion } from "motion/react";
import { SectionLabel } from "./About";

const jobs = [
  {
    role: "Frontend Engineer",
    company: "Voyage Mobile Inc",
    period: "Jul 2023 – Apr 2026",
    location: "Remote",
    blurb:
      "Voyage helps eCommerce brands recover abandoned carts with a human touch.",
    points: [
      "Built reusable React + TypeScript UI components for multiple Shopify integrations.",
      "Shipped Next.js + CubeCloud data dashboards tracking conversion and engagement.",
      "Cut page load time by ~30% via code-splitting and lazy loading.",
      "Designed efficient GraphQL queries with backend engineers.",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "CubeCloud", "Supabase", "PostgreSQL", "Liquid"],
  },
  {
    role: "Software Engineer",
    company: "Wecycle",
    period: "Jan 2023 – Dec 2023",
    location: "Remote",
    blurb: "Peer-to-peer rental service platform in the USA.",
    points: [
      "Built mobile and web interfaces in React and React Native.",
      "Integrated Firebase Auth, Cloud Messaging, and secure payment flows.",
      "Redesigned product listing pages — improved conversion and stability.",
    ],
    tech: ["React", "React Native", "TypeScript", "Node.js", "Firebase", "MongoDB"],
  },
  {
    role: "Full-Stack Developer",
    company: "Makereal",
    period: "Dec 2021 – Jan 2023",
    location: "Dhaka",
    blurb: "Startup software service company delivering web and mobile solutions.",
    points: [
      "Developed dashboards, authentication, and admin panels with React + Node.js.",
      "Deployed production apps via Docker and CI/CD pipelines.",
      "Implemented pixel-perfect UI in tight collaboration with designers.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Firebase", "MongoDB"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          A timeline of building.
        </h2>

        <div className="relative mt-16">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)]/30 via-[var(--border)] to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {jobs.map((j, i) => (
              <motion.div
                key={j.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
              >
                <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:left-1/2 md:-translate-x-1/2" />

                <div className={`md:pr-12 md:text-right ${i % 2 === 1 ? "md:order-2 md:pl-12 md:pr-0 md:text-left" : ""}`}>
                  <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
                    {j.period} · {j.location}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {j.role}
                  </h3>
                  <div className="mt-1 text-base text-[var(--accent)]">
                    {j.company}
                  </div>
                </div>

                <div className={`mt-4 md:mt-0 md:pl-12 ${i % 2 === 1 ? "md:order-1 md:pr-12 md:pl-0" : ""}`}>
                  <p className="text-sm italic text-[var(--muted)]">{j.blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {j.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-[var(--accent)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {j.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--border)] bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
