import { proofItems } from "@/content/proof";

export function ProofBar() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {proofItems.map((item) => (
        <div className="terminal-card p-5" key={item.label}>
          <p className="font-mono text-3xl font-bold text-accent">{item.value}</p>
          <p className="mt-2 text-sm leading-6 text-sand">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
