export type ProjectLink = {
  label: string;
  href: string;
  internal?: boolean;
};

export type ProjectDetails = {
  overview: string;
  highlights: string[];
  role?: string;
  timeline?: string;
};

export type Project = {
  tag: string;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  accent: string;
  details?: ProjectDetails;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Logicsoft International",
    period: "Jan 2025 - Apr 2026 - Gurugram",
    bullets: [
      "Built RAG pipelines and an LLM validation engine, reducing manual QA effort by 40%.",
      "Optimised PostgreSQL-heavy APIs and cut p95 latency by 70% via query tuning and Redis caching.",
      "Shipped React/Next.js frontend features and raised test coverage with Jest and Playwright.",
    ],
  },
  {
    role: "Technology Intern",
    company: "EigenGram",
    period: "Oct - Dec 2024 - Remote",
    bullets: [
      "Built FastAPI services for AI inference pipelines and improved throughput by 25% through batching.",
      "Automated deployments with CI/CD pipelines and containerised services with Docker.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Volkswagen IT Services",
    period: "Jul 2023 - Jan 2024 - Pune",
    bullets: [
      "Reduced data retrieval time by 50% via backend optimisations on enterprise platform APIs.",
      "Delivered new features across agile release cycles in a cross-functional team.",
    ],
  },
];

export const STACK: string[] = [
  "React.js",
  "React Native",
  "Next.js",
  "Node.js",
  "FastAPI",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Redis",
  "MongoDB",
  "RAG / LLM",
  "Pinecone",
  "Docker",
  "AWS",
  "Jest",
  "Playwright",
];

export const STACK_GROUPS: SkillCategory[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java"],
  },
  {
    label: "Backend & APIs",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Async Systems",
      "gRPC*",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Pinecone (Vector DB)"],
  },
  {
    label: "AI / LLM",
    items: [
      "Github Copilot",
      "Google Antigravity",
      "RAG Pipelines",
      "LLM Integration",
      "Prompt Engineering",
      "Vector Search",
      "SQLCoder",
      "Groq",
      "LangChain",
    ],
  },
  {
    label: "Auth & Security",
    items: ["JWT", "RBAC", "Multi-tenant Access Control", "Secure Coding"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "AWS", "CI/CD", "Git", "Kubernetes*"],
  },
];

export const STACK_NOTE = "* familiar";

export function getProjects(cortexRoute: string, peanutUrl: string): Project[] {
  return [
    {
      tag: "Featured - AI",
      title: "Cortex Mail",
      description:
        "Agentic email client that searches inboxes, summarizes threads, and drafts replies using semantic retrieval and LLMs.",
      stack: ["Next.js", "Groq", "Pinecone", "ReAct", "TypeScript"],
      links: [
        { label: "Live app", href: cortexRoute, internal: true },
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/cortex-mail",
        },
      ],
      accent:
        "bg-[linear-gradient(145deg,var(--accent-soft)_0%,var(--card)_100%)]",
      details: {
        overview:
          "Cortex Mail is an agentic email client that understands your inbox semantically. It indexes threads into a vector store, summarizes long conversations, and drafts on-tone replies using a ReAct-style reasoning loop.",
        highlights: [
          "Semantic search over Gmail + IMAP using Pinecone-backed embeddings",
          "ReAct agent that plans multi-step actions across reading, search, and drafting",
          "Streamed Groq inference for sub-second summary generation",
          "Type-safe Next.js App Router with server actions for mutations",
        ],
        role: "Solo design + build",
        timeline: "2026",
      },
    },
    {
      tag: "Mobile - Fullstack",
      title: "APEDA Peanut",
      description:
        "Offline-first traceability app with QR scanning, geofencing, image capture, and mobile-to-backend sync.",
      stack: ["React Native", "SQLite", "Node.js", "PostgreSQL", "TypeScript"],
      links: [{ label: "Play Store", href: peanutUrl }],
      accent: "bg-card",
      details: {
        overview:
          "A field-grade traceability app for India's peanut export supply chain. Works fully offline in low-connectivity rural areas: officers capture QR scans, geo-fenced location samples, and photos on-device, then sync to the backend the moment a signal returns.",
        highlights: [
          "Offline-first architecture with SQLite as the source of truth and a deferred sync queue",
          "Geofencing + on-device GPS sampling to validate that captures happened at the registered plot",
          "QR scanning and image capture pipeline with local thumbnails and lazy upload",
          "Conflict-aware sync workflow that reconciles mobile and PostgreSQL state without losing field edits",
        ],
        role: "Frontend lead",
        timeline: "2024 – 2025",
      },
    },
    {
      tag: "Backend - AI",
      title: "Agentic AI Platform",
      description:
        "LLM validation and RAG platform with FastAPI orchestration, SQLCoder-based query generation, and Redis caching.",
      stack: ["FastAPI", "PostgreSQL", "Redis", "RAG", "SQLCoder", "Python"],
      links: [
        {
          label: "Live App",
          href: "https://apps4food.com/solutions/intellichat",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "An LLM validation and RAG orchestration platform that grounds chatbot answers in a customer's PostgreSQL data. SQLCoder generates safe read-only queries, RAG provides the context, and a validation layer scores LLM outputs against a known-good fixture set.",
        highlights: [
          "Cut manual QA effort by 40% via an automated LLM validation engine",
          "Reduced API p95 latency by 70% with Redis caching and query tuning",
          "SQLCoder-backed natural language to SQL with read-only guardrails",
          "FastAPI orchestration with async batching for high-throughput RAG queries",
        ],
        role: "Backend lead",
        timeline: "2025",
      },
    },
    {
      tag: "Web - AI",
      title: "AI RFP Assistant",
      description:
        "AI-powered RFP workflow that structures requests, manages vendors, and automates email-based proposal handling.",
      stack: [
        "Next.js",
        "Groq",
        "TypeScript",
        "Nodemailer",
        "IMAP Flow",
        "Drizzle",
        "PostgreSQL(Neon)",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/ai_rfp_system",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "An end-to-end RFP workflow that turns vague procurement asks into structured, vendor-ready requests. Groq-backed LLMs draft requirements, an IMAP listener ingests vendor replies, and the system tracks every proposal back to its originating thread.",
        highlights: [
          "Groq-powered requirement extraction that converts free-text briefs into typed RFP schemas",
          "Two-way email automation via Nodemailer + IMAP Flow with per-vendor thread tracking",
          "Vendor and proposal management on Drizzle ORM over Neon Postgres for serverless reads",
          "Next.js App Router with TypeScript end-to-end, from email parsing down to the UI",
        ],
        role: "Solo design + build",
        timeline: "2025",
      },
    },
  ];
}
