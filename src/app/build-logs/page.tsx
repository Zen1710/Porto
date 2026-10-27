import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { BuildLogList } from "@/components/sections";
import { getBuildLogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build Logs",
  description: "Short, dated notes from building my projects.",
};

export default function BuildLogsPage() {
  const logs = getBuildLogs();
  if (logs.length === 0) notFound();

  return (
    <Article plain meta="Build Logs" title="Notes from building things" summary={metadata.description as string}>
      <BuildLogList logs={logs} />
    </Article>
  );
}
