/**
 * PHOTO MANIFEST — the only file that points at images.
 *
 * TO CHANGE A PHOTO
 * 1. Put the file in  public/photos/   e.g. public/photos/us-at-the-beach.jpg
 * 2. Point the entry below at it and write a real `alt` description.
 * 3. Commit and push. Vercel redeploys and it is live.
 *
 * Keep the shape noted on each entry — wide, portrait, or square — or the
 * crop changes. Roughly 2000px on the long edge is plenty.
 *
 * `alt` is read aloud by screen readers and shown if an image fails to load,
 * so describe what is in the picture rather than naming the file.
 *
 * The earlier sunset set (golden-water, dusk-horizon, wave-at-dusk,
 * sun-on-water, windward-coast) is still in public/photos if you ever want
 * it back. Nothing points at it now.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Set while an entry is a generated stand-in rather than a real photograph. */
  standin?: boolean;
};

export const photos = {
  /** Home page hero, full bleed. Michelle's pick. */
  hero: {
    src: "/photos/sunlit-sea.jpg",
    alt: "Midday sun scattering across open blue-green ocean",
  },

  /** Behind the welcome note on the home page. Wide. */
  welcome: {
    src: "/photos/shallow-sand.jpg",
    alt: "Clear shallow water rippling over pale sand",
  },

  /** Banner across the top of each interior page. Wide. */
  travel: {
    src: "/photos/shallow-sand.jpg",
    alt: "Clear shallow water rippling over pale sand",
  },
  activities: {
    src: "/photos/turquoise-swell.jpg",
    alt: "Sunlight breaking through a turquoise swell",
  },
  story: {
    src: "/photos/golden-sparkle.jpg",
    alt: "Warm light glittering across a calm blue sea",
  },
  dressCode: {
    src: "/photos/shallow-sand.jpg",
    alt: "Clear shallow water rippling over pale sand",
  },
  faq: {
    src: "/photos/turquoise-swell.jpg",
    alt: "Sunlight breaking through a turquoise swell",
  },
  registry: {
    src: "/photos/sunlit-sea.jpg",
    alt: "Midday sun scattering across open blue-green ocean",
  },

  /** Revealed behind the home page section cards on hover. Any shape. */
  card: {
    src: "/photos/sunlit-sea.jpg",
    alt: "",
  },

  /**
   * Our Story timeline. Portrait shape.
   *
   * TODO: these are ocean photographs standing in for pictures of the two of
   * you. Replace each one with your own photo and rewrite the alt text.
   */
  story1: { src: "/photos/sunlit-sea.jpg", alt: "TODO: replace with a photo of the two of you" },
  story2: { src: "/photos/turquoise-swell.jpg", alt: "TODO: replace with a photo of the two of you" },
  story3: { src: "/photos/shallow-sand.jpg", alt: "TODO: replace with a photo of the two of you" },
  story4: { src: "/photos/golden-sparkle.jpg", alt: "TODO: replace with a photo of the two of you" },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
