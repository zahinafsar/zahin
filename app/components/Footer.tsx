export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[var(--muted)] md:flex-row">
        <div>© {new Date().getFullYear()} Md. Zahin Afsar — Built with Next.js & Three.js.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/zahinafsar" target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/zahin-afsar-498392184/" target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href="https://x.com/ZahinAfsar" target="_blank" rel="noreferrer" className="hover:text-white">
            X
          </a>
          <a href="mailto:afsarzahin@gmail.com" className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
