"use client";

import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import type { ContentItem } from "@/content/contents";

type ArticleArchiveProps = {
  articles: ContentItem[];
};

export function ArticleArchive({ articles }: ArticleArchiveProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const asideId = useId();
  const selected = selectedIndex === null ? null : articles[selectedIndex];

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
    <section className="mt-14">
      <EditorialSectionTitle index="01" title="Article Archive" />
      <div className={`grid gap-8 ${selected ? "xl:grid-cols-[1fr_0.42fr]" : ""}`}>
        <div className="border-2 border-[var(--rule)]">
          {articles.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <article
                className={`grid gap-4 border-b-2 border-[var(--rule)] px-6 py-6 last:border-b-0 md:grid-cols-[0.08fr_0.22fr_1fr_0.16fr] md:items-start ${
                  isSelected
                    ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] shadow-[inset_6px_0_0_var(--accent)]"
                    : "hover:bg-[color-mix(in_srgb,var(--rule)_4%,transparent)]"
                }`}
                key={item.href}
              >
                <span className="font-mono text-xs font-black text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <EditorialTag>{item.category}</EditorialTag>
                  <span className="mt-3 block font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                    {item.date}
                  </span>
                </span>
                <span>
                  <span className="block text-xl font-black tracking-[-0.04em] text-[var(--text)]">
                    {item.title}
                  </span>
                  <span className="mt-2 block leading-7 text-[var(--muted)]">{item.description}</span>
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
                  {item.readTime || "Post"}
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
            <div>
              {selected.thumbnail ? (
                <div className="relative aspect-video border-b-2 border-[var(--rule)]">
                  <Image
                    alt={`${selected.title} thumbnail`}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 30vw, 100vw"
                    src={selected.thumbnail}
                    unoptimized
                  />
                </div>
              ) : null}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--rule)] pb-5">
                  <div>
                    <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                      {selected.category}
                    </p>
                    <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-[var(--text)]">
                      {selected.title}
                    </h2>
                  </div>
                  <button
                    aria-label="Close selected article"
                    className="link-ring border-2 border-[var(--rule)] p-2 text-[var(--text)]"
                    onClick={() => setSelectedIndex(null)}
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-b-2 border-[var(--rule)] pb-6">
                  <div>
                    <dt className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      Date
                    </dt>
                    <dd className="mt-2 font-bold text-[var(--text)]">{selected.date}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      Read time
                    </dt>
                    <dd className="mt-2 font-bold text-[var(--text)]">{selected.readTime || "Post"}</dd>
                  </div>
                </dl>

                <p className="mt-6 leading-7 text-[var(--muted)]">{selected.description}</p>

                <a
                  className="editorial-button editorial-button-primary mt-8 gap-2 px-5 py-4"
                  href={selected.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Read article
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
