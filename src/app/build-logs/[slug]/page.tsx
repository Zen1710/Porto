import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { DraftBadge } from "@/components/sections";
import { getBuildLogs } from "@/lib/content";
import { formatDate, padNumber } from "@/lib/format";

export function generateStaticParams() {
  return getBuildLogs().map((log) => ({ slug: log.slug }));
}

// Anything not Published 404s instead of rendering on demand.
export const dynamicParams = false;

function findLog(slug: string) {
  const logs = getBuildLogs();
  const index = logs.findIndex((l) => l.slug === slug);
  if (index === -1) notFound();
  // Logs are newest first, so "next" is the one before in the list.
  return { log: logs[index], newer: logs[index - 1], older: logs[index + 1] };
}

export async function generateMetadata({ params }: PageProps<"/build-logs/[slug]">): Promise<Metadata> {
  const { log } = findLog((await params).slug);
  return { title: log.title, description: log.summary };
}

export default async function BuildLogPage({ params }: PageProps<"/build-logs/[slug]">) {
  const { slug } = await params;
  const { log, newer, older } = findLog(slug);
  const { default: Body } = await import(`@content/build-logs/${slug}.mdx`);

  return (
    <Article
      meta={
        <>
          Build Log #{padNumber(log.number)} · {formatDate(log.date)}
        </>
      }
      title={
        <>
          {log.title}
          <DraftBadge draft={log.draft} />
        </>
      }
      summary={log.summary}
      footer={
        (older || newer) && (
          <nav aria-label="More build logs" className="grid gap-6 text-sm sm:grid-cols-2">
            {older ? <LogLink label="Previous" log={older} /> : <span />}
            {newer && <LogLink label="Next" log={newer} align="right" />}
          </nav>
        )
      }
    >
      <Body />
    </Article>
  );
}

function LogLink({
  label,
  log,
  align = "left",
}: {
  label: string;
  log: { slug: string; title: string; number: number };
  align?: "left" | "right";
}) {
  return (
    <Link href={`/build-logs/${log.slug}`} className={`group block ${align === "right" ? "sm:text-right" : ""}`}>
      <span className="text-subtle">
        {label} · #{padNumber(log.number)}
      </span>
      <span className="mt-1 block font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
        {log.title}
      </span>
    </Link>
  );
}
