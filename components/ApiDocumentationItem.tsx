"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "@/components/DetailModal";
import { Heading } from "@/components/Heading";
import { RichText } from "@/components/RichText";
import type { AgentReadiness, PortfolioItem } from "@/content/portfolio";

type ApiDocumentationItemProps = {
  item: PortfolioItem;
  readiness: AgentReadiness;
};

export function ApiDocumentationItem({ item, readiness }: ApiDocumentationItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(readiness.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

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
          <div className="grid gap-7">
            <div>
              <a
                className="editorial-button editorial-button-secondary gap-2 px-4 py-3"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                Read the documentation
                <ArrowUpRight size={13} />
              </a>
            </div>

            <section>
              <Heading level={3}>AI readiness result</Heading>
              <figure className="mt-3">
                <Image
                  alt={readiness.image.alt}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 90vw, 100vw"
                  src={readiness.image.image}
                />
                <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {readiness.image.caption}
                </figcaption>
              </figure>
            </section>

            <section>
              <Heading level={3}>Verify it yourself</Heading>
              <RichText
                className="mt-2 leading-7 text-[var(--muted)]"
                text="Run the same check against the published docs to reproduce the score."
              />
              <div className="mt-3 flex flex-wrap items-start gap-3">
                <code className="min-w-0 flex-1 overflow-x-auto border border-[var(--rule-soft)] bg-[var(--surface)] px-3 py-2 font-mono text-xs leading-6 text-[var(--text)]">
                  {readiness.command}
                </code>
                <button
                  className="editorial-button editorial-button-secondary gap-2 px-4 py-3"
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy command"}
                </button>
              </div>
            </section>

            <section>
              <Heading level={3}>Tools used</Heading>
              <ul className="mt-3 space-y-2">
                {readiness.tools.map((tool) => (
                  <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1 leading-7" key={tool.name}>
                    <span className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]">
                      {tool.name}
                    </span>
                    <span className="text-[var(--muted)]">{tool.role}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Heading level={3}>What made it agent-ready</Heading>
              <ul className="mt-3 space-y-3">
                {readiness.practices.map((practice) => (
                  <li className="flex gap-3" key={practice}>
                    <span aria-hidden className="text-[var(--accent)]">
                      —
                    </span>
                    <RichText className="flex-1 leading-7 text-[var(--muted)]" text={practice} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </DetailModal>
      ) : null}
    </>
  );
}
