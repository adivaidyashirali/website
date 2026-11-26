import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Builds a responsive srcset for an image in /public/images. */
export function imageSources(slug: string, smWidth: number, lgWidth: number) {
  const sm = `/images/${slug}-sm.webp`;
  const lg = `/images/${slug}-lg.webp`;
  return { src: lg, srcSet: `${sm} ${smWidth}w, ${lg} ${lgWidth}w` };
}
