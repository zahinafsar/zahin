export type ExpertiseSlug =
  | "full-stack-engineer-bangladesh"
  | "reactjs-developer-bangladesh"
  // | "nextjs-developer-bangladesh"
  | "senior-frontend-engineer-bangladesh"
  | "lead-frontend-engineer-bangladesh"
  | "backend-engineer-bangladesh"
  | "nodejs-developer-bangladesh"
  | "ai-engineer-bangladesh"
  | "shopify-app-developer-bangladesh"
  | "design-engineer-bangladesh"
  | "product-engineer-bangladesh";

export type ExpertisePage = {
  slug: ExpertiseSlug;
  role: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  serviceType: string;
  availability: string;
  stack: string[];
  focus: {
    title: string;
    description: string;
  }[];
};

export const EXPERTISE_PAGES = [
  {
    slug: "full-stack-engineer-bangladesh",
    role: "Full-Stack Engineer",
    h1: "Full-Stack Engineer in Bangladesh",
    title: "Full-Stack Engineer in Bangladesh",
    description:
      "Hire Md. Zahin Afsar, a full-stack engineer in Bangladesh building production products with React, Next.js, Node.js, PostgreSQL, Shopify, and AI.",
    eyebrow: "Product delivery across the stack",
    intro:
      "I turn product requirements into dependable software across interfaces, APIs, data, integrations, and deployment. Based in Dhaka, I have spent five years shipping products for startups and distributed teams serving customers worldwide.",
    serviceType: "Full-stack software engineering",
    availability: "Available for full-time remote roles and selected product engagements.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "AWS"],
    focus: [
      {
        title: "Product interfaces",
        description: "Accessible React experiences built around real customer workflows.",
      },
      {
        title: "APIs and data",
        description: "Typed services, relational data, authentication, payments, and integrations.",
      },
      {
        title: "Production ownership",
        description: "Architecture, deployment, performance, debugging, and post-launch iteration.",
      },
    ],
  },
  {
    slug: "reactjs-developer-bangladesh",
    role: "React.js Developer",
    h1: "React.js Developer in Bangladesh",
    title: "React.js Developer in Bangladesh",
    description:
      "React.js developer in Bangladesh specializing in scalable interfaces, analytics dashboards, design systems, accessibility, and frontend performance.",
    eyebrow: "React interfaces built for product complexity",
    intro:
      "I build React interfaces that stay understandable as products grow: thoughtful component boundaries, resilient data flows, accessible interactions, and performance work grounded in what users actually experience.",
    serviceType: "React application development",
    availability: "Available for React product roles, frontend ownership, and focused interface work.",
    stack: ["React", "TypeScript", "React Native", "Next.js", "D3.js", "GraphQL", "Tailwind CSS"],
    focus: [
      {
        title: "Component architecture",
        description: "Composable systems with clear ownership and maintainable TypeScript contracts.",
      },
      {
        title: "Data-heavy interfaces",
        description: "Dashboards, charts, tables, filters, and complex product workflows.",
      },
      {
        title: "Frontend quality",
        description: "Accessibility, responsive behavior, code splitting, and rendering performance.",
      },
    ],
  },
  // {
  //   slug: "nextjs-developer-bangladesh",
  //   role: "Next.js Developer",
  //   h1: "Next.js Developer in Bangladesh",
  //   title: "Next.js Developer in Bangladesh",
  //   description:
  //     "Next.js developer in Bangladesh building fast product applications, typed APIs, dashboards, ecommerce experiences, and scalable rendering architectures.",
  //   eyebrow: "Next.js beyond the marketing-page layer",
  //   intro:
  //     "I use Next.js to build complete products: interactive application shells, server-rendered pages, typed API boundaries, data-heavy dashboards, ecommerce workflows, and the infrastructure around them.",
  //   serviceType: "Next.js application development",
  //   availability: "Available for Next.js roles, architecture work, migrations, and product development.",
  //   stack: ["Next.js", "React", "TypeScript", "App Router", "PostgreSQL", "GraphQL", "AWS"],
  //   focus: [
  //     {
  //       title: "Application architecture",
  //       description: "Clear server and client boundaries, route structure, data access, and caching.",
  //     },
  //     {
  //       title: "Rendering and SEO",
  //       description: "Static, dynamic, and server rendering selected around freshness and discovery.",
  //     },
  //     {
  //       title: "Typed product systems",
  //       description: "TypeScript contracts spanning interfaces, APIs, integrations, and data.",
  //     },
  //   ],
  // },
  {
    slug: "senior-frontend-engineer-bangladesh",
    role: "Senior Frontend Engineer",
    h1: "Senior Frontend Engineer in Bangladesh",
    title: "Senior Frontend Engineer in Bangladesh",
    description:
      "Senior frontend engineer in Bangladesh with five years of experience delivering complex React, Next.js, analytics, ecommerce, and marketplace products.",
    eyebrow: "Independent execution on difficult interfaces",
    intro:
      "I take ambiguous product problems from discussion to production, balancing delivery speed with architecture, accessibility, performance, and the operational details that keep a frontend dependable.",
    serviceType: "Senior frontend engineering",
    availability: "Available for senior frontend roles with distributed product teams.",
    stack: ["React", "Next.js", "TypeScript", "GraphQL", "Design systems", "Performance", "Accessibility"],
    focus: [
      {
        title: "Ambiguous product work",
        description: "Turning incomplete requirements into sensible flows and shippable increments.",
      },
      {
        title: "Complex frontend systems",
        description: "Analytics, ecommerce, permissions, payments, and operational workflows.",
      },
      {
        title: "Engineering judgment",
        description: "Choosing practical abstractions and performance work that helps the team now.",
      },
    ],
  },
  {
    slug: "lead-frontend-engineer-bangladesh",
    role: "Lead Frontend Engineer",
    h1: "Lead Frontend Engineer in Bangladesh",
    title: "Lead Frontend Engineer in Bangladesh",
    description:
      "Lead frontend engineer in Bangladesh experienced in architecture, analytics platforms, React and Next.js standards, performance, and cross-functional delivery.",
    eyebrow: "Frontend direction tied to product outcomes",
    intro:
      "As Lead Frontend Engineer at Voyage, I owned high-impact product surfaces, improved the platform behind analytics, built shared visualization foundations, and helped ship complex ecommerce workflows faster.",
    serviceType: "Lead frontend engineering",
    availability: "Available for lead frontend and frontend architecture roles with remote teams.",
    stack: ["React", "Next.js", "TypeScript", "Architecture", "Analytics", "GraphQL", "Team leadership"],
    focus: [
      {
        title: "Technical direction",
        description: "Frontend boundaries, conventions, architecture decisions, and sustainable standards.",
      },
      {
        title: "Platform thinking",
        description: "Shared components, visualization primitives, and foundations for faster delivery.",
      },
      {
        title: "Cross-functional leadership",
        description: "Keeping design, backend, product, and business stakeholders aligned.",
      },
    ],
  },
  {
    slug: "backend-engineer-bangladesh",
    role: "Backend Engineer",
    h1: "Backend Engineer in Bangladesh",
    title: "Backend Engineer in Bangladesh",
    description:
      "Backend engineer in Bangladesh building Node.js APIs, PostgreSQL systems, integrations, payments, queues, authentication, and production infrastructure.",
    eyebrow: "Backend systems designed around product reality",
    intro:
      "I build backend services that make product workflows reliable: explicit API contracts, practical data models, third-party integrations, payments, background work, permissions, storage, and deployment paths.",
    serviceType: "Backend software engineering",
    availability: "Available for backend and full-stack roles centered on TypeScript products.",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "MongoDB", "GraphQL", "AWS Lambda", "Docker"],
    focus: [
      {
        title: "API design",
        description: "REST and GraphQL services with authentication, validation, and permissions.",
      },
      {
        title: "Data and performance",
        description: "Practical models, query design, preaggregations, and measured optimization.",
      },
      {
        title: "Integrations and operations",
        description: "Payments, ecommerce data, queues, storage, webhooks, domains, and CI/CD.",
      },
    ],
  },
  {
    slug: "nodejs-developer-bangladesh",
    role: "Node.js Developer",
    h1: "Node.js Developer in Bangladesh",
    title: "Node.js Developer in Bangladesh",
    description:
      "Node.js developer in Bangladesh building typed APIs, PostgreSQL applications, payment workflows, integrations, queues, and scalable product backends.",
    eyebrow: "TypeScript services that stay easy to change",
    intro:
      "I use Node.js for product backends where iteration speed and clear contracts matter: APIs, integrations, webhooks, payments, background jobs, publishing systems, and data-heavy application workflows.",
    serviceType: "Node.js development",
    availability: "Available for Node.js, TypeScript backend, and full-stack product roles.",
    stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST"],
    focus: [
      {
        title: "Typed API services",
        description: "Validation, permissions, predictable errors, and client-safe contracts.",
      },
      {
        title: "Integration workflows",
        description: "Webhooks, external APIs, payments, messaging, and background work.",
      },
      {
        title: "Database-backed products",
        description: "SQL and document models designed around real queries and constraints.",
      },
    ],
  },
  {
    slug: "ai-engineer-bangladesh",
    role: "AI Engineer",
    h1: "AI Engineer in Bangladesh",
    title: "AI Engineer in Bangladesh",
    description:
      "AI engineer in Bangladesh building AI agents, LLM product features, coding tools, business automation, and reliable human-in-the-loop workflows.",
    eyebrow: "AI features built as products, not demos",
    intro:
      "I build AI experiences around clear user jobs, useful tools, dependable interfaces, and the surrounding systems required to ship them. My work includes coding agents, marketing planning, CRM features, and business automation.",
    serviceType: "AI product engineering",
    availability: "Available for AI product engineering roles and focused agent engagements.",
    stack: ["AI agents", "LLMs", "TypeScript", "Next.js", "Node.js", "Automation", "PostgreSQL"],
    focus: [
      {
        title: "Agent experiences",
        description: "Connecting models to tools, files, previews, terminals, and user decisions.",
      },
      {
        title: "AI product features",
        description: "LLM capabilities embedded into dashboards, CRMs, and planning workflows.",
      },
      {
        title: "Automation systems",
        description: "Data integration, review steps, fallbacks, and visibility around automated work.",
      },
    ],
  },
  {
    slug: "shopify-app-developer-bangladesh",
    role: "Shopify App Developer",
    h1: "Shopify App Developer in Bangladesh",
    title: "Shopify App Developer in Bangladesh",
    description:
      "Shopify app developer in Bangladesh experienced in cart recovery, referral systems, merchant analytics, webhooks, Liquid, and ecommerce integrations.",
    eyebrow: "Commerce software tied to merchant outcomes",
    intro:
      "I build Shopify applications and merchant experiences around revenue workflows: cart recovery, referrals, marketing analytics, discounts, webhooks, dashboards, and maintainable Liquid integrations.",
    serviceType: "Shopify app development",
    availability: "Available for Shopify app roles, ecommerce teams, and selected commerce projects.",
    stack: ["Shopify", "Next.js", "TypeScript", "Liquid", "Webhooks", "PostgreSQL", "AWS Lambda"],
    focus: [
      {
        title: "Merchant applications",
        description: "Dashboards that turn complex commerce data into useful operator workflows.",
      },
      {
        title: "Commerce integrations",
        description: "Webhooks, discounts, referrals, recovery, marketing platforms, and reporting.",
      },
      {
        title: "Storefront implementation",
        description: "Maintainable Liquid themes with polished, responsive customer experiences.",
      },
    ],
  },
  {
    slug: "design-engineer-bangladesh",
    role: "Design Engineer",
    h1: "Design Engineer in Bangladesh",
    title: "Design Engineer in Bangladesh for Web Products",
    description:
      "Design engineer in Bangladesh translating product ideas and detailed designs into polished, accessible React interfaces and reusable design systems.",
    eyebrow: "Between product design and production code",
    intro:
      "I turn interaction ideas and high-fidelity designs into interfaces that feel precise in production. My work combines frontend engineering, design-system thinking, accessibility, motion, and fast collaboration with designers.",
    serviceType: "Digital product design engineering",
    availability: "Available for design engineering and interface-focused frontend roles.",
    stack: ["React", "TypeScript", "Design systems", "Accessibility", "Prototyping", "Motion", "Tailwind CSS"],
    focus: [
      {
        title: "Design-to-code execution",
        description: "Responsive implementation with careful type, spacing, states, and motion.",
      },
      {
        title: "Design systems",
        description: "Reusable primitives that preserve quality without slowing product teams down.",
      },
      {
        title: "Interaction prototyping",
        description: "Working interfaces that help teams evaluate behavior before a full build.",
      },
    ],
  },
  {
    slug: "product-engineer-bangladesh",
    role: "Product Engineer",
    h1: "Product Engineer in Bangladesh",
    title: "Product Engineer in Bangladesh",
    description:
      "Product engineer in Bangladesh turning customer problems into shipped React, Next.js, Node.js, ecommerce, marketplace, CRM, and AI products.",
    eyebrow: "From customer problem to production outcome",
    intro:
      "I work across product decisions and implementation: clarifying the user problem, finding the smallest useful release, building it across the stack, measuring what matters, and improving it after real use.",
    serviceType: "Product engineering",
    availability: "Available for product roles where ownership extends beyond implementation tickets.",
    stack: ["Product discovery", "React", "Next.js", "Node.js", "PostgreSQL", "Analytics", "AI"],
    focus: [
      {
        title: "Product discovery",
        description: "Turning fuzzy requests into users, workflows, constraints, and a useful release.",
      },
      {
        title: "End-to-end delivery",
        description: "Building the interface, services, data, integrations, and deployment path.",
      },
      {
        title: "Iteration and leverage",
        description: "Using analytics, feedback, shared systems, and automation to improve outcomes.",
      },
    ],
  },
] satisfies ExpertisePage[];

const PAGE_BY_SLUG = new Map(
  EXPERTISE_PAGES.map((page) => [page.slug, page] as const),
);

export function getExpertisePage(slug: string) {
  return PAGE_BY_SLUG.get(slug as ExpertiseSlug) || null;
}
