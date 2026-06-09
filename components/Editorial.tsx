import type { ReactNode } from "react";

type EditorialPageHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: ReactNode;
};

export function EditorialPageHero({
  index,
  eyebrow,
  title,
  description,
  meta,
}: EditorialPageHeroProps) {
  return (
    <section className="border-b-[3px] border-[var(--rule)] pb-12">
      <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-mono text-sm font-black text-[var(--accent)]">{index}</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.075em] text-[var(--text)] md:text-7xl">
            {title}
          </h1>
        </div>
        <div className="md:pt-12">
          <p className="eyebrow">{eyebrow}</p>
          <p className="mt-6 max-w-xl text-lg font-semibold italic leading-8 text-[var(--muted)]">
            {description}
          </p>
          {meta ? <div className="mt-8">{meta}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function EditorialSectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <span className="font-mono text-xs font-black text-[var(--accent)]">{index}</span>
      <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">{title}</h2>
      <span className="h-px flex-1 bg-[var(--rule-soft)]" />
    </div>
  );
}

export function EditorialMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 border-[var(--rule)] p-6 md:border-l md:first:border-l-0">
      <p className="break-words text-3xl font-black leading-none tracking-[-0.06em] text-[var(--accent)] sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}

export function EditorialTag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-[var(--teal)] bg-[var(--teal-soft)] px-3 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--teal)]">
      {children}
    </span>
  );
}
