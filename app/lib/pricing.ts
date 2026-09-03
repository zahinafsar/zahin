export type Plan = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  cadence: string;
  trial: string;
  trialDays: number;
  tagline: string;
  popular: boolean;
  features: string[];
  caveat: string | null;
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "standard",
    name: "Standard",
    price: 200,
    priceLabel: "$200",
    cadence: "/mo",
    trial: "First 2 days free",
    trialDays: 2,
    tagline: "Any kind of development work, at a price that stops making sense the moment you compare it.",
    popular: true,
    features: [
      "Any kind of development work",
      "Web apps, APIs, dashboards, automations",
      "AI features shipped, not experimented with",
      "Unlimited requests, one at a time",
      "Async updates on every working day",
      "Cancel any month, no contract",
    ],
    caveat: "Delivery may be delayed during heavy work pressure. You are in a shared queue.",
    cta: "Start 2 days free",
  },
  {
    id: "priority",
    name: "Priority",
    price: 2000,
    priceLabel: "$2,000",
    cadence: "/mo",
    trial: "First 7 days free",
    trialDays: 7,
    tagline: "Everything in Standard, except your work never waits behind anyone else's.",
    popular: false,
    features: [
      "Everything in Standard",
      "Full ownership and accountability for delivery",
      "Priority queue, your work goes first",
      "Same-day response on working days",
      "Direct line for calls and escalations",
      "Architecture, review, and long-term maintenance",
    ],
    caveat: null,
    cta: "Start 7 days free",
  },
];

export const DIY_STEPS = [
  "Write the prompt",
  "Wait for it to finish",
  "Integrate the other SaaS yourself",
  "Wire up access for thousands of users",
  "Test every flow by hand",
  "Learn skills, MCP, loops, markdown, graphs",
  "Learn prompt engineering",
  "Ship a broken product",
];

export const OUR_STEPS = [
  "Give us the idea",
  "We ship it",
];

export const EFFICIENCY = [
  {
    metric: "Prompts to ship a feature",
    you: "100 prompts",
    us: "10 prompts",
    youWidth: 100,
    usWidth: 10,
    delta: "10x fewer",
  },
  {
    metric: "Tokens burned",
    you: "1M tokens",
    us: "100K tokens",
    youWidth: 100,
    usWidth: 10,
    delta: "10x cheaper",
  },
  {
    metric: "Bundle your users download",
    you: "10 MB",
    us: "10 KB",
    youWidth: 100,
    usWidth: 5,
    delta: "1000x smaller",
  },
  {
    metric: "Time to first paint",
    you: "10 seconds",
    us: "10 ms",
    youWidth: 100,
    usWidth: 5,
    delta: "1000x faster",
  },
];

export const PRICING_FAQS = [
  {
    q: "What counts as development work?",
    a: "Web apps, marketing sites, APIs, dashboards, Shopify builds, AI agents, automations, integrations, migrations, performance work, and bug fixing. If it is software and it can be built, it is in scope.",
  },
  {
    q: "What is the difference between $200 and $2,000?",
    a: "The work is the same standard. The difference is the queue. On Standard you share the queue, so delivery can slip when work pressure is high. On Priority your work goes first, you get same-day responses, and I take full ownership of the delivery date.",
  },
  {
    q: "Do I need my own AI subscriptions?",
    a: "No. You do not pay for models, agents, tokens, or tooling. That cost sits with me and is already inside the monthly price.",
  },
  {
    q: "How does the free trial work?",
    a: "Standard starts with 2 free days and Priority starts with 7 free days. You send real work, not a demo task. If the output is not what you wanted, you walk away and pay nothing.",
  },
  {
    q: "How many requests can I send?",
    a: "As many as you want. They are worked through one at a time so each one gets real attention instead of four half-finished features.",
  },
  {
    q: "Can I cancel?",
    a: "Any month. There is no contract, no notice period, and no cancellation fee.",
  },
];
