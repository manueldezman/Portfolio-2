import { Construction } from "lucide-react";
import { Heading } from "@/components/Heading";

type PlaceholderPanelProps = {
  title: string;
  description: string;
};

export function PlaceholderPanel({ title, description }: PlaceholderPanelProps) {
  return (
    <div className="rounded-3xl border border-dashed border-accent/35 bg-accent/[0.06] p-6">
      <div className="flex items-center gap-3">
        <Construction className="text-accent" size={20} />
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">Structured Placeholder</p>
      </div>
      <Heading className="mt-4" level={3}>
        {title}
      </Heading>
      <p className="mt-3 leading-7 text-sand">{description}</p>
    </div>
  );
}
