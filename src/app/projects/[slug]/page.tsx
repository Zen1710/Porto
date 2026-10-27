import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { DraftBadge, TextLink } from "@/components/sections";
import { TechChip } from "@/components/tech-chip";
import { getProjects } from "@/lib/content";
import { formatMonth } from "@/lib/format";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

// Anything not Published 404s instead of rendering on demand.
export const dynamicParams = false;

function findProject(slug: string) {
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  const { default: Body } = await import(`@content/projects/${slug}.mdx`);

  return (
    <Article
      meta={formatMonth(project.date)}
      title={
        <>
          {project.title}
          <DraftBadge draft={project.draft} />
        </>
      }
      summary={project.summary}
    >
      {(project.stack.length > 0 || project.repo || project.demo) && (
        <div className="flex flex-col gap-4 border-y border-line py-5">
          {project.stack.length > 0 && (
            <p className="flex flex-wrap gap-1.5 text-sm">
              {project.stack.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
            </p>
          )}
          {(project.repo || project.demo) && (
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {project.demo && <TextLink href={project.demo}>Live demo</TextLink>}
              {project.repo && <TextLink href={project.repo}>Source code</TextLink>}
            </p>
          )}
        </div>
      )}
      {project.cover && (
        <Image src={project.cover} alt={`Screenshot of ${project.title}`} width={1344} height={840} className="w-full" />
      )}
      <Body />
    </Article>
  );
}
