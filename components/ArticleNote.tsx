"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "@/components/DetailModal";
import { Heading } from "@/components/Heading";
import { RichText } from "@/components/RichText";
import type { ArticleNote, PortfolioItem } from "@/content/portfolio";

export function ArticleNoteItem({ item, note }: { item: PortfolioItem; note: ArticleNote }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {item.title}
      </button>

      {isOpen ? (
        <DetailModal eyebrow={item.source} onClose={() => setIsOpen(false)} title={item.title}>
          <div className="grid gap-6">
            <div>
              <a
                className="editorial-button editorial-button-secondary gap-2 px-4 py-3"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                Read the article
                <ArrowUpRight size={13} />
              </a>
            </div>

            <section>
              <Heading level={3}>Why I wrote it</Heading>
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={note.why} />
            </section>

            <section>
              <Heading level={3}>Who it&apos;s for</Heading>
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={note.audience} />
            </section>

            <section>
              <Heading level={3}>How it got published</Heading>
              <ol className="mt-3 flex flex-wrap items-center gap-2">
                {note.process.map((step, index) => (
                  <li className="flex items-center gap-2" key={`${index}-${step}`}>
                    {index > 0 ? (
                      <span aria-hidden className="text-[var(--muted)]">
                        →
                      </span>
                    ) : null}
                    <span className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <RichText className="mt-4 leading-7 text-[var(--muted)]" text={note.processNote} />
            </section>
          </div>
        </DetailModal>
      ) : null}
    </>
  );
}
