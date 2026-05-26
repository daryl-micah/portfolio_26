import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`flex flex-col rounded-xl border border-border ${project.accent} p-5 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-reduce:transition-none`}
    >
      <p className="mb-1 text-sm text-label">{project.tag}</p>
      <h3 className="mb-2 text-[1.08rem] font-semibold leading-snug text-foreground">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
          >
            {item}
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
                className="border-b border-transparent text-sm font-medium text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
              >
                {link.label} -&gt;
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-transparent text-sm font-medium text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
              >
                {link.label} -&gt;
              </a>
            ),
          )}
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
