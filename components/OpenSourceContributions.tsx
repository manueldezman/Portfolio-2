"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DetailModal } from "@/components/DetailModal";
import { Heading } from "@/components/Heading";
import { RichText } from "@/components/RichText";
import type { OpenSourceContributionLink, OpenSourceRepository } from "@/content/portfolio";

function ContributionLinkList({ links }: { links: OpenSourceContributionLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 space-y-2">
      {links.map((link) => (
        <li className="leading-6" key={link.href}>
          <a
            className="link-ring inline-flex items-center gap-1 font-semibold text-[var(--accent)] underline underline-offset-4"
            href={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
            <ArrowUpRight size={13} />
          </a>
          <span className="text-[var(--muted)]"> — {link.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function OpenSourceContributions({ repositories }: { repositories: OpenSourceRepository[] }) {
  const [selection, setSelection] = useState<{ repositoryIndex: number; contributionIndex: number } | null>(null);
  const selectedRepository = selection ? repositories[selection.repositoryIndex] : null;
  const selectedContribution = selection ? selectedRepository?.contributions[selection.contributionIndex] : null;
  const otherRepositoryLinks = selectedContribution
    ? (selectedRepository?.prLinks ?? []).filter(
        (prLink) => !selectedContribution.links.some((link) => link.href === prLink.href),
      )
    : [];

  return (
    <div className="mt-4 space-y-7">
      {repositories.map((repository, repositoryIndex) => {
        const repositoryId = repository.repository.replace("/", "-").toLowerCase();

        return (
          <div className="scroll-mt-28" id={repositoryId} key={repository.repository}>
            <div className="space-y-7">
              {repository.contributions.map((contribution, contributionIndex) => (
                <article className="group" key={`${repository.repository}-${contribution.title}`}>
                  <h3 className="text-sm font-semibold leading-7 text-[var(--text)]">
                    <button
                      className="link-ring text-left underline decoration-[var(--rule-soft)] underline-offset-4 transition-colors duration-150 group-hover:text-[var(--accent)]"
                      onClick={() => setSelection({ repositoryIndex, contributionIndex })}
                      type="button"
                    >
                      {contribution.title}
                    </button>{" "}
                    <span className="font-normal text-[var(--muted)]">— {repository.organization}</span>
                  </h3>
                </article>
              ))}
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              {`${repository.prLinks.length} merged PR${
                repository.prLinks.length === 1 ? "" : "s"
              } to this repository`}
            </p>
          </div>
        );
      })}

      {selectedRepository && selectedContribution ? (
        <DetailModal
          eyebrow={selectedRepository.repository}
          title={selectedContribution.title}
          onClose={() => setSelection(null)}
        >
          <div className="grid gap-6">
            {[
              ["Problem", selectedContribution.problem],
              ["Contribution", selectedContribution.contribution],
              ["Impact", selectedContribution.impact],
            ].map(([label, value]) => (
              <section key={label}>
                <Heading level={3}>{label}</Heading>
                <RichText className="mt-2 leading-7 text-[var(--muted)]" text={value} />
              </section>
            ))}

            {selectedContribution.image ? (
              <figure>
                <Image
                  alt={selectedContribution.image.alt}
                  className="h-auto w-full border border-[var(--rule-soft)]"
                  sizes="(min-width: 1024px) 960px, 100vw"
                  src={selectedContribution.image.image}
                />
                <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm leading-6 text-[var(--muted)]">
                  <span>{selectedContribution.image.caption}</span>
                  <a
                    className="link-ring font-semibold text-[var(--accent)] underline underline-offset-4"
                    href={selectedContribution.image.image.src}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View full size
                  </a>
                </figcaption>
              </figure>
            ) : null}

            <section>
              <Heading level={3}>Links for this contribution</Heading>
              <ContributionLinkList links={selectedContribution.links} />
            </section>

            {otherRepositoryLinks.length > 0 ? (
              <section className="border-t border-[var(--rule-soft)] pt-6">
                <Heading level={3}>Other contributions to this repository</Heading>
                <ContributionLinkList links={otherRepositoryLinks} />
              </section>
            ) : null}
          </div>
        </DetailModal>
      ) : null}
    </div>
  );
}
