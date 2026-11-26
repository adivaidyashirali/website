import { useRef, type ReactNode } from "react";
import { Link } from "react-router";
import { m, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/content/images";
import { Img } from "./Img";
import { TextReveal } from "./motion/TextReveal";

const EXPO = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: EXPO, delay },
});

/**
 * Cinematic hero for inner pages: full-bleed photograph with parallax, a
 * headline that rises word by word, and a large faint Devanagari accent.
 * The photograph is the LCP element, so it is loaded eagerly and never hidden.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imagePosition,
  accent,
  compact = false,
  children,
}: {
  eyebrow: string;
  /** Wrap a word in *asterisks* to set it in gold italics. */
  title: string;
  lead: string;
  image: ImageAsset;
  imagePosition?: string;
  accent?: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const accentY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={ref}
      className={`relative isolate flex flex-col overflow-hidden bg-forest-950 text-ivory-50 ${
        compact ? "min-h-[70svh]" : "min-h-[86svh]"
      }`}
    >
      <m.div data-reveal style={{ y: bgY }} className="absolute inset-0 -z-20 will-change-transform">
        <m.div
          data-reveal
          className="h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.6, ease: EXPO }}
        >
          <Img image={image} sizes="100vw" position={imagePosition} priority />
        </m.div>
      </m.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/70 to-forest-950/30" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950 via-forest-950/20 to-forest-950/70" />
      <div className="absolute inset-0 -z-10 bg-forest-700/20 mix-blend-multiply" />
      <div className="glow-gold absolute inset-0 -z-10" />

      {accent && (
        <m.p
          data-reveal
          style={{ y: accentY }}
          lang="sa"
          aria-hidden="true"
          className="text-gold-gradient pointer-events-none absolute -right-[2vw] top-[18%] -z-10 select-none font-deva text-[22vw] leading-none opacity-25 lg:text-[16vw]"
        >
          {accent}
        </m.p>
      )}

      <m.div
        data-reveal
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative flex flex-1 flex-col justify-end pb-24 pt-36 sm:pb-28 lg:pb-32"
      >
        <m.nav {...fadeUp(0.1)} data-reveal aria-label="Breadcrumb" className="mb-10 text-[0.75rem] tracking-[0.12em] text-ivory-100/60">
          <Link to="/" className="link-underline hover:text-ivory-50">
            Home
          </Link>
          <span aria-hidden="true" className="mx-3 text-gold-400">
            /
          </span>
          <span aria-current="page" className="text-ivory-100/90">
            {eyebrow}
          </span>
        </m.nav>
        <m.p
          {...fadeUp(0.2)}
          data-reveal
          className="inline-flex items-center gap-2.5 self-start rounded-full border border-gold-400/60 bg-forest-950/30 px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm"
        >
          <span className="size-2.5 rounded-full bg-gold-400" />
          {eyebrow}
        </m.p>
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.3}
          text={title}
          className="mt-7 max-w-[18ch] text-[clamp(2.6rem,5.8vw,5.4rem)] leading-[1.03]"
        />
        <m.p {...fadeUp(0.9)} data-reveal className="mt-9 max-w-xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-xl">
          {lead}
        </m.p>
        {children && (
          <m.div {...fadeUp(1.05)} data-reveal className="mt-10">
            {children}
          </m.div>
        )}
      </m.div>
    </section>
  );
}
