/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/Portfolio-2";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? githubPagesBasePath : "",
  assetPrefix: isGithubPages ? `${githubPagesBasePath}/` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
