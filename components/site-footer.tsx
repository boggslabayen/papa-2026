import Link from "next/link";

export function SiteFooter() {
  const footerLink =
    "relative text-[0.82rem] font-bold after:absolute after:-bottom-[0.35rem] after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:content-[''] hover:after:origin-left hover:after:scale-x-100";

  return (
    <footer className="grid grid-cols-[1fr_auto] gap-[clamp(3rem,7vw,8rem)] bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-[clamp(4rem,8vw,8rem)] text-canvas max-[560px]:grid-cols-1">
      <div>
        <Link className="inline-flex items-center gap-[0.8rem]" href="/">
          <span className="font-display text-[1.65rem] font-bold leading-none tracking-[-0.07em]">
            RGL
          </span>
          <span className="max-w-[4.5rem] border-l border-current pl-[0.8rem] font-mono text-[0.64rem] uppercase leading-[1.15] tracking-[0.08em]">
            Robert Labayen
          </span>
        </Link>
      </div>

      <div className="flex min-w-[12rem] flex-col items-start gap-[1.4rem] pt-2 max-[560px]:col-start-1">
        <Link className={footerLink} href="/about">
          About
        </Link>
        <Link className={footerLink} href="/talks">
          Talks & Workshops
        </Link>
        {/* <Link className={footerLink} href="/journal">
          Journal
        </Link> */}
        <Link className={footerLink} href="/contact">
          Book Robert
        </Link>
      </div>

      <div className="col-span-full flex justify-between border-t border-canvas/25 pt-6 font-mono text-[0.58rem] uppercase tracking-[0.06em] max-[560px]:col-span-1 max-[560px]:flex-col max-[560px]:items-start">
        <span>Creative leadership / Speaking / Art</span>
        <span>Philippines and beyond</span>
      </div>
    </footer>
  );
}
