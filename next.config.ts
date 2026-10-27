import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Cache Components stay off: the site is fully static, and it refuses an empty
// generateStaticParams, which is the normal state before anything is Published.
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Plugins are passed by name so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
