"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-start gap-3">
      <code className="min-w-0 flex-1 overflow-x-auto border border-[var(--rule-soft)] bg-[var(--surface)] px-3 py-2 font-mono text-xs leading-6 text-[var(--text)]">
        {command}
      </code>
      <button className="editorial-button" onClick={handleCopy} type="button">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy command"}
      </button>
    </div>
  );
}
