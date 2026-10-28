import type { Profile } from "@/lib/schema";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function SocialLinks({ links, className = "" }: { links: Profile["links"]; className?: string }) {
  const items = [
    links.github && { href: links.github, label: "GitHub", Icon: GitHubIcon },
    links.linkedin && { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    links.email && { href: `mailto:${links.email}`, label: "Email", Icon: MailIcon },
  ].filter((item) => !!item);

  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`} aria-label="Links">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
          >
            <Icon className="size-4 shrink-0 text-accent" />
            <span className="underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-accent">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
