import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Project } from "../data/portfolio";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

type ProjectCardProps = {
  project: Project;
};

const MAGNETIC_RANGE = 8;

function hasHoverCapability() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(hover: hover)").matches;
}

function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [canMagnetize] = useState(hasHoverCapability);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  const useMagnetic = !reduceMotion && canMagnetize;

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!useMagnetic) {
      return;
    }
    const element = ref.current;
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX =
      ((event.clientX - centerX) / rect.width) * MAGNETIC_RANGE * 2;
    const deltaY =
      ((event.clientY - centerY) / rect.height) * MAGNETIC_RANGE * 2;
    x.set(Math.max(-MAGNETIC_RANGE, Math.min(MAGNETIC_RANGE, deltaX)));
    y.set(Math.max(-MAGNETIC_RANGE, Math.min(MAGNETIC_RANGE, deltaY)));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFeatured = project.tag.toLowerCase().includes("featured");

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={useMagnetic ? { y: -6, scale: 1.015 } : undefined}
      whileTap={useMagnetic ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.6 }}
      style={useMagnetic ? { x: springX, y: springY } : undefined}
      className={`flex flex-col rounded-xl border border-border ${project.accent} p-5 shadow-[0_10px_25px_-22px_rgba(20,16,8,0.5)] hover:shadow-[0_20px_45px_-25px_rgba(20,16,8,0.6)] transition-shadow`}
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
    </motion.article>
  );
}

export default ProjectCard;
