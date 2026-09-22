import Image, { type StaticImageData } from "next/image";

type BrandLinkProps = {
  href: string;
  logoSrc: StaticImageData;
  logoAlt: string;
  /** Retained for compatibility with existing callers; preview size is standardized. */
  logoWidth?: number;
  logoHeight?: number;
  children: React.ReactNode;
};

const PREVIEW_WIDTH = 220;
const PREVIEW_HEIGHT = 160;

/**
 * Inline text link for a named brand/project (e.g. "Midnight Network").
 * On hover/focus it shows a small floating card with the brand's logo,
 * purely in CSS via group-hover — no JS needed.
 */
export function BrandLink({
  href,
  logoSrc,
  logoAlt,
  children,
}: BrandLinkProps) {
  return (
    <span className="group relative inline-block">
      <a
        className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
        href={href}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
      </a>

      <span
        className="brand-preview pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 overflow-visible"
        role="tooltip"
        style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-px w-screen -translate-x-1/2 bg-[var(--rule-soft)] opacity-60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-px w-screen -translate-x-1/2 bg-[var(--rule-soft)] opacity-60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-screen w-px bg-[var(--rule-soft)] opacity-60"
        />
        <span
          className="relative z-10 block h-full w-full overflow-hidden rounded-none border border-dotted border-[var(--rule)] bg-transparent shadow-xl transition-all duration-150 ease-out group-hover:border-[var(--accent)] group-focus-within:border-[var(--accent)]"
          style={{ transition: "border-color .4s ease-in-out" }}
        >
          <span className="relative block h-full w-full overflow-hidden">
            <Image
              alt={logoAlt}
              className="brand-preview-media object-cover"
              fill
              src={logoSrc}
              sizes={`${PREVIEW_WIDTH - 16}px`}
            />
          </span>
        </span>
      </span>
    </span>
  );
}
