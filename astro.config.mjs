import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import mermaid from "./src/plugins/mermaid";

import { remarkGithubCallouts } from "./src/plugins/remark-github-callouts";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    remarkPlugins: [remarkGithubCallouts, mermaid],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), mdx(), pagefind()],
});
