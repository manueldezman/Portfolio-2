"use client";

import { useState } from "react";

const SITE = "https://0xdezman.cv";

type ShareButtonsProps = {
  title: string;
  path: string;
};

export function ShareButtons({ title, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${path}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "X", href: `https://x.com/intent/post?text=${text}&url=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Hacker News", href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${text}` },
    { label: "Bluesky", href: `https://bsky.app/intent/compose?text=${text}%20${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${encodedUrl}` },
    { label: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${text}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const chip =
    "link-ring border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--muted)]";

  return (
    <div className="mt-12">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
        Share this post
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
          <a className={chip} href={link.href} key={link.label} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
        <button className={chip} onClick={copyLink} type="button">
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
