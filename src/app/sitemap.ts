import type { MetadataRoute } from "next";
import { profile } from "@content/profile";
import { getBuildLogs, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, profile.siteUrl).toString();
  const logs = getBuildLogs();

  return [
    { url: url("/") },
    ...getProjects().map((p) => ({ url: url(`/projects/${p.slug}`), lastModified: p.date })),
    ...(logs.length > 0 ? [{ url: url("/build-logs") }] : []),
    ...logs.map((l) => ({ url: url(`/build-logs/${l.slug}`), lastModified: l.date })),
  ];
}
