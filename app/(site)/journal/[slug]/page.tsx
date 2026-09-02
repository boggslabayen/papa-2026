import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatJournalDate,
  getArticleExcerpt,
  getPublishedJournalArticleBySlug,
} from "@/lib/journal";
import {
  cn,
  journalMeta,
  monoLabel,
  textLink,
  textLinkPlus,
} from "@/lib/styles";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedJournalArticleBySlug(slug);

  return {
    title: post?.title ?? "Journal",
    description: post ? getArticleExcerpt(post.content) : undefined,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedJournalArticleBySlug(slug);

  if (!post) notFound();

  return (
    <main className="bg-canvas">
      <article className="mx-auto max-w-[940px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(5rem,10vw,10rem)]">
        <Link
          className={cn(
            monoLabel,
            "mb-24 inline-flex border-b border-ink pb-[0.3rem] text-[0.62rem] font-extrabold",
          )}
          href="/journal"
        >
          Back to journal
        </Link>
        <div className={cn(journalMeta, "justify-start")}>
          <span>{post.category}</span>
          <span>{formatJournalDate(post.publishedAt)}</span>
        </div>
        <h1 className="mb-12 mt-10 text-[clamp(1rem,8vw,4rem)]">
          {post.title}
        </h1>

        <div className="my-20 h-[6px] w-20 bg-coral" />

        <div className="mb-8">
          {post.imageUrl ? (
            <div className="overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={896}
                height={500}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 896px, 90vw"
              />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 px-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-400 md:h-96">
              High Wire
            </div>
          )}
        </div>

        <div
          className="ml-auto max-w-[650px] text-[clamp(1.08rem,1.6vw,1.28rem)] [&_a]:underline [&_h1]:mb-6 [&_h1]:font-display [&_h1]:text-5xl [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-4xl [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-3xl [&_img]:my-10 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-sm [&_li]:mb-2 [&_ol]:mb-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-8 [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-24 flex items-center justify-between border-t border-ink/20 pt-8 max-[560px]:flex-col max-[560px]:items-start">
          <p className="m-0 font-display text-2xl">
            Keep the conversation moving.
          </p>
          <Link className={textLink} href="/contact">
            Bring Robert into your room <span className={textLinkPlus}>+</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
