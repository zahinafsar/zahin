"use client";

import { useEffect } from "react";

export default function CodeCopy() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLButtonElement>("[data-copy]");
      if (!btn) return;

      const figure = btn.closest("figure.code-block");
      const pre = figure?.querySelector("pre");
      if (!pre) return;

      const text = pre.textContent ?? "";
      const label = btn.querySelector<HTMLElement>(".copy-text");

      const finish = (msg: string, ok: boolean) => {
        if (label) label.textContent = msg;
        btn.dataset.copied = ok ? "true" : "error";
        window.setTimeout(() => {
          if (label) label.textContent = "Copy";
          delete btn.dataset.copied;
        }, 1500);
      };

      const fallback = () => {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
          finish("Copied", true);
        } catch {
          finish("Failed", false);
        }
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(
          () => finish("Copied", true),
          fallback,
        );
      } else {
        fallback();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
