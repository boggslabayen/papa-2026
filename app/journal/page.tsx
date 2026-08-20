import type { Metadata } from "next";
import { journalPosts } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from Robert Labayen on creativity, leadership, communication, art, and the work of making things matter.",
};

export default function JournalPage() {
  const [featured, ...remaining] = journalPosts;

  return (
    <main>
      <section className="journal-hero section-shell">
        <div>
          <p className="eyebrow">Robert's journal</p>
          <h1>Notes from a life spent making and noticing.</h1>
        </div>
        <p>
          Weekly reflections on creativity, leadership, communication, art, and the
          small human truths that make ideas worth sharing.
        </p>
      </section>

      <section className="featured-post section-shell">
        <div className="featured-post-image image-stage image-stage-blue">
          <img src="/images/robert/reflective.png" alt="Robert Labayen in a reflective moment" />
        </div>
        <article>
          <div className="journal-meta">
            <span>{featured.category}</span>
            <span>{featured.date}</span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <a className="button button-dark" href={`/journal/${featured.slug}`}>
            Read the latest note
          </a>
        </article>
      </section>

      <section className="journal-index section-shell section-pad">
        <div className="journal-index-heading">
          <p className="eyebrow">More from the notebook</p>
          <span>{String(journalPosts.length).padStart(2, "0")} entries</span>
        </div>
        {remaining.map((post, index) => (
          <article className="journal-index-row" key={post.slug}>
            <span className="journal-index-number">0{index + 2}</span>
            <div className="journal-index-title">
              <div className="journal-meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h2>
                <a href={`/journal/${post.slug}`}>{post.title}</a>
              </h2>
            </div>
            <p>{post.excerpt}</p>
            <a className="card-read" href={`/journal/${post.slug}`} aria-label={`Read ${post.title}`}>
              Read +
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
