import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Heading } from "@/components/Heading";
import { MediaSlideshow } from "@/components/MediaSlideshow";
import { RichText } from "@/components/RichText";
import { hooklineCaseStudy } from "@/content/hooklineCaseStudy";

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

function FullFigure({
  alt,
  caption,
  image,
}: {
  alt: string;
  caption?: string;
  image: StaticImageData;
}) {
  return (
    <figure>
      <a
        className="link-ring block border-2 border-[var(--rule)] bg-[var(--background)]"
        href={image.src}
        rel="noreferrer"
        target="_blank"
      >
        <Image alt={alt} className="h-auto w-full" sizes="(min-width: 1024px) 72rem, 100vw" src={image} />
      </a>
      {caption ? (
        <figcaption className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function HooklineCaseStudy() {
  const { agentFiles, architecture, eyebrow, index, links, pillars, proofOfWork, summary, title, tools } =
    hooklineCaseStudy;

  return (
    <main className="editorial-shell py-16">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/portfolio">
        ← back
      </Link>

      <header className="mt-10 border-b-[3px] border-[var(--rule)] pb-12">
        <p className="font-mono text-sm font-black text-[var(--accent)]">{index}</p>
        <p className="eyebrow mt-4">{eyebrow}</p>
        <Heading className="mt-4 max-w-4xl" level={1}>
          {title}
        </Heading>
        <RichText
          className="mt-6 max-w-3xl text-lg font-semibold italic leading-8 text-[var(--muted)]"
          text={summary}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link) => (
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
      </header>

      <section className="border-b-[3px] border-[var(--rule)] py-12" id="system-architecture">
        <SectionHeading title="System Architecture" />
        <div className="mt-8 space-y-10">
          {architecture.figures.map((figure) => (
            <FullFigure
              alt={figure.alt}
              caption={figure.caption}
              image={figure.image}
              key={figure.image.src}
            />
          ))}
        </div>
      </section>

      <section className="border-b-[3px] border-[var(--rule)] py-12" id="tools">
        <SectionHeading title="Tools Used" />
        <ul className="mt-8 border-t-2 border-[var(--rule)]">
          <li className="hidden gap-4 border-b border-[var(--rule-soft)] pb-2 pt-2 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)] sm:grid sm:grid-cols-[13rem_1fr_auto]">
            <span>Tool</span>
            <span>Role</span>
            <span>Blocks</span>
          </li>
          {tools.map((tool) => (
            <li
              className="grid gap-1 border-b border-[var(--rule-soft)] py-3 sm:grid-cols-[13rem_1fr_auto] sm:items-baseline sm:gap-4"
              key={tool.name}
            >
              <p className="font-mono text-sm font-black text-[var(--text)]">{tool.name}</p>
              <p className="text-sm leading-6 text-[var(--muted)]">{tool.role}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--accent)]">{tool.blocks}</p>
            </li>
          ))}
        </ul>
      </section>

      {pillars.map((pillar) => (
        <section className="border-b-[3px] border-[var(--rule)] py-12" id={pillar.id} key={pillar.id}>
          <SectionHeading index={pillar.index} title={pillar.title} />

          {pillar.wide ? (
            <div className="mt-8 space-y-8">
              <FullFigure alt={pillar.diagram.alt} image={pillar.diagram.image} />
              <div className="mx-auto lg:max-w-4xl">
                <MediaSlideshow slides={pillar.media} title={pillar.title} />
              </div>
            </div>
          ) : (
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
              <figure>
                <a
                  className="link-ring block border-2 border-[var(--rule)] bg-[var(--background)]"
                  href={pillar.diagram.image.src}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={pillar.diagram.alt}
                    className="h-auto w-full"
                    height={pillar.diagram.image.height}
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    src={pillar.diagram.image}
                    width={pillar.diagram.image.width}
                  />
                </a>
              </figure>
              <MediaSlideshow slides={pillar.media} title={pillar.title} />
            </div>
          )}

          {pillar.compare ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {[pillar.compare.before, pillar.compare.after].map((item) => (
                <figure key={item.label}>
                  <p className="eyebrow">{item.label}</p>
                  <a
                    className="link-ring mt-3 block border-2 border-[var(--rule)] bg-[var(--background)]"
                    href={item.image.src}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="relative block aspect-[16/9] overflow-hidden">
                      <Image
                        alt={item.alt}
                        className="object-cover object-top"
                        fill
                        sizes="(min-width: 768px) 32rem, 100vw"
                        src={item.image}
                      />
                    </span>
                  </a>
                  <figcaption className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    <RichText text={item.caption} />
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}

          <div className="mt-8 max-w-3xl">
            <RichText className="text-base leading-7 text-[var(--text)]" text={pillar.body} />
            {pillar.notes ? (
              <ul className="mt-4 space-y-2">
                {pillar.notes.map((note) => (
                  <li className="flex gap-2 text-sm leading-6 text-[var(--muted)]" key={note}>
                    <span aria-hidden="true" className="mt-[0.55rem] h-[2px] w-3 shrink-0 bg-[var(--accent)]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <a
              className="editorial-button editorial-button-dark mt-6 gap-2 px-4 py-3"
              href={pillar.proof.href}
              rel="noreferrer"
              target="_blank"
            >
              {pillar.proof.label}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      ))}

      <section className="border-b-[3px] border-[var(--rule)] py-12" id="agent-files">
        <SectionHeading title="Agent-Facing Documentation" />
        <RichText className="mt-4 max-w-2xl text-base leading-7 text-[var(--text)]" text={agentFiles.lead} />
        <div className="mt-6 overflow-x-auto border-2 border-[var(--rule)]">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[var(--rule)]">
                <th className="px-3 py-2 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                  Output
                </th>
                <th className="px-3 py-2 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                  URL
                </th>
                <th className="px-3 py-2 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {agentFiles.rows.map((row) => (
                <tr className="border-b border-[var(--rule-soft)] align-top last:border-b-0" key={row.output}>
                  <td className="px-3 py-3 text-sm font-semibold text-[var(--text)]">
                    <RichText text={row.output} />
                  </td>
                  <td className="px-3 py-3 text-sm text-[var(--muted)]">
                    <RichText text={row.url} />
                  </td>
                  <td className="px-3 py-3 text-sm text-[var(--muted)]">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-12" id="proof-of-work">
        <SectionHeading title="Proof of Work" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {proofOfWork.map((item, itemIndex) => (
            <a
              className="link-ring flex flex-col justify-between border-2 border-[var(--rule)] p-5"
              href={item.href}
              key={`${item.title}-${itemIndex}`}
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <p className="font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                  Scenario {itemIndex + 1}
                </p>
                <p className="mt-2 text-base font-black leading-6 text-[var(--text)]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              </div>
              <p className="mt-5 inline-flex items-center gap-1 font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-[var(--accent)]">
                View PR
                <ArrowUpRight size={12} />
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
