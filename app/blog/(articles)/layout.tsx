import type { ReactNode } from "react";
import { Comments } from "@/components/Comments";
import { SubscribeForm } from "@/components/SubscribeForm";

/**
 * Shared layout for every article under /blog.
 *
 * Keeping articles in this route group means the comments and subscribe form
 * only appear on article pages (not the blog index), and new articles get them
 * automatically without importing them in each page. The empty side columns
 * mirror the article grid so the footer lines up with the post body instead of
 * the full shell.
 */
export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="editorial-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr_220px]">
          <div aria-hidden="true" className="hidden lg:block" />
          <div className="min-w-0">
            <Comments />
            <SubscribeForm className="mt-14" title="Enjoyed this post?" />
          </div>
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>
    </>
  );
}
