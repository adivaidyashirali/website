import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Inertia-based smooth scrolling (desktop wheel / trackpad). Touch devices
 *  keep native scrolling; reduced-motion users get instant, 1:1 scrolling. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      autoRaf: true,
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
    });
    setLenis(instance);
    return () => instance.destroy();
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);
