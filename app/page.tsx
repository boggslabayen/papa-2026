import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts, workshops, type Workshop } from "../lib/site-data";
import {
  button,
  buttonDark,
  buttonLight,
  cn,
  eyebrow,
  imageStage,
  journalMeta,
  monoLabel,
  riseIn,
  sectionPad,
  shell,
  stageImage,
  textLink,
  textLinkPlus,
} from "../lib/styles";

export const metadata: Metadata = {
  title: "Creative Workshops That Move People",
  description:
    "Meet Robert Labayen, a Philippine creative leader, artist, and speaker helping teams create, communicate, and lead with meaning.",
};

const outcomes = [
  "Braver creative thinking",
  "Clearer communication",
  "More meaningful leadership",
  "Stronger team culture",
  "Ideas people remember",
];

const toneClasses: Record<Workshop["tone"], string> = {
  coral: "bg-coral",
  lime: "bg-lime",
  gold: "bg-gold",
  blue: "bg-blue",
  rose: "bg-rose",
  cream: "bg-paper",
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className={cn(
          shell,
          "relative isolate grid min-h-[calc(100svh-var(--header-height))] grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.94fr)] items-center gap-[clamp(2rem,5vw,6rem)] overflow-hidden py-[clamp(3rem,6vw,6rem)] max-[1100px]:grid-cols-[1fr_0.8fr] max-md:grid-cols-1 max-md:pt-16",
        )}
      >
        {/* Hero Copy */}
        <div className={cn(riseIn, "relative z-10")}>
          <p className={cn(eyebrow, "max-md:mt-40")}>
            Robert Labayen / Creative leader + artist
          </p>

          <h1 className="mb-[2.3rem] max-w-[9ch] leading-[0.83] tracking-[-0.08em] max-[1100px]:text-[clamp(4rem,8vw,7rem)] max-md:text-[clamp(4.2rem,16vw,7rem)] max-[560px]:text-[clamp(3.9rem,18vw,5.5rem)]">
            Make room for <em className="not-italic text-coral">better</em>{" "}
            ideas.
          </h1>

          <p className="max-w-[38rem] text-[clamp(1rem,1.4vw,1.24rem)] leading-[1.55] max-[560px]:text-[0.96rem]">
            Talks and workshops that help people think braver, lead with
            meaning, and communicate so good ideas can move.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-[1.6rem]">
            <Link className={cn(button, buttonDark)} href="/contact">
              Book a workshop
            </Link>

            <Link className={textLink} href="/talks">
              Explore the talks <span className={textLinkPlus}>+</span>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className={cn(
            riseIn,
            "relative isolate min-h-[38rem] self-stretch rounded-[10%_50%_8rem_8rem] bg-rose [animation-delay:120ms]",
            "before:absolute before:left-[-4rem] before:top-[28%] before:-z-10 before:size-[20rem] before:rounded-full before:bg-gold before:content-['']",
            "after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(rgba(19,36,29,0.25)_1px,transparent_1px)] after:bg-[length:12px_12px] after:opacity-40 after:content-['']",

            // md and below
            "max-md:absolute max-md:inset-0 max-md:z-0 max-md:min-h-0 max-md:rounded-none",
            "max-md:[mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]",
            "max-md:[-webkit-mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]",
          )}
        >
          <span className="absolute right-[8rem] top-16 z-0 size-48 rounded-full bg-lime-200" />

          <span className="absolute right-24 top-[8.7rem] z-[1] size-[2.6rem] rounded-full border border-ink/35" />

          <Image
            className="
        !left-[40%] !h-full !w-[120%] max-w-none !-translate-x-1/2 object-cover
        max-md:!left-[55%] max-md:!w-[120%]
        max-[560px]:!left-[60%] max-[560px]:!w-[140%]
      "
            src="/images/robert/hero.png"
            alt="Robert Labayen in a rose blazer, looking ahead"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 48vw"
          />
        </div>
      </section>
      {/* Creative Roles */}
      <section
        className="flex overflow-hidden whitespace-nowrap bg-ink text-canvas max-[560px]:overflow-x-auto"
        aria-label="Robert Labayen's creative roles"
      >
        {["Creative leader", "Speaker", "Artist", "Songwriter", "Painter"].map(
          (role) => (
            <span
              className="flex min-h-[104px] items-center px-[3vw] font-display text-[clamp(1.2rem,2vw,2rem)] after:ml-[6vw] after:font-mono after:text-lime after:content-['/'] max-[820px]:min-h-[78px]"
              key={role}
            >
              {role}
            </span>
          ),
        )}
      </section>

      {/* About Section */}
      <section className={cn(shell, sectionPad)}>
        <div className="grid grid-cols-2 items-start gap-[clamp(3rem,7vw,8rem)] max-[820px]:grid-cols-1">
          <div
            className={cn(
              imageStage,
              "col-start-1 mt-[-2rem] min-h-[38rem] bg-blue max-[820px]:col-auto max-[820px]:row-start-2 max-[820px]:m-0 max-[560px]:min-h-[34rem] rounded-2xl",
            )}
          >
            <Image
              className={stageImage}
              src="/images/robert/portrait-close.png"
              alt="Close portrait of Robert Labayen"
              loading="eager"
              fill
              sizes="(max-width: 820px) 100vw, 42vw"
            />
          </div>

          <div>
            <div>
              <p className={eyebrow}>A lifetime of creative practice</p>
              <h2 className="m-0 max-w-[11ch]">
                A seasoned creative mind, still deeply curious.
              </h2>
            </div>
            <div className="pt-4 text-[1.05rem] max-[820px]:row-start-3 max-[820px]:pt-0">
              <p className="mb-6">
                Robert Labayen has built a life around ideas: shaping brands,
                leading creative people, writing songs, making art, and helping
                audiences see familiar problems with fresh eyes.
              </p>
              <p className="mb-6">
                His sessions bring that range into the room. They are
                thoughtful, practical, warm, and made for people who want their
                work to mean more.
              </p>
              <Link className={cn(textLink, "mt-2")} href="/about">
                Meet Robert <span className={textLinkPlus}>+</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}

      <section className={cn(sectionPad, "bg-canvas")}>
        <div className={cn(shell, "mb-[clamp(3rem,7vw,7rem)] text-center")}>
          <div>
            <p className={eyebrow}>Signature talks + workshops</p>

            <h2 className="mx-auto m-0 max-w-max">
              Six ways to move a room forward.
            </h2>
          </div>

          <p className="mx-auto mt-4 max-w-[48rem]">
            Choose a keynote, a focused one-hour talk, or a deeper workshop
            shaped around your team and its real challenges.
          </p>
        </div>

        <div
          className={cn(
            shell,
            "grid grid-cols-3 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1",
          )}
        >
          {workshops.map((workshop) => (
            <Link
              className={cn(
                "group relative -ml-px -mt-px flex aspect-square min-h-[21rem] flex-col justify-between overflow-hidden border-[#fafafa] p-[clamp(1.5rem,2.7vw,2.8rem)] transition duration-300 hover:z-[2] hover:-translate-y-2 hover:rounded-tl-[8rem] max-[560px]:aspect-auto max-[560px]:min-h-[22rem]",
                toneClasses[workshop.tone],
              )}
              href={`/talks#${workshop.slug}`}
              key={workshop.slug}
            >
              <span className={cn(monoLabel, "text-[0.65rem]")}>
                {workshop.number}
              </span>
              <div>
                <h3 className="mb-4 max-w-[8ch] text-[clamp(2.1rem,3.4vw,3.8rem)]">
                  {workshop.title}
                </h3>
                <p className="m-0 max-w-[18rem] text-[0.86rem]">
                  {workshop.subtitle}
                </p>
              </div>
              <span className="absolute bottom-6 right-6 flex size-10 items-center justify-center rounded-full border border-current font-display text-[1.4rem] transition-transform duration-200 group-hover:rotate-90">
                +
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Outcomes Section */}
      {/* <section
        className={cn(
          shell,
          sectionPad,
          "grid grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] items-center gap-[clamp(3rem,8vw,9rem)] max-[820px]:grid-cols-1",
        )}
      >
        <div
          className={cn(
            imageStage,
            "min-h-[49rem] rounded-[50%_50%_1rem_1rem] bg-lime max-[1100px]:min-h-[42rem] max-[820px]:min-h-[46rem] max-[560px]:min-h-[34rem]",
          )}
        >
          <Image
            className={stageImage}
            src="/images/robert/speaking-open.png"
            alt="Robert Labayen speaking with open hands"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
          />
          <span className="absolute bottom-8 left-0 z-[3] max-w-[17rem] bg-ink p-[1.4rem] font-display text-[clamp(1.3rem,2.1vw,2.2rem)] leading-[1.05] text-canvas">
            Ideas become useful when people can act on them.
          </span>
        </div>
        <div>
          <p className={eyebrow}>Inside every session</p>
          <h2 className="mb-8">Inspiration with somewhere to go.</h2>
          <p className="max-w-[36rem] text-[1.05rem]">
            Robert pairs stories and creative perspective with tools people can
            bring back to the next brief, meeting, presentation, or hard
            decision.
          </p>
          <ul className="mt-12 list-none p-0">
            {outcomes.map((outcome, index) => (
              <li
                className="flex items-center gap-[1.4rem] border-t border-ink/20 py-[1.15rem] font-display text-[clamp(1.25rem,2vw,2rem)] last:border-b"
                key={outcome}
              >
                <span className="font-mono text-[0.62rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Journal Section */}

      {/* <section className={cn(sectionPad, "bg-forest text-canvas")}>
        <div
          className={cn(
            shell,
            "mb-[clamp(3rem,7vw,7rem)] flex items-end justify-between gap-12 max-[820px]:flex-col max-[820px]:items-start",
          )}
        >
          <div>
            <p className={eyebrow}>From Robert&apos;s journal</p>
            <h2 className="m-0 max-w-[12ch]">
              Notes on ideas, people, and making things matter.
            </h2>
          </div>
          <Link className={textLink} href="/journal">
            Read the journal <span className={textLinkPlus}>+</span>
          </Link>
        </div>

        <div
          className={cn(
            shell,
            "grid grid-cols-3 gap-px max-[820px]:grid-cols-1",
          )}
        >
          {journalPosts.map((post, index) => (
            <article
              className={cn(
                "flex min-h-[31rem] flex-col p-[clamp(1.6rem,3vw,3rem)] max-[820px]:min-h-[27rem]",
                index === 0 && "bg-soft-forest",
                index === 1 && "bg-[#2f6557]",
                index === 2 && "bg-[#214b40]",
              )}
              key={post.slug}
            >
              <div className={journalMeta}>
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mb-[1.4rem] mt-20 text-[clamp(2rem,3.2vw,3.7rem)]">
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-[0.9rem] text-white/75">{post.excerpt}</p>
              <Link
                className={cn(textLink, "mt-auto")}
                href={`/journal/${post.slug}`}
              >
                Read note +
              </Link>
            </article>
          ))}
        </div>
      </section> */}

      {/* Bring Robert into the Room Section */}
      <section
        className={cn(
          shell,
          " grid min-h-[44rem] max-w-[calc(1500px-2.5rem)] grid-cols-[1fr_0.9fr] overflow-hidden bg-coral p-0 max-[820px]:grid-cols-1 max-[560px]:mx-4 max-[560px]:w-auto",
        )}
      >
        <div className="relative z-[2] self-center p-[clamp(2rem,6vw,6rem)]">
          <p className={eyebrow}>Bring Robert into the room</p>
          <h2 className="mb-8 text-[clamp(3.2rem,6vw,7rem)]">
            What could your team see differently?
          </h2>
          <p className="max-w-[34rem]">
            Tell us about the people, the moment, and the shift you want to
            create. We will shape the right session together.
          </p>
          <Link
            className={cn(button, buttonLight, "mt-[1.2rem]")}
            href="/contact"
          >
            Start a conversation
          </Link>
        </div>
        <div className="max-md:hidden relative isolate min-h-[44rem] overflow-hidden  before:absolute before:right-[1 rem] before:top-20 before:-z-10 before:size-[20rem] before:rounded-full before:bg-orange-300 before:content-[''] max-[820px]:min-h-[35rem] max-[560px]:min-h-[31rem]">
          <span className="absolute right-[8rem] top-16 z-0 size-48 rounded-full bg-lime-200" />

          <span className="absolute right-24 top-[8.7rem] z-[1] size-[2.6rem] rounded-full border border-ink/35" />

          <Image
            className="object-contain object-bottom"
            src="/images/robert/inviting.png"
            alt="Robert Labayen extending an inviting hand"
            fill
            sizes="(max-width: 820px) 100vw, 48vw"
          />
        </div>
      </section>
    </main>
  );
}
