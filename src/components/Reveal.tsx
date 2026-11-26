import type { ReactNode } from "react";
import { m } from "motion/react";
import { ParallaxImage } from "./motion/ParallaxImage";

const EXPO = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Fade-and-rise on scroll. Reduced-motion users get the final state
 * immediately (see the `[data-reveal]` rule in index.css).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EXPO, delay }}
    >
      {children}
    </Comp>
  );
}

/** Gold hairline that draws itself across when it enters view. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden="true"
      data-reveal
      className={`block h-px origin-left ${className ?? "bg-ink-900/15"}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.6, ease: EXPO, delay }}
    />
  );
}

/** Kept for existing call-sites: an image that unveils and drifts in parallax. */
export const RevealImage = ParallaxImage;
