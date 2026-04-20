import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`flex flex-col rounded-xl border border-[rgba(132,102,59,0.28)] ${project.accent} p-5 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-reduce:transition-none`}
    >
      <p className="mb-1 text-sm text-[#68563b]">{project.tag}</p>
      <h3 className="mb-2 text-[1.08rem] font-semibold leading-snug text-[#141008]">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#3a2e1e]">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[rgba(160,72,0,0.08)] px-2.5 py-0.5 text-xs font-medium text-[#7a3a00]"
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
                className="border-b border-transparent text-sm font-medium text-[#141008] motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
              >
                {link.label} -&gt;
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-transparent text-sm font-medium text-[#141008] motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-current motion-reduce:transition-none"
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
