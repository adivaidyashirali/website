# Shri Adi Vaidya — public website

Static marketing website (no backend). React 19 · Vite · TypeScript · Tailwind CSS 4 · Motion · Lenis · React Router.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, pre-render every page to static HTML + sitemap.xml
npm run preview    # serve dist/ the way a static host does (clean URLs, 404.html)
```

Deploy the `dist/` folder to any static host (Netlify, Cloudflare Pages, S3 + CloudFront, nginx).
The host must serve `/about` from `about/index.html` and unknown paths from `404.html`
(nginx: `try_files $uri $uri/ /404.html;`).

## Editing content

All words, contact details and image choices live in `src/content/` — no component changes needed.

| File | What it holds |
|---|---|
| `site.ts` | **Phone, WhatsApp, email, address, hours, Google Maps embed, form endpoint** |
| `home.ts`, `about.ts`, `healthcare.ts`, `swarna.ts`, `approach.ts` | Page copy |
| `seo.ts` | Page titles and meta descriptions |
| `legal.ts` | All policies (privacy, terms, cookies, refunds, shipping, disclaimer, grievance) |
| `images.ts` | Photo registry and alt text |

- Wrap a word in `*asterisks*` inside a title to set it in gold italics.
- Any `null` value (phone, address…) or empty list (doctors, departments, facilities) shows a neutral
  "to be announced / details on request" note — nothing fake is ever published. In `npm run dev` these
  spots are dotted-underlined; hover them to see which field to edit.
- **Contact form:** until `formEndpoint` is set it does not send anything, and tells the visitor so
  (offering WhatsApp/email if those are configured). Set it to a service that accepts a JSON POST
  (e.g. Formspree) to enable sending.

## Before launch — information to confirm

**Needed for Meta / WhatsApp business verification** (see `../docs/14-WHATSAPP-SETUP.md`):
- `site.ts → contact.phone`, `contact.whatsapp`, `contact.email` — a public clinic number and an email on
  the shriadivaidya.com domain (create e.g. info@shriadivaidya.com in Hostinger). Currently "To be announced".
- `site.ts → legal.udyamNumber` / `legal.gstin` once registered. Legal name and address must stay exactly as on
  the certificates (currently taken from the FSSAI registration).
- **Policies** (`src/content/legal.ts`): Privacy, Terms & Conditions, Cookie, Cancellation & Refund, Shipping & Delivery,
  Medical Disclaimer, Grievance Redressal. Confirm the commitments in `policyFacts` (dispatch/delivery days, damage-report
  window, refund days), set `site.ts → legal.grievanceOfficer.name`, have an advisor review, and update `UPDATED` on changes.
- **Cookies:** the site sets none itself. The Google Maps embed on /contact loads only after consent (banner or
  "Show the map"); the choice is stored in localStorage (`sav-consent-v1`). Adding analytics or any other third-party
  script requires updating the banner, `src/lib/consent.ts` and the Cookie Policy first.


- Contact details, address, opening hours, map (`site.ts`)
- Departments, doctors and facilities — verified only (`healthcare.ts`)
- Swarna Prashana programme details: age group, schedule, kit contents, price, delivery (`swarna.ts`)
- Vision, mission and values are **draft wording** (`about.ts`) — please approve or rewrite
- Official logo (current mark in `src/components/Logo.tsx` and `public/favicon.svg` is temporary)
- Photography: current images are licensed stock (Unsplash licence) used as stand-ins; replace with
  your own photographs in `public/images/` (`<name>-sm.webp` ~800px and `<name>-lg.webp` ~1600px)

## Fonts

Fraunces (headings) + Plus Jakarta Sans (body) are self-hosted via Fontsource. The Devanagari accent font is a small
subset (`src/assets/fonts/tiro-devanagari-subset.woff2`) containing only the words used on the site.
If you add new Devanagari text, regenerate it:

```bash
pip install fonttools brotli
npm install --no-save @fontsource/tiro-devanagari-sanskrit
pyftsubset node_modules/@fontsource/tiro-devanagari-sanskrit/files/tiro-devanagari-sanskrit-devanagari-400-normal.woff2 \
  --text="$(grep -rhoE '[ऀ-ॿ]+' src | sort -u | tr '\n' ' ')" --layout-features='*' --flavor=woff2 \
  --output-file=src/assets/fonts/tiro-devanagari-subset.woff2
```

## Motion & accessibility

Smooth scrolling (Lenis), parallax, word-by-word headline reveals, a pinned horizontal story, stacked
panels, a hero slideshow (with pause control), magnetic buttons, a scroll-progress bar and page-transition curtains. All of it is
switched off or reduced for visitors with "reduce motion" enabled, and every page is fully readable
without JavaScript (pre-rendered HTML).
