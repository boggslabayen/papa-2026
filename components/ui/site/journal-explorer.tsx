"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { button, buttonDark, cn, journalMeta, monoLabel, textLink } from "@/lib/styles";

export type JournalEntry = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
};

type JournalExplorerProps = {
  featuredPosts: JournalEntry[];
  posts: JournalEntry[];
};

type View = "list" | "tiles";

const categoryColors: Record<string, string> = {
  Create: "bg-coral",
  Work: "bg-gold",
  Grow: "bg-lime",
  Think: "bg-blue",
  Other: "bg-rose",
};

function ArticleImage({ post, className }: { post: JournalEntry; className?: string }) {
  if (!post.imageUrl) {
    return (
      <div
        className={cn(
          "flex h-full min-h-48 items-end bg-forest p-6 text-canvas",
          categoryColors[post.category] ?? "bg-soft-forest",
          className,
        )}
      >
        <span className={monoLabel}>{post.category}</span>
      </div>
    );
  }

  return (
    <Image
      src={post.imageUrl}
      alt={post.title}
      width={1100}
      height={720}
      className={cn("h-full w-full object-cover", className)}
      sizes="(max-width: 820px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export default function JournalExplorer({
  featuredPosts,
  posts,
}: JournalExplorerProps) {
  const [view, setView] = useState<View>("list");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredPost = featuredPosts[featuredIndex];

  useEffect(() => {
    if (featuredPosts.length < 2) return;

    const timer = window.setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % featuredPosts.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [featuredPosts.length]);

  if (posts.length === 0) {
    return (
      <section className="mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(5rem,9vw,9rem)]">
        <p className="max-w-[32rem] text-lg">
          New notes are on their way. Please check back soon.
        </p>
      </section>
    );
  }

  return (
    <>
      {featuredPost && (
        <section className="mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,4vw,4.5rem)] max-[560px]:px-[1.15rem]">
          <div className="overflow-hidden rounded-[2rem] bg-forest text-canvas">
            <div className="grid min-h-[36rem] grid-cols-2 max-[820px]:grid-cols-1">
              <div className="relative min-h-[24rem] overflow-hidden max-[820px]:order-2 max-[560px]:min-h-[18rem]">
                <ArticleImage post={featuredPost} />
              </div>
              <article className="flex flex-col justify-between p-[clamp(2rem,5vw,5rem)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={monoLabel}>Featured note</span>
                    <span className={monoLabel}>
                      {String(featuredIndex + 1).padStart(2, "0")} / {String(featuredPosts.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={cn(journalMeta, "mt-16 justify-start text-canvas/70 max-[820px]:mt-10")}>
                    <span>{featuredPost.category}</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h2 className="mb-6 mt-5 max-w-[12ch] text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.92]">
                    {featuredPost.title}
                  </h2>
                  <p className="max-w-[35rem] text-canvas/80">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <Link className={cn(button, buttonDark, "border-canvas bg-canvas text-ink hover:bg-lime")} href={`/journal/${featuredPost.slug}`}>
                    Read the note
                  </Link>
                  {featuredPosts.length > 1 && (
                    <div className="flex gap-2" aria-label="Choose featured article">
                      {featuredPosts.map((post, index) => (
                        <button
                          type="button"
                          aria-label={`Show ${post.title}`}
                          aria-current={index === featuredIndex}
                          className={cn(
                            "h-2.5 rounded-full transition-all",
                            index === featuredIndex ? "w-8 bg-lime" : "w-2.5 bg-canvas/40 hover:bg-canvas",
                          )}
                          key={post.slug}
                          onClick={() => setFeaturedIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5rem,10vw,9rem)] max-[560px]:px-[1.15rem]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-ink pb-5">
          <div>
            <p className="mb-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.06em]">All notes</p>
            <p className="m-0 text-sm text-muted">{String(posts.length).padStart(2, "0")} entries to explore</p>
          </div>
          <div className="inline-flex rounded-full border border-ink p-1" aria-label="Journal view">
            <button
              type="button"
              aria-pressed={view === "list"}
              className={cn("rounded-full px-4 py-2 text-[0.72rem] font-bold transition", view === "list" ? "bg-ink text-canvas" : "hover:bg-ink/10")}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              type="button"
              aria-pressed={view === "tiles"}
              className={cn("rounded-full px-4 py-2 text-[0.72rem] font-bold transition", view === "tiles" ? "bg-ink text-canvas" : "hover:bg-ink/10")}
              onClick={() => setView("tiles")}
            >
              Tiles
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div>
            {posts.map((post, index) => (
              <article className="grid grid-cols-[3rem_minmax(15rem,0.9fr)_minmax(15rem,0.7fr)_auto] items-center gap-[clamp(1.5rem,4vw,4rem)] border-b border-ink/20 py-9 max-[1100px]:grid-cols-[2.2rem_1fr_auto] max-[560px]:grid-cols-[2rem_1fr] max-[560px]:items-start" key={post.slug}>
                <span className={cn(monoLabel, "text-[0.65rem]")}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className={cn(journalMeta, "justify-start")}>
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="mb-0 mt-3 text-[clamp(1.8rem,3vw,3.4rem)]">
                    <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                  </h2>
                </div>
                <p className="m-0 text-[0.9rem] text-muted max-[1100px]:hidden">{post.excerpt}</p>
                <Link className={cn(textLink, "max-[560px]:col-start-2")} href={`/journal/${post.slug}`}>
                  Read +
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[620px]:grid-cols-1">
            {posts.map((post) => (
              <article className="group overflow-hidden rounded-2xl border border-ink/15 bg-canvas" key={post.slug}>
                <Link className="block" href={`/journal/${post.slug}`}>
                  <div className="aspect-[1.25] overflow-hidden">
                    <ArticleImage post={post} className="transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className={cn(journalMeta, "justify-start")}>
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="mb-3 mt-4 text-[clamp(2rem,3vw,3.4rem)]">{post.title}</h2>
                    <p className="m-0 text-sm text-muted">{post.excerpt}</p>
                    <span className={cn(textLink, "mt-6")}>Read +</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
