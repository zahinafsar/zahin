import { getAllPosts } from "../lib/blog";
import { SITE } from "../lib/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuild = new Date(
    posts[0]?.frontmatter.updated || posts[0]?.frontmatter.date || Date.now(),
  ).toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      const pubDate = new Date(p.frontmatter.date).toUTCString();
      return `    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.frontmatter.description)}</description>
      <content:encoded><![CDATA[${p.html}]]></content:encoded>
      ${(p.frontmatter.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE.name)} — Blog</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Engineering notes, deep dives, and tutorials by ${escapeXml(SITE.author.name)}.</description>
    <language>${SITE.language}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
