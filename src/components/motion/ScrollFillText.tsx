import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <m.span style={{ opacity }} data-reveal className="inline">
      {children}{" "}
    </m.span>
  );
}

/** A statement whose words "ink in" one by one as it scrolls through view. */
export function ScrollFillText({
  text,
  as: Tag = "p",
  id,
  className,
}: {
  text: string;
  as?: "p" | "h2";
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(/\s+/);
  return (
    <Tag ref={ref as never} id={id} className={cn(className)}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}
