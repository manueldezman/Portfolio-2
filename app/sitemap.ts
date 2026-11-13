import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { portfolioCaseStudies } from "@/content/portfolio";

const baseUrl = "https://0xdezman.cv";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const posts: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.href.startsWith("/"))
    .map((post) => ({
      url: new URL(post.href, baseUrl).toString(),
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  const caseStudies: MetadataRoute.Sitemap = portfolioCaseStudies.map((caseStudy) => ({
    url: `${baseUrl}/portfolio/${caseStudy.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts, ...caseStudies];
}
