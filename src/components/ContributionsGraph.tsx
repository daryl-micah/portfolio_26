import { GitHubCalendar } from "react-github-calendar";
import useTheme from "../hooks/useTheme";

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
    <section
      className="mt-10 w-full px-5 md:px-7"
      aria-label="GitHub contributions"
    >
      <h2 className="mb-4 text-lg font-semibold tracking-[-0.01em] text-foreground">
        GitHub contributions
      </h2>
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
    </section>
  );
}

export default ContributionsGraph;
