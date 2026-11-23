"use client";

import { Check, Copy } from "lucide-react";
import { useId, useState } from "react";

type CodeBlockProps = {
  code: string;
  label: string;
  expandable?: boolean;
  className?: string;
};

export function CodeBlock({ code, label, expandable = false, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  const lineCount = code.split("\n").length;
  const clamped = expandable && lineCount > 10;
  const clipped = clamped && !expanded;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-surface)] font-mono text-sm leading-7 text-[var(--code-text)] shadow-[var(--code-shadow)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--code-rule)] px-4 py-2">
        <span className="text-[13px] text-[var(--code-muted)]">{label}</span>
        <button
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--code-muted)] transition-colors hover:bg-[rgba(238,232,221,0.08)] hover:text-[var(--code-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          onClick={handleCopy}
          title={copied ? "Copied" : "Copy"}
          type="button"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <div className="relative">
        <pre
          className={`m-0 px-4 py-4 ${
            clipped ? "max-h-[18.5rem] overflow-x-auto overflow-y-hidden" : "overflow-x-auto"
          }`}
          id={bodyId}
        >
          <code className="block whitespace-pre">{code}</code>
        </pre>
        {clipped ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--code-surface)]"
          />
        ) : null}
      </div>

      {clamped ? (
        <button
          aria-controls={bodyId}
          aria-expanded={expanded}
          className="w-full border-t border-[var(--code-rule)] px-4 py-2 text-[13px] text-[var(--code-muted)] transition-colors hover:bg-[rgba(238,232,221,0.06)] hover:text-[var(--code-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-current"
          onClick={() => setExpanded((current) => !current)}
          type="button"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      ) : null}
    </div>
  );
}
