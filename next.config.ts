import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: Cloudflare serves the exported HTML from out/.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
