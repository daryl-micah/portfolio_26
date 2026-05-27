import { useEffect, useMemo, useRef, useState } from "react";
import type { SVGProps } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Mail, MapPin, User } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);
import ProjectCard from "./ProjectCard";
import StackSection from "./StackSection";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import AnimatedCounter from "./AnimatedCounter";
import ContributionsGraph from "./ContributionsGraph";
import MagneticLink from "./MagneticLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  fadeUpSmall,
  springBouncy,
  staggerContainer,
  VIEWPORT_ONCE,
} from "./motion/MotionPrimitives";
import { EXPERIENCE, getProjects } from "../data/portfolio";
import useActiveSection from "../hooks/useActiveSection";

type HomePageProps = {
  cortexRoute: string;
  peanutUrl: string;
  resumeUrl: string;
};

const SECTION_IDS = ["top", "projects", "experience", "stack", "contact"];

const HERO_STATS = [
  { value: 32, label: "RAG accuracy" },
  { value: 70, label: "latency cut" },
  { value: 40, label: "QA effort cut" },
  { value: 71, label: "load time" },
] as const;

function HomePage({ cortexRoute, peanutUrl, resumeUrl }: HomePageProps) {
  const projects = getProjects(cortexRoute, peanutUrl);
  const heroRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
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

  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"],
  });
  const timelineHeight = useTransform(experienceProgress, [0, 1], ["0%", "100%"]);

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
    <main className="mx-auto w-full max-w-4xl px-3 py-10 md:px-5 md:pb-12">
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
        className="relative w-full overflow-hidden py-6 md:py-10"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
          style={
            reduceMotion ? undefined : { y: orbYSpring, scale: orbScaleSpring }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-soft blur-3xl"
        />

        <motion.div
          className="relative flex items-center gap-4"
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUpSmall}
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-overlay sm:h-16 sm:w-16"
          >
            <img
              src="/default-removebg.png"
              alt="Daryl Micah"
              className="portrait-tint h-full w-full object-cover"
            />
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.h1
              variants={fadeUpSmall}
              className="text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-foreground"
            >
              Daryl Micah
            </motion.h1>
            <motion.p
              variants={fadeUpSmall}
              className="mt-1 text-base text-muted-foreground"
            >
              Full-Stack Engineer &middot; AI systems builder
            </motion.p>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8"
        >
          <div>
            <dt className="text-xs font-semibold tracking-[0.18em] uppercase text-label">
              Location
            </dt>
            <dd className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-foreground">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              Bengaluru, India
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.18em] uppercase text-label">
              Email
            </dt>
            <dd className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-foreground">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <a
                href="mailto:darylmicah12@gmail.com"
                className="border-b border-transparent hover:border-current transition-colors"
              >
                darylmicah12@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.18em] uppercase text-label">
              Pronouns
            </dt>
            <dd className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-foreground">
              <User className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              he/him
            </dd>
          </div>
        </motion.dl>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 max-w-[65ch] text-muted-foreground leading-relaxed"
        >
          2.5+ years shipping production web, mobile, and backend systems across
          React, Node.js, FastAPI, and Python &mdash; with a recent focus on RAG
          pipelines, LLM validation, and agentic AI products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 flex items-center gap-4"
        >
          <a
            href="https://github.com/daryl-micah"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiGithub className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/daryl-micah"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="mailto:darylmicah12@gmail.com"
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm text-muted-foreground"
        >
          {HERO_STATS.map(({ value, label }, idx) => (
            <span key={label} className="inline-flex items-baseline gap-1.5">
              {idx > 0 && (
                <span aria-hidden="true" className="text-label">
                  &middot;
                </span>
              )}
              <span className="font-semibold text-accent">
                <AnimatedCounter target={value} suffix="%" />
              </span>
              <span>{label}</span>
            </span>
          ))}
        </motion.p>
      </header>

      <ContributionsGraph username="daryl-micah" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="projects"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
          Projects
        </h2>
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        ref={experienceRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="experience"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
          Experience
        </h2>
        <div className="relative mt-5">
          <div
            aria-hidden="true"
            className="absolute left-2 top-2 bottom-2 w-px bg-border md:left-3"
          />
          <motion.div
            aria-hidden="true"
            style={
              reduceMotion ? undefined : { height: timelineHeight }
            }
            className="absolute left-2 top-2 w-px bg-accent md:left-3"
          />
          <Accordion
            type="single"
            collapsible
            defaultValue="exp-0"
            className="grid gap-2 pl-7 md:pl-9"
          >
            {EXPERIENCE.map((exp, index) => (
              <AccordionItem
                key={exp.company}
                value={`exp-${index}`}
                className="rounded-xl border border-border bg-card px-4 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.65rem] top-7 h-2.5 w-2.5 rounded-full border border-accent bg-card md:-left-[1.9rem]"
                />
                <AccordionTrigger className="text-left">
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[1.05rem] font-semibold text-foreground">
                      {exp.role} &mdash; {exp.company}
                    </h3>
                    <p className="text-sm text-label">{exp.period}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <motion.ul
                    variants={staggerContainer(0.06, 0.05)}
                    initial="hidden"
                    animate="show"
                    className="space-y-1.5 pl-4"
                  >
                    {exp.bullets.map((bullet) => (
                      <motion.li
                        key={bullet}
                        variants={fadeUpSmall}
                        className="list-disc text-sm leading-relaxed text-muted-foreground"
                      >
                        {bullet}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      <StackSection />

      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 mb-5 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
        id="contact"
      >
        <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug">
          <span className="gradient-text">Let&apos;s Build</span>
        </h2>
        <p className="mt-1 text-muted-foreground">
          Open to fullstack and backend+AI roles at product-focused companies.
        </p>
        <div className="my-6 flex flex-wrap gap-x-5 gap-y-3">
          <MagneticLink
            href="mailto:darylmicah12@gmail.com"
            className="inline-flex items-center gap-1 border-b border-transparent text-foreground hover:border-current transition-colors"
          >
            darylmicah12@gmail.com
          </MagneticLink>
          <MagneticLink
            href="tel:+918588099970"
            className="inline-flex items-center gap-1 border-b border-transparent text-foreground hover:border-current transition-colors"
          >
            +91 8588099970
          </MagneticLink>
          <MagneticLink
            href="https://linkedin.com/in/daryl-micah"
            external
            className="group inline-flex items-center gap-1 border-b border-transparent text-foreground hover:border-current transition-colors"
          >
            LinkedIn
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </MagneticLink>
          <MagneticLink
            href="https://github.com/daryl-micah"
            external
            className="group inline-flex items-center gap-1 border-b border-transparent text-foreground hover:border-current transition-colors"
          >
            GitHub
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </MagneticLink>
        </div>
      </motion.footer>
    </main>
  );
}

export default HomePage;
