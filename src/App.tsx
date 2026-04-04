import { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const CORTEX_MAIL_URL =
  import.meta.env.VITE_CORTEX_MAIL_URL ??
  "https://cortex-mail-azure.vercel.app";

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

function HomePage() {
  return (
    <main className="mx-auto max-w-[1080px] animate-[rise-in_0.8s_ease] px-3 py-10 md:px-5 md:pb-12">
      <header className="rounded-[1.4rem] border border-[rgba(132,102,59,0.28)] bg-[radial-gradient(circle_at_top_right,_#ffd99f_0%,_#f6f2e7_37%,_#efe9de_100%)] p-5 shadow-[0_20px_45px_-35px_rgba(32,18,0,0.85)] md:p-9">
        <nav className="mb-8 flex gap-4">
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="#experience"
          >
            Experience
          </a>
          <a
            className="border-b border-transparent text-[#141008] transition hover:border-current"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="mb-2 text-xs tracking-[0.18em] uppercase text-[#68563b]">
              Daryl Micah
            </p>
            <h1 className="max-w-[15ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-[#141008]">
              Full-Stack Engineer building reliable products with speed.
            </h1>
          </div>
          <p
            className="ml-auto text-[clamp(2.1rem,11vw,5.2rem)] leading-none font-bold tracking-[-0.04em] text-[#141008]"
            aria-hidden="true"
          >
            DM
          </p>
        </div>

        <p className="mt-2 max-w-[62ch] text-[#262117]">
          2.5+ years building production-grade web and mobile systems across
          React, React Native, Node.js, and TypeScript.
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

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[rgba(127,96,44,0.16)] bg-[rgba(255,255,255,0.62)] p-4">
            <p className="m-0 text-[clamp(1.6rem,4vw,2.1rem)] font-bold text-[#a04800]">
              32%
            </p>
            <p>AI response accuracy improvement</p>
          </article>
          <article className="rounded-2xl border border-[rgba(127,96,44,0.16)] bg-[rgba(255,255,255,0.62)] p-4">
            <p className="m-0 text-[clamp(1.6rem,4vw,2.1rem)] font-bold text-[#a04800]">
              70%
            </p>
            <p>API latency reduction</p>
          </article>
          <article className="rounded-2xl border border-[rgba(127,96,44,0.16)] bg-[rgba(255,255,255,0.62)] p-4">
            <p className="m-0 text-[clamp(1.6rem,4vw,2.1rem)] font-bold text-[#a04800]">
              40%+
            </p>
            <p>manual effort reduced via LLM automation</p>
          </article>
        </div>
      </header>

      <section
        className="mt-10 rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="projects"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.15] font-semibold text-[#141008]">
          Selected Projects
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[linear-gradient(145deg,#fff8d8_0%,#fff1ca_100%)] p-4">
            <p className="text-sm text-[#68563b]">Featured</p>
            <h3 className="text-[1.08rem] leading-[1.15] font-semibold text-[#141008]">
              Cortex Mail
            </h3>
            <p>Live product. Open the deployed app.</p>
            <Link
              to="/cortex-mail"
              className="border-b border-transparent text-[#141008] transition hover:border-current"
            >
              Open live app
            </Link>
          </article>

          <article className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[#fffefa] p-4">
            <p className="text-sm text-[#68563b]">Mobile</p>
            <h3 className="text-[1.08rem] leading-[1.15] font-semibold text-[#141008]">
              APEDA Peanut
            </h3>
            <p>
              Offline-first React Native app with SQLite sync, geofencing, QR
              workflows, and image capture.
            </p>
          </article>
        </div>
      </section>

      <section
        className="mt-10 rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="experience"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.15] font-semibold text-[#141008]">
          Experience
        </h2>
        <div className="mt-5 grid gap-4">
          <article className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[#fffefa] p-4">
            <h3 className="text-[1.08rem] leading-[1.15] font-semibold text-[#141008]">
              Software Developer - Logicsoft International
            </h3>
            <p className="text-sm text-[#68563b]">
              Jan 2025 - Present - Gurugram, Haryana
            </p>
            <p>
              Built RAG-powered systems, optimized PostgreSQL-heavy APIs, and
              improved release reliability with stronger automated testing.
            </p>
          </article>
          <article className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[#fffefa] p-4">
            <h3 className="text-[1.08rem] leading-[1.15] font-semibold text-[#141008]">
              Technology Intern - EigenGram
            </h3>
            <p className="text-sm text-[#68563b]">
              Oct 2024 - Dec 2024 - Remote
            </p>
            <p>
              Built FastAPI services for AI inference pipelines and improved
              deployment consistency with CI/CD and testing automation.
            </p>
          </article>
          <article className="rounded-xl border border-[rgba(132,102,59,0.28)] bg-[#fffefa] p-4">
            <h3 className="text-[1.08rem] leading-[1.15] font-semibold text-[#141008]">
              Software Engineer Intern - Volkswagen IT Services
            </h3>
            <p className="text-sm text-[#68563b]">
              Jul 2023 - Jan 2024 - Pune, Maharashtra
            </p>
            <p>
              Improved backend latency and shipped enterprise platform features
              through agile release cycles.
            </p>
          </article>
        </div>
      </section>

      <section
        className="mt-10 rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="skills"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.15] font-semibold text-[#141008]">
          Technical Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {[
            "React.js",
            "React Native",
            "Next.js",
            "Node.js",
            "TypeScript",
            "FastAPI",
            "PostgreSQL",
            "MongoDB",
            "Docker",
            "AWS",
            "Jest",
            "Playwright",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[rgba(95,65,21,0.24)] bg-white px-3.5 py-1.5 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <footer
        className="mt-10 mb-5 rounded-2xl border border-[rgba(132,102,59,0.28)] bg-[rgba(255,255,255,0.77)] p-5 backdrop-blur-sm md:p-7"
        id="contact"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.15] font-semibold text-[#141008]">
          Let&apos;s Build
        </h2>
        <p>
          Open to full-stack engineering roles building high-impact AI-enabled
          products.
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
