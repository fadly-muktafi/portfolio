import { site } from "@/lib/content";

/**
 * GitHub contribution squares (Contact section, right column).
 * Server Component: official GraphQL API, cached 24h (ISR).
 * No token configured or fetch failure → renders nothing (no broken UI).
 */

const WEEKS = 32;

const QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

/* Accent-driven palette: follows Accent Playground live (CSS var). */
const LEVEL_BG: Record<ContributionLevel, string> = {
  NONE: "transparent",
  FIRST_QUARTILE: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
  SECOND_QUARTILE: "color-mix(in srgb, var(--color-accent) 50%, transparent)",
  THIRD_QUARTILE: "color-mix(in srgb, var(--color-accent) 75%, transparent)",
  FOURTH_QUARTILE: "var(--color-accent)",
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function GithubContributions() {
  const token = process.env.GITHUB_TOKEN;
  const github = site.socials.find((s) => s.label === "GitHub");
  const login = github?.href.split("/").filter(Boolean).pop();
  if (!token || !login) return null;

  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - WEEKS * 7);
  from.setHours(0, 0, 0, 0);

  let weeks: { contributionDays: ContributionDay[] }[];
  let total = 0;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-site",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login, from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: 86400 }, // ISR: refresh once a day
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    weeks = cal?.weeks;
    total = cal?.totalContributions ?? 0;
    if (!Array.isArray(weeks) || weeks.length === 0) return null;
  } catch {
    return null;
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-xs text-text-muted">
          <span className="text-accent tabular-nums">{total}</span> contributions
        </p>
        <p className="font-mono text-xs text-text-muted">
          <span className="text-accent tabular-nums">{WEEKS}</span> weeks
        </p>
      </div>

      <div
        className="mt-2 inline-grid gap-1"
        style={{ gridTemplateRows: "repeat(7, 18px)", gridAutoFlow: "column" }}
        role="img"
        aria-label={`GitHub contributions for ${login}: ${total} contributions in the past year`}
      >
        {weeks.map((week, wi) =>
          week.contributionDays.map((day) => (
            <span
              key={`${wi}-${day.date}`}
              title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"
                } on ${formatDate(day.date)}`}
              className={`inline-block h-4 w-4 rounded-xs ${day.contributionLevel === "NONE" ? "border border-line" : ""
                }`}
              style={{ backgroundColor: LEVEL_BG[day.contributionLevel] }}
            />
          )),
        )}
      </div>
    </div>
  );
}
