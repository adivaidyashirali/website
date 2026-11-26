import type { ReactNode } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { OVERLAP } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Pending } from "@/components/Pending";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/Logo";
import { site, whatsappLink } from "@/content/site";
import { BusinessDetails } from "@/pages/LegalPages";
import { saveConsent, useConsent } from "@/lib/consent";

export default function ContactPage() {
  const { contact } = site;
  const wa = whatsappLink("Hello, I would like to make an enquiry.");
  const { consent } = useConsent();
  const showMap = Boolean(contact.mapEmbedUrl && consent?.maps);

  return (
    <>
      <PageHero
        compact
        eyebrow="Contact us"
        title="We are here to *help*."
        lead="Whether you are planning a visit to Jataveda Clinic or would like to know about Swarna Prashana, reach out and we will guide you to the right person."
        image={images.teapot}
        imagePosition="50% 50%"
      />

      <section aria-label="Contact details and enquiry form" className={cn(OVERLAP, "bg-ivory-50 py-24 sm:py-28 lg:py-36")}>
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Details */}
          <Reveal className="lg:col-span-4">
            <dl className="space-y-3">
              <Detail icon={<MapPin />} label="Address">
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
              </Detail>
              <Detail icon={<Phone />} label="Phone">
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`} className="link-underline">
                    {contact.phoneDisplay ?? contact.phone}
                  </a>
                ) : (
                  <Pending field="site.ts → contact.phone" />
                )}
              </Detail>
              <Detail icon={<Mail />} label="Email">
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="link-underline break-all">
                    {contact.email}
                  </a>
                ) : (
                  <Pending field="site.ts → contact.email" />
                )}
              </Detail>
              <Detail icon={<Clock />} label="Hours">
                {contact.hours ? (
                  <ul className="space-y-1">
                    {contact.hours.map((h) => (
                      <li key={h.label} className="flex justify-between gap-6">
                        <span>{h.label}</span>
                        <span className="text-ink-700">{h.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending field="site.ts → contact.hours" />
                )}
              </Detail>
            </dl>

            {/* WhatsApp */}
            <div className="glow-gold mt-10 rounded-[1.75rem] bg-forest-950 p-8 text-ivory-50">
              <MessageCircle className="size-6 text-gold-300" aria-hidden="true" />
              <h2 className="mt-5 text-3xl">Prefer WhatsApp?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ivory-100/75">
                Send us a message and our team will reply during working hours.
              </p>
              <div className="mt-6">
                {wa ? (
                  <Button asChild variant="gold">
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-ivory-100/80">
                    <Pending field="site.ts → contact.whatsapp">WhatsApp number to be announced</Pending>
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="rounded-[2rem] border border-ivory-300 bg-white p-6 shadow-[0_40px_80px_-50px_rgb(10_36_20/0.45)] sm:p-10 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Business identity */}
      <section aria-labelledby="business-title" className="bg-ivory-50 pb-16 lg:pb-20">
        <div className="container-site">
          <div className="rounded-[2rem] border border-ivory-300 bg-white p-7 sm:p-10">
            <h2 id="business-title" className="text-3xl text-forest-900 sm:text-4xl">
              Business details
            </h2>
            <BusinessDetails className="mt-6" />
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-labelledby="map-title" className="bg-ivory-50 pb-24 lg:pb-32">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6 border-t border-ink-900/15 pt-8">
            <h2 id="map-title" className="text-3xl text-forest-900 sm:text-4xl">
              Finding us
            </h2>
            {contact.mapLinkUrl && (
              <a
                href={contact.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900"
              >
                <span className="link-underline">Open in Google Maps</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
          <Reveal className="mt-8">
            {showMap && contact.mapEmbedUrl ? (
              <iframe
                title={`Map showing the location of ${site.name}`}
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full rounded-[2rem] border-0 grayscale-[30%] sm:aspect-[21/9]"
              />
            ) : (
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-ivory-200 sm:aspect-[21/9]">
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink-900/[0.06]">
                  <defs>
                    <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M48 0H0V48" fill="none" stroke="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
                <div className="relative px-6 text-center">
                  <LogoMark className="mx-auto size-12 text-forest-800" />
                  {contact.mapEmbedUrl ? (
                    <>
                      <p className="mx-auto mt-4 max-w-md text-ink-700">
                        The map is provided by Google, which may set cookies when it loads.
                      </p>
                      <Button className="mt-5" onClick={() => saveConsent(true)}>
                        Show the map
                      </Button>
                    </>
                  ) : (
                    <p className="mt-4 text-ink-700">
                      <Pending field="site.ts → contact.mapEmbedUrl">A map will appear here once our address is published.</Pending>
                    </p>
                  )}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-ivory-300 bg-white p-5 transition-shadow duration-500 hover:shadow-[0_20px_40px_-28px_rgb(10_36_20/0.45)]">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-600 transition-colors duration-500 group-hover:bg-forest-600 group-hover:text-white [&_svg]:size-5"
      >
        {icon}
      </span>
      <div>
        <dt className="eyebrow text-[0.6875rem] text-ink-500">{label}</dt>
        <dd className="mt-1 text-[1.0625rem] text-ink-900">{children}</dd>
      </div>
    </div>
  );
}
