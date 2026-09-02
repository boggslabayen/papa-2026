import Link from "next/link";
import { button, buttonSmall, cn } from "../../lib/styles";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/talks", label: "Talks" },
  { href: "/journal", label: "Journal" },
];

export function SiteHeader() {
  const navLink =
    "relative text-[0.82rem] font-bold after:absolute after:-bottom-[0.35rem] after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:content-[''] hover:after:origin-left hover:after:scale-x-100";

  return (
    <header className="sticky top-0 z-50 grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center gap-8 border-b border-ink/20 bg-paper/90 px-[clamp(1.25rem,4vw,4.5rem)] backdrop-blur-[18px] max-[820px]:grid-cols-[1fr_auto]">
      <Link
        className="inline-flex items-center gap-[0.8rem] justify-self-start"
        href="/"
        aria-label="RGL home"
      >
        <span className="font-display text-[1.65rem] font-bold leading-none tracking-[-0.07em]">
          RGL
        </span>
        <span className="max-w-[4.5rem] border-l border-current pl-[0.8rem] font-mono text-[0.64rem] uppercase leading-[1.15] tracking-[0.08em] max-[560px]:hidden">
          Robert Labayen
        </span>
      </Link>

      <nav
        className="flex items-center justify-center gap-[clamp(1.5rem,3vw,3.2rem)] max-[820px]:hidden"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <Link className={navLink} href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        className={cn(
          button,
          buttonSmall,
          "justify-self-end max-[820px]:hidden",
        )}
        href="/contact"
      >
        Book Robert
      </Link>

      <details className="relative hidden justify-self-end max-[820px]:block">
        <summary className="cursor-pointer list-none text-[0.75rem] font-extrabold [&::-webkit-details-marker]:hidden">
          Menu
        </summary>
        <nav
          className="absolute right-0 top-[2.1rem] flex min-w-[13rem] flex-col bg-ink p-4 text-canvas"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              className="border-b border-canvas/20 p-[0.9rem] text-[0.8rem] font-bold"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="border-b border-canvas/20 p-[0.9rem] text-[0.8rem] font-bold"
            href="/contact"
          >
            Book Robert
          </Link>
        </nav>
      </details>
    </header>
  );
}
