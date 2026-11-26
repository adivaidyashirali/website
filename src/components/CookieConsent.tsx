import { useCallback, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, m } from "motion/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveConsent, useConsent, useCookieSettingsRequest } from "@/lib/consent";

/**
 * Small, non-blocking consent banner. Shown until the visitor chooses, and again
 * from the footer's "Cookie settings" link. Never rendered during pre-rendering.
 */
export function CookieConsent() {
  const { ready, consent } = useConsent();
  const [reopened, setReopened] = useState(false);
  useCookieSettingsRequest(useCallback(() => setReopened(true), []));
  const open = ready && (consent === null || reopened);

  const choose = (maps: boolean) => {
    saveConsent(maps);
    setReopened(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[60] rounded-[1.5rem] border border-ivory-300 bg-white p-5 text-ink-900 shadow-[0_30px_60px_-30px_rgb(10_36_20/0.55)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
              <Cookie className="size-5" />
            </span>
            <div>
              <h2 id="cookie-title" className="font-sans text-base font-semibold">
                Cookies & privacy
              </h2>
              <p id="cookie-text" className="mt-1.5 text-sm leading-relaxed text-ink-700">
                We don’t use advertising or tracking cookies. With your permission we show a Google map on our Contact page — Google may set cookies when
                it loads.{" "}
                <Link to="/cookie-policy" className="link-underline font-medium text-forest-800">
                  Cookie Policy
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2.5">
            <Button variant="outline" size="sm" onClick={() => choose(false)}>
              Essential only
            </Button>
            <Button size="sm" onClick={() => choose(true)}>
              Allow Google Maps
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
