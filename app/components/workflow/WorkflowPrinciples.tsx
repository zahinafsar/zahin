const principles = [
  {
    title: "Plan before prompt",
    body: "Agents are fast at the wrong thing. A tight spec with acceptance criteria is the cheapest bug fix there is.",
  },
  {
    title: "Tests before code",
    body: "Acceptance criteria become failing tests first. The agent's only job is to turn them green.",
  },
  {
    title: "Loop until green",
    body: "Compile and test after every pass. Failures go straight back to the agent. Nothing ships red, and nothing loops after deploy.",
  },
];

export default function WorkflowPrinciples() {
  return (
    <section className="px-6 pb-24 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        {principles.map((principle, index) => (
          <div
            key={principle.title}
            className="rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 md:p-8"
          >
            <span className="text-sm text-[var(--accent)]">0{index + 1}</span>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {principle.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {principle.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
