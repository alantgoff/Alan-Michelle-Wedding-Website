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
  island: {
    src: "/photos/sunlit-sea.jpg",
    alt: "Midday sun scattering across open blue-green ocean",
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

  /** Beside the last moment on Our story ("Next chapter: Oʻahu"). Portrait shape. */
  story4: { src: "/photos/golden-sparkle.jpg", alt: "Warm light glittering across a calm blue sea" },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** The small label on any photo still marked `standin`. */
export const standinLabel = "Placeholder";

/**
 * OUR STORY, IN PICTURES — the album on the Our story page, in the order it
 * happened. Shown at each photo's own shape, so nobody is cropped.
 *
 *   src      the file, in public/photos/story/
 *   width,
 *   height   the file's size in pixels (only the shape matters)
 *   alt      what is in the picture, read aloud by screen readers
 *   caption  optional: a line under the plate, e.g. "Kyoto, spring 2025".
 *            Leave it empty and the plate shows only its number.
 *
 * The order is the order the photos were sent in. To move one, move its
 * line. To add one, put the file in public/photos/story/ and add a line.
 */
export type AlbumPhoto = { src: string; width: number; height: number; alt: string; caption?: string };

export const album: AlbumPhoto[] = [
  { src: "/photos/story/01.jpg", width: 1500, height: 2000, alt: "The two of us in front of a towering cowboy statue at a crowded fair, both making the same hand sign." },
  { src: "/photos/story/02.jpg", width: 2000, height: 1500, alt: "Six of us around a table of pizzas in a wood-paneled brewery, with a lit Christmas tree in the corner." },
  { src: "/photos/story/03.jpg", width: 2000, height: 1500, alt: "A selfie on a chairlift, in ski helmets and goggles, with snowy trees behind us." },
  { src: "/photos/story/04.jpg", width: 2000, height: 1500, alt: "The two of us at a railed lookout high above the ocean, with a lighthouse on the shore below." },
  { src: "/photos/story/05.jpg", width: 2000, height: 1333, alt: "A group of eleven friends in front of a granite valley with a waterfall in the distance." },
  { src: "/photos/story/06.jpg", width: 1932, height: 1932, alt: "A selfie at dusk among tall pines, one of us waving." },
  { src: "/photos/story/07.jpg", width: 2000, height: 1500, alt: "The two of us at night beside a softly lit pool." },
  { src: "/photos/story/08.jpg", width: 2000, height: 1333, alt: "The two of us copying the squat of a stone statue between us, in a temple courtyard." },
  { src: "/photos/story/09.jpg", width: 1500, height: 2000, alt: "One of us striking a T. rex pose in front of a Tyrannosaurus skeleton in a museum hall." },
  { src: "/photos/story/10.jpg", width: 1500, height: 2000, alt: "One of us smiling beneath a towering dinosaur skeleton in a museum hall." },
  { src: "/photos/story/11.jpg", width: 1334, height: 2000, alt: "A ride photo of a log flume mid-splash, our boat full of friends, a few in yellow ponchos." },
  { src: "/photos/story/12.jpg", width: 2000, height: 1500, alt: "A selfie on a sunny street lined with palm trees and a pale green art deco tower." },
  { src: "/photos/story/13.jpg", width: 1333, height: 2000, alt: "The two of us in mouse ears, arms flung wide, in front of a castle lit purple and pink at night." },
  { src: "/photos/story/14.jpg", width: 1500, height: 2000, alt: "A selfie in winter hats in front of a tall waterfall." },
  { src: "/photos/story/15.jpg", width: 1500, height: 2000, alt: "The two of us in silhouette, arm in arm, before a huge aquarium window with a whale shark and a ray gliding past." },
  { src: "/photos/story/16.jpg", width: 1125, height: 1500, alt: "The two of us in kimono beneath a cherry tree in full blossom, beside a white wall with a tiled roof." },
  { src: "/photos/story/17.jpg", width: 2000, height: 1500, alt: "A selfie in a narrow hallway between two apartment doors." },
  { src: "/photos/story/18.jpg", width: 1125, height: 1500, alt: "The two of us crouched in the grass between rows of apple trees heavy with fruit." },
  { src: "/photos/story/19.jpg", width: 2000, height: 1500, alt: "A selfie in an apple orchard, one of us hugging the other from behind." },
  { src: "/photos/story/20.jpg", width: 1333, height: 2000, alt: "One of us smiling beside a small Christmas tree strung with lights." },
  { src: "/photos/story/21.jpg", width: 1500, height: 2000, alt: "The two of us on a volcanic ridge in early light, a smoking peak behind us and clouds far below." },
  { src: "/photos/story/22.jpg", width: 2000, height: 1500, alt: "A close selfie against a red wall." },
  { src: "/photos/story/23.jpg", width: 1782, height: 2000, alt: "On a beach beneath a steep green peak, one of us kneels with a ring box while the other covers their mouth in surprise." },
  { src: "/photos/story/24.jpg", width: 1334, height: 2000, alt: "The two of us on the beach just after, one holding up a hand to show the ring." },
  { src: "/photos/story/25.jpg", width: 1356, height: 2000, alt: "Our hands joined over the sand, a ring and a jade bangle on one, the sea soft behind." },
];
