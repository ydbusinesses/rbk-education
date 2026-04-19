// RBK Education catalog, ascension mapping, and mock account data

export interface Bundle {
  id: string;
  title: string;
  category: string;
  price: string;
  perceivedValue: string;
  painPoint: string;
  careerImpact: string;
  bestCareerUses: string[];
  slug: string;
}

export interface AscensionPath {
  funnelLabel: string;
  immediateNextStep: string;
  nextStepDescription: string;
  calveraPath: string;
  calveraPathSteps: string[];
  relatedBundleSlugs: string[];
}

export interface LeadMagnet {
  funnelSlug: string;
  title: string;
  subtitle: string;
  magnetType: string;
  magnetTitle: string;
  magnetDescription: string;
  quizSlug: string;
  matchedBundleSlug: string;
}

export interface ContinueItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  destination: string;
  progress?: number;
}

export interface RecommendedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  destination: string;
}

export interface Purchase {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: "completed" | "refunded" | "pending";
  category: string;
}

export interface AccessItem {
  id: string;
  title: string;
  category: string;
  status: "active" | "grace" | "expired" | "revoked";
  expiresAt?: string;
  accessLink?: string;
}

export interface BillingInfo {
  subscriptions: {
    id: string;
    name: string;
    status: "active" | "past_due" | "canceled";
    nextBilling: string;
    amount: string;
  }[];
  recentInvoices: {
    id: string;
    date: string;
    amount: string;
    status: "paid" | "failed" | "pending";
  }[];
}

// -- Ascension path mapping --

export const ascensionPaths: Record<string, AscensionPath> = {
  "automation-anxiety": {
    funnelLabel: "Automation Anxiety",
    immediateNextStep: "Automation Implementation Workshop",
    nextStepDescription: "A guided 2-week workshop where you build your first real automation workflow with expert support.",
    calveraPath: "AI Literacy → Agentic Systems Engineer",
    calveraPathSteps: [
      "AI Literacy Foundation",
      "Prompt Engineering Mastery",
      "Agentic Systems Engineering",
      "AI Operations Leadership",
    ],
    relatedBundleSlugs: ["ai-automation-rescue", "business-process-liberation", "ai-implementation-confidence", "ai-adoption-playbook"],
  },
  "ai-replacement-fear": {
    funnelLabel: "AI Replacement Fear",
    immediateNextStep: "Career Resilience Roadmap",
    nextStepDescription: "A personalized career resilience plan mapping your skills to AI-proof roles and income growth paths.",
    calveraPath: "Foundation → Prompt Engineering / Agentic Systems",
    calveraPathSteps: [
      "AI Career Foundation",
      "Prompt Engineering for Professionals",
      "Agentic Systems Specialist",
      "AI Strategy & Advisory",
    ],
    relatedBundleSlugs: ["agentic-ai-career-insurance", "ai-implementation-confidence"],
  },
  "burnout": {
    funnelLabel: "Burnout",
    immediateNextStep: "Leadership Systems & Operational Redesign",
    nextStepDescription: "A structured leadership operating system that eliminates burnout while improving team performance.",
    calveraPath: "Foundation → Business Intelligence / Systems Pathways",
    calveraPathSteps: [
      "Leadership Foundation",
      "People & Performance Systems",
      "Business Intelligence for Leaders",
      "Operational Excellence Certification",
    ],
    relatedBundleSlugs: ["well-being-leadership", "first-90-days-leadership", "retention-revolution", "virtual-leadership", "courageous-leadership"],
  },
  "underpaid": {
    funnelLabel: "Underpaid",
    immediateNextStep: "Positioning & Skill Leverage Roadmap",
    nextStepDescription: "A strategic roadmap that maps your current skills to higher-paying roles and negotiation leverage points.",
    calveraPath: "Foundation → Technical Specialization Tied to Income Growth",
    calveraPathSteps: [
      "Career Positioning Foundation",
      "Technical Skill Specialization",
      "Negotiation & Influence Mastery",
      "Executive Income Acceleration",
    ],
    relatedBundleSlugs: ["negotiation-power", "strategic-visibility", "executive-presence"],
  },
};

// Map quiz slugs to ascension paths
export const quizToAscension: Record<string, string> = {
  "automation-readiness": "automation-anxiety",
  "ai-career-risk": "ai-replacement-fear",
  "team-burnout-risk": "burnout",
  "pay-gap": "underpaid",
};

// Map bundle slugs to ascension paths
export const bundleToAscension: Record<string, string> = {
  "ai-automation-rescue": "automation-anxiety",
  "agentic-ai-career-insurance": "ai-replacement-fear",
  "well-being-leadership": "burnout",
  "negotiation-power": "underpaid",
  "business-process-liberation": "automation-anxiety",
  "ai-implementation-confidence": "automation-anxiety",
  "ai-adoption-playbook": "automation-anxiety",
  "first-90-days-leadership": "burnout",
  "retention-revolution": "burnout",
  "virtual-leadership": "burnout",
  "courageous-leadership": "burnout",
  "executive-presence": "underpaid",
  "strategic-visibility": "underpaid",
};

// -- Lead magnets per funnel --

export const leadMagnets: LeadMagnet[] = [
  {
    funnelSlug: "automation-rescue",
    title: "Is AI Automation Anxiety Holding You Back?",
    subtitle: "Get your free Automation Readiness Checklist and find out where you stand.",
    magnetType: "checklist",
    magnetTitle: "The AI Automation Readiness Checklist",
    magnetDescription: "A 10-point diagnostic that shows you exactly where to start automating — no technical skills required.",
    quizSlug: "automation-readiness",
    matchedBundleSlug: "ai-automation-rescue",
  },
  {
    funnelSlug: "career-insurance",
    title: "Will AI Replace Your Role?",
    subtitle: "Download the AI Career Risk Scorecard and build your defense plan.",
    magnetType: "scorecard",
    magnetTitle: "The AI Career Risk Scorecard",
    magnetDescription: "Assess your role's AI vulnerability across 8 dimensions and get a personalized action plan.",
    quizSlug: "ai-career-risk",
    matchedBundleSlug: "agentic-ai-career-insurance",
  },
  {
    funnelSlug: "burnout-leadership",
    title: "Is Your Team Silently Burning Out?",
    subtitle: "Get the Team Burnout Warning Signs Guide — before it's too late.",
    magnetType: "guide",
    magnetTitle: "The Team Burnout Warning Signs Guide",
    magnetDescription: "12 early warning signals that your team is disengaging — and the exact conversations to have.",
    quizSlug: "team-burnout-risk",
    matchedBundleSlug: "well-being-leadership",
  },
  {
    funnelSlug: "negotiation-power",
    title: "Are You Leaving Money on the Table?",
    subtitle: "Get the Pay Gap Reality Check Worksheet and know your worth.",
    magnetType: "worksheet",
    magnetTitle: "The Pay Gap Reality Check Worksheet",
    magnetDescription: "Calculate your market value, identify leverage points, and prepare your negotiation script.",
    quizSlug: "pay-gap",
    matchedBundleSlug: "negotiation-power",
  },
];

// -- Full 50-bundle catalog organized by category --

export const categories = [
  { key: "ai-automation", label: "AI Automation & Agentic Systems", demand: "+245%" },
  { key: "data-literacy", label: "Data Literacy & Business Intelligence", demand: "Skill #1" },
  { key: "communication", label: "Communication & Stakeholder Management", demand: "98% Required" },
  { key: "ai-content", label: "AI-Powered Content & Marketing", demand: "Creativity + AI" },
  { key: "leadership", label: "Leadership & People Management", demand: "Surge 2026" },
  { key: "project-mgmt", label: "Project & Process Management", demand: "88% Prioritize" },
  { key: "sales", label: "Sales & Business Development", demand: "Revenue = Security" },
  { key: "compliance", label: "Compliance & Risk Management", demand: "High Stakes" },
  { key: "ai-technical", label: "AI-Specific Technical Skills", demand: "Hottest 2026" },
  { key: "career", label: "Career Acceleration & Personal Branding", demand: "Growth" },
];

export const catalog: Bundle[] = [
  // Category 1: AI Automation & Agentic Systems
  { id: "1", title: "Stop Drowning in Manual Tasks: The 5-Day AI Automation Rescue Plan", category: "ai-automation", price: "$47", perceivedValue: "$200+", painPoint: "62% of professionals report skills gaps are more pronounced than a year ago — you're watching competitors automate while you're still copying-pasting data at midnight.", careerImpact: "AI automation skills increased +245% in demand. Employers pay $85K–$125K for automation specialists.", bestCareerUses: ["AI Automation Specialist", "Operations Analyst", "Workflow Consultant"], slug: "ai-automation-rescue" },
  { id: "2", title: "I'm Terrified AI Will Replace Me: The Agentic AI Career Insurance Blueprint", category: "ai-automation", price: "$47", perceivedValue: "$200+", painPoint: "41% of employees fear AI's impact on their jobs — you're paralyzed between learning AI or becoming obsolete.", careerImpact: "52% of talent acquisition leaders are deploying agentic AI. Be the human who manages the agents.", bestCareerUses: ["AI Automation Specialist", "Operations Analyst", "Workflow Consultant"], slug: "agentic-ai-career-insurance" },
  { id: "3", title: "From Spreadsheet Hell to Automation Hero: Business Process Liberation System", category: "ai-automation", price: "$47", perceivedValue: "$200+", painPoint: "You're stuck doing the same soul-crushing tasks weekly while leadership demands \"strategic thinking\" — but when?", careerImpact: "Automation specialists command $95K–$145K. This bundle pays for itself if it saves you 2 hours per week.", bestCareerUses: ["AI Automation Specialist", "Operations Analyst", "Workflow Consultant"], slug: "business-process-liberation" },
  { id: "4", title: "Nobody Knows I'm Faking It: The AI Implementation Confidence Course", category: "ai-automation", price: "$47", perceivedValue: "$200+", painPoint: "Your company expects you to \"implement AI\" but you don't know where to start — imposter syndrome is eating you alive.", careerImpact: "70% of organizations will use AI-powered platforms by 2026. Lead the charge or watch from the sidelines.", bestCareerUses: ["AI Automation Specialist", "Operations Analyst", "Workflow Consultant"], slug: "ai-implementation-confidence" },
  { id: "5", title: "My Team Hates Change: The AI Adoption Playbook for Reluctant Teams", category: "ai-automation", price: "$47", perceivedValue: "$200+", painPoint: "You know AI could save hours, but your team resists every new tool — you're caught between innovation and mutiny.", careerImpact: "Leaders who successfully drive AI adoption are promoted 2.3x faster than peers.", bestCareerUses: ["AI Automation Specialist", "Operations Analyst", "Workflow Consultant"], slug: "ai-adoption-playbook" },

  // Category 2: Data Literacy & Business Intelligence
  { id: "6", title: "Data Illiterate in a Data-Driven World: The Non-Analyst's Survival Guide", category: "data-literacy", price: "$47", perceivedValue: "$200+", painPoint: "Everyone's asking for \"data-driven decisions\" but you can barely read a pivot table — you feel left out of important conversations.", careerImpact: "Data literacy is the #1 skill employers demand by 2030. 70% of roles now require data interpretation.", bestCareerUses: ["Business Intelligence Analyst", "Data Analyst", "Reporting Specialist"], slug: "data-literacy-survival" },
  { id: "7", title: "Stuck in Spreadsheet Quicksand: The Business Intelligence Fast-Track", category: "data-literacy", price: "$47", perceivedValue: "$200+", painPoint: "You spend 12 hours a week creating reports manually — then they're outdated by the time you finish.", careerImpact: "BI consultants earn $90K–$140K. This skill alone can justify a $20K raise.", bestCareerUses: ["Business Intelligence Analyst", "Data Analyst", "Reporting Specialist"], slug: "bi-fast-track" },
  { id: "8", title: "My Boss Asks Questions I Can't Answer: Predictive Analytics for the Rest of Us", category: "data-literacy", price: "$47", perceivedValue: "$200+", painPoint: "Leadership wants forecasts and predictions, but your Crystal Ball broke — you're guessing and it shows.", careerImpact: "Predictive analytics skills are in the top 5 most requested by employers. 88% prioritize problem-solving + data skills.", bestCareerUses: ["Business Intelligence Analyst", "Data Analyst", "Reporting Specialist"], slug: "predictive-analytics" },
  { id: "9", title: "Drowning in Data, Starving for Insights: The Analytics Translation Guide", category: "data-literacy", price: "$47", perceivedValue: "$200+", painPoint: "You have mountains of data but no idea what it means — analysis paralysis is killing your productivity.", careerImpact: "Analytical thinking is the #1 skill across all industries. Master this, write your own paycheck.", bestCareerUses: ["Business Intelligence Analyst", "Data Analyst", "Reporting Specialist"], slug: "analytics-translation" },
  { id: "10", title: "My Reports Are Ignored: The Data Storytelling Transformation System", category: "data-literacy", price: "$47", perceivedValue: "$200+", painPoint: "You spend days on analysis only to watch eyes glaze over in meetings — your data deserves better.", careerImpact: "Professionals who communicate data effectively earn 15–20% more than those with equal analytical skills.", bestCareerUses: ["Business Intelligence Analyst", "Data Analyst", "Reporting Specialist"], slug: "data-storytelling" },

  // Category 3: Communication & Stakeholder Management
  { id: "11", title: "Nobody Listens in Meetings: The Executive Presence Acceleration Program", category: "communication", price: "$47", perceivedValue: "$200+", painPoint: "You have great ideas but get talked over — junior team members get credit for your suggestions.", careerImpact: "Professionals with strong communication skills earn $1.2M more over their careers.", bestCareerUses: ["Project Coordinator", "Operations Manager", "Client Success Manager"], slug: "executive-presence" },
  { id: "12", title: "Cross-Functional Projects Are My Nightmare: The Collaboration System That Actually Works", category: "communication", price: "$47", perceivedValue: "$200+", painPoint: "You're managing people you don't manage — politics, missed deadlines, and finger-pointing are crushing you.", careerImpact: "Cross-functional collaboration is the #3 most in-demand skill. Leaders who excel here are promoted 40% faster.", bestCareerUses: ["Project Coordinator", "Operations Manager", "Client Success Manager"], slug: "cross-functional-collaboration" },
  { id: "13", title: "My Emails Disappear Into the Void: The Response-Guaranteed Communication Formula", category: "communication", price: "$47", perceivedValue: "$200+", painPoint: "You send important emails and hear crickets — projects stall because people won't respond.", careerImpact: "Effective communicators are 2.8x more likely to be promoted within 2 years.", bestCareerUses: ["Project Coordinator", "Operations Manager", "Client Success Manager"], slug: "response-guaranteed-communication" },
  { id: "14", title: "I'm Invisible to Leadership: The Strategic Visibility Blueprint", category: "communication", price: "$47", perceivedValue: "$200+", painPoint: "You do great work but leadership doesn't know it — promotions go to self-promoters, not top performers.", careerImpact: "Visible employees earn 30% more than equally skilled but invisible peers.", bestCareerUses: ["Project Coordinator", "Operations Manager", "Client Success Manager"], slug: "strategic-visibility" },
  { id: "15", title: "Technical People Don't Get Me: The Bridge Communication System", category: "communication", price: "$47", perceivedValue: "$200+", painPoint: "You speak business, they speak tech — critical projects fail because of translation problems.", careerImpact: "Hybrid technical-business communicators earn $95K–$165K. This skill bridges the $40K gap.", bestCareerUses: ["Project Coordinator", "Operations Manager", "Client Success Manager"], slug: "bridge-communication" },

  // Category 4: AI-Powered Content & Marketing
  { id: "16", title: "Content Creation Is Killing My Schedule: The AI Content Multiplication System", category: "ai-content", price: "$47", perceivedValue: "$200+", painPoint: "You need to be everywhere (blog, social, email, video) but there aren't enough hours — quality is slipping.", careerImpact: "AI-enhanced content creators earn 35% more than traditional content teams.", bestCareerUses: ["Content Strategist", "Marketing Specialist", "Brand Content Manager"], slug: "ai-content-multiplication" },
  { id: "17", title: "My Marketing Feels Generic: The AI-Powered Personalization Playbook", category: "ai-content", price: "$47", perceivedValue: "$200+", painPoint: "You're sending batch-and-blast campaigns while competitors deliver personalized experiences — your metrics are tanking.", careerImpact: "Marketing automation specialists earn $75K–$120K. Personalization expertise adds $15K–$25K premium.", bestCareerUses: ["Content Strategist", "Marketing Specialist", "Brand Content Manager"], slug: "ai-personalization" },
  { id: "18", title: "I Hate Writing But Need Content: The AI Ghostwriter Management System", category: "ai-content", price: "$47", perceivedValue: "$200+", painPoint: "Writing drains you, but content marketing is non-negotiable — you're avoiding the work that would grow your business.", careerImpact: "Content marketing managers earn $65K–$95K. AI skills can add $20K–$30K to base salary.", bestCareerUses: ["Content Strategist", "Marketing Specialist", "Brand Content Manager"], slug: "ai-ghostwriter" },
  { id: "19", title: "My Social Media Is a Ghost Town: The AI Engagement Accelerator", category: "ai-content", price: "$47", perceivedValue: "$200+", painPoint: "You post consistently but get 3 likes from your mom and two bots — your content disappears into the algorithm void.", careerImpact: "Social media managers with AI skills earn $55K–$85K vs $42K–$62K for traditional social managers.", bestCareerUses: ["Content Strategist", "Marketing Specialist", "Brand Content Manager"], slug: "ai-engagement-accelerator" },
  { id: "20", title: "Video Content Terrifies Me: The AI Video Creation Confidence System", category: "ai-content", price: "$47", perceivedValue: "$200+", painPoint: "Video dominates but you're camera-shy, editing-clueless, and overwhelmed — you're missing the biggest content opportunity.", careerImpact: "Video content creators earn $60K–$100K. This bundle eliminates the $3K–$5K/video production costs.", bestCareerUses: ["Content Strategist", "Marketing Specialist", "Brand Content Manager"], slug: "ai-video-creation" },

  // Category 5: Leadership & People Management
  { id: "21", title: "My Team Is Burned Out and I Don't Know What to Do: The Well-Being Leadership System", category: "leadership", price: "$47", perceivedValue: "$200+", painPoint: "76% of workers report burnout, and you're watching your best people disengage — you feel helpless.", careerImpact: "Leaders who prioritize well-being retain 87% more top performers.", bestCareerUses: ["Team Lead", "People Manager", "Department Supervisor"], slug: "well-being-leadership" },
  { id: "22", title: "I'm a New Manager and Terrified: The First 90 Days Leadership Accelerator", category: "leadership", price: "$47", perceivedValue: "$200+", painPoint: "You were promoted for technical skills but now manage people — you're faking it and your team knows it.", careerImpact: "New managers who succeed in first 90 days are 3.2x more likely to make Director within 3 years.", bestCareerUses: ["Team Lead", "People Manager", "Department Supervisor"], slug: "first-90-days-leadership" },
  { id: "23", title: "My Best People Keep Quitting: The Retention Revolution System", category: "leadership", price: "$47", perceivedValue: "$200+", painPoint: "You're losing top performers to competitors — exit interviews reveal you didn't see it coming.", careerImpact: "Turnover costs 50–200% of salary. Saving one key employee pays for this bundle 100x over.", bestCareerUses: ["Team Lead", "People Manager", "Department Supervisor"], slug: "retention-revolution" },
  { id: "24", title: "Remote Team Management Is Chaos: The Virtual Leadership Mastery Program", category: "leadership", price: "$47", perceivedValue: "$200+", painPoint: "Your remote team feels disconnected, productivity is unclear, and you're micromanaging out of fear — everyone's miserable.", careerImpact: "Remote team leaders earn $10K–$20K more than office-only managers.", bestCareerUses: ["Team Lead", "People Manager", "Department Supervisor"], slug: "virtual-leadership" },
  { id: "25", title: "I Can't Have Difficult Conversations: The Courageous Leadership Communication System", category: "leadership", price: "$47", perceivedValue: "$200+", painPoint: "You avoid tough talks until small problems become HR nightmares — your reputation as a leader is suffering.", careerImpact: "Leaders who handle difficult conversations well are rated 64% more effective and earn 22% more.", bestCareerUses: ["Team Lead", "People Manager", "Department Supervisor"], slug: "courageous-leadership" },

  // Category 6: Project & Process Management
  { id: "26", title: "Every Project Runs Late: The Deadline Domination System", category: "project-mgmt", price: "$47", perceivedValue: "$200+", painPoint: "You estimate 2 weeks, it takes 6 — your credibility is shot and leadership doubts your competence.", careerImpact: "On-time project delivery is the #1 factor in promotion decisions for 73% of executives.", bestCareerUses: ["Project Manager", "Program Coordinator", "Process Improvement Specialist"], slug: "deadline-domination" },
  { id: "27", title: "Stakeholders Keep Changing Requirements: The Scope Protection Playbook", category: "project-mgmt", price: "$47", perceivedValue: "$200+", painPoint: "You're 80% done when someone says \"actually, can we change...\" — you're redoing work weekly.", careerImpact: "Project managers who control scope earn $95K–$145K vs $70K–$95K for those who don't.", bestCareerUses: ["Project Manager", "Program Coordinator", "Process Improvement Specialist"], slug: "scope-protection" },
  { id: "28", title: "I'm Managing Too Many Projects: The Portfolio Prioritization Framework", category: "project-mgmt", price: "$47", perceivedValue: "$200+", painPoint: "You're drowning in projects, dropping balls, and disappointing everyone — you need a system, not more hours.", careerImpact: "Portfolio managers earn $105K–$165K. This skill justifies a $25K–$40K raise.", bestCareerUses: ["Project Manager", "Program Coordinator", "Process Improvement Specialist"], slug: "portfolio-prioritization" },
  { id: "29", title: "Agile Sounds Great But We're Doing It Wrong: The Scrum Recovery Program", category: "project-mgmt", price: "$47", perceivedValue: "$200+", painPoint: "Your \"agile\" team has 12 hours of meetings weekly — it's slower than waterfall and everyone's frustrated.", careerImpact: "True agile practitioners earn $95K–$140K vs $75K–$100K for \"agile in name only\" teams.", bestCareerUses: ["Project Manager", "Program Coordinator", "Process Improvement Specialist"], slug: "scrum-recovery" },
  { id: "30", title: "Process Documentation Is Outdated the Day We Write It: The Living Documentation System", category: "project-mgmt", price: "$47", perceivedValue: "$200+", painPoint: "Your SOPs are ignored because they're always wrong — new hires are lost and errors multiply.", careerImpact: "Operations managers with excellent documentation systems earn 18% more and experience 40% less firefighting.", bestCareerUses: ["Project Manager", "Program Coordinator", "Process Improvement Specialist"], slug: "living-documentation" },

  // Category 7: Sales & Business Development
  { id: "31", title: "Cold Outreach Feels Desperate and Doesn't Work: The Warm Introduction System", category: "sales", price: "$47", perceivedValue: "$200+", painPoint: "You're sending 100 cold emails for 1 response — your pipeline is empty and quota is looming.", careerImpact: "Sales professionals with strong networks close 47% more deals and earn 35% higher commissions.", bestCareerUses: ["Business Development Rep", "Consultant", "Sales Operations Specialist"], slug: "warm-introduction" },
  { id: "32", title: "I Hate Sales But Need Revenue: The Authentic Selling System for Non-Salespeople", category: "sales", price: "$47", perceivedValue: "$200+", painPoint: "You're a founder, consultant, or professional who must sell but feels gross doing it — money anxiety is real.", careerImpact: "Professionals who master sales earn 2–5x more than those who don't, regardless of field.", bestCareerUses: ["Business Development Rep", "Consultant", "Sales Operations Specialist"], slug: "authentic-selling" },
  { id: "33", title: "Proposals Take Forever and Win Nothing: The AI-Powered Proposal Factory", category: "sales", price: "$47", perceivedValue: "$200+", painPoint: "You spend 3 days per proposal only to lose on price — your win rate is embarrassing.", careerImpact: "Sales professionals with strong proposal skills close 34% more deals and command 25% higher margins.", bestCareerUses: ["Business Development Rep", "Consultant", "Sales Operations Specialist"], slug: "ai-proposal-factory" },
  { id: "34", title: "My Pipeline Is a Graveyard: The Deal Revival System", category: "sales", price: "$47", perceivedValue: "$200+", painPoint: "Deals go cold and you don't know why — your CRM is full of ghosts and your quota is suffering.", careerImpact: "Sales professionals who reactivate cold leads generate 28% more revenue from existing pipeline.", bestCareerUses: ["Business Development Rep", "Consultant", "Sales Operations Specialist"], slug: "deal-revival" },
  { id: "35", title: "Enterprise Sales Terrify Me: The Complex Deal Navigation System", category: "sales", price: "$47", perceivedValue: "$200+", painPoint: "Big deals mean big committees, long cycles, and political land mines — you're losing to competitors who navigate better.", careerImpact: "Enterprise sales professionals earn $120K–$250K OTE vs $60K–$100K for transactional sellers.", bestCareerUses: ["Business Development Rep", "Consultant", "Sales Operations Specialist"], slug: "enterprise-sales" },

  // Category 8: Compliance & Risk Management
  { id: "36", title: "AI Compliance Is a Minefield: The Responsible AI Governance Framework", category: "compliance", price: "$47", perceivedValue: "$200+", painPoint: "Your company is deploying AI but nobody's addressed bias, privacy, or regulatory risk — you're one lawsuit away from disaster.", careerImpact: "AI governance specialists earn $110K–$180K and are in extreme demand.", bestCareerUses: ["Risk & Compliance Analyst", "AI Ethics Officer", "Governance Specialist"], slug: "ai-governance" },
  { id: "37", title: "Data Privacy Laws Keep Changing and I'm Behind: The Compliance Survival Kit", category: "compliance", price: "$47", perceivedValue: "$200+", painPoint: "GDPR, CCPA, and new AI regulations are piling up — you're terrified of a violation you don't see coming.", careerImpact: "Privacy compliance officers earn $95K–$155K. One prevented violation saves $4M+ in fines.", bestCareerUses: ["Risk & Compliance Analyst", "AI Ethics Officer", "Governance Specialist"], slug: "compliance-survival" },
  { id: "38", title: "I'm Responsible for Risk but Nobody Listens: The Risk Communication Playbook", category: "compliance", price: "$47", perceivedValue: "$200+", painPoint: "You see risks everywhere but leadership ignores your warnings — until something blows up.", careerImpact: "Risk managers who communicate effectively earn 25% more and have 3x more executive influence.", bestCareerUses: ["Risk & Compliance Analyst", "AI Ethics Officer", "Governance Specialist"], slug: "risk-communication" },
  { id: "39", title: "Vendor Risk Management Is Out of Control: The Third-Party Risk System", category: "compliance", price: "$47", perceivedValue: "$200+", painPoint: "Your vendors have access to sensitive data and you can't keep track — one breach could end careers.", careerImpact: "Third-party risk specialists earn $100K–$160K. This skill prevents multi-million dollar vendor breaches.", bestCareerUses: ["Risk & Compliance Analyst", "AI Ethics Officer", "Governance Specialist"], slug: "vendor-risk" },
  { id: "40", title: "Incident Response Is Chaos Every Time: The Crisis Management System", category: "compliance", price: "$47", perceivedValue: "$200+", painPoint: "When something goes wrong, your team panics — no playbook, no roles, no communication plan.", careerImpact: "Organizations with incident response plans save $2.66M per breach. This skill is career insurance.", bestCareerUses: ["Risk & Compliance Analyst", "AI Ethics Officer", "Governance Specialist"], slug: "crisis-management" },

  // Category 9: AI-Specific Technical Skills
  { id: "41", title: "AI Prompt Engineering Is My Superpower-in-Waiting: The Prompt Mastery Program", category: "ai-technical", price: "$47", perceivedValue: "$200+", painPoint: "You get mediocre AI outputs while others seem to unlock magic — the difference is prompt engineering.", careerImpact: "Prompt engineers earn $130K–$200K+ and the role barely existed 2 years ago.", bestCareerUses: ["AI/ML Developer", "Prompt Engineer", "Data Scientist"], slug: "prompt-mastery" },
  { id: "42", title: "I Don't Understand LLMs and I'm Falling Behind: The AI Fundamentals Crash Course", category: "ai-technical", price: "$47", perceivedValue: "$200+", painPoint: "Everyone's talking about transformers, fine-tuning, and RAG but you nod along pretending to understand.", careerImpact: "AI-literate professionals earn 40% more than peers without foundational understanding.", bestCareerUses: ["AI/ML Developer", "Prompt Engineer", "Data Scientist"], slug: "ai-fundamentals" },
  { id: "43", title: "Building AI Agents Feels Impossible: The No-Code Agent Builder System", category: "ai-technical", price: "$47", perceivedValue: "$200+", painPoint: "You want to build AI agents but don't code — every tutorial assumes programming knowledge you don't have.", careerImpact: "No-code AI builders earn $75K–$120K. The barrier to entry has never been lower.", bestCareerUses: ["AI/ML Developer", "Prompt Engineer", "Data Scientist"], slug: "no-code-agents" },
  { id: "44", title: "My AI Outputs Are Inconsistent Garbage: The AI Quality Control System", category: "ai-technical", price: "$47", perceivedValue: "$200+", painPoint: "AI gives you different answers every time — you can't trust it for real work and it's wasting your time.", careerImpact: "Professionals who master AI output quality are 3x more productive and save 15+ hours per week.", bestCareerUses: ["AI/ML Developer", "Prompt Engineer", "Data Scientist"], slug: "ai-quality-control" },
  { id: "45", title: "RAG, Fine-Tuning, Embeddings — I'm Lost: The Applied AI Toolkit", category: "ai-technical", price: "$47", perceivedValue: "$200+", painPoint: "Advanced AI techniques sound powerful but the learning curve is vertical — you need a practical path.", careerImpact: "Applied AI specialists earn $140K–$220K. These skills separate operators from architects.", bestCareerUses: ["AI/ML Developer", "Prompt Engineer", "Data Scientist"], slug: "applied-ai-toolkit" },

  // Category 10: Career Acceleration & Personal Branding
  { id: "46", title: "I'm Stuck at the Same Level: The Career Breakthrough Acceleration System", category: "career", price: "$47", perceivedValue: "$200+", painPoint: "You've been at the same level for years — less experienced colleagues are leapfrogging you.", careerImpact: "Professionals who actively manage their careers earn 30–50% more over 10 years.", bestCareerUses: ["Career Coach", "Professional Brand Strategist", "Workforce Development Mentor"], slug: "career-breakthrough" },
  { id: "47", title: "My LinkedIn Is a Ghost Town: The Professional Brand System", category: "career", price: "$47", perceivedValue: "$200+", painPoint: "Recruiters never find you, your profile gets 3 views a month, and you feel invisible in your industry.", careerImpact: "Professionals with strong LinkedIn presence receive 5x more recruiter outreach and 3x more opportunities.", bestCareerUses: ["Career Coach", "Professional Brand Strategist", "Workforce Development Mentor"], slug: "professional-brand" },
  { id: "48", title: "Networking Makes Me Cringe: The Authentic Connection System", category: "career", price: "$47", perceivedValue: "$200+", painPoint: "You know networking matters but it feels fake — you avoid events, ignore LinkedIn, and miss opportunities.", careerImpact: "85% of positions are filled through networking. This skill alone can double your opportunity pipeline.", bestCareerUses: ["Career Coach", "Professional Brand Strategist", "Workforce Development Mentor"], slug: "authentic-connection" },
  { id: "49", title: "I Interview Terribly: The High-Stakes Interview Domination System", category: "career", price: "$47", perceivedValue: "$200+", painPoint: "You're qualified but freeze in interviews — you've lost dream jobs because you couldn't articulate your value.", careerImpact: "Interview skills directly correlate with offer rates. Top interviewers receive offers 3x more often and negotiate 22% more.", bestCareerUses: ["Career Coach", "Professional Brand Strategist", "Workforce Development Mentor"], slug: "interview-domination" },
  { id: "50", title: "I'm Overwhelmed and Burning Out: The Sustainable High Performance System", category: "career", price: "$47", perceivedValue: "$200+", painPoint: "You're crushing it professionally but crumbling personally — success shouldn't feel this exhausting.", careerImpact: "Sustainable high performers earn more, last longer, and enjoy the ride. Burnout costs everything.", bestCareerUses: ["Career Coach", "Professional Brand Strategist", "Workforce Development Mentor"], slug: "sustainable-performance" },
];

export function getCategoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label || key;
}

// -- Mock account dashboard data --

export const mockContinueItems: ContinueItem[] = [
  {
    id: "1",
    title: "The 5-Day AI Automation Rescue Plan",
    subtitle: "Module 3 of 6 · Deep-Dive Module",
    category: "AI Automation",
    destination: "/library/access/ai-automation-rescue",
    progress: 50,
  },
  {
    id: "2",
    title: "The Non-Analyst's Survival Guide",
    subtitle: "Module 1 of 6 · Welcome & Getting Started",
    category: "Data Literacy",
    destination: "/library/access/data-literacy-survival",
    progress: 10,
  },
];

export const mockRecommended: RecommendedItem[] = [
  {
    id: "1",
    title: "The Well-Being Leadership System",
    description: "76% of workers report burnout. Lead differently.",
    category: "Leadership",
    price: "$47",
    destination: "/bundles/well-being-leadership",
  },
  {
    id: "2",
    title: "The Negotiation Power System",
    description: "Professionals who negotiate earn $1.2M more over their careers.",
    category: "Career",
    price: "$47",
    destination: "/bundles/negotiation-power",
  },
  {
    id: "3",
    title: "The First 90 Days Leadership Accelerator",
    description: "New managers who nail the first 90 days are 3.2x more likely to make Director within 3 years.",
    category: "Leadership",
    price: "$47",
    destination: "/bundles/first-90-days-leadership",
  },
];

export const mockPurchases: Purchase[] = [
  { id: "1", title: "The 5-Day AI Automation Rescue Plan", date: "Mar 15, 2026", amount: "$47", status: "completed", category: "AI Automation" },
  { id: "2", title: "The Non-Analyst's Survival Guide", date: "Mar 2, 2026", amount: "$47", status: "completed", category: "Data Literacy" },
  { id: "3", title: "The Agentic AI Career Insurance Blueprint", date: "Feb 18, 2026", amount: "$47", status: "completed", category: "AI Automation" },
  { id: "4", title: "The AI Content Multiplication System", date: "Jan 22, 2026", amount: "$47", status: "completed", category: "AI Content" },
];

export const mockAccess: AccessItem[] = [
  { id: "1", title: "The 5-Day AI Automation Rescue Plan", category: "AI Automation", status: "active", accessLink: "/bundles/ai-automation-rescue" },
  { id: "2", title: "The Non-Analyst's Survival Guide", category: "Data Literacy", status: "active", accessLink: "/bundles/data-literacy-survival" },
  { id: "3", title: "The Agentic AI Career Insurance Blueprint", category: "AI Automation", status: "active", accessLink: "/bundles/agentic-ai-career-insurance" },
  { id: "4", title: "The AI Content Multiplication System", category: "AI Content", status: "active", accessLink: "/bundles/ai-content-multiplication" },
];

export const mockBilling: BillingInfo = {
  subscriptions: [],
  recentInvoices: [
    { id: "1", date: "Mar 15, 2026", amount: "$47.00", status: "paid" },
    { id: "2", date: "Mar 2, 2026", amount: "$47.00", status: "paid" },
    { id: "3", date: "Feb 18, 2026", amount: "$47.00", status: "paid" },
    { id: "4", date: "Jan 22, 2026", amount: "$47.00", status: "paid" },
  ],
};
