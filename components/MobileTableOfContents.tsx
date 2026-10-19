import { ChevronDown } from "lucide-react";

type TocItem = readonly [id: string, label: string];

type MobileTableOfContentsProps = {
  className?: string;
  items: readonly TocItem[];
  label?: string;
};

export function MobileTableOfContents({
  className,
  items,
  label = "On this page",
}: MobileTableOfContentsProps) {
  return (
    <details
      className={[
        "group rounded-xl bg-[color-mix(in_srgb,var(--rule)_6%,transparent)] px-4 py-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <summary className="link-ring flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--text)] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
          size={15}
        />
      </summary>
      <nav aria-label={label} className="mt-3 flex flex-col border-l border-[var(--rule-soft)]">
        {items.map(([id, text]) => (
          <a
            className="link-ring block py-1.5 pl-4 pr-2 text-sm leading-6 text-[var(--muted)]"
            href={`#${id}`}
            key={id}
          >
            {text}
          </a>
        ))}
      </nav>
    </details>
  );
}
