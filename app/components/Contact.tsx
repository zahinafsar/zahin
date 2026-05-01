"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--bg-soft)] via-black to-[var(--bg-soft)] p-10 md:p-20"
        >
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[var(--accent-2)]/15 blur-[100px]" />

          <div className="relative">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
              Got an ambitious idea?
              <br />
              <span className="text-accent-gradient">Let&apos;s build it.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Open to frontend roles, freelance collaborations, and OSS work. Currently based in Dhaka, available remotely worldwide.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:afsarzahin@gmail.com"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-base font-medium text-black transition hover:bg-[var(--accent)]"
              >
                afsarzahin@gmail.com
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
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
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8 md:grid-cols-4">
              <Field label="Email" value="afsarzahin@gmail.com" />
              <Field label="Location" value="Dhaka, Bangladesh" />
              <Field label="Status" value="Open to roles" />
              <Field label="Timezone" value="GMT+6" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-white">{value}</div>
    </div>
  );
}
