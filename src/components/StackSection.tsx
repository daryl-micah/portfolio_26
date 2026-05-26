import { motion } from "motion/react";
import SkillCategoryCard from "./SkillCategoryCard";
import { STACK_GROUPS, STACK_NOTE } from "../data/portfolio";
import {
  fadeUp,
  staggerContainer,
  VIEWPORT_ONCE,
} from "./motion/MotionPrimitives";

function StackSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
      id="stack"
    >
      <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
        Technical Stack
      </h2>
      <motion.div
        variants={staggerContainer(0.09, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {STACK_GROUPS.map((category) => (
          <motion.div key={category.label} variants={fadeUp}>
            <SkillCategoryCard category={category} />
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-3 text-xs text-label">{STACK_NOTE}</p>
    </motion.section>
  );
}

export default StackSection;
