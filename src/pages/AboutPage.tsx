import { PageHero } from "@/components/PageHero";
import { Eyebrow, OVERLAP, SectionIntro } from "@/components/Section";
import { DrawLine, Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";
import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const { hero, intro, vision, mission, values, commitment } = aboutContent;
  return (
    <>
      <PageHero {...hero} imagePosition="50% 60%" accent="आदि" />

      {/* Who we are */}
      <section aria-labelledby="who-title" className={cn(OVERLAP, "bg-ivory-50 py-28 sm:py-36 lg:py-44")}>
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal y={16}>
              <Eyebrow>Introduction</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 id="who-title" className="mt-6 text-5xl text-forest-900 sm:text-6xl">
                {intro.title}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-10 lg:col-span-7 lg:col-start-6">
            <ScrollFillText
              text={intro.paragraphs[0]}
              className="font-display text-[1.9rem] leading-[1.25] text-forest-900 sm:text-[2.4rem] lg:text-[2.8rem]"
            />
            <Reveal className="space-y-6 text-lg leading-relaxed text-ink-700">
              {intro.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section aria-label="Vision and mission" className="glow-forest relative overflow-hidden bg-forest-950 text-ivory-50">
        <div className="container-site grid md:grid-cols-2">
          {[vision, mission].map((block, i) => (
            <Reveal
              key={block.label}
              delay={i * 0.12}
              className={cn(
                "py-24 md:py-32 lg:py-44",
                i === 0 ? "border-b border-ivory-50/12 md:border-b-0 md:pr-14" : "md:border-l md:border-ivory-50/12 md:pl-14",
              )}
            >
              <span className="text-gold-gradient font-display text-8xl italic leading-none">{i === 0 ? "i." : "ii."}</span>
              <Eyebrow tone="light" className="mt-8">
                {block.label}
              </Eyebrow>
              <p className="mt-6 font-display text-[2rem] leading-[1.2] sm:text-4xl lg:text-[2.9rem]">{block.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-b border-gold-400/20 bg-forest-950 py-7 font-display text-4xl italic text-ivory-100/90 sm:text-6xl">
        <Marquee items={values.map((v) => ({ text: v.title }))} />
      </div>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-ivory-50 py-28 sm:py-36 lg:py-44">
        <div className="container-site">
          <SectionIntro
            eyebrow="Philosophy & values"
            title="What we hold to, in *every* interaction."
            titleId="values-title"
          />
          <DrawLine className="mt-20 bg-ink-900/15" />
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="group border-b border-ink-900/12 py-10 sm:px-8 sm:[&:nth-child(odd)]:pl-0 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-ink-900/12 lg:first:pl-0"
              >
                <span aria-hidden="true" className="eyebrow text-gold-700">
                  0{i + 1}
                </span>
                <dt className="mt-6 font-display text-4xl text-forest-900 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-2">
                  {v.title}
                </dt>
                <dd className="mt-4 text-ink-700">{v.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Commitment: tradition + professional approach */}
      <section aria-labelledby="commitment-title" className="bg-ivory-100 py-28 sm:py-36 lg:py-44">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12">
          <ParallaxImage
            image={commitment.image}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[4/5] rounded-t-full sm:aspect-[4/3] sm:rounded-t-[3rem] lg:col-span-5 lg:aspect-[4/5] lg:rounded-t-full"
            speed={0.15}
          />
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionIntro eyebrow={commitment.eyebrow} title={commitment.title} titleId="commitment-title">
              {commitment.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </SectionIntro>
          </div>
        </div>
      </section>

      <CtaSection title={homeContent.cta.title} body={homeContent.cta.body} />
    </>
  );
}
