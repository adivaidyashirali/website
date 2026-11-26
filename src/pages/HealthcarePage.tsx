import { useRef, type ReactNode } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { Eyebrow, OVERLAP, SectionIntro } from "@/components/Section";
import { DrawLine, Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";
import { Pending } from "@/components/Pending";
import { CtaSection } from "@/components/CtaSection";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { healthcareContent } from "@/content/healthcare";
import { cn } from "@/lib/utils";

export default function HealthcarePage() {
  const { hero, patientFocus, departments, doctors, facilities } = healthcareContent;

  return (
    <>
      <PageHero {...hero} imagePosition="50% 25%" />

      <Journey />

      {/* Patient-focused approach */}
      <section aria-labelledby="focus-title" className="bg-ivory-100 py-28 sm:py-36 lg:py-44">
        <div className="container-site grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIntro eyebrow={patientFocus.eyebrow} title={patientFocus.title} titleId="focus-title" />
            <DrawLine className="mt-14 bg-ink-900/12" />
            <dl>
              {patientFocus.points.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 0.08}
                  className="group grid gap-2 border-b border-ink-900/12 py-8 sm:grid-cols-[13rem_1fr] sm:gap-8"
                >
                  <dt className="font-display text-[1.75rem] text-forest-900 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-2">
                    {p.title}
                  </dt>
                  <dd className="text-ink-700">{p.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                image={patientFocus.image}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] rounded-[2rem] lg:aspect-[4/5]"
                position="60% 50%"
                speed={0.15}
              />
            </div>
          </div>
        </div>
      </section>

      <Environment />

      {/* Departments, doctors, facilities — verified information only */}
      <section aria-labelledby="details-title" className="bg-ivory-50 py-28 sm:py-36 lg:py-44">
        <div className="container-site">
          <SectionIntro
            eyebrow="Services & facilities"
            title="Departments, doctors and *facilities*."
            titleId="details-title"
          >
            <p>
              For current consultation availability, departments and doctors' schedules, please contact our reception.
              We publish only confirmed information here.
            </p>
          </SectionIntro>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <DetailColumn index={1} title="Departments" field="healthcare.ts → departments">
              {departments.map((d) => (
                <li key={d.name}>
                  <p className="font-display text-xl text-forest-900">{d.name}</p>
                  <p className="text-sm text-ink-700">{d.description}</p>
                </li>
              ))}
            </DetailColumn>
            <DetailColumn index={2} title="Our doctors" field="healthcare.ts → doctors">
              {doctors.map((d) => (
                <li key={d.name}>
                  <p className="font-display text-xl text-forest-900">{d.name}</p>
                  <p className="text-sm text-ink-700">
                    {d.role}
                    {d.qualifications ? ` · ${d.qualifications}` : ""}
                  </p>
                </li>
              ))}
            </DetailColumn>
            <DetailColumn index={3} title="Facilities" field="healthcare.ts → facilities">
              {facilities.map((f) => (
                <li key={f.name}>
                  <p className="font-display text-xl text-forest-900">{f.name}</p>
                  {f.description && <p className="text-sm text-ink-700">{f.description}</p>}
                </li>
              ))}
            </DetailColumn>
          </div>
        </div>
      </section>

      <CtaSection
        title="Planning a *visit*?"
        body="Contact our reception for timings, consultation availability and directions."
        message="Hello, I would like to know about consultation timings."
      />
    </>
  );
}

/** The visit as a timeline whose gold line fills as you scroll. */
function Journey() {
  const { journey } = healthcareContent;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="journey-title" className={cn(OVERLAP, "bg-ivory-50 py-28 sm:py-36 lg:py-44")}>
      <div className="container-site">
        <SectionIntro eyebrow={journey.eyebrow} title={journey.title} titleId="journey-title" />
        <div ref={ref} className="relative mt-20 lg:mt-28">
          <span
            aria-hidden="true"
            className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-ink-900/12 lg:left-0 lg:top-[0.6rem] lg:h-px lg:w-full"
          />
          <m.span
            aria-hidden="true"
            data-reveal
            style={{ scaleY: fill }}
            className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-linear-to-b from-gold-300 to-gold-600 lg:hidden"
          />
          <m.span
            aria-hidden="true"
            data-reveal
            style={{ scaleX: fill }}
            className="absolute left-0 top-[0.6rem] hidden h-px w-full origin-left bg-linear-to-r from-gold-300 to-gold-600 lg:block"
          />
          <ol className="relative grid lg:grid-cols-5 lg:gap-10">
          {journey.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="group relative pb-14 pl-12 lg:pb-0 lg:pl-0 lg:pt-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex size-[1.2rem] items-center justify-center rounded-full border border-gold-500 bg-ivory-50 transition-transform duration-500 group-hover:scale-125"
              >
                <span className="size-1.5 rounded-full bg-gold-500" />
              </span>
              <span className="text-gold-deep font-display text-6xl italic leading-none">0{i + 1}</span>
              <h3 className="mt-5 text-[1.9rem] leading-tight text-forest-900">{step.title}</h3>
              <p className="mt-3 text-ink-700">{step.text}</p>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Full-bleed environment image with a deep parallax and zoom. */
function Environment() {
  const { environment } = healthcareContent;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.08, 1.2]);

  return (
    <section ref={ref} aria-labelledby="environment-title" className="relative isolate overflow-hidden bg-forest-950">
      <m.div data-reveal style={{ y, scale }} className="absolute -inset-y-[20%] inset-x-0 -z-10">
        <Img image={environment.image} sizes="100vw" />
      </m.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950 via-forest-950/55 to-forest-950/20" />
      <div className="container-site flex min-h-[38rem] items-end py-24 sm:min-h-[46rem] lg:min-h-[100svh] lg:py-32">
        <div className="max-w-3xl text-ivory-50">
          <Reveal y={16}>
            <Eyebrow tone="light">{environment.eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            id="environment-title"
            text={environment.title}
            className="mt-7 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5rem]"
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg text-ivory-100/85">{environment.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailColumn({
  index,
  title,
  field,
  children,
}: {
  index: number;
  title: string;
  field: string;
  children: ReactNode[];
}) {
  return (
    <Reveal
      delay={index * 0.08}
      className="rounded-[1.75rem] border border-ink-900/10 bg-ivory-100/70 p-8 lg:min-h-[15rem] lg:p-10"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-3xl text-forest-900">{title}</h3>
        <span aria-hidden="true" className="text-gold-deep font-display text-2xl italic">
          0{index}
        </span>
      </div>
      {children.length > 0 ? (
        <ul className="mt-8 space-y-5">{children}</ul>
      ) : (
        <p className="mt-8 text-ink-700">
          <Pending field={field}>Details available on request — please contact us.</Pending>
        </p>
      )}
    </Reveal>
  );
}
