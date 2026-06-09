import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { SectionHeader } from "@/components/SectionHeader";
import { socials } from "@/content/socials";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Web resume for Abdulganiy Adeleke, Developer Relations Engineer and Technical Writer.",
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <SectionHeader
        description="A focused web resume for Developer Relations Engineer and Technical Writer roles."
        eyebrow="Resume"
        title="Abdulganiy Adeleke"
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-accent/35 px-5 py-3 font-semibold text-sand"
          disabled
          type="button"
        >
          <Download size={18} />
          PDF coming soon
        </button>
        <a
          className="link-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"
          href={socials.email.href}
        >
          <Mail size={18} />
          Contact me
        </a>
      </div>

      <section className="mt-10 grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
        <div className="terminal-card p-6">
          <p className="eyebrow">Focus</p>
          <h2 className="mt-4 text-2xl font-semibold text-cream">
            Developer Relations Engineer & Technical Writer
          </h2>
          <p className="mt-4 leading-7 text-sand">
            I bridge technical products and developers through clear documentation, useful tooling,
            open-source contribution, tutorials, demos, and community support.
          </p>
        </div>
        <div className="terminal-card p-6">
          <p className="eyebrow">Highlights</p>
          <ul className="mt-4 space-y-3 leading-7 text-sand">
            <li>Won Best Technical Website for Suimulate, a Sui Move visualizer.</li>
            <li>Built TrovePilot, a Mezo borrower automation prototype for BTC/MUSD scenarios.</li>
            <li>Created AI-assisted tools for README generation and FHEVM agent workflows.</li>
            <li>Contributed merged documentation and curriculum improvements to open source.</li>
          </ul>
        </div>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-3">
        {["Developer Education", "Documentation UX", "Web3 + AI Tooling"].map((item) => (
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5" key={item}>
            <p className="font-mono text-sm text-accent">{item}</p>
            <p className="mt-3 text-sm leading-6 text-sand">
              Practical proof across tutorials, shipped tools, demos, and OSS feedback loops.
            </p>
          </div>
        ))}
      </section>

      <div className="mt-5">
        <PlaceholderPanel
          description="The downloadable resume will be linked here once the final PDF is available. The web resume remains visible for hiring teams at launch."
          title="Downloadable PDF placeholder"
        />
      </div>
    </main>
  );
}
