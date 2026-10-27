import Link from "next/link";
import type { ReactNode } from "react";
import type { Change } from "@/lib/changelog";
import type { BuildLog, Entry } from "@/lib/content";
import { formatDate, formatMonth, formatRange } from "@/lib/format";
import type { Experience, ProjectMeta } from "@/lib/schema";
import { ArrowUpRightIcon } from "./icons";
import { TechChip } from "./tech-chip";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="text-[0.9375rem] font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function DraftBadge({ draft }: { draft?: boolean }) {
  if (!draft) return null;
  return (
    <span className="ml-2 rounded border border-dashed border-subtle px-1.5 py-px align-middle text-xs font-medium text-subtle">
      Draft
    </span>
  );
}

export function ProjectList({ projects }: { projects: Entry<ProjectMeta>[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`} className="group block py-6">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-semibold text-ink">
                <span className="underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
                  {project.title}
                </span>
                <DraftBadge draft={project.draft} />
              </h3>
              <span className="shrink-0 text-sm text-subtle tabular-nums">{formatMonth(project.date)}</span>
            </div>
            <p className="mt-2 max-w-[60ch] leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink">
              {project.summary}
            </p>
            {project.stack.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-1.5 text-sm">
                {project.stack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="flex flex-col gap-10">
      {items.map((item) => (
        <li key={`${item.org}-${item.start}`} className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-8">
          <p className="pt-px text-sm text-subtle tabular-nums">{formatRange(item.start, item.end)}</p>
          <div>
            <h3 className="font-semibold text-ink">
              {item.title}
              <DraftBadge draft={item.draft} />
            </h3>
            <p className="text-muted">{item.org}</p>
            {item.summary && <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{item.summary}</p>}
            {item.stack && item.stack.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-1.5 text-sm">
                {item.stack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function BuildLogList({ logs }: { logs: BuildLog[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {logs.map((log) => (
        <li key={log.slug}>
          <Link href={`/build-logs/${log.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
            <span>
              <span className="font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
                {log.title}
              </span>
              <DraftBadge draft={log.draft} />
            </span>
            <span className="shrink-0 text-sm text-subtle tabular-nums transition-colors duration-200 group-hover:text-muted">
              {formatDate(log.date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ChangelogList({ changes }: { changes: Change[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {changes.map((change) => (
        <li key={change.sha}>
          <a
            href={change.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-baseline justify-between gap-6 py-4"
          >
            <span className="min-w-0">
              <span className="font-medium break-words text-ink underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
                {change.message}
              </span>
              <span className="mt-1 block text-sm text-subtle">{change.source}</span>
            </span>
            <span className="shrink-0 text-sm text-subtle tabular-nums transition-colors duration-200 group-hover:text-muted">
              {formatDate(change.date)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-current"
    >
      {children}
      {external && <ArrowUpRightIcon className="size-3.5" />}
    </a>
  );
}
