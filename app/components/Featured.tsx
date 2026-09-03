import { ExternalLink } from "lucide-react";

const features = [
  {
    account: "Nutshell Today",
    handle: "@nutshell_today",
    url: "https://www.instagram.com/nutshell_today/reel/DJMc3lcsj3-",
    image: "/press/nutshell-today.jpg",
    caption:
      'Zahin Afsar, a Bangladeshi software engineer developed a game named "K*ll Netanyahu" in support of Palestine. The game was developed to raise awareness about the humanitarian crisis in Gaza. You can play the game directly by visiting (www.killnetanyahu.xyz)',
  },
  {
    account: "CABLGRAM.",
    handle: "@cablgram",
    url: "https://www.instagram.com/cablgram/reel/DJMeCjls_uV",
    image: "/press/cablgram.jpg",
    caption:
      'Zahin Afsar, a Bangladeshi software engineer developed a game named "Kill Netanyahu" in support of Palestine. The game was developed to raise awareness about the humanitarian crisis in Gaza. You can play the game directly by visiting (www.killnetanyahu.xyz)',
  },
];

export default function Featured() {
  return (
    <section id="press" className="relative w-full px-6 pb-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Featured in the news.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <a
              key={feature.handle}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-5 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 transition-colors hover:border-[var(--accent)]"
            >
              <div className="relative aspect-[4/5] w-40 flex-none overflow-hidden rounded-2xl bg-black/30 sm:w-56">
                <img
                  src={feature.image}
                  alt={`${feature.account} coverage`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate text-xl font-semibold tracking-tight">
                  {feature.account}
                </h3>
                <div className="mt-1 truncate text-sm uppercase tracking-widest text-[var(--muted)]">
                  Instagram · {feature.handle}
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[var(--muted)]">
                  {feature.caption}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm uppercase tracking-widest text-[var(--accent)]">
                  Watch the reel
                  <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
