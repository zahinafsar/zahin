import type { ReactNode } from "react";

type WorkflowHeroProps = {
  actions: ReactNode;
};

export default function WorkflowHero({ actions }: WorkflowHeroProps) {
  return (
    <section className="relative flex w-full items-center overflow-hidden px-6 pb-16 pt-40 md:px-10">
      <div className="absolute inset-0 grid-bg opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-gradient">How I ship with</span>{" "}
          <span className="text-accent-gradient">AI agents.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Agents write most of the code. I own the plan, the review and the
          result. This is the exact pipeline, running live.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      </div>
    </section>
  );
}
