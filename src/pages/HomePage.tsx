import { CtaSection } from "@/components/CtaSection";
import { homeContent } from "@/content/home";
import { HomeHero } from "@/sections/home/HomeHero";
import { Ticker } from "@/sections/home/Ticker";
import { AboutIntro } from "@/sections/home/AboutIntro";
import { ServicesBento } from "@/sections/home/ServicesBento";
import { Story } from "@/sections/home/Story";
import { SwarnaIntro } from "@/sections/home/SwarnaIntro";
import { Principles } from "@/sections/home/Principles";
import { Expect } from "@/sections/home/Expect";

export default function HomePage() {
  const { banner, cta } = homeContent;
  return (
    <>
      <HomeHero />
      <Ticker />
      <AboutIntro />
      <ServicesBento />
      <Story />
      <SwarnaIntro />
      <Principles />
      <Expect />
      <CtaSection title={banner.title} body={cta.body} image={banner.image} />
    </>
  );
}
