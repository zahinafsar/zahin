# zahin.dev — Personal Site & Blog

Next.js 16 (App Router) + React 19 + Tailwind v4 + Three.js. Portfolio + markdown blog.

## Stack

- `next@16` App Router, React 19, TypeScript strict
- Tailwind v4 (PostCSS), no `tailwind.config.*`
- `gray-matter` + `marked` + `shiki` for blog rendering
- `@react-three/fiber` + `drei` for hero scene
- `motion` (Framer Motion successor) for animations

## Run

```bash
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Blog system

### Where posts live

`public/blogs/*.md` — one file per post. Filename (sans `.md`) = URL slug.

### Frontmatter (required minimum)

```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
tags: ["a", "b"]
author: "Md. Zahin Afsar"
---
```

**Do NOT add `cover` or `ogImage` fields.** They are not read anywhere. OG image is generated dynamically (see below). Adding them is dead noise.

Optional: `draft: true` (excluded from list/feeds), `canonical: "https://..."`.

### OG image — dynamic, per post

`app/blog/[slug]/opengraph-image.tsx` generates a 1200×630 PNG at request time using `next/og`. Pulls title, tags, date, author from frontmatter. **No image asset to manage per post.**

Preview: `http://localhost:3000/blog/<slug>/opengraph-image`

### Rendering pipeline

`app/lib/blog.ts`:
- Reads + parses frontmatter (`gray-matter`)
- Markdown → HTML (`marked`)
- Code blocks intercepted in `walkTokens` → wrapped in `<figure class="code-block">` with shiki syntax highlight + copy button
- Reading time = `max(1, round(wordCount / 220))`
- `getAllPosts()` filters `draft: true`, sorts by `date` desc

### Adding a post

1. Write `public/blogs/<kebab-slug>.md` with required frontmatter.
2. Body in markdown. Inline images: `![alt](/file-in-public.png)`.
3. That's it — appears in `/blog`, sitemap, RSS feed automatically.

## Voice (matches existing posts)

- Terse. Opinion-driven. Bold claims, then evidence.
- Short sentences and fragments OK.
- Lead with the punch, not the windup.
- Lists for tradeoffs (`Wins` / `Breaks`).
- No "in conclusion" or "I hope you enjoyed."
- No em-dash overuse, no "it's not just X, it's Y" cliches.

## Code conventions

- TypeScript strict — no `any`, prefer narrow types.
- Server components by default; mark `"use client"` only when interactivity needs it.
- `import "server-only"` on modules that read filesystem (see `app/lib/blog.ts`).
- Tailwind utility classes inline. Don't create wrapper component classes for one-off styles.
- Path imports from `app/...` use relative paths (no `@/` alias configured).

## Don't

- Don't add `cover` / `ogImage` to frontmatter (unused — see above).
- Don't add per-post OG image files. Dynamic generator handles all posts.
- Don't introduce a CMS, MDX, or contentlayer — markdown + `marked` is intentional.
- Don't bring back `tailwind.config.js` — v4 uses CSS-first config in `globals.css`.
- Don't add lorem ipsum, placeholder text, or "TODO" content to a published post.
