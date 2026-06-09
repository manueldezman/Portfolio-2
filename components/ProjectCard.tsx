import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="terminal-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{project.category}</p>
          <h3 className="mt-3 text-2xl font-semibold text-cream">{project.title}</h3>
        </div>
        <span className="rounded-full border border-accent/20 px-3 py-1 font-mono text-xs text-sand">
          {project.year}
        </span>
      </div>
      <p className="mt-4 flex-1 leading-7 text-sand">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span className="rounded-full bg-cream/5 px-3 py-1 text-xs text-sand" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link
        className="link-ring mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-semibold text-cream"
        href={`/projects/${project.slug}`}
      >
        Read case study
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
