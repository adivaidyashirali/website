import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";

const ICONS = ["heart", "leaf", "shield", "sprout"];

/** Giant scrolling value words, then the four principles as cards. */
export function Principles() {
  const { principles, values } = homeContent;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowA = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const words = [...values, ...values];

  return (
    <section ref={ref} aria-labelledby="principles-title" className="glow-forest relative overflow-hidden bg-forest-950 text-white">
      {/* Values in two rows that slide in opposite directions with scroll */}
      <div aria-hidden="true" className="select-none overflow-hidden border-b border-white/10 py-10 font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[1.05] sm:py-14">
        <m.div data-reveal style={{ x: rowA }} className="flex whitespace-nowrap">
          {words.map((w, i) => (
            <span key={`a-${i}`} className={i % 2 ? "text-gold-400" : "text-white"}>
              {w}
              <span className="mx-6 text-gold-400/70">·</span>
            </span>
          ))}
        </m.div>
        <m.div data-reveal style={{ x: rowB }} className="flex whitespace-nowrap">
          {words.map((w, i) => (
            <span
              key={`b-${i}`}
              className={i % 2 ? "text-white/90" : "text-transparent [-webkit-text-stroke:1.5px_var(--color-gold-400)]"}
            >
              {w}
              <span className="mx-6 text-gold-400/70">·</span>
            </span>
          ))}
        </m.div>
      </div>

      <div className="container-site py-24 sm:py-32 lg:py-36">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro tone="light" eyebrow={principles.eyebrow} title={principles.title} titleId="principles-title" />
          <Reveal>
            <Button asChild variant="outlineLight">
              <Link to={principles.link.to}>
                {principles.link.label} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {principles.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.1}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-700 ease-(--ease-expo) hover:-translate-y-2 hover:border-gold-400/50 hover:bg-white/[0.07]"
            >
              <span className="flex size-14 items-center justify-center rounded-xl bg-gold-400 text-ink-900 shadow-[0_14px_30px_-12px_rgb(240_180_41/0.6)] transition-transform duration-700 ease-(--ease-expo) group-hover:rotate-[-8deg] group-hover:scale-110">
                <Icon name={ICONS[i]} className="size-6" />
              </span>
              <span aria-hidden="true" className="absolute right-7 top-7 font-display text-4xl font-semibold text-white/10">
                {item.numeral}
              </span>
              <h3 className="mt-8 text-[1.6rem] leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-white/70">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
