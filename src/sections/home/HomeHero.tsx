import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, m, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Pause, Play } from "lucide-react";
import { Img } from "@/components/Img";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION = 7; // seconds per slide

export function HomeHero() {
  const { slides } = homeContent;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const running = playing && !hovering;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), DURATION * 1000);
    return () => window.clearTimeout(t);
  }, [running, index, go]);

  const slide = slides[index];
  const next = slides[(index + 1) % slides.length];

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Introduction"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-950 text-white"
    >
      {/* Slides */}
      <m.div data-reveal style={{ y: bgY }} className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <m.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <m.div
              data-reveal
              className="h-full w-full"
              initial={{ scale: index === 0 && !mounted ? 1.12 : 1.16 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: DURATION + 2, ease: "linear" }}
            >
              <Img image={slide.image} sizes="100vw" position={slide.position} priority={index === 0} alt="" />
            </m.div>
          </m.div>
        </AnimatePresence>
      </m.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/90 via-forest-950/60 to-forest-950/10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/80 via-transparent to-forest-950/50" />
      <div className="absolute inset-0 -z-10 bg-forest-700/20 mix-blend-multiply" />

      {/* Copy */}
      <m.div
        data-reveal
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative flex flex-1 flex-col justify-center pb-40 pt-32 lg:pb-36"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.45 } }}
            className="max-w-4xl"
          >
            <m.p
              data-reveal
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/60 bg-forest-950/30 px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/70" />
                <span className="relative size-2.5 rounded-full bg-gold-400" />
              </span>
              {slide.label}
            </m.p>
            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.25}
              stagger={0.06}
              text={slide.title}
              emClassName="italic text-gold-gradient"
              className="mt-7 text-[clamp(2.75rem,6.6vw,6rem)] leading-[1.02]"
            />
            <m.p
              data-reveal
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EXPO, delay: 0.7 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
            >
              {slide.text}
            </m.p>
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EXPO, delay: 0.85 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button asChild variant="gold" size="lg">
                  <Link to={slide.cta.to}>
                    {slide.cta.label} <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outlineLight" size="lg">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </Magnetic>
            </m.div>
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* Controls */}
      <div className="container-site absolute inset-x-0 bottom-0 pb-7 sm:pb-9">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <ol className="flex gap-3 sm:gap-4" aria-label="Slides">
              {slides.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Slide ${i + 1}: ${s.label}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group block w-14 text-left sm:w-32 lg:w-40"
                  >
                    <span
                      className={cn(
                        "font-display text-xs transition-colors",
                        i === index ? "text-gold-300" : "text-white/55 group-hover:text-white",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-white/20">
                      {i === index && (
                        <m.span
                          key={`${index}-${running}`}
                          className="block h-full origin-left rounded-full bg-gold-400"
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: running ? DURATION : 0, ease: "linear" }}
                        />
                      )}
                      {i < index && <span className="block h-full rounded-full bg-white/50" />}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="mt-4 flex size-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white [&_svg]:size-3.5"
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
          </div>

          {/* Up next */}
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="group hidden items-center gap-4 rounded-2xl border border-white/15 bg-forest-950/40 p-2.5 pr-5 text-left backdrop-blur-md transition-colors hover:border-gold-400/60 md:flex"
          >
            <span className="relative size-16 overflow-hidden rounded-xl">
              <Img image={next.image} sizes="64px" position={next.position} alt="" />
            </span>
            <span>
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-300">Up next</span>
              <span className="mt-0.5 block font-medium text-white">{next.label}</span>
            </span>
            <ArrowRight className="ml-2 size-4 text-white/80 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <span className="hidden items-center gap-2 pb-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/60 xl:flex">
            Scroll <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
