"use client";

const wins = [
  {
    rank: "9th",
    label: "Winner",
    event: "Code Samurai 2024",
    desc: "Top teams nationwide. Built a high-impact, scalable software solution under competitive constraints.",
    image: "/recognition/code-samurai.jpg",
    link: "https://www.facebook.com/photo/?fbid=778233367743644&set=pcb.778236821076632",
  },
  {
    rank: "2nd",
    label: "1st Runner-up",
    event: "Web Xtreme Hackathon",
    desc: "Feature-rich web app focused on performance, UX, and real-world problem solving.",
    image: "/recognition/web-xtreme.jpg",
    link: "https://www.facebook.com/photo/?fbid=1032938992214027&set=pcb.1032940195547240",
  },
  {
    rank: "3rd",
    label: "2nd Runner-up",
    event: "Neo Fest Hackathon",
    desc: "Team: Green Thunder. Fast-paced collaboration to deliver an innovative, technically sound product.",
    image: "/recognition/neo-fest.jpg",
    link: "https://www.facebook.com/photo/?fbid=1133129342157787&set=a.472289101575151",
  },
];

const contribs = [
  "Active Stack Overflow contributor with practical answers to frontend & web problems.",
  "Maintainer of OSS tools used by other developers.",
  "Mentor to students learning React, Next.js, and modern frontend architecture.",
];

export default function Achievements() {
  return (
    <section className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Recognition & community.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {wins.map((w) => (
            <a
              key={w.event}
              href={w.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] transition-colors hover:border-[var(--accent)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={w.image}
                  alt={`${w.event} recognition`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-semibold tracking-tight text-accent-gradient">
                    {w.rank}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
                    {w.label}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {w.event}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {w.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)]">
            Contributions
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {contribs.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
