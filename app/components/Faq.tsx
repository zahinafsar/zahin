import { SITE } from "../lib/site";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Why should we hire you?",
    a: "I have been building software for more than half a decade, and the applications I have worked on are used by millions of people every day. I have held multiple lead roles, where I have taken ownership of complex products, guided technical decisions, and helped teams deliver reliable software. I bring that leadership experience together with the ability to stay hands-on and turn ambitious ideas into production-ready products.",
  },
  {
    q: "Tell me about your most challenging project.",
    a: "One of my most challenging projects was building a bridge between n8n and our custom workflow frontend. The integration needed to preserve n8n's flexibility and scalability while feeling like a native part of our own system. I designed the connection so our users could create and manage powerful automated workflows through a tailored experience without losing the capabilities of the underlying platform.",
  },
  {
    q: "Where do you see yourself in five years?",
    a: "In five years, I want to be one of the best engineers in my field: someone trusted to solve difficult problems, lead strong teams, and build products with real impact. Over the next twenty years, I want to use that experience to become the founder of a successful technology startup.",
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
          A few questions I am often asked about my experience, approach, and
          ambitions as a software engineer.
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
