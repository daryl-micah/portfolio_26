import { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const CORTEX_MAIL_URL =
  import.meta.env.VITE_CORTEX_MAIL_URL ?? "https://cortex-mail.vercel.app";

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="page project-page">
      <p className="kicker">Redirecting...</p>
      <p>
        If you are not redirected automatically,{" "}
        <a href={to} target="_self" rel="noreferrer">
          open Cortex Mail
        </a>
        .
      </p>
    </main>
  );
}

function HomePage() {
  return (
    <main className="page">
      <header className="hero-block">
        <nav className="top-nav">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="hero-head">
          <div>
            <p className="kicker">Daryl Micah</p>
            <h1>Full-Stack Engineer building reliable products with speed.</h1>
          </div>
          <p className="hero-mark" aria-hidden="true">
            DM
          </p>
        </div>
        <p className="lead">
          2.5+ years building production-grade web and mobile systems across
          React, React Native, Node.js, and TypeScript.
        </p>

        <div className="hero-links">
          <a href="mailto:darylmicah12@gmail.com">darylmicah12@gmail.com</a>
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="metrics">
          <article>
            <p className="metric">32%</p>
            <p>AI response accuracy improvement</p>
          </article>
          <article>
            <p className="metric">70%</p>
            <p>API latency reduction</p>
          </article>
          <article>
            <p className="metric">40%+</p>
            <p>manual effort reduced via LLM automation</p>
          </article>
        </div>
      </header>

      <section className="section" id="projects">
        <h2>Selected Projects</h2>
        <div className="project-list">
          <article className="project-card featured">
            <p className="project-type">Featured</p>
            <h3>Cortex Mail</h3>
            <p>Live product. Open the deployed app.</p>
            <Link to="/cortex-mail">Open live app</Link>
          </article>

          <article className="project-card">
            <p className="project-type">Mobile</p>
            <h3>APEDA Peanut</h3>
            <p>
              Offline-first React Native app with SQLite sync, geofencing, QR
              workflows, and image capture.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="experience">
        <h2>Experience</h2>
        <div className="exp-list">
          <article>
            <h3>Software Developer - Logicsoft International</h3>
            <p className="meta">Jan 2025 - Present - Gurugram, Haryana</p>
            <p>
              Built RAG-powered systems, optimized PostgreSQL-heavy APIs, and
              improved release reliability with stronger automated testing.
            </p>
          </article>
          <article>
            <h3>Technology Intern - EigenGram</h3>
            <p className="meta">Oct 2024 - Dec 2024 - Remote</p>
            <p>
              Built FastAPI services for AI inference pipelines and improved
              deployment consistency with CI/CD and testing automation.
            </p>
          </article>
          <article>
            <h3>Software Engineer Intern - Volkswagen IT Services</h3>
            <p className="meta">Jul 2023 - Jan 2024 - Pune, Maharashtra</p>
            <p>
              Improved backend latency and shipped enterprise platform features
              through agile release cycles.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="skills">
        <h2>Technical Stack</h2>
        <div className="chip-row">
          <span>React.js</span>
          <span>React Native</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>TypeScript</span>
          <span>FastAPI</span>
          <span>PostgreSQL</span>
          <span>MongoDB</span>
          <span>Docker</span>
          <span>AWS</span>
          <span>Jest</span>
          <span>Playwright</span>
        </div>
      </section>

      <footer className="section footer" id="contact">
        <h2>Let&apos;s Build</h2>
        <p>
          Open to full-stack engineering roles building high-impact AI-enabled
          products.
        </p>
        <div className="hero-links">
          <a href="mailto:darylmicah12@gmail.com">darylmicah12@gmail.com</a>
          <a href="tel:+918588099970">+91 8588099970</a>
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
