import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import CodeCopy from "../../components/CodeCopy";
import PerfChart from "../../components/blog/PerfChart";
import { getAllPosts, getPostBySlug, getPostSlugs, remarkShikiCode } from "../../lib/blog";
import { SITE } from "../../lib/site";

const mdxComponents = { PerfChart };

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const fm = post.frontmatter;
  const url = `/blog/${slug}`;

  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.tags,
    authors: [{ name: fm.author || SITE.author.name, url: SITE.url }],
    alternates: {
      canonical: fm.canonical || url,
    },
    openGraph: {
      type: "article",
      url,
      title: fm.title,
      description: fm.description,
      siteName: SITE.name,
      locale: SITE.locale,
      publishedTime: fm.date,
      modifiedTime: fm.updated || fm.date,
      authors: [SITE.url],
      tags: fm.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      creator: SITE.author.twitter,
    },
  };
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const url = `${SITE.url}/blog/${slug}`;
  const ogImage = `${SITE.url}/blog/${slug}/opengraph-image`;

  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: fm.title,
    description: fm.description,
    image: ogImage,
    datePublished: fm.date,
    dateModified: fm.updated || fm.date,
    inLanguage: SITE.language,
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    keywords: fm.tags?.join(", "),
    articleSection: fm.tags?.[0],
    url,
    author: {
      "@type": "Person",
      name: fm.author || SITE.author.name,
      url: SITE.url,
      sameAs: [SITE.author.github, SITE.author.linkedin],
    },
    publisher: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: fm.title, item: url },
    ],
  };

  return (
    <main className="relative">
      <Nav />
      <CodeCopy />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="relative w-full px-6 pt-36 pb-24 md:px-10">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--muted)]">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>›</li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li aria-hidden>›</li>
              <li className="truncate text-white" aria-current="page">{fm.title}</li>
            </ol>
          </nav>

          <header className="border-b border-[var(--border)] pb-10">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-[var(--muted)]">
              <time dateTime={fm.date}>{fmtDate(fm.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min read</span>
              {fm.updated && fm.updated !== fm.date && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {fmtDate(fm.updated)}</span>
                </>
              )}
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {fm.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              {fm.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="text-sm">
                <span className="text-[var(--muted)]">By </span>
                <span className="font-medium">{fm.author || SITE.author.name}</span>
              </div>
              {fm.tags && fm.tags.length > 0 && (
                <div className="ml-auto flex flex-wrap gap-2">
                  {fm.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] text-[var(--muted)]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {post.isMdx ? (
            <div className="prose-blog mt-12">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkShikiCode],
                    rehypePlugins: [
                      [
                        rehypeRaw,
                        {
                          passThrough: [
                            "mdxFlowExpression",
                            "mdxJsxFlowElement",
                            "mdxJsxTextElement",
                            "mdxTextExpression",
                            "mdxjsEsm",
                          ],
                        },
                      ],
                    ],
                    remarkRehypeOptions: { allowDangerousHtml: true },
                  },
                }}
              />
            </div>
          ) : (
            <div
              className="prose-blog mt-12"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          )}

          <footer className="mt-16 border-t border-[var(--border)] pt-10">
            <div className="flex flex-col gap-3 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
              <div>
                Found this useful? <a href={`mailto:${SITE.author.email}`} className="text-white hover:text-[var(--accent)]">Email me</a> or share on{" "}
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(fm.title)}&url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[var(--accent)]"
                >
                  X
                </a>.
              </div>
              <Link href="/blog" className="text-white hover:text-[var(--accent)]">
                ← All posts
              </Link>
            </div>

            {(prev || next) && (
              <nav
                aria-label="Post pagination"
                className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 transition hover:border-white/20"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                      ← Previous
                    </div>
                    <div className="mt-2 font-medium">{prev.frontmatter.title}</div>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 text-right transition hover:border-white/20"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                      Next →
                    </div>
                    <div className="mt-2 font-medium">{next.frontmatter.title}</div>
                  </Link>
                ) : <span />}
              </nav>
            )}
          </footer>
        </div>
      </article>

      <Footer />
    </main>
  );
}
