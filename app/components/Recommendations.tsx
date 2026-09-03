import Image from "next/image";

const recommendations = [
  {
    name: "Dr. Mohammad NuruzZaman",
    image: "/recommendations/mohammad-nuruzzaman.jpg",
    role: "Group CEO of Daffodil Group",
    context: "Worked with Zahin on the same team",
    date: "July 2026",
    profile: "https://www.linkedin.com/in/nzamaan/",
    quote:
      "I have had the pleasure of working with him on several IT projects, where he consistently demonstrated strong technical expertise, professionalism, and reliability. As a Full-Stack Software Engineer, Zahin has the ability to transform business requirements into well-designed, scalable, and high-quality software solutions. He is disciplined, deadline-oriented, and a great team player.",
  },
  {
    name: "Zili Liu",
    image: "/recommendations/zili-liu.jpg",
    role: "Lead Designer at VYG.AI",
    context: "Worked with Zahin on the same team",
    date: "July 2026",
    profile: "https://www.linkedin.com/in/lizzielzl/",
    quote:
      "We worked together at Liverecover product. Collaborating with him was always a smooth experience. Every design I handed off, he brought to life quickly and with great attention to detail — pixel-perfect implementations without endless back-and-forth. He’s reliable, communicative, and a genuine asset to any product team.",
  },
  {
    name: "Nurul Huda",
    image: "/recommendations/nurul-huda.jpg",
    role: "Staff Engineering at VYG.AI",
    context: "Managed Zahin directly",
    date: "May 2026",
    profile: "https://www.linkedin.com/in/nurulhudaapon/",
    quote:
      "I worked directly with Zahin at Voyage Mobile, Inc., and he is hands-down one of the most talented frontend engineers I’ve partnered with. Zahin has an incredible ability to take super complex UI designs and translate them into pixel-perfect, production-ready code at lightning speed. He is deeply committed to execution and consistently goes above and beyond to get things done ahead of schedule without ever compromising on quality. He would be a massive asset to any engineering team looking for speed, precision, and technical excellence.",
  },
  {
    name: "Jubayer Al Mamun",
    image: "/recommendations/jubayer-al-mamun.jpg",
    role: "Software Engineer at Wecycle.io",
    context: "Worked with Zahin on the same team",
    date: "May 2026",
    profile: "https://www.linkedin.com/in/jubayeramb/",
    quote:
      "Zahin Afsar is an excellent developer. He’s a strong problem solver with great frontend skills. Zahin really cares about user experience and pays close attention to detail. He handles complex user flows and designs with ease and always finds practical solutions.",
  },
];

export default function Recommendations() {
  return (
    <section
      id="recommendations"
      aria-labelledby="recommendations-heading"
      className="relative w-full overflow-hidden px-6 py-32 md:px-10"
    >
      <div className="relative mx-auto max-w-7xl">
        <h2
          id="recommendations-heading"
          className="text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Recommendations.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2">
          {recommendations.map((recommendation, index) => (
            <article
              key={recommendation.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-7 transition-colors duration-300 hover:border-white/20 md:p-9"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                  Voice {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="select-none text-7xl font-semibold leading-[0.65] text-white/[0.06] transition-colors duration-300 group-hover:text-[var(--accent)]/15"
                >
                  “
                </span>
              </div>

              <blockquote className="relative mt-8 line-clamp-4 text-pretty text-base leading-relaxed text-white/90 md:text-lg">
                “{recommendation.quote}”
              </blockquote>

              <footer className="mt-auto flex items-center gap-4 border-t border-[var(--border)] pt-7 md:mt-10">
                <a
                  href={recommendation.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${recommendation.name} on LinkedIn`}
                  className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-white/15 transition-colors hover:border-[var(--accent)]"
                >
                  <Image
                    src={recommendation.image}
                    alt={recommendation.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </a>
                <div className="min-w-0 flex-1">
                  <a
                    href={recommendation.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold tracking-tight transition-colors hover:text-[var(--accent)]"
                  >
                    {recommendation.name}
                    <span aria-hidden="true" className="text-sm">
                      ↗
                    </span>
                  </a>
                  <p className="mt-0.5 truncate text-sm text-[var(--muted)]">
                    {recommendation.role}
                  </p>
                </div>
                <div className="hidden flex-none text-right sm:block">
                  <p className="text-xs uppercase tracking-widest text-white/60">
                    {recommendation.context}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[var(--muted)]">
                    {recommendation.date}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
