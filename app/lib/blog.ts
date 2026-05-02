import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { highlight } from "./highlighter";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  author?: string;
  cover?: string;
  ogImage?: string;
  draft?: boolean;
  canonical?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  html: string;
  readingTime: number;
  wordCount: number;
};

const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildMarked(): Marked {
  const m = new Marked({ gfm: true, breaks: false, async: true });
  m.use({
    async: true,
    async walkTokens(token) {
      if (token.type === "code") {
        const t = token as Tokens.Code;
        const lang = t.lang || "text";
        const highlighted = await highlight(t.text, lang);
        const langLabel = escapeHtml(lang || "text");
        const wrapped = `<figure class="code-block" data-lang="${langLabel}">
<div class="code-block-header"><span class="code-lang">${langLabel}</span><button class="copy-btn" data-copy type="button" aria-label="Copy code to clipboard"><span class="copy-icon" aria-hidden="true"></span><span class="copy-text">Copy</span></button></div>
${highlighted}
</figure>`;
        // Cast to html token so marked passes it through verbatim.
        (token as unknown as { type: string; text: string; raw: string }).type = "html";
        (token as unknown as { type: string; text: string; raw: string }).text = wrapped;
        (token as unknown as { type: string; text: string; raw: string }).raw = wrapped;
      }
    },
  });
  return m;
}

const markedInstance = buildMarked();

function ensureDir(): boolean {
  return fs.existsSync(BLOGS_DIR) && fs.statSync(BLOGS_DIR).isDirectory();
}

function listMarkdownFiles(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

function slugFromFile(file: string): string {
  return file.replace(/\.(md|mdx)$/i, "");
}

async function readFile(file: string): Promise<Post> {
  const full = path.join(BLOGS_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as PostFrontmatter;
  const content = parsed.content;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 220));
  const html = (await markedInstance.parse(content)) as string;
  return {
    slug: slugFromFile(file),
    frontmatter: fm,
    content,
    html,
    readingTime,
    wordCount,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = listMarkdownFiles();
  const posts = await Promise.all(files.map(readFile));
  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getPostSlugs(): string[] {
  return listMarkdownFiles().map(slugFromFile);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = listMarkdownFiles();
  const match = files.find((f) => slugFromFile(f) === slug);
  if (!match) return null;
  const post = await readFile(match);
  if (post.frontmatter.draft) return null;
  return post;
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  for (const p of await getAllPosts()) {
    p.frontmatter.tags?.forEach((t) => tags.add(t));
  }
  return Array.from(tags).sort();
}
