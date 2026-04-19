// Agent marketplace data for RBK Education ADL architecture

export interface Agent {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  capabilities: string[];
  category: "orchestration" | "personalization" | "commerce" | "content" | "communication";
  status: "available" | "coming_soon";
  icon: string; // lucide icon name
  color: string; // tailwind bg class using design tokens
}

export const agents: Agent[] = [
  {
    slug: "lumi",
    name: "Lumi",
    role: "Journey Orchestrator",
    tagline: "Your intelligent guide through every learning path.",
    description:
      "Lumi routes visitors through the right funnel, resumes quizzes, matches bundles, and ensures every touchpoint moves the learner forward. Lumi is the brain behind Luau Mini — the state-aware continuity layer that turns anonymous visitors into active learners.",
    capabilities: [
      "Smart visitor routing based on journey stage",
      "Quiz resumption and progress restoration",
      "Bundle matching based on pain-point assessment",
      "Personalized CTA and headline selection",
      "Nurture sequence orchestration",
      "Ascension readiness detection",
    ],
    category: "orchestration",
    status: "available",
    icon: "Compass",
    color: "bg-sage-soft",
  },
  {
    slug: "aura",
    name: "Aura",
    role: "Profile & Personalization Engine",
    tagline: "Every learner is unique. Aura remembers that.",
    description:
      "Aura builds and maintains rich learner profiles across every interaction — quiz answers, content consumption patterns, purchase history, and engagement signals. She powers the personalization that makes the RBK Education feel like a private mentor, not a mass-market course platform.",
    capabilities: [
      "Dynamic learner profile construction",
      "Interest and skill-gap mapping",
      "Content recommendation engine",
      "Learning style adaptation",
      "Cross-bundle progress tracking",
      "Career pathway alignment scoring",
    ],
    category: "personalization",
    status: "available",
    icon: "Sparkles",
    color: "bg-peach-soft",
  },
  {
    slug: "vault",
    name: "Vault",
    role: "Payment & Access Manager",
    tagline: "Secure payments. Instant access. Zero friction.",
    description:
      "Vault handles the entire commerce lifecycle — from Stripe checkout session creation to payment confirmation, access token generation, entitlement management, and grace-period enforcement. Vault ensures buyers get instant access and subscriptions stay healthy.",
    capabilities: [
      "Stripe checkout session creation",
      "Payment confirmation and order recording",
      "Secure access token generation",
      "Entitlement and subscription management",
      "Grace-period and dunning automation",
      "Billing portal session creation",
    ],
    category: "commerce",
    status: "available",
    icon: "Shield",
    color: "bg-sage-soft",
  },
  {
    slug: "nova",
    name: "Nova",
    role: "Content Variant Generator",
    tagline: "The right message, for the right person, at the right time.",
    description:
      "Nova generates personalized content variants — email subject lines, landing page headlines, CTA copy, and nurture messages — optimized for each learner's stage, pain point, and engagement pattern. Nova turns generic marketing into conversations that convert.",
    capabilities: [
      "Dynamic headline and CTA generation",
      "Email subject line optimization",
      "Pain-point-specific copy adaptation",
      "A/B variant creation for landing pages",
      "Nurture sequence content personalization",
      "Ascension offer messaging",
    ],
    category: "content",
    status: "coming_soon",
    icon: "Wand2",
    color: "bg-peach-soft",
  },
  {
    slug: "echo",
    name: "Echo",
    role: "Inbound Communication Handler",
    tagline: "Every message heard. Every question answered.",
    description:
      "Echo processes inbound messages from email replies, support requests, and form submissions. Echo classifies intent, routes to the right workflow, and ensures no learner question goes unanswered — maintaining the human-in-the-loop model that the RBK Education is built on.",
    capabilities: [
      "Inbound message classification",
      "Support request routing",
      "FAQ auto-response generation",
      "Escalation to human support",
      "Feedback collection and analysis",
      "Reply-based quiz and survey handling",
    ],
    category: "communication",
    status: "coming_soon",
    icon: "MessageCircle",
    color: "bg-secondary",
  },
];

export const agentCategories = [
  { key: "all", label: "All Agents" },
  { key: "orchestration", label: "Orchestration" },
  { key: "personalization", label: "Personalization" },
  { key: "commerce", label: "Commerce" },
  { key: "content", label: "Content" },
  { key: "communication", label: "Communication" },
];

// Bundle tiers for /bundles page
export interface BundleTier {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  highlight: boolean;
  agents: string[]; // agent slugs included
}

export const bundleTiers: BundleTier[] = [
  {
    slug: "starter",
    name: "Starter",
    subtitle: "One bundle. One skill. Immediate impact.",
    price: "$47",
    priceNote: "One-time · $200+ value",
    features: [
      "Choose any single AI Mini-Learner Bundle",
      "Step-by-step modules with templates",
      "Lifetime access to bundle materials",
      "Lumi-powered quiz matching",
      "Career impact roadmap",
      "Downloadable resources and worksheets",
    ],
    cta: "Pick Your Bundle",
    highlight: false,
    agents: ["lumi", "vault"],
  },
  {
    slug: "growth",
    name: "Growth",
    subtitle: "Stack skills across your career path.",
    price: "$127",
    priceNote: "3 bundles · Save $14",
    features: [
      "Choose any 3 AI Mini-Learner Bundles",
      "Everything in Starter, times three",
      "Aura-powered personalized recommendations",
      "Cross-bundle progress dashboard",
      "Priority support via Echo",
      "RBK Education pathway preview",
    ],
    cta: "Build Your Stack",
    highlight: true,
    agents: ["lumi", "aura", "vault", "echo"],
  },
  {
    slug: "scale",
    name: "Scale",
    subtitle: "Nine bundles. One price. Maximum career velocity.",
    price: "$347",
    priceNote: "9 bundles · Save $76",
    features: [
      "Choose any 9 AI Mini-Learner Bundles",
      "Everything in Growth, expanded across nine skill areas",
      "Aura-powered cross-bundle learning paths",
      "Unified progress dashboard across all 9 bundles",
      "Priority support via Echo for every bundle",
      "Full RBK Education ascension pathway preview",
    ],
    cta: "Scale With 9 Bundles",
    highlight: false,
    agents: ["lumi", "aura", "vault", "echo"],
  },
];
