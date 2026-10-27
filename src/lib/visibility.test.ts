import { describe, expect, it } from "vitest";
import { isVisible } from "./content";
import { buildLogSchema, projectSchema } from "./schema";

describe("isVisible", () => {
  it("hides drafts on the live site", () => {
    expect(isVisible({ draft: true }, false)).toBe(false);
    expect(isVisible({ draft: false }, false)).toBe(true);
    expect(isVisible({}, false)).toBe(true);
  });

  it("shows drafts while developing", () => {
    expect(isVisible({ draft: true }, true)).toBe(true);
  });
});

describe("frontmatter schemas", () => {
  it("defaults draft to false and accepts month-only dates", () => {
    const project = projectSchema.parse({ title: "App", summary: "Does a thing.", date: "2026-10" });
    expect(project.draft).toBe(false);
    expect(project.stack).toEqual([]);
    expect(project.date.toISOString()).toBe("2026-10-01T00:00:00.000Z");
  });

  it("rejects an entry missing its summary", () => {
    expect(buildLogSchema.safeParse({ title: "Log", date: "2026-10-26" }).success).toBe(false);
  });
});
