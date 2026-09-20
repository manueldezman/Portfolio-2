import Image from "next/image";
import Link from "next/link";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Heading } from "@/components/Heading";
import { RotatingRoles } from "@/components/RotatingRoles";
import profileImage from "@/images/profile-iamge.jpeg";
import { socials } from "@/content/socials";

const bioParagraphs = [
  "I create developer resources that help both humans and AI agents understand and use technical products effectively: tutorials, conceptual guides, API references, docs-as-code workflows, videos, diagrams, and agent and developer tooling.",
  "My background in REST APIs, frontend development, smart contract development, testing, developer tools, Git, Markdown, and docs-as-code workflows lets me test the systems I explain, validate workflows directly, and produce technically accurate content that improves onboarding, adoption, and developer experience.",
  "I like getting my hands dirty: I spot bugs, investigate them, and leave a project better than I found it, through feedback and pull-request fixes. That led to my selection as a published technical author for the Hackmamba blog.",
  "I also contribute to open source, including decentralized protocols like Midnight Network and Intuition, and developer educational platforms like The Odin Project.",
];

export default function Home() {
  return (
    <main className="editorial-shell max-w-5xl py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-start">
        <div>
          <Heading className="whitespace-nowrap" level={1}>
            Abdulganiy <span className="italic text-[var(--accent)]">Adeleke</span>.
          </Heading>
          <RotatingRoles />

          <div className="mt-8 space-y-6 text-base leading-8 text-[var(--muted)]">
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 text-base leading-8 text-[var(--muted)]">
            I make tech videos on{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.youtube.href} rel="noreferrer" target="_blank">
              YouTube
            </a>
            , I yap on{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.x.href} rel="noreferrer" target="_blank">
              X
            </a>
            , and push code on{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.github.href} rel="noreferrer" target="_blank">
              GitHub
            </a>
            . You can also connect professionally with me on{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.linkedin.href} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            , or reach me by{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.email.href}>
              email
            </a>{" "}
            or on{" "}
            <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.telegram.href} rel="noreferrer" target="_blank">
              Telegram
            </a>
            .
          </p>

          <ul className="mt-9 space-y-3">
            {[
              { href: "/portfolio", label: "portfolio", description: "see my works" },
              { href: "/blog", label: "blog", description: "writings on technology and ideas" },
              { href: "/resume", label: "resume", description: "experience and skills" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                  href={item.href}
                >
                  {item.label}
                </Link>
                <span className="text-[var(--muted)]"> — {item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="order-first relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:order-none lg:ml-auto lg:mr-0 lg:max-w-[380px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-full bg-[color-mix(in_srgb,var(--rule)_10%,transparent)] blur-2xl md:-inset-10 md:blur-3xl"
          />
          <div className="relative -rotate-[3.5deg] scale-95 overflow-hidden rounded-xl bg-[#1a1a1a] p-1.5 shadow-2xl ring-1 ring-white/10">
            <div className="mb-2 flex items-center gap-1.5 border-b border-white/5 px-2 pb-2 pt-1">
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
              <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
              <span className="ml-2 font-mono text-[8px] uppercase tracking-widest text-gray-500 sm:text-[10px]">
                Photo Booth
              </span>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-white/5 bg-zinc-900">
              <Image
                alt="Abdulganiy Adeleke"
                className="scale-105 object-cover transition-transform duration-700 hover:scale-100"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
                src={profileImage}
              />
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md sm:bottom-4 sm:gap-6 sm:px-6 sm:py-2.5">
                <span className="h-2.5 w-2.5 rounded-full border border-white/20 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full border border-white/20 sm:h-3 sm:w-3" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 sm:h-10 sm:w-10">
                  <span className="h-6 w-6 rounded-full bg-white/10 sm:h-8 sm:w-8" />
                </span>
                <span className="h-2.5 w-2.5 rounded-full border border-white/20 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full border border-white/20 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>
        </figure>
      </div>

      <section className="mt-20 border-t-[3px] border-[var(--rule)] pt-14">
        <Heading level={2}>What people say</Heading>
        <FeedbackSection />
      </section>
    </main>
  );
}
