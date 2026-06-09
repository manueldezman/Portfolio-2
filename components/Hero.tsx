import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import profileImage from "@/images/profile-iamge.jpeg";
import { socials } from "@/content/socials";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:pt-24">
      <div>
        <p className="eyebrow">Developer education · Tools · Community</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-cream md:text-7xl">
          I help developers understand, trust, and adopt technical products.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-9 text-sand">
          I’m Abdulganiy Adeleke, a Developer Relations Engineer & Technical Writer. I bridge the
          gap between powerful products and the developers who need them through content, tooling,
          and community.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="link-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"
            href="/projects"
          >
            View Projects
            <ArrowRight size={18} />
          </Link>
          <Link
            className="link-ring inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-3 font-semibold text-cream"
            href="/contents"
          >
            <FileText size={18} />
            View Contents
          </Link>
          <a
            className="link-ring inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-3 font-semibold text-cream"
            href={socials.email.href}
          >
            <Mail size={18} />
            Contact Me
          </a>
        </div>
      </div>
      <div className="terminal-card relative overflow-hidden p-4">
        <div className="absolute left-5 top-5 z-10 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-accent" />
          <span className="h-3 w-3 rounded-full bg-cyan" />
          <span className="h-3 w-3 rounded-full bg-sand" />
        </div>
        <Image
          alt="Abdulganiy Adeleke"
          className="aspect-[4/5] rounded-2xl object-cover opacity-95 grayscale-[20%]"
          priority
          src={profileImage}
        />
        <div className="mt-4 rounded-2xl border border-cream/10 bg-ink/80 p-4 font-mono text-sm text-sand">
          <p className="text-accent">$ whoami</p>
          <p className="mt-2">DevRel engineer · technical writer · builder</p>
        </div>
      </div>
    </section>
  );
}
