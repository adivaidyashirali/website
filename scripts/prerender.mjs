/**
 * Static pre-rendering: writes one HTML file per route (with its own title,
 * description, canonical and Open Graph tags) so every page is crawlable and
 * paints before JavaScript loads. Also generates sitemap.xml.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, pages, absoluteUrl, ogImageFor, site } = await import(pathToFileURL(ssrEntry).href);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function head(page) {
  const url = absoluteUrl(page.path);
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow"}" />`,
    page.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImageFor(page)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
  ];
  if (page.path === "/") {
    const a = site.legal.address;
    const address = {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    };
    const contactInfo = {
      ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
      ...(site.contact.email ? { email: site.contact.email } : {}),
    };
    const org = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: site.name,
      alternateName: site.nameDevanagari,
      legalName: site.legal.legalName,
      url: site.url,
      logo: `${site.url}/icon-512.png`,
      address,
      ...contactInfo,
      subOrganization: { "@type": "MedicalClinic", name: site.legal.clinicName, medicalSpecialty: "Ayurvedic", address, ...contactInfo },
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(org)}</script>`);
  }
  return tags.filter(Boolean).join("\n    ");
}

// Preload the two fonts used above the fold to minimise layout shift.
const assetFiles = fs.readdirSync(path.join(dist, "assets"));
const preloads = [/^fraunces-latin-wght-normal-.*\.woff2$/, /^plus-jakarta-sans-latin-wght-normal-.*\.woff2$/]
  .map((re) => assetFiles.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");

let count = 0;
for (const page of pages) {
  const url = page.path === "/404" ? "/404-not-found" : page.path;
  const html = template
    .replace("<!--app-head-->", `${preloads}\n    ${head(page)}`)
    .replace("<!--app-html-->", render(url));
  const out =
    page.path === "/"
      ? path.join(dist, "index.html")
      : page.path === "/404"
        ? path.join(dist, "404.html")
        : path.join(dist, page.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count++;
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map(
    (p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`Pre-rendered ${count} pages and sitemap.xml`);
