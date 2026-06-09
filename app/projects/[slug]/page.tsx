import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getProject, projects } from "@/content/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyLayout project={project} />;
}
