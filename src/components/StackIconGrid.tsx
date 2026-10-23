import type { ComponentType } from "react";
import { DatabaseSearch } from "lucide-react";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
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

type IconComponent = ComponentType<{ className?: string }>;

// For logos not in Simple Icons: a local SVG used as a mask so it takes the text colour.
function maskIcon(src: string): IconComponent {
  return ({ className }) => (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
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
}

const ICONS: Record<string, IconComponent> = {
  typescript: SiTypescript,
  python: SiPython,
  aws: maskIcon("/aws.svg"),
  rag: DatabaseSearch,
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
    <section
      className="mt-10 w-full px-5 md:px-7"
      id="stack"
      aria-label="Tech stack"
    >
      <h2 className="mb-4 text-lg font-semibold tracking-[-0.01em] text-foreground">
        Tech stack
      </h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-6">
        {STACK_ICONS.map(({ slug, label }) => {
          const Icon = ICONS[slug];
          if (!Icon) {
            return null;
          }
          return (
            <li
              key={slug}
              className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground"
            >
              <Icon className="h-6 w-6" />
              {label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default StackIconGrid;
