import {
  siCss,
  siDocker,
  siExpress,
  siGo,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

/** `viewBox` crops a wide wordmark to its ink so it can sit at cap height. */
export type Tech = { label: string; icon?: SimpleIcon; viewBox?: string };

const registry: Record<string, Tech> = {
  typescript: { label: "TypeScript", icon: siTypescript },
  javascript: { label: "JavaScript", icon: siJavascript },
  nextjs: { label: "Next.js", icon: siNextdotjs },
  react: { label: "React", icon: siReact },
  vue: { label: "Vue", icon: siVuedotjs },
  nodejs: { label: "Node.js", icon: siNodedotjs },
  express: { label: "Express", icon: siExpress },
  go: { label: "Go", icon: siGo, viewBox: "0 7.5 24 9" },
  postgresql: { label: "PostgreSQL", icon: siPostgresql },
  tailwindcss: { label: "Tailwind CSS", icon: siTailwindcss },
  html: { label: "HTML", icon: siHtml5 },
  css: { label: "CSS", icon: siCss },
  docker: { label: "Docker", icon: siDocker },
};

/** Looks up a tech by key (e.g. "nextjs"); unknown names render as plain text chips. */
export function getTech(key: string): Tech {
  return registry[key.toLowerCase().replace(/[\s.]/g, "")] ?? { label: key };
}
