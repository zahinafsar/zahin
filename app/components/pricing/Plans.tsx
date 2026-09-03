const plans = [
  {
    id: "standard",
    name: "Standard",
    price: 200,
    trial: "First 2 days free",
    popular: true,
    url: "https://zpay.lemonsqueezy.com/checkout/buy/165320b1-f272-4dac-94ff-3011aff38b34",
    features: [
      "Any kind of development work",
      "We handle the AI: models, agents, prompts",
      "Delivery may delay based on work pressure",
    ],
  },
  {
    id: "priority",
    name: "Priority",
    price: 2000,
    trial: "First 7 days free",
    popular: false,
    url: "https://zpay.lemonsqueezy.com/checkout/buy/966495b7-d26b-4812-bc14-50b37232127a",
    features: [
      "Any kind of development work",
      "We handle the AI: models, agents, prompts",
      "Full responsibility for the outcome",
      "Priority queue: your work always ships first",
    ],
  },
];

export default function Plans() {
  return (
    <section id="plans" className="relative w-full px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Pick your plan.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Flat monthly pricing. Real engineers. A free trial on every plan.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            let cardClass = "relative flex flex-col rounded-2xl border bg-white/[0.02] p-8 ";
            let ctaClass = "mt-auto inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ";
            if (plan.popular) {
              cardClass += "border-accent";
              ctaClass += "bg-accent text-white hover:text-black hover:bg-white";
            } else {
              cardClass += "border-[var(--border)]";
              ctaClass += "border border-[var(--border)] text-white hover:border-white";
            }
            return (
              <div key={plan.id} className={cardClass}>
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-black">
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-medium text-white">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-white">
                    ${plan.price.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm text-[var(--muted)]">/mo</span>
                </div>

                <div className="mt-4">
                  <span className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-white">
                    {plan.trial}
                  </span>
                </div>

                <ul className="mb-10 mt-8 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#d4d4d4]"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.url}
                  target="_blank"
                  rel="noreferrer"
                  className={ctaClass}
                >
                  Start free trial
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
