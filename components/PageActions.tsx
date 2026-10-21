"use client";

import { Check, ChevronDown, Copy, ExternalLink, FileText, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

const SITE = "https://0xdezman.cv";

type PageActionsProps = {
  className?: string;
  markdownPath?: string;
};

type CopyState = "idle" | "copied" | "error";

const itemClass =
  "link-ring flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.8rem] leading-5 text-[var(--muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--rule)_6%,transparent)]";

export function PageActions({ className, markdownPath }: PageActionsProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [origin, setOrigin] = useState(SITE);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const openIntentRef = useRef<"pointer" | "keyboard">("pointer");
  const menuId = useId();

  const resolvedMarkdownPath = markdownPath ?? `${pathname.replace(/\/+$/, "")}.md`;
  const markdownUrl = new URL(resolvedMarkdownPath, origin).toString();
  const prompt = `Read this Markdown page so I can ask you questions about it. ${markdownUrl}`;
  const encodedPrompt = encodeURIComponent(prompt);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open || openIntentRef.current !== "keyboard") return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function flashCopyState(state: Exclude<CopyState, "idle">) {
    setCopyState(state);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState("idle"), 2200);
  }

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  async function writeClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // Fall through to the legacy path when Clipboard API access is denied.
      }
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    if (!copied) throw new Error("Copy command failed");
  }

  async function copyPage() {
    closeMenu();
    try {
      const response = await fetch(resolvedMarkdownPath);
      if (!response.ok) throw new Error(`Markdown request failed with ${response.status}`);
      await writeClipboard(await response.text());
      flashCopyState("copied");
    } catch {
      flashCopyState("error");
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    if (!items.length) return;

    const current = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        items[(current + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        items[(current - 1 + items.length) % items.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  const TriggerIcon = copyState === "copied" ? Check : copyState === "error" ? X : Copy;
  const triggerLabel =
    copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy page";
  const triggerStateClass =
    copyState === "copied"
      ? "text-[var(--teal)]"
      : copyState === "error"
        ? "text-[var(--accent)]"
        : "";

  return (
    <div className={["relative inline-flex", className].filter(Boolean).join(" ")} ref={rootRef}>
      <button
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        className={[
          "link-ring inline-flex h-8 min-w-[8.25rem] items-center justify-center gap-1.5 rounded-[0.65rem] border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--rule)_6%,transparent)] px-2.5 font-mono text-[0.68rem] font-bold tracking-[0.06em] text-[var(--muted)]",
          triggerStateClass,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            openIntentRef.current = "keyboard";
            return;
          }
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          openIntentRef.current = "keyboard";
          if (!open) {
            setOpen(true);
            return;
          }
          const items = Array.from(
            menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
          );
          const target = event.key === "ArrowUp" ? items[items.length - 1] : items[0];
          target?.focus();
        }}
        onPointerDown={() => {
          openIntentRef.current = "pointer";
        }}
        ref={triggerRef}
        type="button"
      >
        <TriggerIcon aria-hidden="true" size={13} />
        <span>{triggerLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          size={13}
        />
      </button>

      <span aria-live="polite" className="sr-only">
        {copyState === "copied" ? "Copied to clipboard" : copyState === "error" ? "Copy failed" : ""}
      </span>

      {open ? (
        <div
          aria-label="Page actions"
          className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-2.5rem)] rounded-xl border border-[var(--rule-soft)] bg-[var(--surface)] p-1 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]"
          id={menuId}
          onKeyDown={handleMenuKeyDown}
          ref={menuRef}
          role="menu"
        >
          <button className={itemClass} onClick={copyPage} role="menuitem" type="button">
            <Copy aria-hidden="true" size={14} />
            <span>Copy page</span>
          </button>
          <a
            className={itemClass}
            href={markdownUrl}
            onClick={closeMenu}
            rel="noreferrer"
            role="menuitem"
            target="_blank"
          >
            <FileText aria-hidden="true" size={14} />
            <span>View as Markdown</span>
          </a>

          <div className="my-1 h-px bg-[var(--rule-soft)]" role="separator" />

          <a
            className={itemClass}
            href={`https://chatgpt.com/?q=${encodedPrompt}`}
            onClick={closeMenu}
            rel="noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>Open in ChatGPT</span>
          </a>
          <a
            className={itemClass}
            href={`https://claude.ai/new?q=${encodedPrompt}`}
            onClick={closeMenu}
            rel="noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>Open in Claude</span>
          </a>
          <a
            className={itemClass}
            href={`https://www.perplexity.ai/search?q=${encodedPrompt}`}
            onClick={closeMenu}
            rel="noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>Open in Perplexity</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
