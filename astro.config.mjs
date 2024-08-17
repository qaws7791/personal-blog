import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import remarkMermaid from "remark-mermaidjs";
import { remarkGithubCallouts } from "./src/plugins/remark-github-callouts";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [
      remarkGithubCallouts,
      [
        remarkMermaid,
        {
          mermaidConfig: {
            theme: "dark",
          },
        },
      ],
    ],
  },
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
});
