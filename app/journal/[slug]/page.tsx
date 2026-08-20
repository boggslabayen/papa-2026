import type { Metadata } from "next";
import { journalPosts } from "../../../lib/site-data";

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
    <main className="article-page">
      <article className="article-shell">
        <a className="back-link" href="/journal">
          Back to journal
        </a>
        <div className="journal-meta">
          <span>{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-lead">{post.lead}</p>
        <div className="article-rule" />
        <div className="article-body">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="article-footer">
          <p>Keep the conversation moving.</p>
          <a className="text-link" href="/contact">
            Bring Robert into your room <span>+</span>
          </a>
        </div>
      </article>
    </main>
  );
}
