import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionIntro } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

/** Image cards in a staggered 2:1 / 1:2 grid, each linking to its page. */
export function ServicesBento() {
  const { services } = homeContent;
  return (
    <section id="services" aria-labelledby="services-title" className="bg-ivory-100 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow={services.eyebrow} title={services.title} titleId="services-title" />
          <Reveal className="max-w-sm text-ink-700 lg:pb-3">
            <p>{services.body}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-3 lg:mt-20">
          {services.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 2) * 0.1}
              className={cn(item.wide ? "md:col-span-2" : "md:col-span-1")}
            >
              <Link
                to={item.to}
                className="group relative block h-[22rem] overflow-hidden rounded-[1.75rem] sm:h-[24rem] lg:h-[26rem]"
              >
                <ParallaxImage
                  image={item.image}
                  sizes={item.wide ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
                  className="absolute inset-0 transition-transform duration-[1.2s] ease-(--ease-expo) group-hover:scale-[1.04]"
                  speed={0.1}
                  reveal={false}
                  alt=""
                />
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/90 via-forest-950/30 to-forest-950/0 transition-colors duration-700 group-hover:from-forest-900/95" />
                <span className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 font-display text-sm font-semibold text-white backdrop-blur-md">
                  0{i + 1}
                </span>
                <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-gold-400 text-ink-900 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 max-md:opacity-100">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="text-[1.75rem] leading-tight text-white sm:text-[2rem]">{item.title}</h3>
                  <p className="mt-2 max-w-md text-white/80 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100">
                    {item.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
