import { motion } from "motion/react";
import type { ComponentType } from "react";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "@icons-pack/react-simple-icons";
import { STACK_ICONS } from "../data/portfolio";
import {
  fadeInScale,
  staggerContainer,
  VIEWPORT_ONCE,
} from "./motion/MotionPrimitives";

type IconComponent = ComponentType<{ className?: string }>;

const JavaIcon: IconComponent = ({ className }) => (
  <span
    aria-hidden="true"
    className={className}
    style={{
      display: "inline-block",
      WebkitMaskImage: "url('/icons8-java.svg')",
      maskImage: "url('/icons8-java.svg')",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      backgroundColor: "currentColor",
    }}
  />
);

const ICONS: Record<string, IconComponent> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  java: JavaIcon,
  react: SiReact,
  nextdotjs: SiNextdotjs,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  tailwindcss: SiTailwindcss,
  vite: SiVite,
  langchain: SiLangchain,
};

function StackIconGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 w-full px-5 md:px-7"
      id="stack"
      aria-label="Tech stack"
    >
      <p className="mb-4 text-xs font-semibold tracking-[0.18em] uppercase text-label">
        Tech Stack
      </p>
      <motion.ul
        variants={staggerContainer(0.03, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="grid grid-cols-6 gap-x-4 gap-y-5 sm:grid-cols-9"
      >
        {STACK_ICONS.map(({ slug, label }) => {
          const Icon = ICONS[slug];
          if (!Icon) {
            return null;
          }
          return (
            <motion.li
              key={slug}
              variants={fadeInScale}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex items-center justify-center"
              title={label}
              aria-label={label}
            >
              <Icon className="h-7 w-7 text-muted-foreground transition-colors hover:text-foreground" />
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
}

export default StackIconGrid;
