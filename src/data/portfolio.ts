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

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Broadwing Labs",
    period: "Apr 2026 - Present - Bengaluru",
    bullets: [
      "Built an AI listing-generation system orchestrating **6+** pydantic-ai LLM agents with live web-search and self-validation tools, cutting listing creation from **~2 hours** to under **5 minutes**.",
      "Built a serverless data-ingestion platform for **Stovekraft (Pigeon)**, integrating Amazon SP-API to normalize **8+** data entities into Postgres with idempotent, replayable backfills.",
      "Delivered a FastAPI + Next.js ecommerce dashboard for **Stovekraft (Pigeon)** with JWT httpOnly-cookie auth and streaming CSV/XLSX-to-S3 uploads, spanning **~400** commits across **4** services.",
      "Engineered a generative-image pipeline (GPT-image, rembg cutouts, scene compositing) on async Celery + FastAPI, cutting image-gen cost **~4x** via provider fallbacks and ASIN-level caching.",
    ],
  },
  {
    role: "Software Developer",
    company: "Logicsoft International",
    period: "Jan 2025 - Apr 2026 - Gurugram",
    bullets: [
      "Built RAG pipelines and an LLM validation engine, reducing manual QA effort by **40%**.",
      "Optimised PostgreSQL-heavy APIs and cut p95 latency by **70%** via query tuning and Redis caching.",
      "Shipped React/Next.js frontend features and raised test coverage with Jest and Playwright.",
    ],
  },
  {
    role: "Technology Intern",
    company: "EigenGram",
    period: "Oct - Dec 2024 - Remote",
    bullets: [
      "Built FastAPI services for AI inference pipelines and improved throughput by **25%** through batching.",
      "Automated deployments with CI/CD pipelines and containerised services with Docker.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Volkswagen IT Services",
    period: "Jul 2023 - Jan 2024 - Pune",
    bullets: [
      "Reduced data retrieval time by **50%** via backend optimisations on enterprise platform APIs.",
      "Delivered new features across agile release cycles in a cross-functional team.",
    ],
  },
];

export type StackIcon = {
  slug: string;
  label: string;
};

export const STACK_ICONS: StackIcon[] = [
  { slug: "typescript", label: "TypeScript" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "python", label: "Python" },
  { slug: "java", label: "Java" },
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "express", label: "Express" },
  { slug: "fastapi", label: "FastAPI" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "redis", label: "Redis" },
  { slug: "docker", label: "Docker" },
  { slug: "git", label: "Git" },
  { slug: "github", label: "GitHub" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  { slug: "vite", label: "Vite" },
  { slug: "langchain", label: "LangChain" },
];

export function getProjects(cortexRoute: string, peanutUrl: string): Project[] {
  return [
    {
      tag: "Featured - AI",
      title: "Cortex Mail",
      description:
        "Agentic email client that searches inboxes, summarizes threads, and drafts replies using semantic retrieval and LLMs.",
      stack: ["Next.js", "Groq", "Pinecone", "RAG", "ReAct", "TypeScript"],
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
      tag: "Featured - Fullstack",
      title: "CCOS",
      description:
        "Full-stack influencer-marketing CRM replacing spreadsheet-based campaign tracking, with a derived-metrics engine and Groq-powered AI insights.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Celery", "Groq"],
      links: [
        { label: "Live app", href: "https://ccos.darylmicah.me/" },
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/ccos",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "CCOS (Creator Campaign Operating System) is a full-stack influencer-marketing CRM that replaces spreadsheet-based campaign tracking. It computes derived metrics like ROAS, CPV, and CPM, collects Instagram data with daily historical snapshots, and surfaces Groq-powered AI insights.",
        highlights: [
          "Derived-metrics engine computing ROAS, CPV, CPM, and engagement rate",
          "Instagram data collectors with daily historical snapshots",
          "Groq-powered AI insights layered on campaign performance data",
          "FastAPI + Celery async pipelines backed by PostgreSQL and Redis",
        ],
        role: "Solo design + build",
        timeline: "2026",
      },
    },
    {
      tag: "Fullstack - AI",
      title: "Undertone",
      description:
        "Fathom-style meeting notetaker for Hinglish: code-mixed speech-to-text, synced transcripts, AI summaries, and search across Devanagari, romanized and English.",
      stack: ["Next.js", "Sarvam", "Groq", "Supabase", "PostgreSQL", "TypeScript"],
      links: [
        { label: "Live app", href: "https://undertone-8x.vercel.app/" },
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/undertone",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "Undertone is a meeting notetaker built for how Indian teams actually talk: Hindi and English mixed mid-sentence. It keeps what was said as said, lets you read every line as romanized Hinglish or English, and writes summaries and action items that link back to the exact moment.",
        highlights: [
          "Sarvam saaras:v3 code-mix transcription with speaker detection: 5 of 5 speakers mapped on a 10-minute test, 96.9% agreement with the script",
          "Summaries cite transcript lines, converted server-side to timestamps so every claim is checkable by playback",
          "Full-text search across Devanagari, romanized and English in 0.12–0.18s",
          "Handles an 8-person, hour-long call: 424-line transcript renders in ~0.4s, rate-limited summaries condensed once then cached",
        ],
        role: "Solo design + build",
        timeline: "2026",
      },
    },
    {
      tag: "Backend - AI",
      title: "Freshdesk MCP Connector",
      description:
        "MCP server that lets an AI agent read Freshdesk tickets and contacts, with typed schemas, rate-limit handling, opt-in writes, and Razorpay payment verification.",
      stack: ["MCP", "TypeScript", "Zod", "Freshdesk API", "Razorpay"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/freshdesk-mcp-connector",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "A private connector for a merchant tool, built as an MCP (stdio) server. Tools are shaped for an LLM rather than mirroring the Freshdesk API, and the server is read-only by default with opt-in write tools and optional Razorpay payment verification.",
        highlights: [
          "List, get and search tools for tickets and contacts with typed Zod input and output schemas",
          "API-key auth verified at startup so a bad key fails fast with a clear message",
          "Rate-limit handling: honours Retry-After on 429, backs off on 5xx, and slows near the limit",
          "Offline mocked tests plus live smoke tests and a documented agent demo",
        ],
        role: "Solo design + build",
        timeline: "2026",
      },
    },
    {
      tag: "Backend - AI",
      title: "Avert",
      description:
        "Detects breaking changes and deprecations in external APIs and maps them to the exact call sites they affect, with webhook alerts and guarded fix proposals.",
      stack: ["Python", "PostgreSQL", "Next.js", "GitHub App", "Docker"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/avert-agent",
        },
      ],
      accent: "bg-card",
      details: {
        overview:
          "Avert indexes a codebase's external API usage, tracks lifecycle events like model deprecations, and joins the two to show the blast radius of each change down to the call site.",
        highlights: [
          "Incremental static inventory of API call sites persisted in Postgres",
          "Impact join that drives both the dashboard's lifecycle status and the change feed",
          "One-shot webhook alerts per affected repository, idempotent across re-runs",
          "Read-only GitHub App with push-triggered re-indexing; validated on pinned public-repo corpora (7/10 on the first model-deprecation run)",
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
