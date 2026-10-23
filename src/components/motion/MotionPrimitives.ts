import type { Variants, Transition } from "motion/react";

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0.05,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 22,
};
