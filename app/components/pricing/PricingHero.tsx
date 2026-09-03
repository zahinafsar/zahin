import { SITE } from "../../lib/site";

const CUSTOMER_PORTAL = "https://zpay.lemonsqueezy.com/billing";

export default function PricingHero() {
  return (
    <section className="relative flex w-full items-center overflow-hidden px-6 pb-24 pt-40 md:px-10">
      <div className="absolute inset-0 grid-bg opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-gradient">Ship your product for</span>{" "}
          <span className="text-accent-gradient">$200/mo.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Don&apos;t waste your AI subscriptions. Don&apos;t worry about
          models. Don&apos;t worry about managing agents.{" "}
          <span className="text-white">We handle AI for you.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-[var(--accent)]"
          >
            View plans
          </a>
          <a
            href={SITE.author.calendly}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-white transition hover:border-white"
          >
            Book a call
          </a>
        </div>

        <p className="mt-6 text-xs text-[var(--muted)]">
          Already subscribed?{" "}
          <a
            href={CUSTOMER_PORTAL}
            target="_blank"
            rel="noreferrer"
            className="text-white underline underline-offset-4 transition hover:text-[var(--accent)]"
          >
            Manage your subscription
          </a>
        </p>
      </div>
    </section>
  );
}
