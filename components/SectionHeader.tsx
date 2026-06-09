type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-sand">{description}</p> : null}
    </div>
  );
}
