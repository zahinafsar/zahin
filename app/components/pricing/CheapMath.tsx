const stats = [
  { label: "Prompts to ship a feature", you: "100 prompts", us: "10 prompts", usWidth: "10%" },
  { label: "Tokens burned", you: "1M tokens", us: "100k tokens", usWidth: "10%" },
  { label: "App size", you: "10 MB", us: "10 KB", usWidth: "1%" },
  { label: "Load time", you: "10 seconds", us: "10 ms", usWidth: "1%" },
];

export default function CheapMath() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          How do we do it so cheap?
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Not magic. Engineering. The gap between an AI hobbyist and a senior
          engineer shows up in every metric that costs you money.
        </p>

        <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {stats.map((s) => (
            <div key={s.label} className="py-6">
              <h3 className="text-lg font-medium tracking-tight text-white">
                {s.label}
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-mono text-xs text-[var(--muted)]">
                    You
                  </span>
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-white/15" />
                  </div>
                  <span className="w-24 shrink-0 text-right font-mono text-xs text-[var(--muted)]">
                    {s.you}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-mono text-xs text-accent">
                    Us
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-2 min-w-[3px] rounded-full bg-accent"
                      style={{ width: s.usWidth }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-right font-mono text-xs text-white">
                    {s.us}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-relaxed text-[var(--muted)] md:text-lg">
          That is the difference between{" "}
          <span className="text-white">you building an app</span> and{" "}
          <span className="text-accent">engineers building an app</span>.
        </p>
      </div>
    </section>
  );
}
