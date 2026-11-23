"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Heading } from "@/components/Heading";
import { ImageViewer, type ImageViewerItem } from "@/components/ImageViewer";
import { MediaSlideshow } from "@/components/MediaSlideshow";
import { RichText } from "@/components/RichText";
import {
  hooklineCaseStudy,
  type HooklineFigure,
  type HooklinePillar,
} from "@/content/hooklineCaseStudy";

const thClass =
  "pb-2 pr-4 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]";

type FigureNumbers = {
  diagram: number;
  media: number[];
  compare: number[];
};

function withNumber(number: number, caption: string) {
  return `Figure ${number}: ${caption}`;
}

function SectionHeading({ index, title }: { index?: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      {index ? (
        <span className="font-mono text-sm font-black leading-none text-[var(--accent)]">{index}</span>
      ) : null}
      <Heading level={2}>{title}</Heading>
    </div>
  );
}

function ZoomButton({ label, onOpen }: { label: string; onOpen: () => void }) {
  return (
    <button
      aria-label={`Open full size image. ${label}`}
      className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(238,232,221,0.32)] bg-[rgba(18,17,15,0.78)] text-sm leading-none text-[#eee8dd] transition-colors hover:bg-[rgba(18,17,15,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      onClick={onOpen}
      title="View full size"
      type="button"
    >
      <span aria-hidden="true">⤢</span>
    </button>
  );
}

function FullFigure({
  figure,
  number,
  onOpen,
}: {
  figure: HooklineFigure;
  number: number;
  onOpen: () => void;
}) {
  return (
    <figure>
      <div className="relative">
        <Image
          alt={figure.alt}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 45rem, 100vw"
          src={figure.image}
        />
        <ZoomButton label={figure.alt} onOpen={onOpen} />
      </div>
      <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {withNumber(number, figure.caption)}
      </figcaption>
    </figure>
  );
}

function pillarViewerItems(pillar: HooklinePillar, numbers: FigureNumbers): ImageViewerItem[] {
  const items: ImageViewerItem[] = [
    {
      alt: pillar.diagram.alt,
      caption: withNumber(numbers.diagram, pillar.diagram.caption),
      image: pillar.diagram.image,
    },
    ...pillar.media.map((item, itemIndex) => ({
      alt: item.alt,
      caption: withNumber(numbers.media[itemIndex], item.caption),
      image: item.image,
    })),
  ];

  if (pillar.compare) {
    items.push(
      {
        alt: pillar.compare.before.alt,
        caption: withNumber(numbers.compare[0], pillar.compare.before.caption),
        image: pillar.compare.before.image,
      },
      {
        alt: pillar.compare.after.alt,
        caption: withNumber(numbers.compare[1], pillar.compare.after.caption),
        image: pillar.compare.after.image,
      },
    );
  }

  return items;
}

export function HooklineCaseStudy() {
  const { architecture, eyebrow, index, intro, links, pillars, summary, title, tools } =
    hooklineCaseStudy;
  const [viewer, setViewer] = useState<{ items: ImageViewerItem[]; index: number } | null>(null);

  function openViewer(items: ImageViewerItem[], startIndex: number) {
    setViewer({ index: startIndex, items });
  }

  const figureNumbers = (() => {
    let current = 0;
    const next = () => {
      current += 1;
      return current;
    };
    const architectureNumbers = architecture.figures.map(() => next());
    const pillarNumbers = pillars.map((pillar) => ({
      diagram: next(),
      media: pillar.media.map(() => next()),
      compare: pillar.compare ? [next(), next()] : [],
    }));
    return { architectureNumbers, pillarNumbers };
  })();

  const architectureItems: ImageViewerItem[] = architecture.figures.map((figure, figureIndex) => ({
    alt: figure.alt,
    caption: withNumber(figureNumbers.architectureNumbers[figureIndex], figure.caption),
    image: figure.image,
  }));

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/portfolio">
        ← back
      </Link>

      <header className="mt-10 border-b-[3px] border-[var(--rule)] pb-12">
        <p className="font-mono text-sm font-black text-[var(--accent)]">{index}</p>
        <p className="eyebrow mt-4">{eyebrow}</p>
        <Heading className="mt-4" level={1}>
          {title}
        </Heading>
        <RichText
          className="mt-6 max-w-[34rem] text-lg font-semibold italic leading-8 text-[var(--muted)]"
          text={summary}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              className="editorial-button"
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
      </header>

      <section className="border-b-[3px] border-[var(--rule)] py-12">
        <p className="text-[1.05rem] leading-[1.8] text-[var(--text)]">{intro}</p>
      </section>

      <section className="border-b-[3px] border-[var(--rule)] py-12" id="system-architecture">
        <SectionHeading title="How the system works" />
        <p className="mt-4 text-base leading-7 text-[var(--text)]">
          Every step of the pipeline runs on one of these tools.
        </p>
        <ul className="mt-8 border-t-2 border-[var(--rule)]">
          {tools.map((tool) => (
            <li
              className="grid gap-1 border-b border-[var(--rule-soft)] py-3 sm:grid-cols-[11rem_1fr] sm:gap-6"
              key={tool.name}
            >
              <p className="font-mono text-sm font-black text-[var(--text)]">{tool.name}</p>
              <p className="text-sm leading-6 text-[var(--muted)]">{tool.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 space-y-8">
          {architecture.figures.map((figure, figureIndex) => (
            <FullFigure
              figure={figure}
              key={figure.image.src}
              number={figureNumbers.architectureNumbers[figureIndex]}
              onOpen={() => openViewer(architectureItems, figureIndex)}
            />
          ))}
        </div>
      </section>

      {pillars.map((pillar, pillarIndex) => {
        const numbers = figureNumbers.pillarNumbers[pillarIndex];
        const items = pillarViewerItems(pillar, numbers);
        const compareOffset = 1 + pillar.media.length;

        return (
          <section className="border-b-[3px] border-[var(--rule)] py-12" id={pillar.id} key={pillar.id}>
            <SectionHeading index={pillar.index} title={pillar.title} />

            <div className="mt-6">
              <RichText className="text-base leading-7 text-[var(--text)]" text={pillar.body} />

              {pillar.notes && pillar.notes.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {pillar.notes.map((note) => (
                    <li className="flex gap-2 text-sm leading-6 text-[var(--muted)]" key={note}>
                      <span aria-hidden="true" className="mt-[0.55rem] h-[2px] w-3 shrink-0 bg-[var(--accent)]" />
                      <RichText text={note} />
                    </li>
                  ))}
                </ul>
              ) : null}

              {pillar.gates && pillar.gates.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[30rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-[var(--rule)]">
                        <th className={`${thClass} w-[22%]`}>Check</th>
                        <th className={`${thClass} w-[24%]`}>Tool</th>
                        <th className={`${thClass} w-[24%]`}>When it runs</th>
                        <th className={`${thClass} w-[30%]`}>What it blocks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Style and terminology</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Vale</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Errors block the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Spelling</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">codespell</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Any known misspelling blocks the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Front matter</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">check-frontmatter.js (Node)</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Missing or malformed metadata blocks the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Internal links and build</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Docusaurus</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Any broken internal link blocks the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Code examples</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">check-docs-code-examples.mjs (Node)</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Any curl or CLI example that does not match the product blocks the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">Agent-file parity</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">validate-agent-files.js and Node tests</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Any missing or broken agent file blocks the merge</td>
                      </tr>
                      <tr className="border-b border-[var(--rule-soft)] align-top">
                        <td className="py-3 pr-4 font-semibold text-[var(--text)]">External links</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Lychee</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Pull request</td>
                        <td className="py-3 pr-4 text-sm leading-6 text-[var(--muted)]">Any dead URL blocks the merge</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null}

              {pillar.files && pillar.files.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-[var(--rule)]">
                        <th className={`${thClass} w-[26%]`}>Output</th>
                        <th className={`${thClass} w-[37%]`}>URL</th>
                        <th className={`${thClass} w-[37%]`}>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pillar.files.map((row) => (
                        <tr className="border-b border-[var(--rule-soft)] align-top last:border-b-0" key={row.output}>
                          <td className="py-3 pr-4 text-sm font-semibold text-[var(--text)]">
                            <RichText text={row.output} />
                          </td>
                          <td className="py-3 pr-4 text-sm text-[var(--muted)]">
                            <RichText text={row.url} />
                          </td>
                          <td className="py-3 pr-4 text-sm text-[var(--muted)]">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col gap-10">
              <figure>
                <div className="relative">
                  <Image
                    alt={pillar.diagram.alt}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 45rem, 100vw"
                    src={pillar.diagram.image}
                  />
                  <ZoomButton
                    label={pillar.diagram.alt}
                    onOpen={() => openViewer(items, 0)}
                  />
                </div>
                <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {withNumber(numbers.diagram, pillar.diagram.caption)}
                </figcaption>
              </figure>

              <MediaSlideshow
                figureNumbers={numbers.media}
                onOpenImage={(slideIndex) => openViewer(items, 1 + slideIndex)}
                slides={pillar.media}
              />

              {pillar.compare
                ? [pillar.compare.before, pillar.compare.after].map((item, itemIndex) => (
                    <figure key={item.label}>
                      <p className="eyebrow">{item.label}</p>
                      <div className="relative mt-2">
                        <Image
                          alt={item.alt}
                          className="h-auto w-full"
                          sizes="(min-width: 1024px) 45rem, 100vw"
                          src={item.image}
                        />
                        <ZoomButton
                          label={item.alt}
                          onOpen={() => openViewer(items, compareOffset + itemIndex)}
                        />
                      </div>
                      <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        <RichText
                          text={withNumber(numbers.compare[itemIndex], item.caption)}
                        />
                      </figcaption>
                    </figure>
                  ))
                : null}
            </div>

            <div className="mt-10">
              <a
                className="editorial-button"
                href={pillar.proof.href}
                rel="noreferrer"
                target="_blank"
              >
                {pillar.proof.label}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </section>
        );
      })}

      {viewer ? (
        <ImageViewer
          index={viewer.index}
          items={viewer.items}
          onClose={() => setViewer(null)}
          onIndexChange={(next) =>
            setViewer((current) => (current ? { ...current, index: next } : current))
          }
        />
      ) : null}
    </main>
  );
}
