import type { Metadata } from "next";
import Link from "next/link";
import { journalPosts } from "../../../lib/site-data";
import { cn, journalMeta, monoLabel, textLink, textLinkPlus } from "../../../lib/styles";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug);

  return {
    title: post?.title ?? "Journal",
    description: post?.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((entry) => entry.slug === slug) ?? journalPosts[0];

  return (
    <main className="bg-canvas">
      <article className="mx-auto max-w-[940px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(5rem,10vw,10rem)]">
        <Link className={cn(monoLabel, "mb-24 inline-flex border-b border-ink pb-[0.3rem] text-[0.62rem] font-extrabold")} href="/journal">
          Back to journal
        </Link>
        <div className={cn(journalMeta, "justify-start")}>
          <span>{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mb-12 mt-10 text-[clamp(4rem,8vw,8.5rem)]">{post.title}</h1>
        <p className="max-w-[24ch] font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.18] tracking-[-0.03em]">
          {post.lead}
        </p>
        <div className="my-20 h-[6px] w-20 bg-coral" />
        <div className="ml-auto max-w-[650px] text-[clamp(1.08rem,1.6vw,1.28rem)]">
          {post.paragraphs.map((paragraph) => (
            <p className="mb-8" key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-24 flex items-center justify-between border-t border-ink/20 pt-8 max-[560px]:flex-col max-[560px]:items-start">
          <p className="m-0 font-display text-2xl">Keep the conversation moving.</p>
          <Link className={textLink} href="/contact">
            Bring Robert into your room <span className={textLinkPlus}>+</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
