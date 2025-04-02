import { getCollection } from "astro:content";

export const getAllArticles = async () => {
  return (await getCollection("articles"))
    .filter((article) => !article.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
};

export const getNextArticle = async (currentSlug: string) => {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug,
  );
  return articles[currentIndex + 1] || null;
};

export const getPreviousArticle = async (currentSlug: string) => {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug,
  );
  return articles[currentIndex - 1] || null;
};
