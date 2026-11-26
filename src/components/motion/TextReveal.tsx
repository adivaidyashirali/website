import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

type Token = { word: string; em: boolean };

/** "Care that *remembers* where" → words, with *starred* words emphasised. */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let em = false;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    let word = raw;
    const opens = word.startsWith("*");
    if (opens) {
      em = true;
      word = word.slice(1);
    }
    const closes = word.endsWith("*") || /\*[.,;:!?]$/.test(word);
    word = word.replace(/\*(?=[.,;:!?]?$)/, "");
    tokens.push({ word, em });
    if (closes) em = false;
  }
  return tokens;
}

export const plainText = (text: string) => text.replace(/\*/g, "");

const word: Variants = {
  hidden: { y: "112%", rotate: 4 },
  show: (d: number) => ({ y: "0%", rotate: 0, transition: { duration: 1.15, ease: EXPO, delay: d } }),
};

/**
 * Headline that rises word by word from behind a mask. Screen readers get
 * the plain sentence once; the animated words are hidden from them.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  id,
  className,
  emClassName = "italic text-gold-gradient",
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  emClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" for above-the-fold headlines, "inView" for the rest. */
  trigger?: "mount" | "inView";
}) {
  const tokens = tokenize(text);
  const play =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <m.span aria-hidden="true" initial="hidden" {...play} className="block">
        {tokens.map((t, i) => (
          <span key={i}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.08em] align-bottom">
              <m.span
                data-reveal
                variants={word}
                custom={delay + i * stagger}
                className={cn("inline-block origin-bottom-left will-change-transform", t.em && emClassName)}
              >
                {t.word}
              </m.span>
            </span>{" "}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
