import Image from "next/image";
import type { ExpertisePage } from "../../lib/expertise";

export default function RoleHero({ page }: { page: ExpertisePage }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient">{page.role}</span>
            <span className="block text-accent-gradient">in Bangladesh</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {page.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/pricing"
              className="btn-glow inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              Hire for $200/mo
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-white transition hover:border-white"
            >
              View my work
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {page.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-[var(--muted)]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="relative order-1 h-[340px] w-full md:h-[460px] lg:order-2 lg:h-[520px]">
          <Image
            src="/hero.png"
            alt={`Md. Zahin Afsar, ${page.role} in Bangladesh`}
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
