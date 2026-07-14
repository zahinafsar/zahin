"use client";

import Image from "next/image";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "AI Agents",
  "LLMs",
  "Node.js",
  "PostgreSQL",
];

const phrases = [
  "building Shopify stores",
  "building AI agents",
  "turning users into customers",
  "automating business",
  "delivering AI services"
];

const longestPhrase = phrases.reduce((a, b) => (a.length >= b.length ? a : b));

function Typewriter() {
  return (
    <span className="tw-wrap">
      <span aria-hidden className="invisible">
        {longestPhrase}
      </span>
      {phrases.map((p, i) => (
        <span
          key={p}
          className={`tw-phrase tw-phrase-${i + 1} text-accent-gradient`}
        >
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
      <div className="absolute inset-0 grid-bg opacity-80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient whitespace-nowrap">
              Software engineer
            </span>
            <Typewriter />
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-[var(--muted)] md:text-lg">
            I&apos;m <span className="text-white">Md. Zahin Afsar</span>, a
            software engineer from Bangladesh. I develop{" "}
            <span className="text-white">AI agents</span> and{" "}
            <span className="text-white">AI services</span>, and build
            performant, accessible products with JavaScript &amp; TypeScript.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
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
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative order-1 h-[340px] w-full md:h-[460px] lg:order-2 lg:h-[520px]">
          <Image
            src="/hero.png"
            alt="Md. Zahin Afsar"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
