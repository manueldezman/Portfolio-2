"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "@/components/DetailModal";
import { Heading } from "@/components/Heading";
import type { CommunityActivity, DeveloperCommunityEntry } from "@/content/portfolio";

type DeveloperCommunityProps = {
  entries: DeveloperCommunityEntry[];
};

export function DeveloperCommunity({ entries }: DeveloperCommunityProps) {
  const [selectedActivity, setSelectedActivity] = useState<CommunityActivity | null>(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const event =
    entries.find((entry): entry is Extract<DeveloperCommunityEntry, { kind: "event" }> => entry.kind === "event")
      ?.event ?? null;

  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {entries.map((entry) =>
          entry.kind === "activity" ? (
            <li className="leading-7" key={entry.activity.title}>
              <button
                className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                onClick={() => setSelectedActivity(entry.activity)}
                type="button"
              >
                {entry.activity.title}
              </button>
              <span className="text-[var(--muted)]"> — {entry.activity.label}</span>
            </li>
          ) : (
            <li className="leading-7" key={entry.event.title}>
              <button
                className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                onClick={() => setEventDetailsOpen(true)}
                type="button"
              >
                {entry.event.title}
              </button>
              <span className="text-[var(--muted)]"> — {entry.event.label}</span>
            </li>
          ),
        )}
      </ul>

      {selectedActivity ? (
        <DetailModal
          eyebrow={selectedActivity.label}
          title={selectedActivity.title}
          onClose={() => setSelectedActivity(null)}
        >
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{selectedActivity.detail}</p>

          {selectedActivity.fields.length ? (
            <dl className="mt-6 space-y-4">
              {selectedActivity.fields.map((field) => (
                <div key={field.label}>
                  <dt className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--text)]">{field.label}</dt>
                  <dd className="mt-1 leading-7 text-[var(--muted)]">{field.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {selectedActivity.images?.length ? (
            <div className="mt-6 space-y-7">
              {selectedActivity.images.map((image) => (
                <figure key={image.caption}>
                  <Image
                    alt={image.alt}
                    className="h-auto w-full"
                    sizes="(min-width: 768px) 90vw, 100vw"
                    src={image.image}
                  />
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
                        <ArrowUpRight size={13} />
                      </a>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </DetailModal>
      ) : null}

      {eventDetailsOpen && event ? (
        <DetailModal eyebrow={event.label} title={event.title} onClose={() => setEventDetailsOpen(false)}>
          <div className="space-y-7">
            <dl className="space-y-4">
              {event.fields.map((field) => (
                <div key={field.label}>
                  <dt className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--text)]">{field.label}</dt>
                  <dd className="mt-1 leading-7 text-[var(--muted)]">{field.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="space-y-2">
              {event.proofLinks.map((link) => (
                <li className="leading-7" key={link.href}>
                  <a
                    className="link-ring inline-flex items-center gap-1 font-semibold text-[var(--accent)] underline underline-offset-4"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              {event.images.map((image) => (
                <figure key={image.caption}>
                  <div className={`relative ${image.lead ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                      alt={image.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 90vw, 100vw"
                      src={image.image}
                    />
                  </div>
                  <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">{image.caption}</figcaption>
                </figure>
              ))}
            </div>

            <section>
              <Heading level={3}>Attendee feedback</Heading>
              <p className="mt-2 font-semibold leading-7 text-[var(--text)]">
                {event.feedback.title}
              </p>
              <figure className="mt-4">
                <div className="relative aspect-[1170/484]">
                  <Image
                    alt={event.feedback.image.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 90vw, 100vw"
                    src={event.feedback.image.image}
                  />
                </div>
                <figcaption className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {event.feedback.image.caption}
                </figcaption>
              </figure>
            </section>
          </div>
        </DetailModal>
      ) : null}
    </div>
  );
}
