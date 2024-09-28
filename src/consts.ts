import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Refetch ",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
  EMAIL: "qaws7791gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const WEBSITES: Metadata = {
  TITLE: "Websites",
  DESCRIPTION: "A collection of websites to learn the web",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/qaws7791",
  },
];
