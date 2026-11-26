import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { primaryNav } from "@/content/navigation";

export default function NotFoundPage() {
  return (
    <section className="glow-gold relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950 pb-24 pt-36 text-ivory-50">
      <p
        aria-hidden="true"
        className="text-gold-gradient pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[38vw] italic leading-none opacity-10"
      >
        404
      </p>
      <div className="container-site relative">
        <Eyebrow tone="light">Page not found</Eyebrow>
        <TextReveal
          as="h1"
          trigger="mount"
          text="This page seems to have *wandered* off."
          className="mt-7 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98]"
        />
        <p className="mt-8 max-w-lg text-lg text-ivory-100/75">
          The link may be out of date. You can return to the home page or go to one of these sections.
        </p>
        <Magnetic className="mt-10">
          <Button asChild variant="gold" size="lg">
            <Link to="/">
              <ArrowLeft aria-hidden="true" /> Back to home
            </Link>
          </Button>
        </Magnetic>
        <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-3">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="link-underline font-display text-2xl text-ivory-100/85 hover:text-ivory-50">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
