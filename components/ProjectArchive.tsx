"use client";

import { ArrowRight, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import type { Project } from "@/content/projects";

type ProjectArchiveProps = {
  projects: Project[];
};

export function ProjectArchive({ projects }: ProjectArchiveProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const asideId = useId();
  const selected = selectedIndex === null ? null : projects[selectedIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
      <EditorialSectionTitle index="02" title="Project Archive" />
      <div className={`grid gap-8 ${selected ? "xl:grid-cols-[1fr_0.42fr]" : ""}`}>
        <div className="border-2 border-[var(--rule)]">
          {projects.map((project, index) => {
            const isSelected = selectedIndex === index;

            return (
              <article
                className={`grid gap-4 border-b-2 border-[var(--rule)] px-6 py-6 last:border-b-0 md:grid-cols-[0.08fr_0.28fr_1fr_0.18fr] md:items-start ${
                  isSelected
                    ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] shadow-[inset_6px_0_0_var(--accent)]"
                    : "hover:bg-[color-mix(in_srgb,var(--rule)_4%,transparent)]"
                }`}
                key={project.slug}
              >
                <span className="font-mono text-xs font-black text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-black tracking-[-0.04em] text-[var(--text)]">
                    {project.title}
                  </span>
                  <span className="mt-1 block font-mono text-[0.65rem] font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                    {project.year}
                  </span>
                  <span className="mt-4 inline-flex">
                    <EditorialTag>{project.category.split(" ")[0]}</EditorialTag>
                  </span>
                </span>
                <span>
                  <span className="block text-sm leading-6 text-[var(--muted)]">{project.summary}</span>
                  <button
                    aria-controls={asideId}
                    aria-expanded={isSelected}
                    className="editorial-button editorial-button-secondary mt-5 px-4 py-3"
                    onClick={() => setSelectedIndex(index)}
                    type="button"
                  >
                    View details
                  </button>
                </span>
                <span className="justify-self-start border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)] md:justify-self-end">
                  {project.role.includes("Solo") ? "Solo" : "Project"}
                </span>
              </article>
            );
          })}
        </div>

        <aside
          aria-live="polite"
          className={`border-2 border-[var(--rule)] bg-[var(--background)] transition ${
            selected ? "block" : "hidden"
          } xl:sticky xl:top-32 xl:max-h-[calc(100vh-10rem)] xl:overflow-auto`}
          id={asideId}
        >
          {selected ? (
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--rule)] pb-5">
                <div>
                  <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                    {selected.category}
                  </p>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[var(--text)]">
                    {selected.title}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selected.links.map((link) => (
                      <a
                        className="link-ring inline-flex items-center gap-2 border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]"
                        href={link.href}
                        key={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                        <ArrowRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>
                <button
                  aria-label="Close selected project"
                  className="link-ring border-2 border-[var(--rule)] p-2 text-[var(--text)]"
                  onClick={() => setSelectedIndex(null)}
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>

              <dl className="mt-6 grid gap-4 border-b-2 border-[var(--rule)] pb-6">
                {[
                  ["Year", selected.year],
                  ["Role", selected.role],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-bold leading-6 text-[var(--text)]">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-6">
                {[
                  ["Problem", selected.caseStudy.problem],
                  ["Target audience", selected.caseStudy.targetUser],
                  ["Approach", selected.caseStudy.approach],
                ].map(([label, value]) => (
                  <section className="border-l-2 border-[var(--rule)] pl-4" key={label}>
                    <h3 className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{value}</p>
                  </section>
                ))}

                <section className="border-l-2 border-[var(--rule)] pl-4">
                  <h3 className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                    Tech stack
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
