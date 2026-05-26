import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "../data/portfolio";
import {
  fadeUpSmall,
  staggerContainer,
} from "./motion/MotionPrimitives";

type ProjectDetailsDialogProps = {
  project: Project;
};

function ProjectDetailsDialog({ project }: ProjectDetailsDialogProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const details = project.details;

  if (!details) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-md border border-transparent text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          Details &rarr;
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-card border-border">
        <DialogHeader>
          <Badge variant="featured" className="self-start">
            {project.tag}
          </Badge>
          <DialogTitle className="text-foreground text-xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {details.overview}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          animate="show"
          className="mt-2"
        >
          <motion.h4
            variants={fadeUpSmall}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-label"
          >
            Highlights
          </motion.h4>
          <motion.ul variants={fadeUpSmall} className="mt-3 space-y-2 pl-4">
            {details.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={fadeUpSmall}
                className="list-disc text-sm leading-relaxed text-muted-foreground"
              >
                {highlight}
              </motion.li>
            ))}
          </motion.ul>

          {(details.role || details.timeline) && (
            <motion.dl
              variants={fadeUpSmall}
              className="mt-5 grid grid-cols-2 gap-3 text-sm"
            >
              {details.role && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-label">
                    Role
                  </dt>
                  <dd className="mt-1 text-foreground">{details.role}</dd>
                </div>
              )}
              {details.timeline && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-label">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-foreground">{details.timeline}</dd>
                </div>
              )}
            </motion.dl>
          )}

          <motion.div
            variants={fadeUpSmall}
            className="mt-6 flex flex-wrap gap-4"
          >
            {project.links.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    navigate(link.href);
                  }}
                  className="text-sm font-medium text-foreground border-b border-current hover:text-accent transition-colors"
                >
                  {link.label} &rarr;
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-foreground border-b border-current hover:text-accent transition-colors"
                >
                  {link.label} &rarr;
                </a>
              ),
            )}
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDetailsDialog;
