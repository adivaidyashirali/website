import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/content/images";
import { images } from "@/content/images";
import { Reveal } from "./Reveal";
import { Img } from "./Img";
import { ContactActions } from "./ContactActions";
import { TextReveal } from "./motion/TextReveal";

/** Full-bleed photographic call-to-action with a deep parallax. */
export function CtaSection({
  title,
  body,
  message,
  image = images.spices,
}: {
  title: string;
  body: string;
  message?: string;
  image?: ImageAsset;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-forest-950 text-white">
      <m.div data-reveal style={{ y }} className="absolute -inset-y-[22%] inset-x-0 -z-10">
        <Img image={image} sizes="100vw" alt="" />
      </m.div>
      <div className="absolute inset-0 -z-10 bg-forest-950/75" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-forest-950/40 via-transparent to-forest-950/60" />

      <div className="container-site flex min-h-[34rem] flex-col items-center justify-center py-28 text-center sm:min-h-[38rem] lg:min-h-[44rem]">
        <m.span
          aria-hidden="true"
          data-reveal
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-[3px] w-16 rounded-full bg-gold-400"
        />
        <TextReveal
          as="h2"
          id="cta-title"
          text={title}
          className="mt-8 max-w-4xl text-[2.5rem] leading-[1.06] sm:text-6xl lg:text-[4.5rem]"
        />
        <Reveal delay={0.25} className="flex flex-col items-center">
          <p className="mt-7 max-w-xl text-lg text-white/80">{body}</p>
          <div className="mt-10">
            <ContactActions tone="light" message={message} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
