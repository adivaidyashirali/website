import { Fragment } from "react";
import { Icon } from "@/components/Icon";
import { homeContent } from "@/content/home";

/** Saffron ribbon of services that scrolls endlessly under the hero. */
export function Ticker() {
  const items = homeContent.ticker;
  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" key={copy}>
      {items.map((item) => (
        <Fragment key={`${copy}-${item.text}`}>
          <span className="flex items-center gap-3 whitespace-nowrap px-7 font-display text-lg font-semibold text-forest-950 sm:text-xl">
            <Icon name={item.icon} className="size-5 text-forest-700" />
            {item.text}
          </span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-forest-800/60" />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 overflow-hidden bg-linear-to-r from-gold-400 via-gold-300 to-gold-400 py-4 shadow-[0_10px_30px_-20px_rgb(10_36_20/0.6)]">
      <p className="sr-only">Our services: {items.map((i) => i.text).join(", ")}.</p>
      <div aria-hidden="true" className="group flex">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </div>
  );
}
