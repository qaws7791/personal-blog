import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import { remarkGithubCallouts } from "./src/plugins/remark-github-callouts";
import { remarkMermaidCharts } from "./src/plugins/remark-mermaid-charts";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
    remarkPlugins: [remarkGithubCallouts, remarkMermaidCharts],
  },
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
});
