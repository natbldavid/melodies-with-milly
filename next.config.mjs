/** @type {import('next').NextConfig} */

// On GitHub Actions, GITHUB_REPOSITORY looks like "username/repo"
const repo =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  ""; // fallback for local dev

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // This makes Next.js output a static site to the /out folder
  output: "export",

  // Required for GitHub Pages because Next/Image optimization needs a server
  images: { unoptimized: true },

  // Required for GitHub Pages project sites: https://username.github.io/<repo>/
  basePath: isProd && repo ? `/${repo}` : "",
  assetPrefix: isProd && repo ? `/${repo}/` : "",
};

export default nextConfig;
