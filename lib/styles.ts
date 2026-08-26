export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const shell =
  "mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,4vw,4.5rem)] max-[560px]:px-[1.15rem]";

export const sectionPad = "py-[clamp(6rem,12vw,12rem)]";

export const eyebrow =
  "mb-[1.4rem] font-mono text-[0.72rem] font-bold uppercase tracking-[0.06em]";

export const monoLabel = "font-mono uppercase tracking-[0.06em]";

export const button =
  "inline-flex min-h-[54px] cursor-pointer items-center justify-center rounded-full border border-ink px-[1.6rem] py-[0.9rem] text-[0.78rem] font-extrabold tracking-[0.01em] transition duration-200 hover:-translate-y-[3px] hover:bg-coral";

export const buttonSmall = "min-h-[44px] px-[1.25rem] py-[0.7rem]";

export const buttonDark = "bg-ink text-canvas hover:border-coral hover:bg-coral";

export const buttonLight = "border-canvas bg-canvas text-ink hover:border-lime hover:bg-lime";

export const textLink =
  "group inline-flex w-fit items-center gap-[0.6rem] text-[0.8rem] font-extrabold";

export const textLinkPlus =
  "font-display text-[1.25rem] transition-transform duration-200 group-hover:rotate-90";

export const imageStage =
  "relative isolate overflow-hidden before:absolute before:inset-[40%_5%] before:-z-10 before:rounded-full before:bg-coral before:border-ink/25 before:content-['']";


export const stageImage = "object-contain object-bottom";

export const imageCaption =
  "absolute bottom-[1.2rem] left-[1.2rem] z-[4] m-0 bg-canvas px-[0.8rem] py-[0.6rem] font-mono text-[0.58rem] uppercase tracking-[0.06em]";

export const journalMeta =
  "flex flex-wrap justify-between gap-x-[1.5rem] gap-y-[0.75rem] font-mono text-[0.6rem] uppercase tracking-[0.06em]";

export const riseIn = "animate-[rise-in_700ms_ease_both] motion-reduce:animate-none";
