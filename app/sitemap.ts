import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog";
import { SITE } from "./lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: posts[0]?.frontmatter.updated
        ? new Date(posts[0].frontmatter.updated)
        : posts[0]
        ? new Date(posts[0].frontmatter.date)
        : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated || p.frontmatter.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
