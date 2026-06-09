import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import profileImage from "@/images/profile-iamge.jpeg";
import { articleItems } from "@/content/contents";
import { contributionStories } from "@/content/oss";
import { projects } from "@/content/projects";
import { socials } from "@/content/socials";

const stats = [
  { value: "6+", label: "Content pieces" },
  { value: "8+", label: "Merged PRs" },
  { value: "200+", label: "Event attendees" },
  { value: "4", label: "Dev tools built" },
];

const stackGroups = [
  { title: "Writing", items: ["Markdown / MDX", "Docs-as-Code", "API Documentation", "Tutorial Guides"] },
  { title: "Web3", items: ["Solidity", "Hardhat", "Sui / Move", "Wagmi / Viem"] },
  { title: "AI Tools", items: ["Gemini", "Agent Skills", "Prompt Workflows", "Docs Generators"] },
  { title: "Community", items: ["Workshops", "Moderation", "X / Social", "Developer Education"] },
];

const socialLinks = [
  { label: "GitHub", href: socials.github.href },
  { label: "Twitter", href: socials.x.href },
  { label: "LinkedIn", href: socials.linkedin.href },
  { label: "YouTube", href: socials.youtube.href },
];

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <span className="font-mono text-xs font-black text-[var(--accent)]">{index}</span>
      <h2 className="text-3xl font-black tracking-[-0.05em] text-[var(--text)]">{title}</h2>
      <span className="h-px flex-1 bg-[var(--rule-soft)]" />
    </div>
  );
}

function requireProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Missing homepage project: ${slug}`);
  }

  return project;
}

function requireContribution(title: string) {
  const contribution = contributionStories.find((item) => item.title === title);

  if (!contribution) {
    throw new Error(`Missing homepage OSS contribution: ${title}`);
  }

  return contribution;
}

export default function Home() {
  const featuredProjects = [requireProject("fhevm-agent-skills"), requireProject("suimulate")];
  const writingPreview = articleItems.slice(0, 3);
  const ossPreview = [
    requireContribution("Maintained technical writing course resources"),
    requireContribution("Fixed Lace wallet configuration typo"),
  ];

  return (
    <main className="editorial-shell pb-16 pt-14">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex border border-[var(--accent)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            Tech Writer · DevRel
          </div>
          <h1 className="mt-14 max-w-2xl text-6xl font-black leading-[0.9] tracking-[-0.08em] text-[var(--text)] md:text-8xl">
            Abdulganiy <span className="italic text-[var(--accent)]">Adeleke</span>.
          </h1>

          <div className="mt-10 flex justify-start">
            <span className="border border-[var(--teal)] bg-[var(--teal-soft)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--teal)]">
              • Open to opportunities
            </span>
          </div>

          <p className="mt-10 max-w-xl text-lg font-semibold italic leading-8 text-[var(--muted)]">
            I bridge the gap between powerful products and the developers who need them through
            content, tooling, documentation, and community.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="editorial-button editorial-button-primary px-6 py-4" href="/projects">
              View Projects
            </Link>
            <Link className="editorial-button editorial-button-secondary px-6 py-4" href="/contents">
              Read Contents
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-[var(--muted)] underline underline-offset-4">
            {socialLinks.map((link) => (
              <a className="link-ring" href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <figure className="border-2 border-[var(--rule)] bg-[var(--surface)] lg:justify-self-end">
          <Image
            alt="Abdulganiy Adeleke"
            className="aspect-[4/5] w-full object-cover grayscale"
            priority
            src={profileImage}
          />
          <figcaption className="border-t-2 border-[var(--rule)] px-4 py-3 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            Developer Relations · Technical Writing
          </figcaption>
        </figure>
      </section>

      <section className="mt-16 grid border-y-[3px] border-[var(--rule)] md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            className="border-[var(--rule)] px-8 py-7 text-center md:border-l md:first:border-l-0"
            key={stat.label}
          >
            <p className="text-4xl font-black tracking-[-0.06em] text-[var(--accent)] md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <SectionTitle index="01" title="Sample Projects" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              className={`p-8 ${index === 0 ? "bg-[var(--surface-strong)] text-[var(--background)]" : "bg-[var(--surface)] text-[var(--text)] md:border-l-2 md:border-[var(--rule)]"}`}
              key={project.slug}
            >
              <p className={`font-mono text-xs font-black uppercase tracking-[0.16em] ${index === 0 ? "text-[var(--accent)]" : "text-[var(--teal)]"}`}>
                {String(index + 1).padStart(2, "0")} / {index === 0 ? "Featured" : project.category}
              </p>
              <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">{project.title}</h3>
              <p className={`mt-4 max-w-lg leading-7 ${index === 0 ? "text-[color-mix(in_srgb,var(--background)_70%,transparent)]" : "text-[var(--muted)]"}`}>
                {project.summary}
              </p>
              <p className="mt-6 font-mono text-xs text-[var(--muted)]">{project.tags.slice(0, 3).join(" · ")}</p>
              <Link className="link-ring mt-8 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)]" href={`/projects/${project.slug}`}>
                View <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t-[3px] border-[var(--rule)] pt-14">
        <SectionTitle index="02" title="Technical Content" />
        <div className="border-2 border-[var(--rule)]">
          {writingPreview.map((item) => (
            <a
              className="link-ring grid gap-4 border-b-2 border-[var(--rule)] px-7 py-6 last:border-b-0 md:grid-cols-[0.28fr_1fr_0.18fr] md:items-center"
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                {item.category}
              </span>
              <span>
                <span className="block text-lg font-black tracking-[-0.03em] text-[var(--text)]">{item.title}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">{item.description}</span>
              </span>
              <span className="justify-self-start border border-[var(--teal)] bg-[var(--teal-soft)] px-3 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--teal)] md:justify-self-end">
                {item.readTime || item.date}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t-[3px] border-[var(--rule)] pt-14">
        <SectionTitle index="03" title="Stack & Tools" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-4">
          {stackGroups.map((group) => (
            <div className="border-[var(--rule)] p-7 md:border-l md:first:border-l-0" key={group.title}>
              <h3 className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--text)]">
                {group.title}
              </h3>
              <ul className="mt-5 divide-y divide-[var(--rule-soft)] text-sm text-[var(--muted)]">
                {group.items.map((item) => (
                  <li className="py-2" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t-[3px] border-[var(--rule)] pt-14">
        <SectionTitle index="04" title="Open Source" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-2">
          {ossPreview.map((story, index) => (
            <article className="border-[var(--rule)] p-8 md:border-l md:first:border-l-0" key={story.title}>
              <p className="font-mono text-sm font-black text-[var(--text)]">→ {story.repo}</p>
              <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{story.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{story.impact}</p>
              <a
                className="link-ring mt-8 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)]"
                href={story.links[0]?.href}
                rel="noreferrer"
                target="_blank"
              >
                {story.links[0]?.label || `PR #${index + 1}`} <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t-[3px] border-[var(--rule)] pt-14">
        <SectionTitle index="05" title="Community & Events" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-3">
          {[
            {
              label: "Education & Workshops",
              title: "Kodespot",
              metric: "Web2/Web3",
              detail: "Student developer education",
            },
            {
              label: "Community Building",
              title: "Kodespot moderation",
              metric: "X + Chat",
              detail: "Community communication",
            },
            {
              label: "Featured Event",
              title: "Techie Soiree",
              metric: "200+",
              detail: "Attendees · Web3 onboarding",
            },
          ].map((item) => (
            <article className="flex min-h-[210px] flex-col border-[var(--rule)] p-8 md:border-l md:first:border-l-0" key={item.title}>
              <div>
                <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">{item.label}</p>
                <h3 className="mt-3 text-xl font-black tracking-[-0.03em]">{item.title}</h3>
              </div>
              <div className="mt-auto pt-8">
                <p className="break-words text-4xl font-black leading-none tracking-[-0.07em] text-[var(--accent)] md:text-5xl">{item.metric}</p>
                <p className="mt-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
