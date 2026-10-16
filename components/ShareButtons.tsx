"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle, Send } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";

const SITE = "https://0xdezman.cv";

type ShareButtonsProps = {
  title: string;
  path: string;
};

function XIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BlueskyIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-2.67.297-5.568-.628-6.383-3.364C.378 9.398 0 4.438 0 3.748c0-.688.139-1.86.902-2.203.659-.299 1.664-.62 4.3 1.24C7.954 4.728 10.913 8.667 12 10.8zm0 0c1.087-2.114 4.046-6.053 6.798-7.995 2.636-1.861 3.641-1.884 4.3-1.585.763.349.902 1.515.902 2.203 0 .69-.378 5.65-.624 6.479-.815 2.736-3.713 3.66-6.383 3.364-.136-.02-.275-.039-.415-.056.138-.022.276-.04.415-.056 2.67-.297 5.568.628 6.383 3.364.246.829.624 5.789.624 6.479 0 .688-.139 1.86-.902 2.203-.659.299-1.664.62-4.3-1.24C16.046 4.728 13.087 8.667 12 10.8z" />
    </svg>
  );
}

function HackerNewsIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width="15"
    >
      <path d="M5 4l7 7 7-7" />
      <path d="M12 11v9" />
    </svg>
  );
}

export function ShareButtons({ title, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${path}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "Share on X", Icon: XIcon, href: `https://x.com/intent/post?text=${text}&url=${encodedUrl}` },
    { label: "Share on LinkedIn", Icon: LinkedinIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Submit to Hacker News", Icon: HackerNewsIcon, href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${text}` },
    { label: "Share on Bluesky", Icon: BlueskyIcon, href: `https://bsky.app/intent/compose?text=${text}%20${encodedUrl}` },
    { label: "Share on WhatsApp", Icon: MessageCircle, href: `https://wa.me/?text=${text}%20${encodedUrl}` },
    { label: "Share on Telegram", Icon: Send, href: `https://t.me/share/url?url=${encodedUrl}&text=${text}` },
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

  const button =
    "link-ring inline-flex h-9 w-9 items-center justify-center text-[var(--muted)]";

  return (
    <div className="mt-12">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
        Share this post
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {links.map(({ label, Icon, href }) => (
          <a aria-label={label} className={button} href={href} key={label} rel="noreferrer" target="_blank" title={label}>
            <Icon />
          </a>
        ))}
        <button aria-label="Copy link" className={button} onClick={copyLink} title={copied ? "Copied" : "Copy link"} type="button">
          {copied ? <Check size={15} /> : <Link2 size={15} />}
        </button>
      </div>
    </div>
  );
}
