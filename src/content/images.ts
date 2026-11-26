/**
 * Image registry. Files live in /public/images as `<slug>-sm.webp` and
 * `<slug>-lg.webp`. To replace a photograph, overwrite both files (keep the
 * aspect ratio close, or update width/height below) and adjust the alt text.
 *
 * Current photographs are licensed stock (Unsplash licence) used as
 * stand-ins. Replace with Shri Adi Vaidya's own photography when available.
 */
export type ImageAsset = {
  slug: string;
  alt: string;
  width: number;
  height: number;
  smWidth: number;
};

const img = (slug: string, width: number, height: number, smWidth: number, alt: string): ImageAsset => ({
  slug,
  width,
  height,
  smWidth,
  alt,
});

export const images = {
  herbalPreparation: img(
    "herbal-preparation",
    1600,
    1058,
    800,
    "A glass cup of herbal infusion on a wooden table, surrounded by fern leaves, dried flowers and small heaps of ground herbs",
  ),
  herbalPowder: img(
    "herbal-powder",
    1100,
    1595,
    640,
    "A wooden spoon of powdered herbs between two fresh green leaves, beside a cup of herbal decoction",
  ),
  spices: img(
    "spices",
    1600,
    1067,
    800,
    "Whole and ground spices, dried chillies and fresh herbs arranged on a pale wooden surface",
  ),
  honey: img("honey", 1600, 1067, 800, "Honey falling from a wooden dipper into a glass jar"),
  honeyJar: img("honey-jar", 1100, 1650, 640, "A jar of golden honey in soft, warm light"),
  babyFeet: img("baby-feet", 1600, 1067, 800, "A baby's feet peeking out from a soft white towel"),
  careHands: img("care-hands", 1600, 1067, 800, "One person gently holding another's hands in reassurance"),
  nurse: img(
    "nurse",
    1600,
    1186,
    800,
    "A healthcare professional in a white uniform with a stethoscope standing in a hospital ward",
  ),
  clinician: img("clinician", 1600, 900, 800, "A clinician in a white coat holding a stethoscope"),
  stethoscope: img("stethoscope", 1600, 1067, 800, "A stethoscope resting on a white surface"),
  ward: img("ward", 1600, 1001, 800, "A clean, well-lit hospital ward with neatly made beds"),
  driedHerbs: img("dried-herbs", 1600, 1600, 800, "A small heap of dried herbs and flower petals"),
  leaves: img("leaves", 1100, 1956, 640, "Dense green leaves seen from above"),
  herbalTea: img("herbal-tea", 1100, 1650, 640, "A glass of warm herbal infusion"),
  teapot: img("teapot", 1600, 1067, 800, "A ceramic teapot and cup of warm infusion on a wooden tray"),
  amberBottle: img("amber-bottle", 1100, 1650, 640, "An amber glass bottle of herbal oil on a turned wooden stand"),
} satisfies Record<string, ImageAsset>;
