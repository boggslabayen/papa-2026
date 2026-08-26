import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "../../components/booking-form";
import {
  cn,
  eyebrow,
  imageStage,
  riseIn,
  sectionPad,
  shell,
  stageImage,
} from "../../lib/styles";

export const metadata: Metadata = {
  title: "Book Robert",
  description:
    "Inquire about booking Robert Labayen for a keynote, creative workshop, leadership session, or organization event.",
};

export default function ContactPage() {
  return (
    <main>
      <section
        className={cn(
          shell,
          "grid min-h-[calc(100svh-var(--header-height))] grid-cols-[1.06fr_0.8fr] items-center gap-[clamp(3rem,7vw,8rem)] py-[clamp(4rem,7vw,7rem)] max-[820px]:min-h-0 max-[820px]:grid-cols-1",
        )}
      >
        <div className={riseIn}>
          <p className={eyebrow}>Book Robert</p>
          <h1 className="mb-10 text-[clamp(4rem,8vw,9rem)] leading-[0.88] tracking-[-0.075em]">
            Tell us about the room you want to move.
          </h1>
          <p className="max-w-[39rem] text-[clamp(1rem,1.4vw,1.25rem)]">
            Share the context, the people, and the change you would love to create.
            We will help shape an engagement that fits.
          </p>
        </div>
        <div
          className={cn(
            imageStage,
            riseIn,
            "min-h-[43rem] rounded-[50%_50%_2rem_2rem] bg-gold [animation-delay:120ms] max-[820px]:min-h-[48rem] max-[560px]:min-h-[34rem]",
          )}
        >
          <Image className={stageImage} src="/images/robert/welcoming-white.png" alt="Robert Labayen welcoming an audience" fill priority sizes="(max-width: 820px) 100vw, 42vw" />
        </div>
      </section>

      <section
        className={cn(
          shell,
          sectionPad,
          "grid grid-cols-[minmax(17rem,0.45fr)_minmax(0,1fr)] gap-[clamp(4rem,10vw,11rem)] border-t border-ink max-[820px]:grid-cols-1",
        )}
      >
        <aside className="max-[820px]:max-w-[34rem]">
          <p className={eyebrow}>A helpful starting point</p>
          <h2 className="text-[clamp(2.5rem,4vw,4.6rem)]">What to include</h2>
          <ul className="my-12 list-none p-0">
            {[
              "Your audience and its current challenge",
              "The kind of event or working session",
              "The date, location, and available time",
              "What success should feel like afterward",
            ].map((item) => (
              <li className="border-t border-ink/20 py-4 text-[0.9rem] last:border-b" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-16 bg-lime p-[1.4rem]">
            <span className="font-mono text-[0.62rem] uppercase">Formats</span>
            <p className="mb-0 mt-4 font-display text-[1.4rem] leading-[1.15] tracking-[-0.03em]">
              Keynotes, one-hour talks, and tailored 4-16 hour workshops.
            </p>
          </div>
        </aside>
        <div>
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
