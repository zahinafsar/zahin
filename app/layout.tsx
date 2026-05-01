import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zahin Afsar — Software Engineer",
  description:
    "Software engineer building performant, modern products with JavaScript, TypeScript, React, and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
