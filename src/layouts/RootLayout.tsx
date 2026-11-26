import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { LazyMotion, MotionConfig, domMax, m } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Seo } from "@/components/Seo";
import { LogoMark } from "@/components/Logo";
import { FloatingActions } from "@/components/FloatingActions";
import { CookieConsent } from "@/components/CookieConsent";
import { SmoothScroll, useLenis } from "@/components/motion/SmoothScroll";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** Scroll to top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.6 });
      else target.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);
  return null;
}

/** A forest curtain that lifts away to reveal each newly opened page.
 *  Skipped on the very first (pre-rendered) paint. */
function PageCurtain() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const isFirst = first.current;
  useEffect(() => {
    first.current = false;
  }, []);
  if (isFirst) return null;
  return (
    <m.div
      key={pathname}
      aria-hidden="true"
      data-reveal
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-forest-900"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.05, ease: EXPO, delay: 0.15 }}
    >
      <m.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
        <LogoMark className="size-14 [&_*]:text-gold-300" />
      </m.div>
      <span className="hairline-gold absolute inset-x-0 bottom-0 h-px" />
    </m.div>
  );
}

export function RootLayout() {
  const { pathname } = useLocation();
  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div id="top" className="flex min-h-svh flex-col">
            <Seo />
            <ScrollManager />
            <Header />
            <main id="main" key={pathname} tabIndex={-1} className="flex-1 outline-none">
              <Outlet />
            </main>
            <Footer />
          </div>
          <PageCurtain />
          <FloatingActions />
          <CookieConsent />
          <div aria-hidden="true" className="grain-overlay" />
        </SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
