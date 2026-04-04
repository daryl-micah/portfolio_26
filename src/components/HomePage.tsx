import ProjectCard from "./ProjectCard";
import StackSection from "./StackSection";
import { EXPERIENCE, getProjects } from "../data/portfolio";

type HomePageProps = {
  cortexRoute: string;
  peanutUrl: string;
  resumeUrl: string;
};

function HomePage({ cortexRoute, peanutUrl, resumeUrl }: HomePageProps) {
  const projects = getProjects(cortexRoute, peanutUrl);

  return (
    <main className="mx-auto w-full max-w-279 animate-[rise-in_0.8s_ease] px-3 py-10 md:px-5 md:pb-12">
      <header className="w-full rounded-[1.4rem] border border-[rgba(132,102,59,0.28)] bg-[radial-gradient(circle_at_top_right,#ffd99f_0%,#f6f2e7_37%,#efe9de_100%)] p-5 shadow-[0_20px_45px_-35px_rgba(32,18,0,0.85)] md:p-9">
        <nav className="mb-8 w-full flex gap-4">
          {[
            ["Projects", "projects"],
            ["Experience", "experience"],
            ["Stack", "stack"],
            ["Contact", "contact"],
          ].map(([label, target]) => (
            <a
              key={label}
              className="border-b border-transparent text-[#141008] transition hover:border-current"
              href={`#${target}`}
            >
              {label}
            </a>
          ))}
          <a
            className="ml-auto rounded-md border border-[rgba(20,16,8,0.2)] bg-white/40 px-3 py-1 text-sm text-[#141008] shadow-[0_2px_6px_-1px_rgba(20,16,8,0.12)] transition hover:-translate-y-px hover:shadow-[0_4px_10px_-2px_rgba(20,16,8,0.18)]"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="mb-2 text-base tracking-[0.18em] uppercase text-[#68563b]">
              Daryl Micah
            </p>
            <h1 className="max-w-[17ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-[#141008]">
              Full-Stack Engineer. AI systems builder.
            </h1>
          </div>
          <div className="flex w-[34%] min-w-27.5 justify-center">
            <div className="flex items-center justify-center rounded-3xl bg-[rgba(255,255,255,0.25)] p-4">
              <img
                src="/default-removebg.png"
                alt="Daryl Micah"
                className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24 md:h-64 md:w-64 lg:h-80 lg:w-80"
                style={{ filter: "brightness(0.75) saturate(1.6)" }}
              />
            </div>
          </div>
        </div>

        <p className="mt-3 max-w-[65ch] text-[#262117]">
          2.5+ years shipping production web, mobile, and backend systems across
          React, Node.js, FastAPI, and Python - with a recent focus on RAG
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

      <section
        className="mt-10 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="projects"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Projects
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

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
                  {exp.role} - {exp.company}
                </h3>
                <p className="text-sm text-[#68563b]">{exp.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5 pl-4">
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="list-disc text-sm leading-relaxed text-[#3a2e1e]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <StackSection />

      <footer
        className="mt-10 mb-5 w-full rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="contact"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-[#141008]">
          Let&apos;s Build
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

export default HomePage;
