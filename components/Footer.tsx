import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { socials } from "@/content/socials";

const links = [
  { href: socials.github.href, label: "GitHub", icon: Github },
  { href: socials.linkedin.href, label: "LinkedIn", icon: Linkedin },
  { href: socials.x.href, label: "X", icon: Twitter },
  { href: socials.youtube.href, label: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="editorial-shell mt-24 border-t-[3px] border-[var(--rule)] py-10">
      <div className="flex flex-col justify-between gap-6 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <div>
          <p className="font-mono font-bold uppercase text-[var(--text)]">Abdulganiy Adeleke</p>
          <p>Developer relations, technical writing, developer tools, and community.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                className="link-ring inline-flex items-center gap-2 border border-[var(--rule-soft)] px-3 py-2"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                <Icon size={15} />
                {link.label}
              </a>
            );
          })}
          <Link className="link-ring border border-[var(--rule-soft)] px-3 py-2" href="/resume">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
