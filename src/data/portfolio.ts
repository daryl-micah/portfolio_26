export type ProjectLink = {
  label: string;
  href: string;
  internal?: boolean;
};

export type Project = {
  tag: string;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  accent: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Logicsoft International",
    period: "Jan 2025 - Present - Gurugram",
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

export function getProjects(cortexRoute: string, peanutUrl: string): Project[] {
  return [
    {
      tag: "Featured - AI",
      title: "Cortex Mail",
      description:
        "Agentic email client built on Next.js, Groq (Llama 3.1), and Pinecone. ReAct agent autonomously searches, summarises, and drafts replies with semantic retrieval across your inbox.",
      stack: ["Next.js", "Groq", "Pinecone", "ReAct", "TypeScript"],
      links: [
        { label: "Live app", href: cortexRoute, internal: true },
        {
          label: "GitHub",
          href: "https://github.com/daryl-micah/cortex-mail",
        },
      ],
      accent: "bg-[linear-gradient(145deg,#fff8d8_0%,#fff1ca_100%)]",
    },
    {
      tag: "Mobile - Fullstack",
      title: "APEDA Peanut",
      description:
        "Offline-first React Native traceability app for agricultural supply chains. Features SQLite sync, geofencing, QR scanning, image capture, and a Node.js/PostgreSQL backend.",
      stack: ["React Native", "SQLite", "Node.js", "PostgreSQL", "TypeScript"],
      links: [{ label: "Play Store", href: peanutUrl }],
      accent: "bg-[#fffefa]",
    },
    {
      tag: "Backend - AI",
      title: "Agentic AI Platform",
      description:
        "Internal LLM validation and RAG infrastructure built at Logicsoft. Includes a FastAPI orchestration layer, SQLCoder-8B for natural-language-to-SQL, JWT/RBAC auth, Redis caching, and a custom LLM validation engine that cut manual QA effort by 40%.",
      stack: ["FastAPI", "PostgreSQL", "Redis", "RAG", "SQLCoder", "Python"],
      links: [],
      accent: "bg-[#fffefa]",
    },
  ];
}
