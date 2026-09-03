"use client";

import { SITE } from "../lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--bg-soft)] via-black to-[var(--bg-soft)] p-10 md:p-20"
        >

          <div className="relative">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
              Got an ambitious idea?
              <br />
              <span className="text-accent-gradient">Let&apos;s build it.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Open to fullstack roles, freelance collaborations. Currently based in Dhaka, available remotely worldwide.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:afsarzahin@gmail.com"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-base font-medium text-black transition hover:bg-[var(--accent)]"
              >
                afsarzahin@gmail.com
              </a>
              <a
                href={SITE.author.calendly}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-[var(--accent)] px-6 py-4 text-base font-medium text-white transition hover:bg-[var(--accent)] hover:text-black"
              >
                Book a call
              </a>
              {/* <a
                href="https://github.com/zahinafsar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-6 py-4 text-base font-medium text-white transition hover:border-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zahin-afsar-498392184/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-6 py-4 text-base font-medium text-white transition hover:border-white"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/ZahinAfsar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-6 py-4 text-base font-medium text-white transition hover:border-white"
              >
                X
              </a> */}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8 md:grid-cols-4">
              <Field label="Email" value="afsarzahin@gmail.com" />
              <Field label="Location" value="Dhaka, Bangladesh" />
              <Field label="Status" value="Open to roles" />
              <Field label="Timezone" value="GMT+6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-white">{value}</div>
    </div>
  );
}
