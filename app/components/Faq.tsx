import { SITE } from "../lib/site";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Who are you?",
    a: "I am Zahin Afsar, a full-stack software engineer based in Bangladesh. I specialize in TypeScript, React, Next.js, and Node.js, and I build performant, accessible web products for startups and businesses across Bangladesh, South Asia, and worldwide.",
  },
  {
    q: "Are you available to work with clients outside Bangladesh, across South Asia and beyond?",
    a: "I work remotely with startups and teams across South Asia and worldwide, collaborating across time zones and delivering resilient, well-tested TypeScript codebases on tight deadlines.",
  },
  {
    q: "Do you provide the best value-for-money software?",
    a: "Yes, Because I live in Bangladesh, my cost of living is far lower than in Europe or North America, so I can charge much less than a Western engineer for the same work. You still get senior-level, full-stack engineering focused on conversion, performance, and maintainability, just at South Asian rates.",
  },
  {
    q: "Are you specialized in particular technologies?",
    a: "I focus on Next.js, React, TypeScript, Node.js, PostgreSQL, GraphQL, and Shopify, with a strong emphasis on frontend performance, accessibility, and clean, type-safe architecture.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="relative w-full px-6 py-32 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Frequently asked questions.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Hiring a software engineer in Bangladesh or across South Asia? Here is
          what people usually want to know.
        </p>

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
