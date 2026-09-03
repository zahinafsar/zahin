import { SITE } from "../../lib/site";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Why is it so cheap?",
    a: "Because experience compounds. Where you input 100 prompts, we need 10. Where you spend 1M tokens, we spend 100k. Where your app takes 10 MB, ours takes 10 KB. Senior engineers ship in hours what AI loops produce in weeks, and we pass that efficiency on as a flat monthly price.",
  },
  {
    q: "What does 'may delay based on work pressure' mean?",
    a: "On the Standard plan your requests join a shared queue. When the queue is heavy, delivery can take longer. If you need guaranteed speed, the Priority plan puts your work first and we take full responsibility for the outcome.",
  },
  {
    q: "How does the free trial work?",
    a: "Standard starts with 2 free days and Priority starts with 7 free days. You get real development work during the trial. If it is not a fit, cancel before the trial ends and pay nothing.",
  },
  {
    q: "What counts as any kind of development work?",
    a: "Web apps, mobile, APIs, AI agents, SaaS integrations, Shopify, automation, performance work. If it is software, we build it.",
  },
  {
    q: "Do I need my own AI subscriptions?",
    a: "No. Do not worry about models, tokens, or managing agents. We handle AI for you, and the only thing you see is the shipped product.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE.url}/pricing#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingFaq() {
  return (
    <section id="pricing-faq" className="relative w-full px-6 py-24 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Questions, answered.
        </h2>

        <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium tracking-tight text-white marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-xl text-[var(--muted)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
