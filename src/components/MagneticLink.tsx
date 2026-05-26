import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  range?: number;
};

function MagneticLink({
  href,
  children,
  className,
  external = false,
  range = 6,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) {
      return;
    }
    const element = ref.current;
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = ((event.clientX - centerX) / rect.width) * range * 2;
    const deltaY = ((event.clientY - centerY) / rect.height) * range * 2;
    x.set(Math.max(-range, Math.min(range, deltaX)));
    y.set(Math.max(-range, Math.min(range, deltaY)));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.a>
  );
}

export default MagneticLink;
