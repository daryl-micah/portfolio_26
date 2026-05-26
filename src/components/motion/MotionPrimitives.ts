import type { Variants, Transition } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
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

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.6,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 22,
};

export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px -5% 0px" } as const;
