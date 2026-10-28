"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

// The site opens dark; light only applies once the visitor picks it.
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Unknown on the server; the icons switch through CSS, so only the label waits for hydration.
  const theme = useSyncExternalStore(subscribe, currentTheme, () => undefined);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode: the choice still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
      title="Switch theme"
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-wash hover:text-ink ${className}`}
    >
      <MoonIcon className="theme-icon-moon size-[18px]" />
      <SunIcon className="theme-icon-sun size-[18px]" />
    </button>
  );
}
