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
 */

export type Photo = {
  src: string;
  alt: string;
  /** Set while an entry is a generated stand-in rather than a real photograph. */
  standin?: boolean;
};

export const photos = {
  /** Home page hero, full bleed. Wide crop from a portrait original. */
  hero: {
    src: "/photos/windward-coast.jpg",
    alt: "Lava rock shoreline and a leaning palm above bright open water",
  },

  /** Behind the welcome note on the home page. Wide. */
  welcome: {
    src: "/photos/wave-at-dusk.jpg",
    alt: "A clear swell rising under an open sky",
  },

  /** Banner across the top of each interior page. Wide. */
  travel: {
    src: "/photos/dusk-horizon.jpg",
    alt: "Wide calm water reaching to the horizon",
  },
  activities: {
    src: "/photos/wave-at-dusk.jpg",
    alt: "A swell rising against a pale gold sunset",
  },
  story: {
    src: "/photos/sun-on-water.jpg",
    alt: "The sun low on the horizon, its light reflected along the wet sand",
  },
  dressCode: {
    src: "/photos/windward-coast.jpg",
    alt: "Palms and shoreline above bright shallow water",
  },
  faq: {
    src: "/photos/wave-at-dusk.jpg",
    alt: "A swell rising against a pale gold sunset",
  },
  registry: {
    src: "/photos/dusk-horizon.jpg",
    alt: "Wide calm water reaching to the horizon",
  },

  /** Revealed behind the home page section cards on hover. Any shape. */
  card: {
    src: "/photos/wave-at-dusk.jpg",
    alt: "",
  },

  /**
   * Our Story timeline. Portrait shape.
   *
   * TODO: these are ocean photographs standing in for pictures of the two of
   * you. Replace each one with your own photo and rewrite the alt text.
   */
  story1: { src: "/photos/golden-water.jpg", alt: "TODO: replace with a photo of the two of you" },
  story2: { src: "/photos/wave-at-dusk.jpg", alt: "TODO: replace with a photo of the two of you" },
  story3: { src: "/photos/sun-on-water.jpg", alt: "TODO: replace with a photo of the two of you" },
  story4: { src: "/photos/windward-coast.jpg", alt: "TODO: replace with a photo of the two of you" },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
