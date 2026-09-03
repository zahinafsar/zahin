import type { Metadata } from "next";
import Nav from "../components/Nav";
import PricingHero from "../components/pricing/PricingHero";
import DiyVsUs from "../components/pricing/DiyVsUs";
import CheapMath from "../components/pricing/CheapMath";
import Plans from "../components/pricing/Plans";
import PricingFaq from "../components/pricing/PricingFaq";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

const title = "Hire a Software Engineer for $200/mo";
const description =
  "Any kind of development work from $200/month. First 2 days free. No AI subscriptions, no models, no agents to manage: give us your idea, we ship the product.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hire software engineer",
    "software developer subscription",
    "monthly developer retainer",
    "hire full-stack developer",
    "AI development service",
    "dedicated developer monthly",
    "affordable software development",
    "senior engineer subscription",
    "hire engineer Bangladesh",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE.url}/pricing#service`,
  name: "Software engineering subscription",
  serviceType: "Software development",
  description,
  url: `${SITE.url}/pricing`,
  provider: { "@id": `${SITE.url}/#person` },
  areaServed: SITE.author.areaServed,
  offers: [
    {
      "@type": "Offer",
      name: "Standard",
      description:
        "Any kind of development work. First 2 days free. Delivery may delay based on work pressure.",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 200,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Offer",
      name: "Priority",
      description:
        "Any kind of development work with full responsibility and priority delivery. First 7 days free.",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 2000,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE.url}/pricing`,
    },
  ],
};

export default function PricingPage() {
  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Nav />
      <PricingHero />
      <DiyVsUs />
      <CheapMath />
      <Plans />
      <PricingFaq />
      <Footer />
    </main>
  );
}
