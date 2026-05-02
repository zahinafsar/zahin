import "server-only";
import { createHighlighter, type Highlighter } from "shiki";

const THEME = "github-dark-default";
const LANGS = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "json",
  "bash",
  "shell",
  "css",
  "html",
  "markdown",
  "yaml",
  "sql",
  "python",
  "go",
  "rust",
  "diff",
  "dockerfile",
];

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: string | undefined): Promise<string> {
  const highlighter = await getHighlighter();
  const loaded = highlighter.getLoadedLanguages() as string[];
  const aliases: Record<string, string> = {
    sh: "bash",
    zsh: "bash",
    js: "javascript",
    ts: "typescript",
    yml: "yaml",
  };
  const requested = lang ? aliases[lang] || lang : "text";
  const safeLang = loaded.includes(requested) ? requested : "text";
  return highlighter.codeToHtml(code, { lang: safeLang, theme: THEME });
}

export const HIGHLIGHT_THEME = THEME;
