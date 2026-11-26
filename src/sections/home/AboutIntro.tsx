import { useRef } from "react";
import { Link } from "react-router";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function AboutIntro() {
  const { about, aboutFeatures } = homeContent;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const insetY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["40%", "-50%"]);

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">
      <div className="container-site grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        {/* Image collage */}
        <div className="relative lg:col-span-6">
          <div aria-hidden="true" className="dots absolute -left-6 -top-8 h-40 w-48 opacity-80 sm:-left-10" />
          <div aria-hidden="true" className="dots absolute -bottom-10 right-4 h-32 w-40 opacity-80" />
          <div className="relative grid grid-cols-12 items-end gap-4">
            <ParallaxImage
              image={images.herbalPowder}
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="col-span-7 aspect-[3/4] rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgb(10_36_20/0.5)]"
              speed={0.12}
            />
            <m.div data-reveal style={{ y: insetY }} className="col-span-5 mb-10">
              <ParallaxImage
                image={images.spices}
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="aspect-[4/5] rounded-[1.5rem] ring-8 ring-white shadow-[0_30px_60px_-30px_rgb(10_36_20/0.5)]"
                speed={0.1}
                delay={0.15}
              />
            </m.div>
          </div>

          {/* Floating saffron badge */}
          <m.div
            data-reveal
            style={{ y: badgeY }}
            className="absolute -bottom-6 left-[46%] -translate-x-1/2 sm:left-[52%]"
          >
            <m.div
              data-reveal
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EXPO, delay: 0.3 }}
              className="rounded-2xl bg-gold-400 px-6 py-5 text-ink-900 shadow-[0_24px_50px_-20px_rgb(185_132_10/0.7)]"
            >
              <p lang="sa" className="font-deva text-4xl leading-none">
                आदि वैद्य
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-forest-900/80">“The first physician”</p>
            </m.div>
          </m.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <SectionIntro
            eyebrow={about.eyebrow}
            title="Healthcare rooted in an older idea of the *physician*."
            titleId="about-title"
          >
            <p className="text-ink-900">{about.statement}</p>
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </SectionIntro>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutFeatures.map((f, i) => (
              <Reveal as="li" key={f.text} delay={0.1 + i * 0.07} className="group flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-600 transition-colors duration-500 group-hover:bg-forest-600 group-hover:text-white">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <span className="font-semibold text-ink-900">{f.text}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-12">
            <Magnetic>
              <Button asChild size="lg">
                <Link to={about.link.to}>
                  {about.link.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
