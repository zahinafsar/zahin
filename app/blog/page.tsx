import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getAllPosts, getAllTags } from "../lib/blog";
import { SITE } from "../lib/site";

export const dynamic = "force-static";

const PAGE_TITLE = "Blog — Engineering notes, deep dives & tutorials";
const PAGE_DESC =
  "Articles on TypeScript, React, Next.js, performance, and shipping production software by Md. Zahin Afsar.";
const PAGE_PATH = "/blog";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: PAGE_PATH,
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${SITE.name} — Blog RSS Feed` },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    creator: SITE.author.twitter,
  },
  keywords: [
    "TypeScript",
    "React",
    "Next.js",
    "Software Engineering",
    "Web Performance",
    "Frontend",
    "Zahin Afsar",
  ],
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogIndex() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}${PAGE_PATH}#blog`,
    url: `${SITE.url}${PAGE_PATH}`,
    name: PAGE_TITLE,
    description: PAGE_DESC,
    inLanguage: SITE.language,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url,
      sameAs: [SITE.author.github, SITE.author.linkedin],
    },
    publisher: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.frontmatter.title,
      description: p.frontmatter.description,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.frontmatter.date,
      dateModified: p.frontmatter.updated || p.frontmatter.date,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.url}${PAGE_PATH}`,
      },
    ],
  };

  return (
    <main className="relative">
      <Nav />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative w-full px-6 pt-36 pb-16 md:px-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--muted)]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-white" aria-current="page">Blog</li>
            </ol>
          </nav>

          <header className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              The Journal
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Notes from the <span className="text-accent-gradient">build trenches</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              {PAGE_DESC}
            </p>
          </header>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative w-full px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-12 text-center">
              <p className="text-lg text-[var(--muted)]">
                No posts published yet. Drop a markdown file in <code className="rounded bg-white/10 px-2 py-0.5 text-sm">public/blogs/</code>.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-8 transition hover:border-white/20"
                  >
                    <div>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[var(--muted)]">
                        <time dateTime={p.frontmatter.date}>
                          {fmtDate(p.frontmatter.date)}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{p.readingTime} min read</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                        {p.frontmatter.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                        {p.frontmatter.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {p.frontmatter.tags?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] text-[var(--muted)]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xl text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-white">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
