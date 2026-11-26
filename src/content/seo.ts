import { site } from "./site";
import { legalDocs } from "./legal";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Image path (relative to site root) for social sharing. */
  ogImage?: string;
  /** Excluded from sitemap / marked noindex. */
  noindex?: boolean;
};

const DEFAULT_OG = "/og-image.jpg";

export const pages: PageMeta[] = [
  {
    path: "/",
    title: `${site.name} — Healthcare & Ayurvedic Wellness`,
    description:
      "Shri Adi Vaidya runs Jataveda Clinic in Shirali, Bhatkal — Ayurvedic doctor consultations and an in-house dispensary — and a Swarna Prashana programme for families.",
  },
  {
    path: "/about",
    title: `About Us — ${site.name}`,
    description:
      "Who we are, what we stand for, and how Shri Adi Vaidya brings traditional Indian healthcare values together with careful, professional practice.",
  },
  {
    path: "/healthcare",
    title: `Jataveda Clinic — ${site.name}`,
    description:
      "Registration, doctor consultations, prescriptions and an in-house dispensary under one roof. Learn how a visit to Jataveda Clinic, Shirali works.",
  },
  {
    path: "/swarna-prashana",
    title: `Swarna Prashana — ${site.name}`,
    description:
      "An introduction to Swarna Prashana, the classical Ayurvedic practice for children, and how families can enquire about Shri Adi Vaidya's Swarna Prashana programme.",
  },
  {
    path: "/our-approach",
    title: `Our Approach — ${site.name}`,
    description:
      "Traditional values, responsible wellness practice, honesty with patients and families, and consistent professional service: the principles behind Shri Adi Vaidya.",
  },
  {
    path: "/contact",
    title: `Contact Us — ${site.name}`,
    description:
      "Get in touch with Shri Adi Vaidya and Jataveda Clinic, Shirali, about consultations or the Swarna Prashana programme.",
  },
  ...legalDocs.map((d) => ({
    path: d.path,
    title: `${d.label} — ${site.name}`,
    description: `${d.hero.lead} ${site.legal.legalName}, operating ${site.name} and ${site.legal.clinicName}, Shirali.`,
  })),
  {
    path: "/404",
    title: `Page not found — ${site.name}`,
    description: "The page you were looking for could not be found.",
    noindex: true,
  },
];

export const getPageMeta = (pathname: string): PageMeta => {
  const clean = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return pages.find((p) => p.path === clean) ?? pages.find((p) => p.path === "/404")!;
};

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "/" : path}`;

export const ogImageFor = (meta: PageMeta) => absoluteUrl(meta.ogImage ?? DEFAULT_OG);
