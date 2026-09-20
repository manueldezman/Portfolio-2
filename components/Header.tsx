import Link from "next/link";
import { Briefcase, FileText, Github, Linkedin, PenLine, Twitter, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { socials } from "@/content/socials";

const navItems = [
  { href: "/portfolio", label: "Portfolio", Icon: Briefcase },
  { href: "/blog", label: "Blog", Icon: PenLine },
  { href: "/resume", label: "Resume", Icon: FileText },
];

const socialItems = [
  { href: socials.github.href, label: "GitHub", Icon: Github },
  { href: socials.linkedin.href, label: "LinkedIn", Icon: Linkedin },
  { href: socials.x.href, label: "X", Icon: Twitter },
];

function Divider({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-0.5 h-6 w-px shrink-0 self-center bg-[var(--rule-soft)] sm:mx-2 sm:h-8 ${className}`}
    />
  );
}

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:bottom-[calc(4rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-[20px] border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-2 sm:rounded-[24px] sm:p-2">
        <Link aria-label="About" className="nav-item nav-home" href="/">
          <User size={19} />
          <span aria-hidden="true" className="nav-label">
            About
          </span>
        </Link>

        <Link
          className="link-ring hidden shrink-0 px-3 text-sm font-bold tracking-[-0.01em] text-[var(--text)] sm:block"
          href="/"
        >
          About me
        </Link>

        <Divider className="hidden sm:block" />

        {navItems.map((item) => (
          <Link aria-label={item.label} className="nav-item" href={item.href} key={item.href}>
            <item.Icon size={19} />
            <span aria-hidden="true" className="nav-label">
              {item.label}
            </span>
            <span className="nav-tooltip">{item.label}</span>
          </Link>
        ))}

        <Divider />

        {socialItems.map((item) => (
          <a
            aria-label={item.label}
            className="nav-item nav-social"
            href={item.href}
            key={item.href}
            rel="noreferrer"
            target="_blank"
          >
            <item.Icon size={19} />
            <span className="nav-tooltip">{item.label}</span>
          </a>
        ))}

        <Divider className="hidden sm:block" />

        <ThemeToggle />
      </nav>
    </header>
  );
}
