const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function RichText({ text, className }: { text: string; className?: string }) {
  if (!text.includes("`") && !text.includes("**")) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.split(INLINE_PATTERN).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong className="font-semibold text-[var(--text)]" key={index}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              className="rounded-sm border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--text)_7%,transparent)] px-1.5 py-0.5 font-mono text-[0.85em] font-semibold not-italic text-[var(--text)]"
              key={index}
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        return part;
      })}
    </p>
  );
}
