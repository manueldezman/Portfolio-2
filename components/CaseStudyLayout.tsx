import { ExternalLink } from "lucide-react";
import { EditorialPageHero, EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import type { Project } from "@/content/projects";

const caseStudySections = [
  ["problem", "Problem"],
  ["targetUser", "Target User"],
  ["difficulty", "Why It Was Difficult"],
  ["approach", "Approach"],
  ["decision", "Key Decision"],
  ["outcome", "Outcome"],
] as const;

export function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <main className="editorial-shell py-16">
      <EditorialPageHero
        description={project.summary}
        eyebrow={project.category}
        index={project.year}
        meta={
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                className="editorial-button editorial-button-secondary gap-2 px-4 py-3"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        }
        title={project.title}
      />

      <section className="mt-12 grid border-2 border-[var(--rule)] md:grid-cols-3">
        {[
          ["Role", project.role],
          ["Timeline", project.timeline],
          ["Result", project.result],
        ].map(([label, value]) => (
          <div className="border-[var(--rule)] p-6 md:border-l md:first:border-l-0" key={label}>
            <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
              {label}
            </p>
            <p className="mt-3 font-bold leading-7 text-[var(--text)]">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[0.24fr_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-32 border-2 border-[var(--rule)]">
            {caseStudySections.map(([key, label], index) => (
              <a
                className="link-ring block border-b border-[var(--rule-soft)] px-4 py-3 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)] last:border-b-0"
                href={`#${key}`}
                key={key}
              >
                {String(index + 1).padStart(2, "0")} {label}
              </a>
            ))}
          </div>
        </aside>

        <div>
          {caseStudySections.map(([key, label], index) => (
            <section
              className="grid border-t-[3px] border-[var(--rule)] py-10 md:grid-cols-[0.28fr_1fr]"
              id={key}
              key={key}
            >
              <div>
                <p className="font-mono text-xs font-black text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">{label}</h2>
              </div>
              <p className="text-lg font-semibold leading-9 text-[var(--muted)]">{project.caseStudy[key]}</p>
            </section>
          ))}

          <section className="mt-6">
            <EditorialSectionTitle index="07" title="Stack & Links" />
            <div className="border-2 border-[var(--rule)] p-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <EditorialTag key={tag}>{tag}</EditorialTag>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
