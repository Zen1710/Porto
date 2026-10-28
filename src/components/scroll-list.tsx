"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list that shows its first `rows` items whole and scrolls the rest inside itself.
 * The height is measured from the rows, so it still fits when a row wraps.
 * `className` should carry a max-height that roughly fits `rows` before hydration.
 */
export function ScrollList({ rows, className = "", children }: { rows: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;

    const fit = () => {
      const next = list.children[rows] as HTMLElement | undefined;
      // The visible rows end where the next row starts; the list's own borders close the frame.
      const borders = list.offsetHeight - list.clientHeight;
      list.style.maxHeight = next ? `${next.offsetTop + borders}px` : "none";
    };

    fit();
    const observer = new ResizeObserver(fit);
    for (const row of list.children) observer.observe(row);
    return () => observer.disconnect();
  }, [rows]);

  return (
    <ul ref={ref} className={`relative overflow-y-auto ${className}`}>
      {children}
    </ul>
  );
}
