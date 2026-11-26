import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useLenis } from "@/components/motion/SmoothScroll";
import { primaryNav } from "@/content/navigation";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  // White bar once scrolled; hide while scrolling down, return on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (open) return;
    if (y > 480 && y > prev + 6) setHidden(true);
    else if (y < prev - 6 || y < 480) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Pause smooth scroll, close on Escape, trap focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = [
          toggleRef.current,
          ...menuRef.current.querySelectorAll<HTMLElement>("a[href], button"),
        ].filter(Boolean) as HTMLElement[];
        const idx = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? idx - 1 : idx + 1;
        if (next < 0 || next >= items.length) {
          e.preventDefault();
          items[(next + items.length) % items.length].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const wa = whatsappLink("Hello, I would like to make an enquiry.");
  const solid = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[95] -translate-y-24 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-900 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-(--ease-expo)",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        {/* Reading progress */}
        <m.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-linear-to-r from-forest-600 via-forest-400 to-gold-400 transition-opacity duration-500",
            solid ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            solid ? "bg-white/90 shadow-[0_10px_30px_-18px_rgb(10_36_20/0.35)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div
            className={cn(
              "container-site flex items-center justify-between transition-[height] duration-700 ease-(--ease-expo)",
              solid ? "h-[4.75rem]" : "h-20 lg:h-[6.5rem]",
            )}
          >
            <Logo tone={solid ? "dark" : "light"} className="relative z-[60]" />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul
                className={cn(
                  "flex items-center gap-1 rounded-full p-1.5 transition-colors duration-500",
                  solid ? "bg-transparent" : "border border-white/20 bg-white/10 backdrop-blur-md",
                )}
              >
                {[{ label: "Home", to: "/" }, ...primaryNav.slice(0, -1)].map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        cn(
                          "relative block rounded-full px-5 py-2 text-[0.9375rem] font-medium transition-colors duration-500",
                          solid
                            ? isActive
                              ? "text-forest-600"
                              : "text-ink-700 hover:text-forest-600"
                            : isActive
                              ? "text-white"
                              : "text-white/80 hover:text-white",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <m.span
                              layoutId="nav-pill"
                              className={cn(
                                "absolute inset-0 -z-10 rounded-full",
                                solid ? "bg-forest-100" : "bg-white/20",
                              )}
                              transition={{ type: "spring", stiffness: 380, damping: 34 }}
                            />
                          )}
                          {item.label}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <Magnetic>
                <Button asChild variant="gold">
                  <Link to="/contact">
                    Contact <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                "relative z-[60] -mr-1 flex h-11 items-center gap-3 rounded-full pl-4 pr-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] transition-colors duration-500 lg:hidden",
                solid ? "bg-forest-600 text-white" : "border border-white/25 bg-white/10 text-white backdrop-blur-md",
              )}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-(--ease-expo)",
                    open ? "top-1 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute right-0 h-[1.5px] bg-current transition-all duration-500 ease-(--ease-expo)",
                    open ? "top-1 w-5 -rotate-45" : "top-2.5 w-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="glow-forest fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forest-950 text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.9, ease: EXPO }}
          >
            <nav aria-label="Mobile" className="container-site flex-1 pt-28">
              <ul>
                {[{ label: "Home", to: "/", description: "" }, ...primaryNav].map((item, i) => (
                  <li key={item.to} className="overflow-hidden border-b border-white/10">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EXPO, delay: 0.2 + i * 0.06 }}
                    >
                      <NavLink
                        to={item.to}
                        end
                        className={({ isActive }) =>
                          cn("flex items-baseline gap-4 py-4", isActive ? "text-gold-400" : "text-white")
                        }
                      >
                        <span className="font-display text-sm text-gold-400">0{i + 1}</span>
                        <span className="font-display text-[2.2rem] leading-tight">{item.label}</span>
                      </NavLink>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <m.div
              className="container-site space-y-3 pb-10 pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EXPO }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-between rounded-full bg-gold-400 px-6 py-4 text-sm font-bold text-ink-900"
              >
                Contact us <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-full border border-white/20 px-6 py-4 text-sm font-semibold"
                >
                  Chat on WhatsApp <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
              {site.contact.phone && (
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center justify-between rounded-full border border-white/20 px-6 py-4 text-sm font-semibold"
                >
                  Call {site.contact.phoneDisplay ?? site.contact.phone}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
