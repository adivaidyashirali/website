/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ORGANISATION DETAILS — the single place to update contact information.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Any value left as `null` is treated as "not yet confirmed":
 *   • In production the site shows a neutral "to be announced" note and hides
 *     the related link (no fake phone numbers or addresses are ever published).
 *   • In development (`npm run dev`) the same spot is highlighted with a dashed
 *     gold outline and the exact field to edit, so nothing is missed.
 *
 *  Formats:
 *   phone     → E.164 digits for links, e.g. "+919876543210"
 *   whatsapp  → digits only with country code, e.g. "919876543210"
 *   mapEmbedUrl → the `src` of the Google Maps "Embed a map" iframe
 *   formEndpoint → a form-handling URL that accepts a JSON POST
 *                  (e.g. Formspree / Getform / your own function). Until this
 *                  is set, the contact form never pretends to send.
 */

export type SiteConfig = {
  name: string;
  /** Name in Devanagari, used as a typographic accent. */
  nameDevanagari: string;
  /** Short descriptor shown under the logo. */
  descriptor: string;
  url: string;
  locale: string;
  /**
   * The legal entity behind the website. Meta (WhatsApp Business), payment and
   * marketplace verification compare these with the registration documents, so
   * keep them EXACTLY as printed on the certificates.
   */
  legal: {
    legalName: string;
    /** Clinic run by the firm. */
    clinicName: string;
    /** FSSAI registration (food business: retail of Swarna Prashana kits). */
    fssaiNumber: string | null;
    /** Udyam / GST number once available — strengthens business verification. */
    udyamNumber: string | null;
    gstin: string | null;
    /**
     * Grievance officer (Consumer Protection (E-Commerce) Rules, 2020 and DPDP Act).
     * Shown on the Grievance Redressal page; name left empty until the owner confirms.
     */
    grievanceOfficer: { name: string | null; designation: string };
    address: { street: string; locality: string; district: string; region: string; postalCode: string; country: string };
  };
  contact: {
    phone: string | null;
    phoneDisplay: string | null;
    whatsapp: string | null;
    email: string | null;
    addressLines: string[] | null;
    hours: { label: string; value: string }[] | null;
    mapEmbedUrl: string | null;
    mapLinkUrl: string | null;
  };
  formEndpoint: string | null;
};

export const site: SiteConfig = {
  name: "Shri Adi Vaidya",
  nameDevanagari: "श्री आदि वैद्य",
  descriptor: "Healthcare & Ayurvedic wellness",
  url: "https://shriadivaidya.com",
  locale: "en_IN",
  legal: {
    legalName: "Shri Raghavendra Enterprises",
    clinicName: "Jataveda Clinic",
    fssaiNumber: "21223164000092",
    udyamNumber: null,
    gstin: null,
    grievanceOfficer: { name: null, designation: "Proprietor" },
    // As printed on the FSSAI registration certificate.
    address: {
      street: "Kotebagilu, Shirali",
      locality: "Bhatkal",
      district: "Uttara Kannada",
      region: "Karnataka",
      postalCode: "581354",
      country: "IN",
    },
  },
  contact: {
    // TODO before applying to Meta: the clinic's public phone / WhatsApp number and an
    // email on the shriadivaidya.com domain (e.g. create info@shriadivaidya.com in Hostinger).
    phone: null,
    phoneDisplay: null,
    whatsapp: null,
    email: null,
    addressLines: ["Jataveda Clinic", "Kotebagilu, Shirali", "Bhatkal, Uttara Kannada", "Karnataka 581354, India"],
    hours: null,
    mapEmbedUrl: "https://maps.google.com/maps?q=Kotebagilu%2C%20Shirali%2C%20Bhatkal%2C%20Karnataka%20581354&z=14&output=embed",
    mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Kotebagilu%2C%20Shirali%2C%20Bhatkal%2C%20Karnataka%20581354",
  },
  formEndpoint: null,
};

export const whatsappLink = (message?: string): string | null => {
  if (!site.contact.whatsapp) return null;
  const base = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** One-line legal identity, e.g. for the footer. */
export const legalAddressLine = () => {
  const a = site.legal.address;
  return `${a.street}, ${a.locality}, ${a.district}, ${a.region} ${a.postalCode}, India`;
};
