import Link from "next/link";
import { profile } from "@content/profile";
import About from "@content/about.mdx";
import { ContactForm } from "@/components/contact-form";
import type { NavItem } from "@/components/scrollspy-nav";
import { BuildLogList, ChangelogList, ExperienceList, ProjectList, Section, TextLink } from "@/components/sections";
import { Sidebar } from "@/components/sidebar";
import { getChangelog } from "@/lib/changelog";
import { getBuildLogs, getExperience, getProjects, hasAbout, publicFileExists } from "@/lib/content";

const LATEST_LOGS = 5;
const LATEST_CHANGES = 20;
/** Changes visible before the list scrolls. */
const VISIBLE_CHANGES = 5;

export default async function Home() {
  const projects = getProjects();
  const experience = getExperience();
  const logs = getBuildLogs();
  const changes = await getChangelog(LATEST_CHANGES);
  const showAbout = hasAbout();
  const { links } = profile;

  // Sections without Published content stay out of the page and the nav.
  const nav: NavItem[] = [
    showAbout && { id: "about", label: "About" },
    projects.length > 0 && { id: "projects", label: "Projects" },
    experience.length > 0 && { id: "experience", label: "Experience" },
    logs.length > 0 && { id: "build-logs", label: "Build Logs" },
    changes.length > 0 && { id: "changelog", label: "Changelog" },
    { id: "contact", label: "Contact" },
  ].filter((item) => !!item);

  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-6 sm:px-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-16">
      <div className="pt-16 sm:pt-20 lg:pt-0">
        <Sidebar nav={nav} hasCv={publicFileExists("/cv.pdf")} hasPhoto={publicFileExists(profile.photo)} />
      </div>

      <main className="flex flex-col gap-16 pt-16 pb-16 sm:gap-20 lg:gap-24 lg:pt-24 lg:short:pt-12">
        {showAbout && (
          <Section id="about" title="About">
            <div className="prose-body">
              <About />
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section id="projects" title="Projects">
            <ProjectList projects={projects} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section id="experience" title="Experience">
            <ExperienceList items={experience} />
          </Section>
        )}

        {logs.length > 0 && (
          <Section id="build-logs" title="Build Logs">
            <BuildLogList logs={logs.slice(0, LATEST_LOGS)} />
            {logs.length > LATEST_LOGS && (
              <p className="mt-5 text-sm">
                <Link href="/build-logs" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-current">
                  All {logs.length} build logs
                </Link>
              </p>
            )}
          </Section>
        )}

        {changes.length > 0 && (
          <Section id="changelog" title="Changelog">
            <ChangelogList changes={changes} visible={VISIBLE_CHANGES} />
            {changes.length > VISIBLE_CHANGES && (
              <p className="mt-5 text-sm text-subtle">Scroll the list for older changes.</p>
            )}
          </Section>
        )}

        <Section id="contact" title="Contact">
          <p className="max-w-[60ch] leading-relaxed text-muted">
            Hiring for a role where I could help? Send a message and I&apos;ll get back to you.
            {(links.email || links.linkedin) && " You can also reach me "}
            {links.email && <TextLink href={`mailto:${links.email}`}>{links.email}</TextLink>}
            {links.email && links.linkedin && " or "}
            {links.linkedin && <TextLink href={links.linkedin}>on LinkedIn</TextLink>}
            {(links.email || links.linkedin) && "."}
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Section>

        <footer className="border-t border-line pt-6 text-sm leading-relaxed text-subtle">
          Built with Next.js and Tailwind CSS, deployed on Vercel.
          {profile.sourceRepo && (
            <>
              {" "}
              The <TextLink href={profile.sourceRepo}>source is on GitHub</TextLink>.
            </>
          )}
        </footer>
      </main>
    </div>
  );
}
