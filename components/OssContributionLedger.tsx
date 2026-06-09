"use client";

import { ArrowRight, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import type { ContributionStory } from "@/content/oss";

type OssContributionLedgerProps = {
  contributionStories: ContributionStory[];
  repositories: string[];
};

export function OssContributionLedger({
  contributionStories,
  repositories,
}: OssContributionLedgerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const asideId = useId();
  const selected = selectedIndex === null ? null : contributionStories[selectedIndex];

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
    <>
      <section className="mt-14">
        <EditorialSectionTitle index="01" title="Ledger" />
        <div className={`grid gap-8 ${selected ? "xl:grid-cols-[1fr_0.42fr]" : ""}`}>
          <div className="border-2 border-[var(--rule)]">
            {contributionStories.map((story, index) => {
              const isSelected = selectedIndex === index;

              return (
                <article
                  className={`grid w-full gap-4 border-b-2 border-[var(--rule)] px-6 py-6 text-left last:border-b-0 md:grid-cols-[0.08fr_0.21fr_1fr_0.18fr] md:items-start ${
                    isSelected
                      ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] shadow-[inset_6px_0_0_var(--accent)]"
                      : "hover:bg-[color-mix(in_srgb,var(--rule)_4%,transparent)]"
                  }`}
                  key={`${story.repo}-${story.title}`}
                >
                  <span className="font-mono text-xs font-black text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <EditorialTag>{story.category}</EditorialTag>
                    <span className="mt-3 block font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                      {story.repo}
                    </span>
                  </span>
                  <span>
                    <span className="block text-xl font-black tracking-[-0.04em] text-[var(--text)]">
                      {story.title}
                    </span>
                    <span className="mt-2 block leading-7 text-[var(--muted)]">{story.impact}</span>
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
                  <span className="flex flex-wrap gap-2 md:justify-end">
                    {story.links.map((link) => (
                      <span
                        className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]"
                        key={link.href}
                        title={link.status}
                      >
                        {link.label}
                      </span>
                    ))}
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
                      {selected.repo}
                    </p>
                    <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[var(--text)]">
                      {selected.title}
                    </h2>
                  </div>
                  <button
                    aria-label="Close selected contribution"
                    className="link-ring border-2 border-[var(--rule)] p-2 text-[var(--text)]"
                    onClick={() => setSelectedIndex(null)}
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-6 grid gap-6">
                  {[
                    ["Problem", selected.problem],
                    ["Contribution", selected.contribution],
                    ["Impact", selected.impact],
                  ].map(([label, value]) => (
                    <section className="border-l-2 border-[var(--rule)] pl-4" key={label}>
                      <h3 className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                        {label}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{value}</p>
                    </section>
                  ))}
                </div>

                <div className="mt-8 border-t-2 border-[var(--rule)] pt-5">
                  <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                    Proof links
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.links.map((link) => (
                      <a
                        className="link-ring inline-flex items-center gap-2 border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]"
                        href={link.href}
                        key={link.href}
                        rel="noreferrer"
                        target="_blank"
                        title={link.status}
                      >
                        {link.label}
                        <ArrowRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="02" title="Repositories" />
        <div className="border-2 border-[var(--rule)] p-6">
          {repositories.map((repo, index) => {
            const count = contributionStories.filter((story) => story.repo === repo).length;

            return (
              <div className="mb-5 last:mb-0" key={repo}>
                <div className="mb-2 flex justify-between gap-4 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                  <span>{repo}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 bg-[var(--rule-soft)]">
                  <div
                    className="h-full bg-[var(--rule)]"
                    style={{ width: `${Math.max(24, 100 - index * 14)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
