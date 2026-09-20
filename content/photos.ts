/**
 * PHOTO MANIFEST — the only file you edit to change images.
 *
 * HOW TO ADD A REAL PHOTO
 * 1. Drop the file into  public/photos/   e.g. public/photos/hero.jpg
 * 2. Change the matching line below to  { src: "/photos/hero.jpg", alt: "..." }
 * 3. Commit and push. Vercel redeploys and the photo is live.
 *
 * Anything still pointing at /photos/placeholder/ is a stand-in: a rendered
 * water texture, not a photograph. Stand-ins are visibly labelled on the page
 * so a guest is never shown a fake photo presented as real. The label
 * disappears automatically once you point the entry at your own file.
 *
 * Keep the shape (wide / portrait / square) when you swap, or the crop will
 * change. Aim for roughly 2000px on the long edge.
 */

export type Photo = {
  src: string;
  alt: string;
  /** True while this is a generated stand-in rather than a real photograph. */
  standin?: boolean;
};

const ocean = {
  hero: "/photos/placeholder/ocean-hero.svg",
  wide: "/photos/placeholder/ocean-wide.svg",
  portrait: "/photos/placeholder/ocean-portrait.svg",
  square: "/photos/placeholder/ocean-square.svg",
};

export const photos = {
  /** Full-bleed home page hero. Wide. A wave, open water, or the two of you. */
  hero: { src: ocean.hero, alt: "Open ocean off the windward coast of Oʻahu", standin: true },

  /** Behind the welcome quote on the home page. Wide. */
  welcome: { src: ocean.wide, alt: "Sunlight across the surface of the sea", standin: true },

  /** Banner at the top of each interior page. Wide. */
  travel: { src: ocean.wide, alt: "The sea along the windward coast", standin: true },
  activities: { src: ocean.wide, alt: "Shallow water over reef", standin: true },
  story: { src: ocean.wide, alt: "Calm water at first light", standin: true },
  dressCode: { src: ocean.wide, alt: "Sunlit water", standin: true },
  faq: { src: ocean.wide, alt: "Rolling swell", standin: true },
  registry: { src: ocean.wide, alt: "Still water", standin: true },

  /** Revealed behind the section cards on hover. Square. */
  card: { src: ocean.square, alt: "", standin: true },

  /**
   * Our Story timeline. Add one entry per moment in content/story.ts and
   * reference it here by the same key. Portrait shape.
   */
  story1: { src: ocean.portrait, alt: "TODO: how we met", standin: true },
  story2: { src: ocean.portrait, alt: "TODO: first trip", standin: true },
  story3: { src: ocean.portrait, alt: "TODO: making it home", standin: true },
  story4: { src: ocean.portrait, alt: "TODO: the proposal", standin: true },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
