"use client";

import { motion } from "motion/react";

type OpenSourceProject = {
  name: string;
  tag: string;
  desc: string;
  accent: string;
  href: string;
};

type PersonalProject = {
  name: string;
  title: string;
  role: string;
  desc: string;
  skills: string[];
  video: string;
  accent: string;
  live?: string;
  github?: string;
  closedSource?: boolean;
};

const openSource: OpenSourceProject[] = [
  {
    name: "Coodeen",
    tag: "Desktop · AI",
    desc: "Open-source AI coding assistant as a native desktop app. Focused UI on top of the opencode agent. Chat panel drives the agent; right panel rotates between live preview, design canvas, file explorer, and git; built-in terminal slides under the preview.",
    accent: "from-[#ff6b3d]/20 to-transparent",
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
    accent: "from-[#ff6b3d]/20 to-transparent",
    href: "https://github.com/zahinafsar/hippo-ui",
  },
  {
    name: "Ant Design CSS Utilities",
    tag: "Library · CSS",
    desc: "CSS utility library for Ant Design that streamlines styling and ensures visual consistency across UI components.",
    accent: "from-[#ff6b3d]/20 to-transparent",
    href: "https://github.com/zahinafsar/antd-css-utilities",
  },
];

const personal: PersonalProject[] = [
  {
    name: "BeforeSell",
    title: "P2P Marketplace",
    role: "Full-Stack Development",
    desc: "A free marketplace for Bangladesh where anyone can buy and sell. Phones, cars, apartments, jobs. Post it or find it in a few taps.",
    skills: ["Next.js", "TypeScript", "SQL", "UI/UX Prototyping", "NGINX"],
    video: "/projects/beforesell.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    github: "https://github.com/zahinafsar/beforesell",
  },
  {
    name: "LiveRecover",
    title: "Shopify Application",
    role: "Frontend-focused Fullstack Development",
    desc: "Turns abandoned carts back into sales. Real people text shoppers over SMS, connected straight to Shopify, recovering up to ~30% of lost carts.",
    skills: ["Shopify", "AWS Lambda", "PostgreSQL", "Next.js", "JavaScript"],
    video: "/projects/liverecover-app.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    closedSource: true,
  },
  {
    name: "Coodeen",
    title: "Desktop App",
    role: "Full-Stack Development",
    desc: "An open-source AI coding assistant you run as a desktop app. Chat on the left drives the agent; the right side flips between live preview, design canvas, files, and git, with a terminal built right in.",
    skills: ["Electron", "Desktop Application"],
    video: "/projects/coodeen.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    github: "https://github.com/zahinafsar/coodeen",
  },
  {
    name: "Luggora",
    title: "P2P Delivery Marketplace",
    role: "Full-Stack Development",
    desc: "Connects shoppers with travelers who bring products back from other countries. Request something from abroad, or earn by carrying items on your trip, with matching, order tracking, and trust built in.",
    skills: ["TypeScript", "NGINX", "PostgreSQL", "Stripe", "Twilio"],
    video: "/projects/luggora.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    github: "https://github.com/zahinafsar/luggora",
  },
  {
    name: "Fluzox",
    title: "Shopify Theme",
    role: "Frontend Development",
    desc: "A clean Shopify theme for a store that sells a bit of everything. Big hero, easy-to-filter catalog, a cart that just works, and smooth animations throughout.",
    skills: ["Shopify", "Shopify Theme", "Liquid", "GSAP"],
    video: "/projects/fluzox.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    github: "https://github.com/zahinafsar/fluzox-shopify-theme",
  },
  {
    name: "Zwiron",
    title: "Shopify Theme",
    role: "Frontend Development",
    desc: "A Shopify theme for a made-up fashion label that reads like a magazine. Cream tones, bold type, coral accents, lots of breathing room, and subtle motion to keep it lively.",
    skills: ["Shopify", "Shopify Theme", "Liquid"],
    video: "/projects/zwiron.mp4",
    accent: "from-[#ff6b3d]/20 to-transparent",
    github: "https://github.com/zahinafsar/zwiron-shopify-theme",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Open source */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Open source.
          </h2>
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
          {openSource.map((p, i) => (
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
              <div
                className={`absolute -inset-px -z-10 bg-gradient-to-br ${p.accent} opacity-0 transition group-hover:opacity-100`}
              />
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

        {/* Personal / client work */}
        <div className="mt-28">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Personal &amp; client work.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Shipped products and storefronts: the pixels, not the packages.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personal.map((p, i) => (
            <motion.article
              key={`${p.name}-${p.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] transition hover:border-white/20"
            >
              <div
                className={`absolute -inset-px -z-10 bg-gradient-to-br ${p.accent} opacity-0 transition group-hover:opacity-100`}
              />
              <div className="relative aspect-video overflow-hidden border-b border-[var(--border)]">
                <video
                  src={p.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  {p.title}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {p.name}
                </h3>
                <div className="mt-1 text-xs text-[var(--muted)]">{p.role}</div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {p.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {(p.live || p.github || p.closedSource) && (
                  <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--muted)] transition hover:border-white hover:text-white"
                      >
                        Live ↗
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--muted)] transition hover:border-white hover:text-white"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {!p.github && p.closedSource && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--muted)]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Closed source
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
