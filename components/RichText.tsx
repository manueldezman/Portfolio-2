const CODE_SPAN_PATTERN = /`([^`]+)`/g;

export function RichText({ text, className }: { text: string; className?: string }) {
  if (!text.includes("`")) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.split(CODE_SPAN_PATTERN).map((part, index) =>
        index % 2 === 1 ? (
          <code
            className="rounded-sm border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--text)_7%,transparent)] px-1.5 py-0.5 font-mono text-[0.85em] font-semibold not-italic text-[var(--text)]"
            key={index}
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
}
