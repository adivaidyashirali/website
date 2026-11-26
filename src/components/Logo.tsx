import { Link } from "react-router";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Temporary mark: an arch (a doorway / shrine form) framing a sprig.
 * Replace <LogoMark /> with the official mark when it is supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9 shrink-0", className)}>
      <path
        d="M9 35V18.5a11 11 0 0 1 22 0V35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-gold-500"
      />
      <path d="M5 35.3h30" stroke="currentColor" strokeWidth="1.8" className="text-gold-500" />
      <g fill="currentColor" className="text-forest-600">
        <path d="M20 33V14.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M20 25.5c-4.6-.4-6.6-3.6-6.2-7.2 3.8.5 6 3.2 6.2 7.2Z" />
        <path d="M20 21c4.6-.4 6.6-3.6 6.2-7.2-3.8.5-6 3.2-6.2 7.2Z" />
      </g>
    </svg>
  );
}

/** Mark inside a white circular badge with a saffron ring. */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgb(10_36_20/0.35)] ring-2 ring-gold-400/80",
        className,
      )}
    >
      <LogoMark className="size-8" />
    </span>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 transition-colors duration-500",
        tone === "dark" ? "text-ink-900" : "text-white",
        className,
      )}
    >
      <LogoBadge className="transition-transform duration-700 ease-(--ease-expo) group-hover:rotate-[-8deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3rem] font-semibold tracking-[-0.01em]">{site.name}</span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-[0.1em] sm:text-[0.625rem] sm:tracking-[0.14em]",
            tone === "dark" ? "text-ink-500" : "text-white/75",
          )}
        >
          {site.descriptor}
        </span>
      </span>
    </Link>
  );
}
