import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

const CARD_STACK_LIMIT = 4;

const linkBase =
  "border-b text-sm motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out";
// The first link is the primary action; the rest sit back.
const primaryLink = `${linkBase} border-current font-medium text-foreground hover:text-accent`;
const secondaryLink = `${linkBase} border-transparent text-muted-foreground hover:border-current hover:text-foreground`;

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.links.map((link, index) => {
        const className = index === 0 ? primaryLink : secondaryLink;
        return link.internal ? (
          <Link key={link.label} to={link.href} className={className}>
            {link.label}
          </Link>
        ) : (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {link.label}
          </a>
        );
      })}
      {project.details && (
        <ProjectDetailsDialog project={project} className={secondaryLink} />
      )}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="mb-1 flex items-center gap-2 text-sm text-label">
      {project.tag}
      {project.featured && (
        <span className="rounded-full bg-accent-soft px-2 py-px text-xs font-medium text-accent-foreground">
          Featured
        </span>
      )}
    </p>
  );
}

type ProjectCardProps = {
  project: Project;
  lead?: boolean;
};

function ProjectCard({ project, lead = false }: ProjectCardProps) {
  const highlights = lead ? project.details?.highlights.slice(0, 3) : undefined;

  return (
    <article
      className={`flex h-full flex-col rounded-xl border border-border ${project.accent} shadow-[0_10px_25px_-22px_rgba(20,16,8,0.5)] ${
        lead ? "p-6 md:p-7" : "p-5"
      }`}
    >
      <div className={lead ? "grid flex-1 gap-6 md:grid-cols-[1.1fr_1fr]" : "flex flex-1 flex-col"}>
        <div className="flex flex-col">
          <ProjectMeta project={project} />
          <h3
            className={`mb-2 font-semibold leading-snug text-foreground ${
              lead ? "text-[1.45rem] tracking-[-0.01em]" : "text-[1.08rem]"
            }`}
          >
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <p className="mb-4 text-xs text-label">
            {project.stack.slice(0, CARD_STACK_LIMIT).join(", ")}
          </p>
          <ProjectLinks project={project} />
        </div>

        {highlights && (
          <ul className="hidden space-y-2.5 border-l border-border pl-6 md:block">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="grid gap-x-6 gap-y-1.5 py-4 md:grid-cols-[1fr_auto] md:items-baseline">
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground">
          {project.title}
          <span className="ml-2 text-sm font-normal text-label">{project.tag}</span>
        </h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
      <ProjectLinks project={project} />
    </li>
  );
}

export default ProjectCard;
