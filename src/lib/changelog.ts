import { profile } from "@content/profile";
import { getProjects } from "./content";

export type Change = {
  sha: string;
  message: string;
  date: Date;
  url: string;
  /** Where it happened: "This site" or the Project's title. */
  source: string;
};

type RawCommit = {
  sha: string;
  html_url: string;
  parents: unknown[];
  commit: { message: string; committer: { date: string } | null; author: { date: string } | null };
};

/** "https://github.com/owner/name(.git)" → "owner/name"; anything else → null. */
export function repoSlug(url: string | undefined): string | null {
  const match = url?.match(/^https?:\/\/(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/);
  return match ? `${match[1]}/${match[2]}` : null;
}

/** Commits that only note AI tool runs ("claude code changes v1.0") say nothing about the work. */
const HIDDEN_MESSAGE = /\bclaude\b/i;

/**
 * Keeps the first line of each commit and drops merge commits, which only repeat other changes,
 * and commits that mention Claude.
 */
export function toChanges(commits: RawCommit[], source: string): Change[] {
  return commits
    .filter((c) => c.parents.length <= 1)
    .map((c) => ({
      sha: c.sha,
      message: c.commit.message.split("\n")[0].trim(),
      date: new Date(c.commit.committer?.date ?? c.commit.author?.date ?? 0),
      url: c.html_url,
      source,
    }))
    .filter((c) => c.message !== "" && !HIDDEN_MESSAGE.test(c.message));
}

async function fetchCommits(slug: string): Promise<RawCommit[]> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${slug}/commits?per_page=30`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // Production fetches once per build, so the list refreshes on every deploy.
    // Local dev rechecks every minute so a fresh push shows up while previewing.
    ...(process.env.NODE_ENV === "development" ? { next: { revalidate: 60 } } : { cache: "force-cache" }),
  });
  // An empty repo answers 409, a private or missing one 404: both mean nothing to show.
  if (!response.ok) {
    if (response.status !== 409) console.warn(`[changelog] ${slug}: GitHub responded ${response.status}`);
    return [];
  }
  return response.json();
}

/**
 * Latest commits from this site's repo and every visible Project's repo, newest first.
 * A repo that cannot be read is skipped so the build never fails on GitHub.
 */
export async function getChangelog(limit: number): Promise<Change[]> {
  const sources = new Map<string, string>();
  const siteSlug = repoSlug(profile.sourceRepo);
  if (siteSlug) sources.set(siteSlug, "This site");
  for (const project of getProjects()) {
    const slug = repoSlug(project.repo);
    if (slug && !sources.has(slug)) sources.set(slug, project.title);
  }

  const lists = await Promise.all(
    [...sources].map(async ([slug, source]) => {
      try {
        return toChanges(await fetchCommits(slug), source);
      } catch (error) {
        console.warn(`[changelog] ${slug}:`, error);
        return [];
      }
    }),
  );

  return lists
    .flat()
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}
