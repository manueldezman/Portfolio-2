import type { ReactNode } from "react";
import { SubscribeForm } from "@/components/SubscribeForm";

/**
 * Shared layout for every article under /blog.
 *
 * Keeping articles in this route group means the subscribe form only appears
 * on article pages (not the blog index), and new articles get it automatically
 * without importing it in each page. The empty side columns mirror the article
 * grid so the form lines up with the post body instead of the full shell.
 */
export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="editorial-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr_220px]">
          <div aria-hidden="true" className="hidden lg:block" />
          <SubscribeForm title="Enjoyed this post?" />
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>
    </>
  );
}
