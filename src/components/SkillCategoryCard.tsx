import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "../data/portfolio";
import {
  fadeInScale,
  springSoft,
  staggerContainer,
  VIEWPORT_ONCE,
} from "./motion/MotionPrimitives";

type SkillCategoryCardProps = {
  category: SkillCategory;
};

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={springSoft}
      className="rounded-xl border border-border bg-card p-4 shadow-[0_10px_25px_-22px_rgba(20,16,8,0.4)] hover:shadow-[0_18px_40px_-25px_rgba(20,16,8,0.55)] transition-shadow"
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-label">
        {category.label}
      </p>
      <motion.div
        className="flex flex-wrap gap-1.5"
        variants={staggerContainer(0.03, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        {category.items.map((item) => (
          <motion.span
            key={item}
            variants={fadeInScale}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-block"
          >
            <Badge variant="outline" className="text-xs">
              {item}
            </Badge>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default SkillCategoryCard;
