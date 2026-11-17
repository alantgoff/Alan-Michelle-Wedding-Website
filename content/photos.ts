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
 * OUR STORY, IN PICTURES — every photograph on the Our story page, by name.
 * Which chapter each one belongs to, and in what order, is set in
 * content/story.ts. They are shown at their own shape, so nobody is cropped.
 *
 *   src      the file, in public/photos/story/
 *   width,
 *   height   the file's size in pixels (only the shape matters)
 *   alt      what is in the picture, read aloud by screen readers
 *   caption  optional: a short line under the photo, e.g. "The ring".
 *            Leave it out and nothing is written under it.
 *
 * To add a photo: put the file in public/photos/story/, add a line here
 * with a new name, then add that name to a chapter in content/story.ts.
 */
export type AlbumPhoto = { src: string; width: number; height: number; alt: string; caption?: string };

export const album = {
  "ou-trip": { src: "/photos/story/01.jpg", width: 1500, height: 2000, alt: "The two of us in front of a towering cowboy statue at a crowded fair, both making the same hand sign." },
  "vermont-friends": { src: "/photos/story/02.jpg", width: 2000, height: 1500, alt: "Six of us around a table of pizzas in a wood-paneled brewery in Vermont, with a lit Christmas tree in the corner." },
  vermont: { src: "/photos/story/03.jpg", width: 2000, height: 1500, alt: "A selfie on a chairlift in Vermont, in ski helmets and goggles, with snowy trees behind us." },
  hawaii: { src: "/photos/story/04.jpg", width: 2000, height: 1500, alt: "The two of us at a railed lookout high above the ocean in Hawaiʻi, with a lighthouse on the shore below." },
  "yosemite-friends": { src: "/photos/story/05.jpg", width: 2000, height: 1333, alt: "A group of eleven friends at Yosemite, in front of a granite valley with a waterfall in the distance." },
  yosemite: { src: "/photos/story/06.jpg", width: 1932, height: 1932, alt: "A selfie at dusk among tall pines at Yosemite, one of us waving." },
  bali: { src: "/photos/story/07.jpg", width: 2000, height: 1500, alt: "The two of us at night beside a softly lit pool in Bali.", caption: "Bali" },
  thailand: { src: "/photos/story/08.jpg", width: 2000, height: 1333, alt: "The two of us in Thailand, copying the squat of a stone statue between us in a temple courtyard.", caption: "Thailand" },
  "new-york-1": { src: "/photos/story/09.jpg", width: 1500, height: 2000, alt: "One of us striking a T. rex pose in front of a Tyrannosaurus skeleton in a New York museum hall." },
  "new-york-2": { src: "/photos/story/10.jpg", width: 1500, height: 2000, alt: "One of us smiling beneath a towering dinosaur skeleton in a New York museum hall." },
  "disney-1": { src: "/photos/story/11.jpg", width: 1334, height: 2000, alt: "A ride photo of a log flume mid-splash, our boat full of friends, a few in yellow ponchos." },
  "disney-2": { src: "/photos/story/12.jpg", width: 2000, height: 1500, alt: "A selfie on a sunny street lined with palm trees and a pale green art deco tower." },
  "disney-3": { src: "/photos/story/13.jpg", width: 1333, height: 2000, alt: "The two of us in mouse ears, arms flung wide, in front of a castle lit purple and pink at night." },
  iceland: { src: "/photos/story/14.jpg", width: 1500, height: 2000, alt: "A selfie in winter hats in front of a tall waterfall in Iceland." },
  "osaka-aquarium": { src: "/photos/story/15.jpg", width: 1500, height: 2000, alt: "The two of us in silhouette, arm in arm, before a huge aquarium window in Osaka with a whale shark and a ray gliding past.", caption: "The Osaka aquarium" },
  japan: { src: "/photos/story/16.jpg", width: 1125, height: 1500, alt: "The two of us in kimono in Japan, beneath a cherry tree in full blossom beside a white wall with a tiled roof." },
  "moving-in": { src: "/photos/story/17.jpg", width: 2000, height: 1500, alt: "A selfie in a narrow hallway between two apartment doors." },
  "anniversary-1": { src: "/photos/story/18.jpg", width: 1125, height: 1500, alt: "The two of us crouched in the grass between rows of apple trees heavy with fruit." },
  "anniversary-2": { src: "/photos/story/19.jpg", width: 2000, height: 1500, alt: "A selfie in an apple orchard, one of us hugging the other from behind." },
  "first-christmas": { src: "/photos/story/20.jpg", width: 1333, height: 2000, alt: "One of us smiling beside a small Christmas tree strung with lights, at home." },
  acatenango: { src: "/photos/story/21.jpg", width: 1500, height: 2000, alt: "The two of us on Acatenango in Guatemala, in early light, a smoking peak behind us and clouds far below.", caption: "Acatenango" },
  guatemala: { src: "/photos/story/22.jpg", width: 2000, height: 1500, alt: "A close selfie against a red wall in Guatemala." },
  proposal: { src: "/photos/story/23.jpg", width: 1782, height: 2000, alt: "On a beach on Kauaʻi beneath a steep green peak, one of us kneels with a ring box while the other covers their mouth in surprise.", caption: "The proposal" },
  kauai: { src: "/photos/story/24.jpg", width: 1334, height: 2000, alt: "The two of us on the beach on Kauaʻi just after, one holding up a hand to show the ring." },
  ring: { src: "/photos/story/25.jpg", width: 1356, height: 2000, alt: "Our hands joined over the sand, a ring and a jade bangle on one, the sea soft behind.", caption: "The ring" },
} as const satisfies Record<string, AlbumPhoto>;

export type AlbumKey = keyof typeof album;

/**
 * THE BEST SPOTS — photographs for the cards on The island page, from
 * Wikimedia Commons under free licenses. Each is credited under its photo
 * as its license asks: keep `credit` with the photo if you move it.
 */
export type SpotPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: { author: string; license: string; licenseUrl: string; source: string };
};

export const spotPhotos = {} as const satisfies Record<string, SpotPhoto>;

export type SpotPhotoKey = keyof typeof spotPhotos;

