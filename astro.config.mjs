import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import mermaid from "./src/plugins/mermaid";

import { remarkGithubCallouts } from "./src/plugins/remark-github-callouts";

// https://astro.build/config
export default defineConfig({
  site: "https://refetch.pages.dev",
  markdown: {
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "github-dark",
      },
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
  experimental: {
    svg: true,
  },
});
