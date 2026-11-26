import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useLenis } from "./motion/SmoothScroll";
import { whatsappLink } from "@/content/site";

/**
 * Bottom-right floating actions: back-to-top (after scrolling) and a
 * WhatsApp button (only once a WhatsApp number is configured in site.ts).
 */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const wa = whatsappLink("Hello, I would like to make an enquiry.");

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {show && (
          <m.button
            type="button"
            aria-label="Back to top"
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex size-12 items-center justify-center rounded-full bg-forest-600 text-white shadow-[0_12px_30px_-10px_rgb(15_92_44/0.7)] transition-colors hover:bg-forest-800"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </m.button>
        )}
      </AnimatePresence>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative flex size-14 items-center justify-center rounded-full bg-forest-600 text-white shadow-[0_14px_34px_-10px_rgb(15_92_44/0.8)] ring-4 ring-white transition-transform hover:scale-105"
        >
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-forest-400/40" />
          <MessageCircle className="relative size-6" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
