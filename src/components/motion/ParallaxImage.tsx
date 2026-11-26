import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/content/images";
import { Img } from "@/components/Img";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Image inside a fixed frame that drifts vertically as the page scrolls,
 * and unveils with a soft clip-path wipe the first time it enters view.
 */
export function ParallaxImage({
  image,
  sizes,
  className,
  position,
  speed = 0.12,
  reveal = true,
  priority = false,
  delay = 0,
  alt,
  children,
}: {
  image: ImageAsset;
  sizes: string;
  className?: string;
  position?: string;
  /** Fraction of the frame height the image travels (0 disables). */
  speed?: number;
  reveal?: boolean;
  priority?: boolean;
  delay?: number;
  alt?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const pad = `${-speed * 100 - 2}%`;

  return (
    <m.div
      ref={ref}
      data-reveal={reveal || undefined}
      className={cn("relative overflow-hidden bg-forest-800", className)}
      {...(reveal && {
        initial: { clipPath: "inset(14% 10% 14% 10%)" },
        whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
        viewport: { once: true, margin: "0px 0px -8% 0px" },
        transition: { duration: 1.5, ease: EXPO, delay },
      })}
    >
      <m.div data-reveal style={{ y, top: pad, bottom: pad }} className="absolute inset-x-0 will-change-transform">
        <m.div
          data-reveal
          className="h-full w-full"
          {...(reveal && {
            initial: { scale: 1.25 },
            whileInView: { scale: 1 },
            viewport: { once: true },
            transition: { duration: 2, ease: EXPO, delay },
          })}
        >
          <Img image={image} sizes={sizes} position={position} priority={priority} alt={alt} />
        </m.div>
      </m.div>
      {children}
    </m.div>
  );
}
