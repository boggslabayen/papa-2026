import { cn } from "@/lib/styles";

export function PaintingDivider({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Colorful painting of an eye, hand, fountain pen, artist's palette, buildings, and a profile with a heart."
      className={cn(
        "h-[clamp(4rem,8vw,7rem)] w-full bg-repeat-x bg-[length:auto_100%] bg-left max-md:aspect-[848/213] max-md:h-auto max-md:bg-no-repeat max-md:bg-[length:100%_100%]",
        className,
      )}
      style={{ backgroundImage: "url('/images/art/sessions-painting.png')" }}
    />
  );
}
