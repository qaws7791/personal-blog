export type Link = {
  type: "website" | "video" | "article" | "book" | "course" | "other";
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export const links: Link[] = [
  {
    type: "website",
    title: "FreeCodeCamp",
    description: "Learn to code for free",
    url: "https://www.freecodecamp.org",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Codecademy",
    description: "Learn to code interactively, for free",
    url: "https://www.codecademy.com",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Coursera",
    description: "Online courses from top universities",
    url: "https://www.coursera.org",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Udemy",
    description: "Online courses",
    url: "https://www.udemy.com",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "edX",
    description: "Online courses from top universities",
    url: "https://www.edx.org",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Khan Academy",
    description: "Learn almost anything for free",
    url: "https://www.khanacademy.org",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "MIT OpenCourseWare",
    description: "Free lecture notes, exams, and videos from MIT",
    url: "https://ocw.mit.edu/index.htm",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Stanford Online",
    description:
      "Stanford Online offers free online courses taught by Stanford faculty to lifelong learners worldwide",
    url: "https://online.stanford.edu",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
  {
    type: "website",
    title: "Code.org",
    description:
      "Code.org is a non-profit dedicated to expanding access to computer science and increasing participation",
    url: "https://code.org",
    tags: ["web development", "javascript", "react", "node.js", "mongodb"],
  },
];
