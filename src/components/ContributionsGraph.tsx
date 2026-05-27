import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";
import useTheme from "../hooks/useTheme";
import { VIEWPORT_ONCE } from "./motion/MotionPrimitives";

const lightTheme = [
  "oklch(0.92 0.020 80)",
  "oklch(0.85 0.06 75)",
  "oklch(0.72 0.10 65)",
  "oklch(0.58 0.14 55)",
  "oklch(0.42 0.13 55)",
];

const darkTheme = [
  "oklch(0.24 0.018 60)",
  "oklch(0.32 0.05 65)",
  "oklch(0.46 0.10 65)",
  "oklch(0.62 0.14 65)",
  "oklch(0.80 0.16 70)",
];

type ContributionsGraphProps = {
  username: string;
};

function ContributionsGraph({ username }: ContributionsGraphProps) {
  const { theme } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 w-full"
      aria-label="GitHub contributions"
    >
      <p className="mb-4 text-xs font-semibold tracking-[0.18em] uppercase text-label">
        GitHub Contributions
      </p>
      <div
        className="contributions-graph overflow-x-auto text-muted-foreground"
        key={theme}
      >
        <GitHubCalendar
          username={username}
          colorScheme={theme}
          theme={{ light: lightTheme, dark: darkTheme }}
          fontSize={12}
          blockSize={11}
          blockMargin={3}
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
        />
      </div>
    </motion.section>
  );
}

export default ContributionsGraph;
