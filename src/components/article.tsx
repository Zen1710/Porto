import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@content/profile";
import { ArrowLeftIcon } from "./icons";

/** Shell for Project and Build Log detail pages. */
export function Article({ meta, title, summary, children, footer, plain = false }: {
  meta: ReactNode;
  title: ReactNode;
  summary: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Skip long-form text styles, e.g. for a list page. */
  plain?: boolean;
}) {
  return (
    <div className="mx-auto min-h-dvh max-w-2xl px-6 pt-16 pb-24 sm:px-10 sm:pt-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeftIcon className="size-4" />
        {profile.name}
      </Link>

      <article className="mt-14">
        <header>
          <h1 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{summary}</p>
          <p className="mt-4 text-sm text-subtle tabular-nums">{meta}</p>
        </header>
        <div className={plain ? "mt-12" : "prose-body mt-12"}>{children}</div>
      </article>

      {footer && <footer className="mt-16 border-t border-line pt-6">{footer}</footer>}
    </div>
  );
}
