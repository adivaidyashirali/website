import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { OVERLAP, SectionIntro } from "@/components/Section";
import { CtaSection } from "@/components/CtaSection";
import { Img } from "@/components/Img";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { approachContent } from "@/content/approach";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

type Pillar = (typeof approachContent.pillars)[number];

export default function ApproachPage() {
  const { hero, pillars, closing } = approachContent;
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <>
      <PageHero {...hero} />

      <section aria-labelledby="pillars-title" className={cn(OVERLAP, "bg-ivory-50 pb-16 pt-28 sm:pt-36 lg:pt-44")}>
        <div className="container-site">
          <SectionIntro
            eyebrow="Five commitments"
            title="Habits we keep, with every patient and every *family*."
            titleId="pillars-title"
          />
        </div>

        {/* Stacked panels: each pins, then recedes as the next slides over it */}
        <div ref={stackRef} className="container-site mt-20 lg:mt-28">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.number}
              pillar={p}
              index={i}
              total={pillars.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </section>

      <section aria-label="Closing thought" className="bg-ivory-50 pb-28 pt-12 sm:pb-36 lg:pb-44">
        <div className="container-site text-center">
          <span aria-hidden="true" className="text-gold-deep font-display text-[7rem] leading-none">
            “
          </span>
          <ScrollFillText
            as="h2"
            text={closing.quote}
            className="mx-auto -mt-6 max-w-5xl font-display text-[2.6rem] leading-[1.05] text-forest-900 sm:text-6xl lg:text-[5.5rem]"
          />
        </div>
      </section>

      <CtaSection title={homeContent.cta.title} body={homeContent.cta.body} />
    </>
  );
}

function PillarCard({
  pillar,
  index,
  total,
  progress,
}: {
  pillar: Pillar;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks slightly once the cards after it start to cover it.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035]);
  const dark = index % 2 === 1;

  return (
    <div className="sticky mb-8 last:mb-0 lg:mb-[12vh]" style={{ top: `calc(6rem + ${index * 1.4}rem)` }}>
      <m.article
        data-reveal
        style={{ scale }}
        aria-labelledby={`pillar-${pillar.number}`}
        className={cn(
          "grid origin-top overflow-hidden rounded-[2rem] shadow-[0_-20px_60px_-30px_rgb(8_19_14/0.45)] lg:min-h-[70vh] lg:grid-cols-2 lg:rounded-[2.5rem]",
          dark ? "bg-forest-900 text-ivory-50" : "bg-ivory-100 text-forest-900",
        )}
      >
        <div className="flex flex-col p-8 sm:p-12 lg:p-16">
          <div className="flex items-center justify-between">
            <span className={cn("font-display text-7xl italic leading-none lg:text-8xl", dark ? "text-gold-gradient" : "text-gold-deep")}>
              {pillar.number}
            </span>
            <span className={cn("eyebrow", dark ? "text-gold-300" : "text-gold-700")}>
              {index + 1} / {total}
            </span>
          </div>
          <h2 id={`pillar-${pillar.number}`} className="mt-10 text-[2.4rem] leading-[1.02] sm:text-5xl lg:mt-auto lg:text-[3.6rem]">
            {pillar.title}
          </h2>
          <p className={cn("mt-5 font-display text-2xl italic", dark ? "text-gold-200" : "text-gold-700")}>{pillar.lead}</p>
          <p className={cn("mt-5 max-w-lg text-[1.0625rem] leading-relaxed", dark ? "text-ivory-100/75" : "text-ink-700")}>
            {pillar.text}
          </p>
        </div>
        <div className={cn("relative min-h-[16rem] sm:min-h-[22rem] lg:min-h-0", index % 2 === 1 && "lg:order-first")}>
          <Img image={pillar.image} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
        </div>
      </m.article>
    </div>
  );
}
