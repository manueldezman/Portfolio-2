import type { Metadata } from "next";
import blogData from "./blog.json";

export type BlogPost = {
  title: string;
  href: string;
  date: string;
  description: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = blogData;

export function isInternalPost(post: BlogPost): boolean {
  return post.href.startsWith("/blog/");
}

export function blogSlug(post: BlogPost): string {
  return post.href.replace(/^\/blog\//, "").replace(/\/$/, "");
}

export function getBlogPost(href: string): BlogPost {
  const post = blogPosts.find((entry) => entry.href === href);

  if (!post) {
    throw new Error(`Missing blog post entry for ${href}`);
  }

  return post;
}

export function buildBlogMetadata(post: BlogPost): Metadata {
  const image = {
    url: `/og/${blogSlug(post)}.png`,
    width: 1200,
    height: 675,
    alt: post.title,
  };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.href,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://0xdezman.cv${post.href}`,
      siteName: "Abdulganiy Adeleke",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [{ url: image.url, alt: post.title }],
    },
  };
}
