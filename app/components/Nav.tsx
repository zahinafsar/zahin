"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Image src="/logo-v2.png" alt="Zahin Afsar" width={32} height={32} priority />
          {/* <span>Zahin Afsar</span> */}
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:afsarzahin@gmail.com"
          className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-[var(--accent)] md:inline-block"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
