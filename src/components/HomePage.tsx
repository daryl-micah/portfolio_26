import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import ProjectCard from "./ProjectCard";
import StackSection from "./StackSection";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import AnimatedCounter from "./AnimatedCounter";
import {
  fadeUp,
  fadeUpSmall,
  springBouncy,
  staggerContainer,
  VIEWPORT_ONCE,
} from "./motion/MotionPrimitives";
import { EXPERIENCE, getProjects } from "../data/portfolio";
import useScrollReveal from "./useScrollReveal";
import useActiveSection from "../hooks/useActiveSection";

type HomePageProps = {
  cortexRoute: string;
  peanutUrl: string;
  resumeUrl: string;
};

const HEADLINE_WORDS = ["Full-Stack", "Engineer.", "AI", "systems", "builder."];
const SECTION_IDS = ["top", "projects", "experience", "stack", "contact"];

const HERO_STATS = [
  { value: 32, label: "RAG query accuracy improvement" },
  { value: 70, label: "API latency reduction" },
  { value: 40, label: "manual QA effort cut via LLM automation" },
  { value: 71, label: "app load time improvement" },
] as const;

function HomePage({ cortexRoute, peanutUrl, resumeUrl }: HomePageProps) {
  const projects = getProjects(cortexRoute, peanutUrl);
  const pageRef = useScrollReveal<HTMLElement>();
  const heroRef = useRef<HTMLElement | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusReturnRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection(SECTION_IDS);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(heroProgress, [0, 1], [0, 180]);
  const orbScale = useTransform(heroProgress, [0, 1], [1, 1.25]);
  const orbYSpring = useSpring(orbY, { stiffness: 80, damping: 30 });
  const orbScaleSpring = useSpring(orbScale, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      document.body.style.overflow = "";
      const returnFocusTarget = focusReturnRef.current;
      focusReturnRef.current = null;
      returnFocusTarget?.focus();
      return;
    }

    focusReturnRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const sidebar = sidebarRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirstElement = () => {
      const focusableElements = Array.from(
        sidebar?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return;
      }

      sidebar?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
        mobileButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !sidebar) {
        return;
      }

      const focusableElements = Array.from(
        sidebar.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        sidebar.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    focusFirstElement();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileNavOpen]);

  const navItems = useMemo(
    () =>
      [
        ["Projects", "projects"],
        ["Experience", "experience"],
        ["Stack", "stack"],
        ["Contact", "contact"],
      ] as const,
    [],
  );

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <main
      ref={pageRef}
      className="mx-auto w-full max-w-279 px-3 py-10 md:px-5 md:pb-12"
    >
      <ScrollProgress />
      <div
        className={`sticky top-0 z-50 mb-6 w-full rounded-[1.4rem] border border-transparent bg-transparent shadow-[0_20px_45px_-35px_rgba(32,18,0,0)] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out ${
          navScrolled
            ? "border-border bg-nav-blur-bg backdrop-blur-md shadow-[0_20px_45px_-35px_rgba(32,18,0,0.85)]"
            : "shadow-[0_20px_45px_-35px_rgba(32,18,0,0)]"
        }`}
      >
        <nav className="flex w-full items-center justify-between gap-3 px-4 py-4 md:px-6">
          <div className="flex items-center gap-6">
            <a
              className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
              href="#top"
            >
              Daryl Micah
            </a>
            <LayoutGroup id="nav-underline">
              <ul className="hidden items-center gap-5 md:flex">
                {navItems.map(([label, target]) => {
                  const isActive = activeSection === target;
                  return (
                    <li key={label} className="relative">
                      <a
                        href={`#${target}`}
                        className="relative inline-block pb-1 text-foreground transition-colors hover:text-accent"
                      >
                        {label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline-bar"
                            className="absolute left-0 right-0 -bottom-px h-[2px] bg-foreground"
                            transition={springBouncy}
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </div>

          <div className="flex items-center gap-2">
            <a
              className="hidden rounded-md border border-border bg-surface-overlay px-3 py-1 text-sm text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_4px_10px_-2px_rgba(20,16,8,0.18)] motion-reduce:transition-none md:inline-flex"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
            <ThemeToggle />
            <button
              ref={mobileButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface-overlay px-3 py-2 text-sm text-foreground md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              Menu
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={closeMobileNav}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        ref={sidebarRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileNavOpen}
        tabIndex={-1}
        initial={false}
        animate={{ x: mobileNavOpen ? 0 : "-100%" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 32 }
        }
        className="fixed inset-y-0 left-0 z-50 w-[min(84vw,20rem)] border-r border-border bg-card px-5 py-6 shadow-[0_18px_45px_rgba(32,18,0,0.18)] outline-none md:hidden"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-label">
              Navigation
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              Daryl Micah
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-border bg-surface-overlay px-3 py-2 text-sm text-foreground"
            onClick={closeMobileNav}
          >
            Close
          </button>
        </div>

        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          animate={mobileNavOpen ? "show" : "hidden"}
        >
          {navItems.map(([label, target]) => (
            <motion.a
              key={label}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              href={`#${target}`}
              onClick={closeMobileNav}
              className="rounded-xl border border-transparent px-3 py-2 text-lg font-medium text-foreground hover:bg-surface-overlay"
            >
              {label}
            </motion.a>
          ))}
          <motion.a
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMobileNav}
            className="mt-2 rounded-xl border border-border bg-surface-overlay px-3 py-2 text-base font-medium text-foreground"
          >
            Resume
          </motion.a>
        </motion.div>
      </motion.aside>

      <header
        ref={heroRef}
        id="top"
        className="hero-surface relative w-full overflow-hidden rounded-[1.4rem] border border-border p-5 shadow-[0_20px_45px_-35px_rgba(32,18,0,0.85)] md:p-9"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/25 blur-3xl"
          style={
            reduceMotion ? undefined : { y: orbYSpring, scale: orbScaleSpring }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-soft blur-3xl"
        />

        <div className="relative flex items-center gap-4">
          <motion.div
            className="flex-1"
            variants={staggerContainer(0.07, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUpSmall}
              className="mb-2 text-base tracking-[0.18em] uppercase text-label"
            >
              Daryl Micah
            </motion.p>
            <h1 className="max-w-[17ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-foreground">
              {HEADLINE_WORDS.map((word, idx) => (
                <motion.span
                  key={`${word}-${idx}`}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          <div className="flex w-[34%] min-w-27.5 justify-center">
            <motion.div
              className="flex items-center justify-center rounded-3xl bg-surface-overlay/40 p-4"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -8, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img
                src="/default-removebg.png"
                alt="Daryl Micah"
                className="portrait-tint h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24 md:h-64 md:w-64 lg:h-80 lg:w-80"
              />
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-3 max-w-[65ch] text-muted-foreground"
        >
          2.5+ years shipping production web, mobile, and backend systems across
          React, Node.js, FastAPI, and Python - with a recent focus on RAG
          pipelines, LLM validation, and agentic AI products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-6 flex flex-wrap gap-x-5 gap-y-3"
        >
          <a
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
            href="mailto:darylmicah12@gmail.com"
          >
            darylmicah12@gmail.com
          </a>
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="relative mt-6 grid grid-cols-1 gap-4 md:grid-cols-4"
        >
          {HERO_STATS.map(({ value, label }) => (
            <motion.article
              key={label}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface-overlay p-4"
            >
              <p className="m-0 text-[clamp(1.6rem,4vw,2.1rem)] font-bold text-accent">
                <AnimatedCounter target={value} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.article>
          ))}
        </motion.div>
      </header>

      <section
        data-reveal
        className="mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="projects"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
          Projects
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-reveal
              className={`reveal-item ${index === 0 ? "delay-100" : index === 1 ? "delay-200" : "delay-300"}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      <section
        data-reveal
        className="mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="experience"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
          Experience
        </h2>
        <div className="mt-5 grid gap-4">
          {EXPERIENCE.map((exp, index) => (
            <article
              key={exp.company}
              data-reveal
              className={`reveal-item rounded-xl border border-border bg-card p-5 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-reduce:transition-none ${
                index === 0 ? "delay-100" : "delay-200"
              }`}
            >
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[1.05rem] font-semibold text-foreground">
                  {exp.role} - {exp.company}
                </h3>
                <p className="text-sm text-label">{exp.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5 pl-4">
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="list-disc text-sm leading-relaxed text-muted-foreground"
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
        data-reveal
        className="mt-10 mb-5 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="contact"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
          Let&apos;s Build
        </h2>
        <p className="mt-1 text-muted-foreground">
          Open to fullstack and backend+AI roles at product-focused companies.
        </p>
        <div className="my-6 flex flex-wrap gap-x-5 gap-y-3">
          <a
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
            href="mailto:darylmicah12@gmail.com"
          >
            darylmicah12@gmail.com
          </a>
          <a
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
            href="tel:+918588099970"
          >
            +91 8588099970
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
