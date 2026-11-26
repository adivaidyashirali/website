import { useRef } from "react";
import { Link } from "react-router";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { Logo } from "@/components/Logo";
import { Pending } from "@/components/Pending";
import { useLenis } from "@/components/motion/SmoothScroll";
import { primaryNav } from "@/content/navigation";
import { legalAddressLine, site, whatsappLink } from "@/content/site";
import { legalNav } from "@/content/legal";
import { openCookieSettings } from "@/lib/consent";

export function Footer() {
  const { contact } = site;
  const wa = whatsappLink();
  const year = new Date().getFullYear();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  return (
    <footer ref={ref} className="glow-forest relative overflow-hidden bg-forest-950 text-ivory-100">
      <div className="container-site pt-16 lg:pt-20">
        <div className="relative mb-20 overflow-hidden rounded-[2rem] bg-linear-to-br from-forest-600 via-forest-700 to-forest-800 px-7 py-10 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:px-12 sm:py-12 lg:mb-24 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16">
          <div aria-hidden="true" className="dots absolute -right-10 -top-10 h-48 w-64 opacity-15" />
          <div className="relative">
            <h2 className="text-[2rem] leading-tight text-white sm:text-[2.6rem]">
              Have a question? <em className="text-gold-gradient">We are here to help.</em>
            </h2>
            <p className="mt-3 text-white/80">Clinic visits, consultations or Swarna Prashana — talk to us.</p>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Magnetic>
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">
                  Contact us <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outlineLight" size="lg">
                <Link to="/swarna-prashana">Swarna Prashana</Link>
              </Button>
            </Magnetic>
          </div>
        </div>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-10 max-w-sm font-display text-[2rem] leading-[1.15] text-ivory-50">
              Care that <em className="text-gold-gradient">remembers</em> where it comes from.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow font-sans text-gold-400">Explore</h2>
            <ul className="mt-6 space-y-3">
              {[{ label: "Home", to: "/" }, ...primaryNav].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-underline text-ivory-100/75 transition-colors hover:text-ivory-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow font-sans text-gold-400">Reach us</h2>
            <dl className="mt-6 space-y-5 text-ivory-100/75">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-100/45">Address</dt>
                <dd className="mt-1">
                  {contact.addressLines ? (
                    <address className="not-italic">
                      {contact.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  ) : (
                    <Pending field="site.ts → contact.addressLines" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-100/45">Phone</dt>
                <dd className="mt-1">
                  {contact.phone ? (
                    <a href={`tel:${contact.phone}`} className="link-underline hover:text-ivory-50">
                      {contact.phoneDisplay ?? contact.phone}
                    </a>
                  ) : (
                    <Pending field="site.ts → contact.phone" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-100/45">Email</dt>
                <dd className="mt-1">
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className="link-underline hover:text-ivory-50">
                      {contact.email}
                    </a>
                  ) : (
                    <Pending field="site.ts → contact.email" />
                  )}
                </dd>
              </div>
              {wa && (
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-100/45">WhatsApp</dt>
                  <dd className="mt-1">
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ivory-50">
                      Message us
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-20 max-w-3xl space-y-2 text-sm leading-relaxed text-ivory-100/60">
          <p>
            {site.name} and {site.legal.clinicName} are run by <span className="text-ivory-100/85">{site.legal.legalName}</span>, {legalAddressLine()}.
          </p>
          {site.legal.fssaiNumber && <p>FSSAI Reg. No. {site.legal.fssaiNumber}</p>}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ivory-100/45">
          The information on this website is general in nature and is not a substitute for advice from a qualified
          healthcare professional. Traditional practices described here are not intended to diagnose, treat, cure or
          prevent any disease.
        </p>

        <div className="mt-10 flex flex-col-reverse gap-6 border-t border-ivory-50/10 py-8 text-sm text-ivory-100/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4">
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <Link key={l.to} to={l.to} className="link-underline hover:text-ivory-50">
                  {l.label}
                </Link>
              ))}
              <button type="button" onClick={openCookieSettings} className="link-underline text-left hover:text-ivory-50">
                Cookie settings
              </button>
            </nav>
            <p>
              © {year} {site.legal.legalName}. All rights reserved.
            </p>
          </div>
          <a
            href="#top"
            onClick={(e) => {
              if (!lenis) return;
              e.preventDefault();
              lenis.scrollTo(0, { duration: 2 });
            }}
            className="group inline-flex items-center gap-3 hover:text-ivory-50"
          >
            Back to top
            <span className="flex size-9 items-center justify-center rounded-full border border-ivory-50/20 transition-colors group-hover:border-gold-300 group-hover:text-gold-400">
              <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark rising from the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <m.p
          data-reveal
          style={{ y: wordY }}
          className="whitespace-nowrap pb-[0.04em] text-center font-display text-[13.5vw] font-semibold leading-[1.05] tracking-[-0.03em] text-white/[0.06]"
        >
          Shri Adi Vaidya
        </m.p>
      </div>
    </footer>
  );
}
