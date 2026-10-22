"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: {
        event?: boolean;
        path?: string;
        referrer?: string;
        title?: string;
      }) => void;
    };
  }
}

const ENDPOINT = "https://0xdezman.goatcounter.com/count";

/**
 * Loads GoatCounter once and reports client-side route changes.
 *
 * GoatCounter normally counts the first page load by itself. The script is
 * configured with `no_onload` so this component can count both the initial
 * page and later App Router navigations through the same path.
 */
export function Analytics() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    window.goatcounter?.count?.({
      path: pathname,
      title: document.title,
    });
  }, [loaded, pathname]);

  return (
    <Script
      data-goatcounter={ENDPOINT}
      data-goatcounter-settings='{"no_onload": true}'
      id="goatcounter"
      onLoad={() => setLoaded(true)}
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
