import { useEffect, useState } from "react";

/**
 * Cookie / third-party content consent.
 *
 * The site itself sets no cookies. The only optional third-party content is the
 * Google Maps embed on the Contact page (Google may set cookies when it loads).
 * The visitor's choice is kept in localStorage, which is strictly necessary to
 * remember it and is disclosed in the Cookie Policy.
 */
export type Consent = { maps: boolean; decidedAt: string };

const KEY = "sav-consent-v1";
const CHANGED = "sav-consent-changed";
const OPEN = "sav-consent-open";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Consent;
    return typeof v.maps === "boolean" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(maps: boolean) {
  const c: Consent = { maps, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    // Storage blocked (private mode): the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGED, { detail: c }));
}

/** Re-opens the cookie banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN));
}

/**
 * Current consent. `ready` is false during pre-rendering and the first client
 * render, so server and client markup match.
 */
export function useConsent() {
  const [state, setState] = useState<{ ready: boolean; consent: Consent | null }>({ ready: false, consent: null });
  useEffect(() => {
    setState({ ready: true, consent: readConsent() });
    const onChange = (e: Event) => setState({ ready: true, consent: (e as CustomEvent<Consent>).detail });
    window.addEventListener(CHANGED, onChange);
    return () => window.removeEventListener(CHANGED, onChange);
  }, []);
  return state;
}

export function useCookieSettingsRequest(handler: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN, handler);
    return () => window.removeEventListener(OPEN, handler);
  }, [handler]);
}
