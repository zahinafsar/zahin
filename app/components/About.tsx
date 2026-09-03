"use client";

const stats = [
  { v: "5+", l: "Years building for the web" },
  { v: "1.2K+", l: "Contributions last year" },
  { v: "9th", l: "Code Samurai 2024, nationwide" },
  { v: "450+", l: "Stack Overflow reputation" },
];

export default function About() {
  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--muted)] md:text-2xl">
          For the past three years I&apos;ve led frontend work across Shopify integrations, peer-to-peer marketplaces, and internal dashboards, turning fuzzy requirements into resilient TypeScript codebases while finishing my B.Sc. in CSE at Green University of Bangladesh, and looking to take on bigger, more challenging problems as a <span className="text-accent-gradient">software engineer</span>.
        </p> */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 transition hover:border-white/20 md:p-8"
            >
              <div className="text-4xl font-semibold tracking-tight text-accent-gradient md:text-5xl">
                {s.v}
              </div>
              <div className="mt-3 text-sm leading-snug text-[var(--muted)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
      <span className="h-px w-8 bg-[var(--border)]" />
      {children}
    </div>
  );
}
