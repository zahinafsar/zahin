import type { Metadata } from "next";
import Nav from "../components/Nav";
import WorkflowGraph from "../components/workflow/WorkflowGraph";
import WorkflowPrinciples from "../components/workflow/WorkflowPrinciples";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

const title = "AI Workflow: How I Ship with AI Agents";
const description =
  "An interactive look at the AI development workflow I use to ship products: plan, tests first, an agent loop that runs until everything compiles and passes, then ship.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI development workflow",
    "AI coding agents",
    "Claude Code workflow",
    "agentic software development",
    "test-driven AI development",
    "AI software engineer",
  ],
  alternates: { canonical: "/ai-workflow" },
  openGraph: {
    type: "website",
    url: "/ai-workflow",
    siteName: SITE.name,
    title,
    description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: SITE.author.twitter,
    site: SITE.author.twitter,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Workflow",
      item: `${SITE.url}/ai-workflow`,
    },
  ],
};

export default function AiWorkflowPage() {
  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Nav />
      <WorkflowGraph />
      <WorkflowPrinciples />
      <Footer />
    </main>
  );
}
