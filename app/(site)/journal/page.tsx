import type { Metadata } from "next";

import JournalExplorer, {
  type JournalEntry,
} from "@/components/ui/site/journal-explorer";
import {
  formatJournalDate,
  getPublishedJournalArticles,
} from "@/lib/journal";
import { cn, eyebrow, shell } from "@/lib/styles";

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
          "grid grid-cols-[1fr_0.4fr] items-end gap-20 py-[clamp(5rem,9vw,9rem)] max-[820px]:grid-cols-1 max-[820px]:items-start max-[820px]:gap-8",
        )}
      >
        <div>
          <p className={eyebrow}>Robert&apos;s journal</p>
          <h1 className="m-0 max-w-[11ch] text-[clamp(4rem,8vw,9rem)] leading-[0.88] tracking-[-0.075em]">
            Notes from a life spent making and noticing.
          </h1>
        </div>
        <p className="m-0 max-[820px]:max-w-[32rem]">
          Weekly reflections on creativity, leadership, communication, art, and the
          small human truths that make ideas worth sharing.
        </p>
      </section>

      <JournalExplorer featuredPosts={featuredPosts} posts={posts} />
    </main>
  );
}
