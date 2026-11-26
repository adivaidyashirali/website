import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { Info, Plus } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Eyebrow, OVERLAP, SectionIntro } from "@/components/Section";
import { DrawLine, Reveal } from "@/components/Reveal";
import { Pending } from "@/components/Pending";
import { CtaSection } from "@/components/CtaSection";
import { ContactActions } from "@/components/ContactActions";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { swarnaContent } from "@/content/swarna";
import { cn } from "@/lib/utils";

const ENQUIRY = "Hello, I would like to know more about the Swarna Prashana programme.";

export default function SwarnaPrashanaPage() {
  const { hero, what, initiative, details, enquire, faqs, disclaimer } = swarnaContent;

  return (
    <>
      <PageHero {...hero} imagePosition="50% 55%" accent={hero.devanagari}>
        <ContactActions tone="light" message={ENQUIRY} />
      </PageHero>

      {/* What it is */}
      <section aria-labelledby="what-title" className={cn(OVERLAP, "bg-ivory-50 py-28 sm:py-36 lg:py-44")}>
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIntro eyebrow={what.eyebrow} title={what.title} titleId="what-title">
              {what.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </SectionIntro>
            <dl className="mt-14 grid gap-3 sm:grid-cols-3">
              {what.ingredients.map((ing, i) => (
                <Reveal
                  key={ing.name}
                  delay={0.1 + i * 0.1}
                  className="group rounded-[1.5rem] border border-gold-400/30 bg-linear-to-b from-ivory-100 to-ivory-50 p-6 transition-shadow duration-700 hover:shadow-[0_24px_50px_-30px_rgb(118_90_48/0.6)]"
                >
                  <span aria-hidden="true" className="text-gold-deep font-display text-3xl italic">
                    {["i", "ii", "iii"][i]}
                  </span>
                  <dt className="mt-6 font-display text-2xl italic text-forest-900">{ing.name}</dt>
                  <dd className="mt-1 text-sm text-ink-700">{ing.note}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ParallaxImage
              image={what.image}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] rounded-t-full lg:mt-6"
              position="40% 50%"
              speed={0.15}
            />
          </div>
        </div>
      </section>

      <Context />

      {/* Our programme */}
      <section aria-labelledby="initiative-title" className="bg-ivory-100 py-28 sm:py-36 lg:py-44">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12">
          <ParallaxImage
            image={initiative.image}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] rounded-[2rem] lg:col-span-6"
            position="50% 60%"
            speed={0.14}
          />
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIntro eyebrow={initiative.eyebrow} title={initiative.title} titleId="initiative-title">
              {initiative.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </SectionIntro>
          </div>
        </div>

        {/* Programme details */}
        <div className="container-site mt-28 lg:mt-36">
          <div className="rounded-[2rem] bg-ivory-50 p-6 shadow-[0_40px_80px_-50px_rgb(13_31_22/0.35)] sm:p-10 lg:p-14">
            <Reveal y={16}>
              <Eyebrow>Programme details</Eyebrow>
            </Reveal>
            <DrawLine className="mt-8 bg-ink-900/12" />
            <dl>
              {details.map((d, i) => (
                <Reveal
                  key={d.label}
                  delay={i * 0.06}
                  className="group grid gap-1 border-b border-ink-900/12 py-6 last:border-b-0 sm:grid-cols-[20rem_1fr] sm:gap-8"
                >
                  <dt className="font-display text-[1.65rem] text-forest-900 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-2">
                    {d.label}
                  </dt>
                  <dd className="self-center text-ink-700">
                    {d.value ?? <Pending field={`swarna.ts → details → "${d.label}" (${d.hint})`}>Shared on enquiry</Pending>}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How to enquire + FAQ */}
      <section aria-labelledby="enquire-title" className="bg-ivory-50 py-28 sm:py-36 lg:py-44">
        <div className="container-site grid gap-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="For parents & guardians" title={enquire.title} titleId="enquire-title" />
            <ol className="mt-14 space-y-9">
              {enquire.steps.map((step, i) => (
                <Reveal as="li" key={step} delay={i * 0.08} className="flex gap-6">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold-200 to-gold-500 font-display text-xl italic text-forest-950"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-2.5 text-[1.0625rem] text-ink-900">{step}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-14">
              <ContactActions tone="dark" message={ENQUIRY} />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <TextReveal as="h2" text="Common *questions*" className="text-5xl text-forest-900 sm:text-6xl" emClassName="italic text-gold-deep" />
            <div className="mt-12 border-t border-ink-900/15">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.06}>
                  <details className="group border-b border-ink-900/15 [&[open]_.faq-a]:grid-rows-[1fr]">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-[1.55rem] leading-snug text-forest-900 transition-colors group-hover:text-gold-700">
                        {f.q}
                      </span>
                      <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink-900/15 transition-all duration-500 group-open:rotate-45 group-open:border-gold-500 group-open:bg-gold-300/30">
                        <Plus aria-hidden="true" className="size-4 text-gold-700" />
                      </span>
                    </summary>
                    <p className="max-w-xl pb-8 text-ink-700">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-sm leading-relaxed text-ink-500">{disclaimer}</p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Considering Swarna Prashana for your *child*?"
        body="Speak with us first. We will explain the programme, the schedule and the kit, and answer your questions honestly."
        message={ENQUIRY}
      />
    </>
  );
}

function Context() {
  const { context } = swarnaContent;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="context-title"
      className="glow-forest relative overflow-hidden bg-forest-950 py-28 text-ivory-50 sm:py-36 lg:py-48"
    >
      <m.p
        data-reveal
        style={{ x }}
        lang="sa"
        aria-hidden="true"
        className="text-gold-gradient pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap font-deva text-[34vw] leading-none opacity-[0.09] lg:text-[24vw]"
      >
        पुष्य नक्षत्र
      </m.p>
      <div className="container-site relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro tone="light" eyebrow={context.eyebrow} title={context.title} titleId="context-title" />
        </div>
        <div className="space-y-8 lg:col-span-6 lg:col-start-7">
          <ScrollFillText
            text={context.paragraphs[0]}
            className="font-display text-[1.8rem] leading-[1.3] text-ivory-50 sm:text-[2.2rem]"
          />
          <Reveal className="text-lg leading-relaxed text-ivory-100/75">
            <p>{context.paragraphs[1]}</p>
          </Reveal>
          <Reveal>
            <p className="flex gap-3 rounded-2xl border border-gold-300/20 bg-ivory-50/[0.04] p-5 text-sm leading-relaxed text-ivory-100/70 backdrop-blur-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              {context.quoteNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
