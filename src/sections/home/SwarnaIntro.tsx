import { useRef } from "react";
import { Link } from "react-router";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, Info } from "lucide-react";
import { SectionIntro } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";

export function SwarnaIntro() {
  const { swarna } = homeContent;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], ["40%", "-60%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="swarna-title"
      className="relative overflow-hidden bg-ivory-100 py-28 sm:py-36 lg:py-44"
    >
      {/* Oversized Devanagari drifting sideways behind the composition */}
      <m.p
        data-reveal
        style={{ x: wordX }}
        lang="sa"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-10 select-none whitespace-nowrap font-deva text-[28vw] leading-none text-gold-400/[0.13] lg:text-[20vw]"
      >
        स्वर्णप्राशन
      </m.p>

      <div className="container-site relative grid items-center gap-20 lg:grid-cols-12 lg:gap-10">
        {/* Images: arch frame + floating round detail */}
        <div className="relative mx-auto w-full max-w-md pb-16 lg:col-span-5 lg:max-w-none lg:pb-0">
          <ParallaxImage
            image={swarna.images.primary}
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="aspect-[3/4] rounded-t-full"
            position="50% 60%"
            speed={0.14}
          />
          <m.div
            data-reveal
            style={{ y: floatY }}
            className="absolute -right-4 bottom-0 w-[46%] sm:-right-10 lg:-right-16 lg:bottom-8"
          >
            <ParallaxImage
              image={swarna.images.secondary}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className="aspect-square rounded-full ring-8 ring-ivory-100"
              speed={0.1}
              delay={0.25}
            />
          </m.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionIntro
            eyebrow={swarna.eyebrow}
            title={swarna.title}
            titleId="swarna-title"
          >
            {swarna.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </SectionIntro>
          <Reveal delay={0.2}>
            <p className="mt-9 flex gap-3 rounded-2xl border border-gold-400/30 bg-ivory-50/70 p-5 text-sm leading-relaxed text-ink-700 backdrop-blur-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
              <span>{swarna.note}</span>
            </p>
            <Magnetic className="mt-10">
              <Button asChild size="lg">
                <Link to={swarna.link.to}>
                  {swarna.link.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
