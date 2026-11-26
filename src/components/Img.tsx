import type { ImageAsset } from "@/content/images";
import { cn, imageSources } from "@/lib/utils";

type ImgProps = {
  image: ImageAsset;
  /** Responsive `sizes` attribute describing the rendered width. */
  sizes: string;
  className?: string;
  /** CSS object-position, e.g. "30% 50%". */
  position?: string;
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean;
  /** Override alt text (use "" for purely decorative usage). */
  alt?: string;
};

export function Img({ image, sizes, className, position, priority = false, alt }: ImgProps) {
  const { src, srcSet } = imageSources(image.slug, image.smWidth, image.width);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={cn("h-full w-full object-cover", className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
