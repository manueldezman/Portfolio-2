"use client";

import { Download, ExternalLink, Mail } from "lucide-react";
import { useEffect, useState } from "react";

type ResumePdfActionsProps = {
  emailHref: string;
  pdfHref: string;
};

const MOBILE_QUERY = "(max-width: 767px)";
const ACTION_CLASS =
  "editorial-button flex-1 gap-2 whitespace-nowrap px-3 py-3 sm:flex-none sm:px-4";

export function ResumePdfActions({ emailHref, pdfHref }: ResumePdfActionsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="mt-8 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3">
      <a
        className={`${ACTION_CLASS} editorial-button-primary`}
        href={pdfHref}
        rel={isMobile ? "noreferrer" : undefined}
        target={isMobile ? "_blank" : undefined}
        {...(isMobile ? {} : { download: true })}
      >
        {isMobile ? <ExternalLink size={13} /> : <Download size={13} />}
        {isMobile ? "Open PDF" : "Download PDF"}
      </a>
      {isMobile ? null : (
        <a
          className={`${ACTION_CLASS} editorial-button-secondary`}
          href={pdfHref}
          rel="noreferrer"
          target="_blank"
        >
          Open in new tab
          <ExternalLink size={13} />
        </a>
      )}
      <a className={`${ACTION_CLASS} editorial-button-secondary`} href={emailHref}>
        Contact me
        <Mail size={13} />
      </a>
    </div>
  );
}
