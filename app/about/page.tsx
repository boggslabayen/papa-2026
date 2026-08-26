import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  button,
  buttonDark,
  cn,
  eyebrow,
  imageCaption,
  imageStage,
  riseIn,
  sectionPad,
  shell,
  stageImage,
} from "../../lib/styles";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Robert Labayen, a creative leader, artist, speaker, songwriter, and painter from the Philippines.",
};

const roles = [
  [
    "Creative leader",
    "Turning strategy, craft, and human insight into work people can feel.",
  ],
  [
    "Speaker",
    "Making big ideas clear, generous, and useful for the people in the room.",
  ],
  [
    "Artist",
    "Painting, songwriting, and creative practice that keep curiosity alive.",
  ],
  [
    "Guide",
    "Helping teams find the courage and language to make their next move.",
  ],
];

export default function AboutPage() {
  return (
    <main>
      <section
        className={cn(
          shell,
          "grid min-h-[calc(100svh-var(--header-height))] grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.85fr)] items-center gap-[clamp(3rem,7vw,8rem)] py-[clamp(4rem,7vw,7rem)] max-[820px]:min-h-0 max-[820px]:grid-cols-1",
        )}
      >
        <div className={riseIn}>
          <p className={eyebrow}>About Robert</p>
          <h1 className="mb-10 text-[clamp(4rem,8vw,9rem)] leading-[0.88] tracking-[-0.075em]">
            Creativity is a way of paying attention.
          </h1>
          <p className="max-w-[39rem] text-[clamp(1rem,1.4vw,1.25rem)]">
            Robert Labayen is a Philippine creative leader, artist, and speaker
            whose work brings together imagination, meaning, and the deeply
            human business of moving people.
          </p>
        </div>
        <div
          className={cn(
            imageStage,
            riseIn,
            "min-h-[24rem] rounded-full bg-rose [animation-delay:120ms] max-[820px]:min-h-[48rem] max-[560px]:min-h-[34rem] ",
          )}
        >
          <span className="absolute right-[4rem] top-16 z-0 size-48 rounded-full bg-blue-200" />

          <span className="absolute right-24 top-[8.7rem] z-[1] size-[2.6rem] rounded-full border border-ink/35" />

          <Image
            src="/images/robert/portrait-white.png"
            alt="Robert Labayen in a light blazer"
            fill
            priority
            sizes="(max-width: 20px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className={cn(shell, sectionPad, "border-t border-ink/20")}>
        <p className={eyebrow}>The through line</p>
        <div className="grid grid-cols-[1.1fr_0.75fr] gap-[clamp(3rem,9vw,10rem)] max-[820px]:grid-cols-1">
          <h2 className="m-0">
            Make the idea clear. Make the work matter. Bring people with you.
          </h2>
          <div className="pt-4 text-[1.05rem]">
            <p className="mb-[1.7rem]">
              Robert has established himself in the Philippine advertising and
              creative industry by working where vision meets execution: shaping
              ideas, leading creative teams, and turning communication into
              something people can understand and remember.
            </p>
            <p className="mb-[1.7rem]">
              Beyond the boardroom and the brief, he writes songs and paints.
              Those practices are not side notes. They are part of the same
              curiosity about emotion, form, rhythm, and what makes an idea stay
              with us.
            </p>
            <p className="mb-[1.7rem]">
              Today, Robert brings that perspective to talks and workshops for
              teams, leaders, schools, and organizations. He does not arrive
              with a generic formula. He listens for what the room needs and
              builds from there.
            </p>
          </div>
        </div>
      </section>

      <section className={cn(sectionPad, "bg-ink text-canvas")}>
        <div className={shell}>
          <div className="mb-[clamp(3rem,7vw,7rem)] flex items-end justify-between gap-12">
            <div>
              <p className={eyebrow}>One person, many practices</p>
              <h2 className="m-0 max-w-[12ch]">
                A wider creative life makes for a richer room.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-4 border-l border-canvas/25 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
            {roles.map(([title, copy], index) => (
              <article
                className="min-h-[25rem] border-b border-r border-t border-canvas/25 p-[clamp(1.5rem,3vw,3rem)] max-[560px]:min-h-[21rem]"
                key={title}
              >
                <span className="font-mono text-[0.64rem]">0{index + 1}</span>
                <h3 className="mb-6 mt-28 text-[clamp(2rem,3vw,3.4rem)]">
                  {title}
                </h3>
                <p className="text-[0.88rem] text-white/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={cn(
          shell,
          "grid min-h-[48rem] max-w-[calc(1500px-2.5rem)] grid-cols-[0.9fr_1fr] bg-gold p-0 max-[820px]:grid-cols-1 max-[560px]:mx-4 max-[560px]:w-auto",
        )}
      >
        <div className="self-center p-[clamp(2rem,6vw,6rem)]">
          <p className={eyebrow}>Robert in the room</p>
          <h2 className="text-[clamp(3rem,5vw,5.8rem)]">
            Warmth without fluff. Energy without noise.
          </h2>
          <p>
            The best session is not a performance delivered at people. It is an
            encounter that gives them new language, fresh confidence, and
            something useful to do next.
          </p>
          <Link className={cn(button, buttonDark, "mt-[1.2rem]")} href="/talks">
            Explore the sessions
          </Link>
        </div>
        <div
          className={cn(
            imageStage,
            "min-h-[48rem] bg-gold max-[820px]:min-h-[40rem] max-[560px]:min-h-[31rem] mt-",
          )}
        >
          <Image
            className={stageImage}
            src="/images/robert/composed.png"
            alt="Robert Labayen standing thoughtfully"
            fill
            sizes="(max-width: 620px) 100vw, 50vw"
          />
        </div>
      </section>
    </main>
  );
}
