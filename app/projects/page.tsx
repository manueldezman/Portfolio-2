import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialMetric, EditorialPageHero, EditorialSectionTitle } from "@/components/Editorial";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Editorial case study archive for Abdulganiy Adeleke's DevRel, technical writing, Web3, AI tooling, and developer education projects.",
};

export default function ProjectsPage() {
  const featured = projects[0];
  const categories = Array.from(new Set(projects.map((project) => project.category)));

  return (
    <main className="editorial-shell py-16">
      <EditorialPageHero
        description="A selection of engineering and developer-experience projects focused on blockchain, documentation, AI-assisted workflows, and developer education."
        eyebrow="Editorial Case Study Archive"
        index="01"
        meta={
          <div className="grid border-2 border-[var(--rule)] md:grid-cols-3">
            <EditorialMetric label="Projects" value={`${projects.length}`} />
            <EditorialMetric label="Categories" value={`${categories.length}`} />
            <EditorialMetric label="Solo builds" value="4" />
          </div>
        }
        title="Projects"
      />

      <section className="mt-14">
        <EditorialSectionTitle index="01" title="Featured Case" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-[1fr_0.72fr]">
          <article className="bg-[var(--surface-strong)] p-8 text-[var(--background)]">
            <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              01 / Featured
            </p>
            <h2 className="mt-10 text-4xl font-black tracking-[-0.06em]">{featured.title}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-[color-mix(in_srgb,var(--background)_72%,transparent)]">
              {featured.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {featured.tags.slice(0, 5).map((tag) => (
                <span className="border border-[color-mix(in_srgb,var(--background)_28%,transparent)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link className="link-ring mt-10 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)]" href={`/projects/${featured.slug}`}>
              Read case study <ArrowRight size={14} />
            </Link>
          </article>
          <aside className="grid divide-y-2 divide-[var(--rule)]">
            <div className="p-7">
              <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Role</p>
              <p className="mt-3 font-bold text-[var(--text)]">{featured.role}</p>
            </div>
            <div className="p-7">
              <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Timeline</p>
              <p className="mt-3 font-bold text-[var(--text)]">{featured.timeline}</p>
            </div>
            <div className="p-7">
              <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">Outcome</p>
              <p className="mt-3 font-bold text-[var(--text)]">{featured.result}</p>
            </div>
          </aside>
        </div>
      </section>

      <ProjectArchive projects={projects} />
    </main>
  );
}
