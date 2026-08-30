import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { workshops, type Workshop } from "@/lib/site-data";
import {
  button,
  buttonDark,
  buttonLight,
  cn,
  eyebrow,
  imageCaption,
  imageStage,
  monoLabel,
  riseIn,
  sectionPad,
  shell,
  stageImage,
  textLink,
  textLinkPlus,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Talks & Workshops",
  description:
    "Explore Robert Labayen's signature talks and workshops on creativity, leadership, presentations, team culture, motivation, and communication.",
};

const toneHoverClasses: Record<Workshop["tone"], string> = {
  coral: "hover:bg-coral/20",
  lime: "hover:bg-lime/25",
  gold: "hover:bg-gold/25",
  blue: "hover:bg-blue/25",
  rose: "hover:bg-rose/25",
  cream: "hover:bg-canvas",
};

export default function TalksPage() {
  return (
    <main>
      <section
        className={cn(
          shell,
          "grid min-h-[calc(100svh-var(--header-height))] grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.85fr)] items-center gap-[clamp(3rem,7vw,8rem)] py-[clamp(4rem,7vw,7rem)] max-[820px]:min-h-0 max-[820px]:grid-cols-1",
        )}
      >
        <div className={cn(riseIn, "relative z-10")}>
          <p className={eyebrow}>Talks + workshops</p>
          <h1 className="mb-[2.3rem] max-w-[9ch] leading-[0.83] tracking-[-0.08em] max-[1100px]:text-[clamp(4rem,8vw,7rem)] max-md:text-[clamp(4.2rem,16vw,7rem)] max-[560px]:text-[clamp(3.9rem,18vw,5.5rem)]">
            A good room leaves with more than applause.
          </h1>
          <p className="max-w-[39rem] text-[clamp(1rem,1.4vw,1.25rem)]">
            Robert&apos;s sessions are designed to change the conversation after
            the conversation: practical, energizing experiences shaped around
            your people.
          </p>
          <Link
            className={cn(button, buttonDark, "mt-[1.4rem]")}
            href="/contact"
          >
            Find the right session
          </Link>
        </div>
        <div
          className={cn(
            riseIn,
            "relative isolate max-h-[38rem] self-stretch [animation-delay:120ms]",
            "before:absolute before:left-[-4rem] before:top-[28%] before:-z-10 before:size-[20rem] before:rounded-full before:bg-amber-500 before:content-['']",
            "after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(rgba(19,36,29,0.25)_1px,transparent_1px)] after:bg-[length:12px_12px] after:opacity-40 after:content-['']",

            // md and below
            "max-md:absolute max-md:inset-0 max-md:z-0 max-md:min-h-0 max-md:rounded-none",
            "max-md:[mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]",
            "max-md:[-webkit-mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]",
          )}
        >
          <span className="absolute right-[8rem] top-16 z-0 size-48 rounded-full bg-violet-200" />
          .
          <Image
            className="
               !left-[40%] !h-full !w-[120%] max-w-none !-translate-x-1/2 object-cover
               max-md:!left-[75%] max-md:!w-[120%]
               max-[560px]:!left-[60%] max-[560px]:!w-[140%]
             "
            src="/images/robert/speaking-open.png"
            alt="Robert Labayen in a rose blazer, looking ahead"
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <section className={cn(shell, sectionPad, "pt-8")}>
        {workshops.map((workshop) => (
          <article
            className={cn(
              "grid scroll-mt-[calc(var(--header-height)+1rem)] grid-cols-[4rem_minmax(16rem,0.75fr)_minmax(20rem,1fr)] gap-[clamp(2rem,5vw,5rem)] border-t border-ink px-[clamp(1rem,3vw,3rem)] py-[clamp(3rem,6vw,6rem)] transition-colors duration-200 last:border-b max-[1100px]:grid-cols-[3rem_minmax(15rem,0.7fr)_1fr] max-[820px]:grid-cols-[3rem_1fr] max-[560px]:grid-cols-[2rem_1fr] max-[560px]:gap-5 max-[560px]:px-0",
              toneHoverClasses[workshop.tone],
            )}
            id={workshop.slug}
            key={workshop.slug}
          >
            <div className={cn(monoLabel, "text-[0.65rem]")}>
              {workshop.number}
            </div>
            <div>
              <p className={eyebrow}>{workshop.subtitle}</p>
              <h2 className="m-0 text-[clamp(3rem,5vw,5.8rem)] max-[560px]:text-[clamp(2.7rem,13vw,4rem)]">
                {workshop.title}
              </h2>
            </div>
            <div className="max-[820px]:col-start-2">
              <p className="max-w-[38rem] text-[1.05rem]">{workshop.summary}</p>
              <dl className="my-10">
                <div className="grid grid-cols-[7rem_1fr] gap-6 border-t border-ink/20 py-[0.9rem] max-[560px]:grid-cols-1 max-[560px]:gap-2">
                  <dt className="font-mono text-[0.63rem] uppercase">
                    Best for
                  </dt>
                  <dd className="m-0 text-[0.84rem]">{workshop.audience}</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-6 border-t border-ink/20 py-[0.9rem] max-[560px]:grid-cols-1 max-[560px]:gap-2">
                  <dt className="font-mono text-[0.63rem] uppercase">
                    Takeaways
                  </dt>
                  <dd className="m-0 text-[0.84rem]">
                    {workshop.outcomes.join(" / ")}
                  </dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-6 border-y border-ink/20 py-[0.9rem] max-[560px]:grid-cols-1 max-[560px]:gap-2">
                  <dt className="font-mono text-[0.63rem] uppercase">Format</dt>
                  <dd className="m-0 text-[0.84rem]">{workshop.format}</dd>
                </div>
              </dl>
              <Link
                className={textLink}
                href={`/contact?session=${workshop.slug}`}
              >
                Ask about this session <span className={textLinkPlus}>+</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section
        className={cn(
          shell,
          "mb-[clamp(4rem,8vw,8rem)] grid min-h-[44rem] max-w-max grid-cols-[1fr_0.9fr] bg-ink p-0 text-canvas max-[820px]:grid-cols-1 max-[560px]:mx-4 max-[560px]:w-auto",
        )}
      >
        <div
          className={cn(
            imageStage,
            "min-h-[44rem] bg-blue max-[820px]:min-h-[40rem] max-[560px]:min-h-[31rem] rounded-t-full",
          )}
        >
          <Image
            className={stageImage}
            src="/images/robert/idea-dice-wide.png"
            alt="Robert Labayen holding a red idea die"
            fill
            sizes="(max-width: 820px) 100vw, 52vw"
          />
        </div>
        <div className="self-center p-[clamp(2rem,6vw,6rem)]">
          <p className={eyebrow}>Built for your context</p>
          <h2 className="text-[clamp(3rem,5vw,5.8rem)]">
            The topic is the start. Your people shape the session.
          </h2>
          <p className="text-white/75">
            Every engagement can be tuned for the audience, industry, timing,
            and challenge. Share what is happening inside the organization and
            what you want people to think, feel, or do differently afterward.
          </p>
          <Link
            className={cn(button, buttonLight, "mt-[1.2rem]")}
            href="/contact"
          >
            Plan your engagement
          </Link>
        </div>
      </section>
    </main>
  );
}
