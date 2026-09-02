import { getArticles, type ArticleRecord } from "@/lib/firebase/articles";

export type JournalArticle = ArticleRecord & {
  publishedAt: Date | undefined;
  excerpt: string;
};

function toDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }
}

function getTextFromHtml(content: string) {
  return content
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function getArticleExcerpt(content: string, maxLength = 180) {
  const text = getTextFromHtml(content);

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
}

function toJournalArticle(article: ArticleRecord): JournalArticle {
  const publishedAt = toDate(article.createdAt) ?? toDate(article.updatedAt);

  return {
    ...article,
    publishedAt,
    excerpt: getArticleExcerpt(article.content),
  };
}

export async function getPublishedJournalArticles(): Promise<JournalArticle[]> {
  const articles = await getArticles();

  return articles
    .filter((article) => article.status === "published")
    .map(toJournalArticle)
    .sort(
      (left, right) =>
        (right.publishedAt?.getTime() ?? 0) - (left.publishedAt?.getTime() ?? 0),
    );
}

export async function getPublishedJournalArticleBySlug(slug: string) {
  const articles = await getPublishedJournalArticles();
  return articles.find((article) => article.slug === slug);
}

export function formatJournalDate(date: Date | undefined) {
  if (!date) return "Recent note";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
