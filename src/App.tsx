import { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const CORTEX_MAIL_URL =
  import.meta.env.VITE_CORTEX_MAIL_URL ??
  "https://cortex-mail-azure.vercel.app";

const PEANUT_URL =
  import.meta.env.VITE_PEANUT_STORE_URL ??
  "https://play.google.com/store/apps/details?id=in.gov.apeda.peanut&pli=1";

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <p className="mb-2 text-xs tracking-[0.18em] uppercase text-[#68563b]">
        Redirecting...
      </p>
      <p className="text-[#262117]">
        If you are not redirected automatically,{" "}
        <a
          href={to}
          target="_self"
          rel="noreferrer"
          className="border-b border-current text-[#141008]"
        >
          open Cortex Mail
        </a>
        .
      </p>
    </main>
  );
}

const PROJECTS = [
  {
    tag: "Featured · AI",
    title: "Cortex Mail",
    description:
      "Agentic email client built on Next.js, Groq (Llama 3.1), and Pinecone. ReAct agent autonomously searches, summarises, and drafts replies with semantic retrieval across your inbox.",
    stack: ["Next.js", "Groq", "Pinecone", "ReAct", "TypeScript"],
    links: [
      { label: "Live app", href: "/cortex-mail", internal: true },
      {
        label: "GitHub",
        href: "https://github.com/daryl-micah/cortex-mail",
        external: true,
      },
    ],
    accent: "bg-[linear-gradient(145deg,#fff8d8_0%,#fff1ca_100%)]",
  },
  {
    tag: "Mobile · Fullstack",
    title: "APEDA Peanut",
    description:
      "Offline-first React Native traceability app for agricultural supply chains. Features SQLite sync, geofencing, QR scanning, image capture, and a Node.js/PostgreSQL backend.",
    stack: ["React Native", "SQLite", "Node.js", "PostgreSQL", "TypeScript"],
    links: [{ label: "Play Store", href: { PEANUT_URL }, external: true }],
    accent: "bg-[#fffefa]",
  },
  {
    tag: "Backend · AI",
    title: "Agentic AI Platform",
    description:
      "Internal LLM validation and RAG infrastructure built at Logicsoft. Includes a FastAPI orchestration layer, SQLCoder-8B for natural-language-to-SQL, JWT/RBAC auth, Redis caching, and a custom LLM validation engine that cut manual QA effort by 40%.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "RAG", "SQLCoder", "Python"],
    links: [],
    accent: "bg-[#fffefa]",
  },
];

const EXPERIENCE = [
  {
    role: "Software Developer",
    company: "Logicsoft International",
    period: "Jan 2025 – Present · Gurugram",
    bullets: [
      "Built RAG pipelines and an LLM validation engine, reducing manual QA effort by 40%.",
      "Optimised PostgreSQL-heavy APIs — cut p95 latency by 70% via query tuning and Redis caching.",
      "Shipped React/Next.js frontend features and raised test coverage with Jest and Playwright.",
    ],
  },
  {
    role: "Technology Intern",
    company: "EigenGram",
    period: "Oct – Dec 2024 · Remote",
    bullets: [
      "Built FastAPI services for AI inference pipelines; improved throughput by 25% through batching.",
      "Automated deployment with CI/CD pipelines and containerised services with Docker.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Volkswagen IT Services",
    period: "Jul 2023 – Jan 2024 · Pune",
    bullets: [
      "Reduced data retrieval time by 50% via backend optimisations on enterprise platform APIs.",
      "Delivered new features across agile release cycles in a cross-functional team.",
    ],
  },
];

const STACK = [
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

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-[rgba(95,65,21,0.24)] bg-white px-3.5 py-1.5 text-sm">
      {children}
    </span>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article
      className={`flex flex-col rounded-xl border border-[rgba(132,102,59,0.28)] ${project.accent} p-5 transition hover:shadow-md`}
    >
      <p className="mb-1 text-sm text-[#68563b]">{project.tag}</p>
      <h3 className="mb-2 text-[1.08rem] font-semibold leading-snug text-[#141008]">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#3a2e1e]">
        {project.description}
      </p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-full bg-[rgba(160,72,0,0.08)] px-2.5 py-0.5 text-xs font-medium text-[#7a3a00]"
          >
            {t}
          </span>
        ))}
      </div>
      {project.links.length > 0 && (
        <div className="flex gap-4">
          {project.links.map((link) =>
            link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                className="border-b border-transparent text-sm font-medium text-[#141008] transition hover:border-current"
              >
                {link.label} →
              </Link>
            ) : link.href === "PLAY_STORE_URL" ? (
              <span
                key={link.label}
                className="border-b border-dashed border-[#68563b] text-sm text-[#68563b]"
                title="Link coming soon"
              >
                {link.label}
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-transparent text-sm font-medium text-[#141008] transition hover:border-current"
              >
                {link.label} →
              </a>
            ),
          )}
        </div>
      )}
    </article>
  );
}

function HomePage() {
  return (
    <main className="mx-auto w-full max-w-270 animate-[rise-in_0.8s_ease] px-3 py-10 md:px-5 md:pb-12">
      {/* ── HERO ── */}
      <header className="w-full rounded-[1.4rem] border border-[rgba(132,102,59,0.28)] bg-[radial-gradient(circle_at_top_right,#ffd99f_0%,#f6f2e7_37%,#efe9de_100%)] p-5 shadow-[0_20px_45px_-35px_rgba(32,18,0,0.85)] md:p-9">
        <nav className="mb-8 flex gap-4">
          {["Projects", "Experience", "Stack", "Contact"].map((item) => (
            <a
              key={item}
              className="border-b border-transparent text-[#141008] transition hover:border-current"
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="mb-2 text-l tracking-[0.18em] uppercase text-[#68563b]">
              Daryl Micah
            </p>
            <h1 className="max-w-[17ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-[#141008]">
              Full-Stack Engineer. AI systems builder.
            </h1>
          </div>
          <div className="flex w-[34%] min-w-27.5 justify-center">
            <img
              src="/default.png"
              alt="Daryl Micah"
              className="h-20 w-20 shrink-0 object-contain md:h-28 md:w-28"
            />
          </div>
        </div>

        <p className="mt-3 max-w-[65ch] text-[#262117]">
          2.5+ years shipping production web, mobile, and backend systems across
          React, Node.js, FastAPI, and Python — with a recent focus on RAG
          pipelines, LLM validation, and agentic AI products.
        </p>

        <div className="my-6 flex flex-wrap gap-x-5 gap-y-3">
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="mailto:darylmicah12@gmail.com"
          >
            darylmicah12@gmail.com
          </a>
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-[#141008] transition hover:border-current"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-[#141008] transition hover:border-current"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { stat: "32%", label: "RAG query accuracy improvement" },
            { stat: "70%", label: "API latency reduction" },
            { stat: "40%", label: "manual QA effort cut via LLM automation" },
            { stat: "71%", label: "app load time improvement" },
          ].map(({ stat, label }) => (
            <article
              key={stat}
              className="rounded-2xl border border-[rgba(127,96,44,0.16)] bg-[rgba(255,255,255,0.62)] p-4"
            >
              <p className="m-0 text-[clamp(1.6rem,4vw,2.1rem)] font-bold text-[#a04800]">
                {stat}
              </p>
              <p className="text-sm text-[#3a2e1e]">{label}</p>
            </article>
          ))}
        </div>
      </header>

      {/* ── PROJECTS ── */}
      <section
        className="mt-10 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="projects"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Projects
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        className="mt-10 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="experience"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Experience
        </h2>
        <div className="mt-5 grid gap-4">
          {EXPERIENCE.map((exp) => (
            <article
              key={exp.company}
              className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[#fffefa] p-5"
            >
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[1.05rem] font-semibold text-[#141008]">
                  {exp.role} — {exp.company}
                </h3>
                <p className="text-sm text-[#68563b]">{exp.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5 pl-4">
                {exp.bullets.map((b) => (
                  <li
                    key={b}
                    className="list-disc text-sm leading-relaxed text-[#3a2e1e]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section
        className="mt-10 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="stack"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Technical Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {STACK.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <footer
        className="mt-10 mb-5 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="contact"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Let's Build
        </h2>
        <p className="mt-1 text-[#3a2e1e]">
          Open to fullstack and backend+AI roles at product-focused companies.
        </p>
        <div className="my-6 flex flex-wrap gap-x-5 gap-y-3">
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="mailto:darylmicah12@gmail.com"
          >
            darylmicah12@gmail.com
          </a>
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="tel:+918588099970"
          >
            +91 8588099970
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-[#141008] transition hover:border-current"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-[#141008] transition hover:border-current"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/cortex-mail"
        element={<ExternalRedirect to={CORTEX_MAIL_URL} />}
      />
      <Route
        path="/website/cortex-mail"
        element={<ExternalRedirect to={CORTEX_MAIL_URL} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
