import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { experience } from "@content/experience";
import { aboutSchema, buildLogSchema, projectSchema } from "./schema";
import type { BuildLogMeta, Experience, ProjectMeta } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Drafts are visible while developing locally, never on the live site. */
export const showDrafts = process.env.NODE_ENV === "development";

export function isVisible(item: { draft?: boolean }, includeDrafts = showDrafts) {
  return includeDrafts || !item.draft;
}

export type Entry<T> = T & { slug: string };

function readCollection<T extends object>(dir: string, schema: z.ZodType<T>): Entry<T>[] {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(fullDir, file), "utf8"));
      const result = schema.safeParse(data);
      if (!result.success) {
        // Fail the build instead of shipping a half-filled entry.
        throw new Error(`Invalid frontmatter in content/${dir}/${file}:\n${result.error.message}`);
      }
      return { ...result.data, slug: file.replace(/\.mdx$/, "") };
    });
}

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

export function getProjects(): Entry<ProjectMeta>[] {
  return readCollection("projects", projectSchema).filter((p) => isVisible(p)).sort(byDateDesc);
}

export type BuildLog = Entry<BuildLogMeta> & { number: number };

export function getBuildLogs(): BuildLog[] {
  // Oldest first so each log gets a stable number in the series.
  const all = readCollection("build-logs", buildLogSchema).sort((a, b) => -byDateDesc(a, b));
  return all
    .map((log, i) => ({ ...log, number: i + 1 }))
    .filter((log) => isVisible(log))
    .reverse();
}

export function getExperience(): Experience[] {
  return experience.filter((e) => isVisible(e)).sort((a, b) => b.start.localeCompare(a.start));
}

export function hasAbout() {
  const file = path.join(CONTENT_DIR, "about.mdx");
  if (!fs.existsSync(file)) return false;
  const meta = aboutSchema.parse(matter(fs.readFileSync(file, "utf8")).data);
  return isVisible(meta);
}

export function publicFileExists(publicPath: string) {
  return publicPath !== "" && fs.existsSync(path.join(PUBLIC_DIR, publicPath));
}
