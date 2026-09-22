import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { ResumePdfActions } from "@/components/ResumePdfActions";
import { socials } from "@/content/socials";

const basePath = process.env.GITHUB_PAGES === "true" ? "/Portfolio-2" : "";
const resumePdf = `${basePath}/abdulganiy-adeleke-resume.pdf`;

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Abdulganiy Adeleke, Developer Relations Engineer and Technical Writer.",
};

export default function ResumePage() {
  return (
    <main className="editorial-shell max-w-5xl pb-16">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/">
        ← back
      </Link>

      <header className="mt-10">
        <Heading level={1}>Resume</Heading>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">
          The full resume, embedded below. Download the PDF or open it in a new tab.
        </p>
      </header>

      <ResumePdfActions emailHref={socials.email.href} pdfHref={resumePdf} />

      <section className="mt-10">
        <div className="hidden overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03] md:block">
          <object
            aria-label="Abdulganiy Adeleke resume PDF"
            className="h-[85vh] min-h-[600px] w-full"
            data={resumePdf}
            type="application/pdf"
          >
            <div className="p-6 text-sm leading-6 text-sand">
              Your browser can&apos;t display the PDF inline.{" "}
              <a className="link-ring text-accent underline" download href={resumePdf}>
                Download the resume PDF
              </a>{" "}
              instead.
            </div>
          </object>
        </div>
        <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 md:hidden">
          <p className="text-sm leading-6 text-sand">
            The embedded viewer is hidden on mobile. Use{" "}
            <span className="font-semibold text-cream">Open PDF</span> above to read the resume in
            a new tab.
          </p>
        </div>
      </section>
    </main>
  );
}
