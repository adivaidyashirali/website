import { useEffect, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { Eyebrow } from "@/components/Section";
import { Img } from "@/components/Img";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { homeContent } from "@/content/home";

/**
 * Visual storytelling. Desktop: the section pins and the frames travel
 * horizontally as you scroll. Phones: a native swipeable strip.
 */
export function Story() {
  const { story } = homeContent;
  const title = story.title;

  return (
    <section aria-labelledby="story-title" className="relative bg-forest-950 text-ivory-50">
      <PinnedStory title={title} />

      {/* Mobile / tablet */}
      <div className="py-24 sm:py-32 lg:hidden">
        <div className="container-site">
          <Eyebrow tone="light">{story.eyebrow}</Eyebrow>
          <TextReveal
            as="h2"
            text={title}
            className="mt-6 text-[2.4rem] leading-[1.05] sm:text-5xl"
          />
        </div>
        <div
          role="region"
          aria-label="Photo story"
          tabIndex={0}
          className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {story.frames.map((frame, i) => (
            <figure key={frame.kicker} className="w-[80%] shrink-0 snap-start sm:w-[55%]">
              <ParallaxImage image={frame.image} sizes="80vw" className="aspect-[3/4] rounded-[1.5rem]" speed={0} />
              <figcaption className="mt-5">
                <span className="eyebrow text-gold-300">
                  0{i + 1} — {frame.kicker}
                </span>
                <span className="mt-2 block font-display text-2xl text-ivory-50">{frame.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedStory({ title }: { title: string }) {
  const { story } = homeContent;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} className="relative hidden h-[340vh] lg:block">
      <div className="glow-forest sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <m.div ref={trackRef} data-reveal style={{ x }} className="flex items-center gap-[6vw] pl-[7vw] pr-[10vw] will-change-transform">
          {/* Opening panel */}
          <div className="w-[38vw] shrink-0">
            <Eyebrow tone="light">{story.eyebrow}</Eyebrow>
            <TextReveal
              as="h2"
              id="story-title"
              text={title}
              className="mt-8 text-[clamp(2.6rem,4.2vw,4.6rem)] leading-[1.02]"
            />
          </div>

          {story.frames.map((frame, i) => (
            <figure
              key={frame.kicker}
              className={i % 2 === 0 ? "w-[30vw] shrink-0 self-start pt-[14vh]" : "w-[26vw] shrink-0 self-end pb-[12vh]"}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                <Img image={frame.image} sizes="30vw" className="scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/60 to-transparent" />
                <span className="absolute left-6 top-6 font-display text-6xl italic text-gold-200/90">0{i + 1}</span>
              </div>
              <figcaption className="mt-6 flex items-baseline justify-between gap-6 border-t border-ivory-50/15 pt-5">
                <span className="font-display text-[1.9rem] leading-tight text-ivory-50">{frame.line}</span>
                <span className="eyebrow shrink-0 text-gold-300">{frame.kicker}</span>
              </figcaption>
            </figure>
          ))}

          {/* Closing panel */}
          <div className="w-[30vw] shrink-0">
            <p lang="sa" className="text-gold-gradient font-deva text-[7vw] leading-none">
              वैद्य
            </p>
            <p className="mt-6 max-w-sm font-display text-3xl leading-snug text-ivory-100/85">
              A physician — one who holds knowledge, and uses it with care.
            </p>
          </div>
        </m.div>

        {/* Progress rail */}
        <div className="container-site absolute inset-x-0 bottom-10">
          <div className="relative h-px bg-ivory-50/15">
            <m.span style={{ width: progress }} className="absolute inset-y-0 left-0 bg-linear-to-r from-gold-200 to-gold-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
