import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Project } from "../data/portfolio";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = project.tag.toLowerCase().includes("featured");

  return (
    <article
      className={`flex flex-col rounded-xl border border-border ${project.accent} p-5 shadow-[0_10px_25px_-22px_rgba(20,16,8,0.5)]`}
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
          <Badge
            key={item}
            variant={isFeatured ? "featured" : "outline"}
            className="text-xs"
          >
            {item}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.links.map((link) =>
          link.internal ? (
            <Link
              key={link.label}
              to={link.href}
              className="border-b border-transparent text-sm font-medium text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
            >
              {link.label} &rarr;
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent text-sm font-medium text-foreground motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
            >
              {link.label} &rarr;
            </a>
          ),
        )}
        {project.details && <ProjectDetailsDialog project={project} />}
      </div>
    </article>
  );
}

export default ProjectCard;
