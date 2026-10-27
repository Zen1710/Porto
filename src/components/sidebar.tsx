import { profile } from "@content/profile";
import { Avatar } from "./avatar";
import { DownloadIcon } from "./icons";
import { ScrollspyNav, type NavItem } from "./scrollspy-nav";
import { SocialLinks } from "./social-links";
import { ChipList } from "./tech-chip";

export function Sidebar({ nav, hasCv, hasPhoto }: { nav: NavItem[]; hasCv: boolean; hasPhoto: boolean }) {
  const { stack, links } = profile;

  return (
    <header className="flex flex-col gap-10 lg:sticky lg:top-0 lg:h-dvh lg:justify-between lg:overflow-y-auto lg:py-24 lg:[scrollbar-width:thin] lg:short:gap-8 lg:short:py-12">
      <div>
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} photo={hasPhoto ? profile.photo : undefined} size={64} />
          <div className="leading-snug">
            <p className="font-semibold text-ink">{profile.name}</p>
            <p className="text-muted">{profile.role}</p>
          </div>
        </div>

        <h1 className="mt-10 max-w-[13ch] text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-5xl lg:text-[3.25rem] lg:short:mt-6 lg:short:text-[2.5rem]">
          {profile.headline}
        </h1>

        <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.95] text-muted lg:short:mt-4">
          I work mostly with <ChipList items={stack.mostly} />, plus <ChipList items={stack.frontend} /> on the
          frontend and <ChipList items={stack.backend} /> on the backend.
        </p>

        <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink lg:short:mt-4">
          <span aria-hidden="true" className="mr-2.5 inline-block size-2 rounded-full bg-live align-[0.08em]" />
          {profile.availability}{" "}
          <a
            href="#contact"
            className="whitespace-nowrap text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-current"
          >
            Get in touch
          </a>
        </p>

        <SocialLinks links={links} className="mt-4 lg:short:mt-3" />

        <div className="mt-14 hidden lg:block lg:short:mt-6">
          <ScrollspyNav items={nav} />
        </div>
      </div>

      {hasCv && (
        <div>
          <a
            href="/cv.pdf"
            download={`${profile.name.replaceAll(" ", "-")}-CV.pdf`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink"
          >
            <DownloadIcon className="size-4" />
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
