import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../components/About";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Projects from "../components/Projects";
import Recommendations from "../components/Recommendations";
import Showreel from "../components/Showreel";
import Skills from "../components/Skills";
import RoleHero from "../components/expertise/RoleHero";
import { EXPERTISE_PAGES, getExpertisePage } from "../lib/expertise";
import { SITE } from "../lib/site";

type Params = {
  role: string;
};

export function generateStaticParams(): Params[] {
  return EXPERTISE_PAGES.map((page) => ({ role: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { role } = await params;
  const page = getExpertisePage(role);

  if (!page) return { title: "Page not found" };

  const canonical = `/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.h1,
      `${page.role} Bangladesh`,
      `Hire ${page.role} Bangladesh`,
      page.serviceType,
      "Md. Zahin Afsar",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title: page.title,
      description: page.description,
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      creator: SITE.author.twitter,
      site: SITE.author.twitter,
    },
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { role } = await params;
  const page = getExpertisePage(role);

  if (!page) notFound();

  const url = `${SITE.url}/${page.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    serviceType: page.serviceType,
    description: page.description,
    url,
    provider: { "@id": `${SITE.url}/#person` },
    areaServed: {
      "@type": "Country",
      name: SITE.author.country,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      availableLanguage: SITE.language,
    },
  };

  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Nav />
      <RoleHero page={page} />
      <Showreel />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Recommendations />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
