import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(reduceMotion ? target : 0);
  const [displayValue, setDisplayValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [value]);

  useEffect(() => {
    if (!inView) {
      return;
    }
    if (reduceMotion) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, target, duration, value, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
