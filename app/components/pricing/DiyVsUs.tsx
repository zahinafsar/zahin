const diySteps = [
  "Learn skills, agent, workflow, MCP, prompt engineering",
  "Prompt the AI",
  "Handle thousands of accesses",
  "Integrate other SaaS with your product",
  "Wait until it finishes",
  "Test everything by hand",
];

const ourSteps = ["You give us your idea", "We take care of shipping it"];

const skipped = ["No prompting", "No waiting on models", "No SaaS glue", "No hand testing"];

export default function DiyVsUs() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Two ways to build software.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          You can wrestle AI subscriptions into a product yourself. Or you can
          hand the idea to engineers and get a shipped product back.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-white/[0.02] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                You + AI subscriptions
              </h3>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                The hard way
              </span>
            </div>

            <ol className="mt-8 flex flex-col">
              {diySteps.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-6">
                  {i < diySteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[13.5px] top-7 w-px bg-white/10"
                    />
                  )}
                  <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] font-mono text-[11px] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-[#d4d4d4]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-auto rounded-xl border border-dashed border-red-500/40 bg-red-500/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-red-400">
                Result
              </div>
              <div className="mt-1 text-lg font-medium text-red-300">
                A broken product
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-accent/40 bg-accent/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                Us
              </h3>
              <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                The engineered way
              </span>
            </div>

            <ol className="mt-8 flex flex-col">
              {ourSteps.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-6">
                  {i < ourSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[13.5px] top-7 w-px bg-accent/30"
                    />
                  )}
                  <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-[var(--bg)] font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-white">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mb-8 flex flex-wrap gap-2">
              {skipped.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-auto rounded-xl border border-accent/40 bg-accent/10 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Result
              </div>
              <div className="mt-1 text-lg font-medium text-white">
                A shipped product
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
