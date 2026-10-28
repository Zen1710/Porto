import { describe, expect, it } from "vitest";
import { repoSlug, toChanges } from "./changelog";

const commit = (sha: string, message: string, date: string, parents = 1) => ({
  sha,
  html_url: `https://github.com/o/r/commit/${sha}`,
  parents: Array.from({ length: parents }, () => ({})),
  commit: { message, committer: { date }, author: { date } },
});

describe("repoSlug", () => {
  it("reads owner and name from GitHub URLs", () => {
    expect(repoSlug("https://github.com/Zen1710/Porto")).toBe("Zen1710/Porto");
    expect(repoSlug("https://github.com/Zen1710/phone-catalogue-test.git")).toBe("Zen1710/phone-catalogue-test");
  });

  it("ignores profiles and other hosts", () => {
    expect(repoSlug("https://github.com/Zen1710")).toBeNull();
    expect(repoSlug("https://gitlab.com/a/b")).toBeNull();
    expect(repoSlug(undefined)).toBeNull();
  });
});

describe("toChanges", () => {
  it("keeps the first line and skips merge commits", () => {
    const changes = toChanges(
      [
        commit("a1", "feat: add theme toggle\n\nLonger body", "2026-10-27T10:00:00Z"),
        commit("b2", "Merge branch 'develop'", "2026-10-27T11:00:00Z", 2),
      ],
      "This site",
    );
    expect(changes).toEqual([
      {
        sha: "a1",
        message: "feat: add theme toggle",
        date: new Date("2026-10-27T10:00:00Z"),
        url: "https://github.com/o/r/commit/a1",
        source: "This site",
      },
    ]);
  });

  it("hides commits that mention Claude", () => {
    const changes = toChanges(
      [
        commit("c1", "claude code change v 1.3", "2026-10-26T10:00:00Z"),
        commit("c2", "Claude changes v1.2", "2026-10-26T09:00:00Z"),
        commit("c3", "index version 2", "2026-10-26T08:00:00Z"),
      ],
      "Phone Catalogue",
    );
    expect(changes.map((c) => c.sha)).toEqual(["c3"]);
  });
});
