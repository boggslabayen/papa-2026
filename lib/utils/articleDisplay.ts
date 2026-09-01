import type { Article } from "@/types/articles";

type DateLike =
  | Date
  | number
  | string
  | {
      toDate: () => Date;
    }
  | null
  | undefined;

export function formatArticleDate(value: DateLike) {
  if (!value) return "";

  const date =
    value instanceof Date
      ? value
      : typeof value === "object" && "toDate" in value
        ? value.toDate()
        : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function sortArticlesByNewest<T extends Pick<Article, "createdAt">>(
  articles: T[],
) {
  return [...articles].sort((firstArticle, secondArticle) => {
    const firstTime = getDateTime(firstArticle.createdAt);
    const secondTime = getDateTime(secondArticle.createdAt);

    return secondTime - firstTime;
  });
}

export function getPublishedArticles<T extends Pick<Article, "status">>(
  articles: T[],
) {
  return articles.filter((article) => article.status === "published");
}

function getDateTime(value: DateLike) {
  if (!value) return 0;

  const date =
    value instanceof Date
      ? value
      : typeof value === "object" && "toDate" in value
        ? value.toDate()
        : new Date(value);

  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}
