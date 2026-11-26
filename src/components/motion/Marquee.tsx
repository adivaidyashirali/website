import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Endless decorative ribbon of words. Purely visual (aria-hidden). */
export function Marquee({ items, className }: { items: { text: string; lang?: string }[]; className?: string }) {
  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden="true" key={copy}>
      {items.map((item, i) => (
        <Fragment key={`${copy}-${i}`}>
          <span
            lang={item.lang}
            className={cn("whitespace-nowrap px-8 sm:px-12", item.lang === "sa" ? "font-deva not-italic" : "")}
          >
            {item.text}
          </span>
          <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-gold-400 sm:size-5">
            <path d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0Z" fill="currentColor" />
          </svg>
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={cn("group relative flex overflow-hidden", className)} aria-hidden="true">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
