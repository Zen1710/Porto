"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

export function ScrollspyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      // A section is current once its top passes 40% of the viewport.
      const line = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | undefined = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      if (atBottom) current = sections.at(-1)?.id;
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Sections">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-4 py-2 text-sm font-medium short:py-1"
              >
                <span
                  className={`h-px transition-[width,background-color] duration-500 ease-out-expo group-hover:w-16 group-hover:bg-accent motion-reduce:transition-none ${
                    isActive ? "w-16 bg-accent" : "w-8 bg-subtle"
                  }`}
                />
                <span
                  className={`transition-colors duration-300 group-hover:text-ink ${
                    isActive ? "text-ink" : "text-subtle"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
