"use client";

const jobs = [
  {
    role: "Lead Frontend Engineer",
    company: "Voyage Mobile Inc",
    url: "https://www.voyagesms.com/",
    logo: "/logos/voyage.jpg",
    period: "Aug 2023 – May 2026",
    location: "Remote",
    blurb:
      "Voyage helps eCommerce brands recover abandoned carts with a human touch.",
    points: [
      "Lifted client conversions by building the merchant dashboard for cart recovery, agent, and revenue metrics.",
      "Cut chart query time by 100x by co-owning CubeCloud preaggregations for statistics.",
      "Sped up internal development by cutting load times via code splitting and optimisation.",
      "Improved data visualization by building an in-house chart library.",
      "Cut recurring costs by building an in-house customer service platform that replaced a paid service.",
      "Increased workflow flexibility by self-hosting n8n to replace our custom workflow management.",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "DynamoDB", "AWS Lambda", "PostgreSQL", "Liquid"],
  },
  {
    role: "Software Engineer",
    company: "Wecycle",
    url: "https://getwecycle.com/",
    logo: "/logos/wecycle.jpg",
    period: "Dec 2022 – Nov 2023",
    location: "Remote",
    blurb: "A peer-to-peer rental service platform in the USA.",
    points: [
      "Sped up delivery by shipping React Native and React web clients using a monorepo setup.",
      "Improved UX by building Firebase Auth and Cloud Messaging push for the chat feature.",
      "Implemented rental checkout with hold/capture payments and period validation.",
    ],
    tech: ["React", "React Native", "TypeScript", "Node.js", "Stripe", "Strapi", "Firebase", "MongoDB"],
  },
  {
    role: "Full-Stack Developer",
    company: "Makereal",
    url: "https://www.linkedin.com/company/makereal",
    logo: "/logos/makereal.jpg",
    period: "Dec 2021 – Dec 2022",
    location: "Dhaka",
    blurb: "Startup software service company delivering web and mobile solutions.",
    points: [
      "Sped up internal development by delivering admin panels, RBAC auth, and analytics dashboards.",
      "Accelerated deployments by containerizing with Docker and setting up staging/production CI/CD pipelines.",
      "Raised client satisfaction by turning Figma into pixel-perfect UI and iterating directly with clients.",
    ],
    tech: ["React", "React Native", "TypeScript", "Node.js", "Firebase", "MongoDB"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Professional Experience
        </h2>

        <div className="relative mt-16">
          {jobs.map((j) => (
            <div
              key={j.company}
              className="relative flex gap-4 py-8 first:pt-0 last:pb-0 md:gap-6"
            >
              <a
                href={j.url}
                target="_blank"
                rel="noopener noreferrer"
                className="z-10 flex-none"
              >
                <img
                  src={j.logo}
                  alt={`${j.company} logo`}
                  className="h-12 w-12 rounded-lg border border-[var(--border)] bg-black object-cover md:h-14 md:w-14"
                />
              </a>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                    {j.role}{" "}
                    <a
                      href={j.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      ({j.company})
                    </a>
                  </h3>
                  <div className="flex-none text-sm text-[var(--muted)] sm:text-right">
                    {j.period} · {j.location}
                  </div>
                </div>

                <p className="mt-3 text-sm italic text-[var(--muted)]">
                  {j.blurb}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-[var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {j.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--border)] bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
