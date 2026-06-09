import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/contents", label: "Contents" },
  { href: "/oss", label: "OSS" },
  { href: "/community", label: "Community" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur">
      <nav className="editorial-shell py-5">
        <div className="flex items-center justify-between gap-6">
          <Link className="text-lg font-black uppercase tracking-[-0.04em] text-[var(--text)]" href="/">
            Abdulganiy
            <span className="align-super text-[0.6rem] tracking-normal text-[var(--accent)]">TW+DR</span>
          </Link>
          <div className="hidden items-center gap-8 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:flex">
            {navItems.map((item) => (
              <Link className="link-ring" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link className="editorial-button editorial-button-dark gap-1 px-5 py-3" href="/resume">
              Resume
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="mt-5 border-t-2 border-[var(--rule)]" />
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
          {navItems.map((item) => (
            <Link className="link-ring" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
