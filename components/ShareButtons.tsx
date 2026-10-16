"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
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
    <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
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

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function ShareButtons({ title, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${path}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "Share on X", Icon: XIcon, color: undefined, className: "share-x", href: `https://x.com/intent/post?text=${text}&url=${encodedUrl}` },
    { label: "Share on LinkedIn", Icon: LinkedinIcon, color: "#0A66C2", className: undefined, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Submit to Hacker News", Icon: HackerNewsIcon, color: "#FF6600", className: undefined, href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${text}` },
    { label: "Share on Bluesky", Icon: BlueskyIcon, color: "#0285FF", className: undefined, href: `https://bsky.app/intent/compose?text=${text}%20${encodedUrl}` },
    { label: "Share on WhatsApp", Icon: WhatsAppIcon, color: "#25D366", className: undefined, href: `https://wa.me/?text=${text}%20${encodedUrl}` },
    { label: "Share on Telegram", Icon: TelegramIcon, color: "#229ED9", className: undefined, href: `https://t.me/share/url?url=${encodedUrl}&text=${text}` },
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
    "link-ring inline-flex h-9 w-9 items-center justify-center";

  return (
    <div className="mt-12">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
        Share this post
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {links.map(({ label, Icon, color, className, href }) => (
          <a
            aria-label={label}
            className={className ? `${button} ${className}` : button}
            href={href}
            key={label}
            rel="noreferrer"
            style={color ? { color } : { color: "var(--text)" }}
            target="_blank"
            title={label}
          >
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
