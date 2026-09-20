import { Heading, type HeadingLevel } from "@/components/Heading";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: HeadingLevel;
};

export function SectionHeader({ eyebrow, title, description, level = 2 }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="mt-3" level={level}>
        {title}
      </Heading>
      {description ? <p className="mt-4 text-lg leading-8 text-sand">{description}</p> : null}
    </div>
  );
}
