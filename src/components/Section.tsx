import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextReveal } from "./motion/TextReveal";

/** First section after a hero (kept as a hook for future overlap styling). */
export const OVERLAP = "relative z-10";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-forest-600" : "text-gold-300",
        className,
      )}
    >
      <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-gold-400" />
      {children}
    </p>
  );
}

/**
 * Eyebrow + animated headline + optional body copy.
 * Wrap a word in *asterisks* in `title` to set it in gold italics.
 */
export function SectionIntro({
  eyebrow,
  title,
  titleId,
  children,
  tone = "dark",
  className,
  titleClassName,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  titleId?: string;
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as={as}
        id={titleId}
        text={title}
        emClassName={tone === "dark" ? "italic text-gold-deep" : "italic text-gold-gradient"}
        className={cn(
          "mt-5 text-[2.25rem] leading-[1.08] sm:text-[2.9rem] lg:text-[3.5rem]",
          tone === "dark" ? "text-forest-900" : "text-ivory-50",
          titleClassName,
        )}
      />
      {children && (
        <Reveal
          delay={0.15}
          className={cn(
            "mt-7 max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed",
            tone === "dark" ? "text-ink-700" : "text-ivory-100/75",
          )}
        >
          {children}
        </Reveal>
      )}
    </div>
  );
}
