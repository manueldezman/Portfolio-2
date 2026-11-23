"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

export type ImageViewerItem = {
  alt: string;
  caption?: string;
  image: StaticImageData;
};

type ImageViewerProps = {
  index: number;
  items: ImageViewerItem[];
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const chromeButton =
  "link-ring inline-flex items-center justify-center border-2 border-[var(--rule)] bg-[var(--background)] p-2 text-[var(--text)]";

export function ImageViewer({ index, items, onClose, onIndexChange }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const navRef = useRef(onIndexChange);
  navRef.current = onIndexChange;
  const indexRef = useRef(index);
  indexRef.current = index;
  const total = items.length;
  const item = items[index];
  const labelId = useId();

  function goTo(next: number) {
    navRef.current(((next % total) + total) % total);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    dialog?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navRef.current(((indexRef.current - 1) % total + total) % total);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navRef.current(((indexRef.current + 1) % total + total) % total);
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [total]);

  return (
    <div
      aria-label="Image viewer"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex flex-col bg-[color-mix(in_srgb,var(--background)_92%,black)] p-2 sm:p-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-[var(--muted)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button aria-label="Close image viewer" className={chromeButton} onClick={onClose} type="button">
          <X size={18} />
        </button>
      </div>

      <div
        className="mt-3 flex min-h-0 flex-1 items-stretch justify-center gap-3"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        {total > 1 ? (
          <button
            aria-label="Previous image"
            className={`${chromeButton} self-center`}
            onClick={() => goTo(index - 1)}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
        ) : null}

        <div
          className="relative flex min-h-0 w-full max-w-5xl items-center justify-center"
          id={labelId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <Image
            alt={item.alt}
            className="object-contain"
            fill
            sizes="100vw"
            src={item.image}
            unoptimized
          />
        </div>

        {total > 1 ? (
          <button
            aria-label="Next image"
            className={`${chromeButton} self-center`}
            onClick={() => goTo(index + 1)}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        ) : null}
      </div>

      <div className="mt-0 min-h-[3.5rem] text-center">
        <p className="mx-auto max-w-3xl text-sm leading-6 text-[var(--muted)]">
          {item.caption ?? item.alt}
        </p>
      </div>
    </div>
  );
}
