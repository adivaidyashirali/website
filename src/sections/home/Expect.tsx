import { Check } from "lucide-react";
import { SectionIntro } from "@/components/Section";
import { DrawLine, Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { homeContent } from "@/content/home";

export function Expect() {
  const { expect } = homeContent;
  return (
    <section aria-labelledby="expect-title" className="bg-ivory-100 py-28 sm:py-36 lg:py-44">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ParallaxImage
              image={expect.image}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] rounded-[2rem] sm:aspect-[16/11] lg:aspect-[4/5]"
              position="55% 40%"
              speed={0.16}
            >
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-ivory-50/20 bg-forest-950/45 p-5 text-ivory-50 backdrop-blur-md">
                <p className="eyebrow text-gold-200">One organisation</p>
                <p className="mt-2 font-display text-2xl leading-snug">Clinic care and Ayurvedic wellness, held to one standard.</p>
              </div>
            </ParallaxImage>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionIntro eyebrow={expect.eyebrow} title={expect.title} titleId="expect-title" />
          <DrawLine className="mt-14 bg-ink-900/12" />
          <ul>
            {expect.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.07}
                className="group flex items-start gap-6 border-b border-ink-900/12 py-7"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold-200 to-gold-500 text-forest-950 shadow-[0_8px_20px_-10px_rgb(180_143_85/0.8)] transition-transform duration-700 ease-(--ease-expo) group-hover:rotate-[360deg]">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="font-display text-[1.6rem] leading-snug text-forest-900 lg:text-[1.85rem]">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
