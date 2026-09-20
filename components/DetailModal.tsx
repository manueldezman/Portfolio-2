"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { Heading } from "@/components/Heading";

type DetailModalProps = {
  eyebrow: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function DetailModal({ eyebrow, title, onClose, children }: DetailModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    dialog?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
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
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[color-mix(in_srgb,var(--background)_82%,black)] p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto border-2 border-[var(--rule)] bg-[var(--background)] shadow-2xl sm:max-h-[88vh]"
        id={`modal-${titleId}`}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b-2 border-[var(--rule)] bg-[var(--background)] p-6">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              {eyebrow}
            </p>
            <Heading className="mt-3" id={titleId} level={2}>
              {title}
            </Heading>
          </div>
          <button
            aria-label="Close details"
            className="link-ring border-2 border-[var(--rule)] p-2 text-[var(--text)]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
