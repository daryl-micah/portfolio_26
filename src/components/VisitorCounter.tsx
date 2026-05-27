import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ENDPOINT =
  "https://abacus.jasoncameron.dev/hit/daryl-micah-portfolio/visits-v2?initializer=110";

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { value: number } | null) => {
        if (data && typeof data.value === "number") {
          setCount(data.value);
        }
      })
      .catch(() => {
        // Silent fail: counter is non-essential.
      });
    return () => controller.abort();
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-sm text-muted-foreground"
    >
      You are the{" "}
      <span className="font-semibold text-foreground">{ordinal(count)}</span>{" "}
      visitor.
    </motion.p>
  );
}

export default VisitorCounter;
