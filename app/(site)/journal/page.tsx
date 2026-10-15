import type { Metadata } from "next";

import JournalExplorer, {
  type JournalEntry,
} from "@/components/ui/site/journal-explorer";
import {
  formatJournalDate,
  getPublishedJournalArticles,
} from "@/lib/journal";
import { cn, shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from Robert Labayen on creativity, leadership, communication, art, and the work of making things matter.",
};

export const dynamic = "force-dynamic";

type PublishedJournalArticle = Awaited<
  ReturnType<typeof getPublishedJournalArticles>
>[number];

function toJournalEntry(article: PublishedJournalArticle): JournalEntry {
  return {
    slug: article.slug,
    title: article.title,
    category: article.category,
    date: formatJournalDate(article.publishedAt),
    excerpt: article.excerpt,
    imageUrl: article.imageUrl,
  };
}

export default async function JournalPage() {
  const articles = await getPublishedJournalArticles();
  const posts = articles.map(toJournalEntry);
  const selectedFeaturedPosts = articles
    .filter((article) => article.isFeatured)
    .slice(0, 5);
  // Keep the hero useful before editors select category-specific features.
  const featuredPosts = (selectedFeaturedPosts.length > 0
    ? selectedFeaturedPosts
    : articles.slice(0, 5)
  ).map(toJournalEntry);

  return (
    <main>
      <section
        className={cn(
          shell,
          "flex items-center justify-between gap-8 py-[clamp(1.5rem,3vw,2.5rem)] max-md:flex-col max-md:items-start max-md:gap-2",
        )}
      >
        <h1 className="m-0 shrink-0 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.045em]">
          Robert&apos;s journal
        </h1>
        <p className="m-0 max-w-[32rem] text-sm leading-[1.5] text-muted">
          Notes from a life spent learning, creating and learning again.
        </p>
      </section>

      <JournalExplorer featuredPosts={featuredPosts} posts={posts} />
    </main>
  );
}
