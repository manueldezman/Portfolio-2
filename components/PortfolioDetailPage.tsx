import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CopyCommand } from "@/components/CopyCommand";
import { Heading } from "@/components/Heading";
import { RichText } from "@/components/RichText";
import type { DetailField, DetailImage, DetailLink, PortfolioDetail } from "@/content/portfolioDetails";

const kindLabels: Record<PortfolioDetail["kind"], string> = {
  readiness: "API documentation",
  article: "Tutorial",
  contribution: "Open-source contribution",
  activity: "Developer community",
  event: "Developer community",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Heading level={2}>{title}</Heading>
      {children}
    </section>
  );
}

function LinkList({ links }: { links: DetailLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 space-y-2">
      {links.map((link) => (
        <li className="leading-7" key={link.href}>
          <a
            className="link-ring inline-flex flex-wrap items-baseline gap-1 font-semibold text-[var(--accent)] underline underline-offset-4"
            href={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
            <ExternalLink size={13} />
            {link.status ? <span className="font-normal text-[var(--muted)]">— {link.status}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FieldList({ fields }: { fields: DetailField[] }) {
  return (
    <dl className="mt-3 space-y-4">
      {fields.map((field) => (
        <div key={field.label}>
          <dt className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--text)]">{field.label}</dt>
          <dd className="mt-1 leading-7 text-[var(--muted)]">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Figure({ image }: { image: DetailImage }) {
  return (
    <figure className="mt-4">
      <Image alt={image.alt} className="h-auto w-full" sizes="(min-width: 768px) 768px, 100vw" src={image.image} />
      <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm leading-6 text-[var(--muted)]">
        <span>{image.caption}</span>
        {image.link ? (
          <a
            className="link-ring inline-flex items-center gap-1 font-semibold text-[var(--accent)] underline underline-offset-4"
            href={image.link.href}
            rel="noreferrer"
            target="_blank"
          >
            {image.link.label}
            <ExternalLink size={13} />
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function PortfolioDetailPage({ detail }: { detail: PortfolioDetail }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/portfolio">
        ← back
      </Link>

      <div className="mt-6 border-b-2 border-[var(--rule)] pb-6">
        <p className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[var(--accent)]">
          {kindLabels[detail.kind]}
        </p>
        <Heading className="mt-2" level={1}>
          {detail.title}
        </Heading>
        {detail.summary ? (
          <p className="mt-4 text-lg font-semibold italic leading-8 text-[var(--muted)]">{detail.summary}</p>
        ) : null}
        {detail.kind === "readiness" || detail.kind === "article" ? (
          <div className="mt-6">
            <a className="editorial-button" href={detail.href} rel="noreferrer" target="_blank">
              {detail.kind === "readiness" ? "Read the documentation" : "Read the article"}
              <ExternalLink size={13} />
            </a>
          </div>
        ) : null}
      </div>

      <div className="mt-10 space-y-10">
        {detail.kind === "readiness" ? (
          <>
            <Section title="AI readiness result">
              <Figure image={{ alt: detail.readiness.image.alt, caption: detail.readiness.image.caption, image: detail.readiness.image.image }} />
            </Section>
            <Section title="Verify it yourself">
              <RichText
                className="mt-2 leading-7 text-[var(--muted)]"
                text="Run the same check against the published docs to reproduce the score."
              />
              <CopyCommand command={detail.readiness.command} />
            </Section>
            <Section title="Tools used">
              <ul className="mt-3 space-y-2">
                {detail.readiness.tools.map((tool) => (
                  <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1 leading-7" key={tool.name}>
                    <span className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--text)]">
                      {tool.name}
                    </span>
                    <span className="text-[var(--muted)]">{tool.role}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="What made it agent-ready">
              <ul className="mt-3 space-y-3">
                {detail.readiness.practices.map((practice) => (
                  <li className="flex gap-3" key={practice}>
                    <span aria-hidden className="text-[var(--accent)]">
                      —
                    </span>
                    <RichText className="flex-1 leading-7 text-[var(--muted)]" text={practice} />
                  </li>
                ))}
              </ul>
            </Section>
          </>
        ) : null}

        {detail.kind === "article" ? (
          <>
            <Section title="Why I wrote it">
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={detail.note.why} />
            </Section>
            <Section title="Who it's for">
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={detail.note.audience} />
            </Section>
            <Section title="How it got published">
              <ol className="mt-3 flex flex-wrap items-center gap-2">
                {detail.note.process.map((step, index) => (
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
              <RichText className="mt-4 leading-7 text-[var(--muted)]" text={detail.note.processNote} />
            </Section>
          </>
        ) : null}

        {detail.kind === "contribution" ? (
          <>
            <Section title="Problem">
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={detail.problem} />
            </Section>
            <Section title="Contribution">
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={detail.contribution} />
            </Section>
            <Section title="Impact">
              <RichText className="mt-2 leading-7 text-[var(--muted)]" text={detail.impact} />
            </Section>
            {detail.image ? (
              <Figure image={{ alt: detail.image.alt, caption: detail.image.caption, image: detail.image.image }} />
            ) : null}
            <Section title="Links for this contribution">
              <LinkList links={detail.links} />
            </Section>
            {detail.otherLinks.length > 0 ? (
              <section className="border-t border-[var(--rule-soft)] pt-8">
                <Heading level={2}>Other contributions to this repository</Heading>
                <LinkList links={detail.otherLinks} />
              </section>
            ) : null}
          </>
        ) : null}

        {detail.kind === "activity" ? (
          <>
            {detail.fields.length > 0 ? (
              <Section title="Details">
                <FieldList fields={detail.fields} />
              </Section>
            ) : null}
            {detail.images.length > 0 ? (
              <Section title="Proof">
                {detail.images.map((image) => (
                  <Figure image={image} key={image.caption} />
                ))}
              </Section>
            ) : null}
          </>
        ) : null}

        {detail.kind === "event" ? (
          <>
            <Section title="Details">
              <FieldList fields={detail.fields} />
            </Section>
            <Section title="Proof links">
              <LinkList links={detail.proofLinks} />
            </Section>
            <Section title="Photos">
              {detail.images.map((image) => (
                <Figure image={image} key={image.caption} />
              ))}
            </Section>
            <Section title="Attendee feedback">
              <p className="mt-3 font-semibold leading-7 text-[var(--text)]">{detail.feedback.title}</p>
              <Figure image={detail.feedback.image} />
            </Section>
          </>
        ) : null}
      </div>
    </main>
  );
}
