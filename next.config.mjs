/** @type {import('next').NextConfig} */

// On GitHub Actions, GITHUB_REPOSITORY looks like "username/repo"
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProd = process.env.NODE_ENV === "production";

// Prefer explicit env var (lets your app code and Next config agree),
// otherwise fall back to repo name in GitHub Actions.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isProd && repo ? `/${repo}` : "");

const nextConfig = {
  output: "export",
  trailingSlash: true, // strongly recommended for GitHub Pages + static export
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
};

export default nextConfig;
