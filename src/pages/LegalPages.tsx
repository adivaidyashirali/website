import { Link } from "react-router";
import { PageHero } from "@/components/PageHero";
import { OVERLAP } from "@/components/Section";
import { Pending } from "@/components/Pending";
import { cn } from "@/lib/utils";
import { legalAddressLine, site } from "@/content/site";
import { legalDoc, type LegalDoc } from "@/content/legal";

/** The business identity block Meta and customers can check against our registration. */
export function BusinessDetails({ className, showOfficer = false }: { className?: string; showOfficer?: boolean }) {
  const { legal, contact } = site;
  return (
    <dl className={cn("grid gap-x-8 gap-y-4 text-[0.98rem] sm:grid-cols-2", className)}>
      {showOfficer && (
        <div>
          <dt className="eyebrow text-[0.6875rem] text-ink-500">Grievance officer</dt>
          <dd className="mt-1 text-ink-900">
            {legal.grievanceOfficer.name ?? <Pending field="site.ts → legal.grievanceOfficer.name">Name to be announced</Pending>}
            <span className="block text-ink-700">{legal.grievanceOfficer.designation}</span>
          </dd>
        </div>
      )}
      <div>
        <dt className="eyebrow text-[0.6875rem] text-ink-500">Business</dt>
        <dd className="mt-1 text-ink-900">
          {legal.legalName}
          <span className="block text-ink-700">
            Operating {site.name} and {legal.clinicName}
          </span>
        </dd>
      </div>
      <div>
        <dt className="eyebrow text-[0.6875rem] text-ink-500">Registered address</dt>
        <dd className="mt-1 text-ink-900">{legalAddressLine()}</dd>
      </div>
      <div>
        <dt className="eyebrow text-[0.6875rem] text-ink-500">Email</dt>
        <dd className="mt-1 text-ink-900">
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className="link-underline break-all">
              {contact.email}
            </a>
          ) : (
            <Pending field="site.ts → contact.email" />
          )}
        </dd>
      </div>
      <div>
        <dt className="eyebrow text-[0.6875rem] text-ink-500">Phone</dt>
        <dd className="mt-1 text-ink-900">
          {contact.phone ? (
            <a href={`tel:${contact.phone}`} className="link-underline">
              {contact.phoneDisplay ?? contact.phone}
            </a>
          ) : (
            <Pending field="site.ts → contact.phone" />
          )}
        </dd>
      </div>
      {legal.fssaiNumber && (
        <div>
          <dt className="eyebrow text-[0.6875rem] text-ink-500">FSSAI registration</dt>
          <dd className="mt-1 tabular-nums text-ink-900">{legal.fssaiNumber}</dd>
        </div>
      )}
      {legal.udyamNumber && (
        <div>
          <dt className="eyebrow text-[0.6875rem] text-ink-500">Udyam registration</dt>
          <dd className="mt-1 text-ink-900">{legal.udyamNumber}</dd>
        </div>
      )}
      {legal.gstin && (
        <div>
          <dt className="eyebrow text-[0.6875rem] text-ink-500">GSTIN</dt>
          <dd className="mt-1 text-ink-900">{legal.gstin}</dd>
        </div>
      )}
    </dl>
  );
}

function LegalDocument({ doc }: { doc: LegalDoc }) {
  const related = doc.related.map(legalDoc);
  return (
    <>
      <PageHero compact eyebrow={doc.hero.eyebrow} title={doc.hero.title} lead={doc.hero.lead} image={doc.hero.image} />
      <section className={cn(OVERLAP, "bg-ivory-50 py-20 sm:py-24 lg:py-28")}>
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="eyebrow text-[0.6875rem] text-ink-500">On this page</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="link-underline text-ink-700 hover:text-forest-900">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="link-underline text-ink-700 hover:text-forest-900">
                    {doc.contactHeading}
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
            <p className="text-sm text-ink-500">Last updated: {doc.updated}</p>
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-8 scroll-mt-28 border-t border-ink-900/10 pt-8 first-of-type:mt-6">
                <h2 id={`${s.id}-h`} className="text-[1.9rem] leading-tight text-forest-900">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-ink-700">
                  {s.items.map((item, i) =>
                    typeof item === "string" ? (
                      <p key={i}>{item}</p>
                    ) : (
                      <ul key={i} className="list-disc space-y-2 pl-6 marker:text-gold-500">
                        {item.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}

            <section id="contact" aria-labelledby="contact-h" className="mt-10 scroll-mt-28 rounded-[1.75rem] border border-ivory-300 bg-white p-7 sm:p-9">
              <h2 id="contact-h" className="text-[1.9rem] leading-tight text-forest-900">
                {doc.contactHeading}
              </h2>
              <p className="mt-3 text-ink-700">
                For questions, requests or complaints, contact {site.legal.legalName}. Our grievance officer is the {site.legal.grievanceOfficer.designation.toLowerCase()}
                .
              </p>
              <BusinessDetails className="mt-6" showOfficer />
            </section>

            {related.length > 0 && (
              <nav aria-label="Related policies" className="mt-8 text-sm text-ink-500">
                Related:{" "}
                {related.map((r, i) => (
                  <span key={r.path}>
                    {i > 0 && " · "}
                    <Link to={r.path} className="link-underline text-forest-800">
                      {r.label}
                    </Link>
                  </span>
                ))}
              </nav>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

/** One component per route so each page can be pre-rendered on its own. */
export const legalPage = (path: string) =>
  function LegalRoutePage() {
    return <LegalDocument doc={legalDoc(path)} />;
  };
