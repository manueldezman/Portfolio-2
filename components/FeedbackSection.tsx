"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";

const SNIPPET_LENGTH = 110;

function snippet(text: string, maxLength = SNIPPET_LENGTH) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

function RelatedWork({ href, label, meta }: { href: string; label: string; meta: string }) {
  const content = (
    <>
      <p className="font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
        Related case study
      </p>
      <p className="mt-2 font-bold leading-6 text-[var(--text)]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{meta}</p>
      <ArrowUpRight className="absolute right-3 top-3 text-[var(--text)]" size={14} />
    </>
  );

  const className =
    "link-ring relative block border border-[var(--rule-soft)] bg-[var(--surface)] px-4 py-3 pr-10";

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: (typeof testimonials)[number];
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      aria-labelledby="testimonial-modal-heading"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />

      <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto border border-[var(--rule-soft)] bg-[var(--surface)] p-6 shadow-2xl">
        <button
          ref={closeButtonRef}
          aria-label="Close testimonial"
          className="link-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-[var(--rule-soft)] text-[var(--text)] transition-colors hover:bg-[var(--rule-soft)]"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <p
          className="pr-10 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]"
          id="testimonial-modal-heading"
        >
          {testimonial.name} · {testimonial.role}
        </p>

        <blockquote className="mt-4 text-lg font-semibold leading-8 text-[var(--text)]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{testimonial.caption}</p>

        <div className="mt-6 border-t border-[var(--rule-soft)] pt-5">
          <RelatedWork
            href={testimonial.href}
            label={testimonial.relatedLabel}
            meta={testimonial.relatedMeta}
          />
        </div>
      </div>
    </div>
  );
}

export function FeedbackSection() {
  const [expanded, setExpanded] = useState<(typeof testimonials)[number] | null>(null);

  return (
    <div className="feedback-carousel mt-8 overflow-hidden">
      <div className="feedback-track flex w-max gap-5">
        {[...testimonials, ...testimonials].map((testimonial, itemIndex) => (
          <article className="feedback-card feedback-card-enter w-[17rem] shrink-0 md:w-[19rem]" key={`${testimonial.name}-${itemIndex}`}>
            <button
              className="block w-full text-left"
              onClick={() => setExpanded(testimonial)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rule-soft)] bg-[var(--surface-strong)] font-mono text-sm font-bold text-[var(--background)]">
                  {testimonial.name.slice(0, 1).toUpperCase()}
                </span>
                <p className="min-w-0 truncate font-mono text-sm font-bold text-[var(--text)]">
                  @{testimonial.name} <span className="font-normal text-[var(--muted)]">({testimonial.role})</span>
                </p>
              </div>
              <blockquote className="mt-5 truncate border-b border-[var(--rule-soft)] pb-3 text-base leading-7 text-[var(--text)]">
                &ldquo;{snippet(testimonial.quote)}&rdquo;
              </blockquote>
              <p className="mt-3 text-right text-xs text-[var(--muted)]">Read full review</p>
            </button>
          </article>
        ))}
      </div>

      {expanded && <TestimonialModal testimonial={expanded} onClose={() => setExpanded(null)} />}
    </div>
  );
}
