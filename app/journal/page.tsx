import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "../../lib/site-data";
import {
  button,
  buttonDark,
  cn,
  eyebrow,
  imageStage,
  journalMeta,
  monoLabel,
  sectionPad,
  shell,
  stageImage,
  textLink,
} from "../../lib/styles";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from Robert Labayen on creativity, leadership, communication, art, and the work of making things matter.",
};

export default function JournalPage() {
  const [featured, ...remaining] = journalPosts;

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

      <section
        className={cn(
          shell,
          "grid min-h-[43rem] max-w-[calc(1500px-2.5rem)] grid-cols-[0.95fr_1fr] bg-blue p-0 max-[820px]:grid-cols-1 max-[560px]:mx-4 max-[560px]:w-auto",
        )}
      >
        <div className={cn(imageStage, "min-h-[43rem] bg-blue max-[820px]:min-h-[40rem] max-[560px]:min-h-[31rem]")}>
          <Image className={stageImage} src="/images/robert/reflective.png" alt="Robert Labayen in a reflective moment" fill priority sizes="(max-width: 820px) 100vw, 48vw" />
        </div>
        <article className="self-center p-[clamp(2.5rem,6vw,6rem)]">
          <div className={journalMeta}>
            <span>{featured.category}</span>
            <span>{featured.date}</span>
          </div>
          <h2 className="mb-[1.8rem] mt-16 text-[clamp(3.2rem,5.5vw,6.5rem)]">{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <Link className={cn(button, buttonDark, "mt-6")} href={`/journal/${featured.slug}`}>
            Read the latest note
          </Link>
        </article>
      </section>

      <section className={cn(shell, sectionPad)}>
        <div className="flex items-center justify-between border-b border-ink pb-[1.2rem]">
          <p className={cn(eyebrow, "m-0")}>More from the notebook</p>
          <span className={cn(monoLabel, "text-[0.63rem]")}>
            {String(journalPosts.length).padStart(2, "0")} entries
          </span>
        </div>
        {remaining.map((post, index) => (
          <article
            className="grid grid-cols-[3rem_minmax(18rem,0.9fr)_minmax(16rem,0.65fr)_auto] items-center gap-[clamp(1.5rem,4vw,4rem)] border-b border-ink py-12 max-[1100px]:grid-cols-[2rem_1fr_auto] max-[560px]:grid-cols-[2rem_1fr] max-[560px]:items-start"
            key={post.slug}
          >
            <span className={cn(monoLabel, "text-[0.65rem]")}>0{index + 2}</span>
            <div>
              <div className={cn(journalMeta, "justify-start")}>
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h2 className="mb-0 mt-4 text-[clamp(2rem,3.5vw,4rem)]">
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>
            </div>
            <p className="m-0 text-[0.9rem] max-[1100px]:hidden">{post.excerpt}</p>
            <Link className={cn(textLink, "max-[560px]:col-start-2")} href={`/journal/${post.slug}`} aria-label={`Read ${post.title}`}>
              Read +
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
