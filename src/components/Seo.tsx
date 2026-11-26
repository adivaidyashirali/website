import { useEffect } from "react";
import { useLocation } from "react-router";
import { absoluteUrl, getPageMeta, ogImageFor } from "@/content/seo";

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", id: string, content: string) =>
  upsert(
    `meta[${key}="${id}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(key, id);
      return el;
    },
    "content",
    content,
  );

/**
 * Keeps <head> in sync on client-side navigation. The same tags are written
 * into each pre-rendered HTML file at build time (see scripts/prerender.mjs).
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPageMeta(pathname);
    const url = absoluteUrl(page.noindex ? pathname : page.path);
    document.title = page.title;
    meta("name", "description", page.description);
    meta("name", "robots", page.noindex ? "noindex, follow" : "index, follow");
    meta("property", "og:title", page.title);
    meta("property", "og:description", page.description);
    meta("property", "og:url", url);
    meta("property", "og:image", ogImageFor(page));
    meta("name", "twitter:title", page.title);
    meta("name", "twitter:description", page.description);
    upsert(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      "href",
      url,
    );
  }, [pathname]);

  return null;
}
