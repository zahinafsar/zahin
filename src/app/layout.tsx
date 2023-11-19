import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeSwitch from "@/components/theme-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zahin Afsar",
  description: "Zahin Afsar is a software engineer based in Dhaka, Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex justify-center items-center h-screen overflow-hidden p-5 max-w-[950px] mx-auto">
          <ThemeSwitch className="fixed top-6 right-6" />
          {children}
        </main>
      </body>
    </html>
  );
}
