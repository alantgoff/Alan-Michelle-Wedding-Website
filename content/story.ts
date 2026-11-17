/**
 * Our Story — set like a small book: our story in chapters, in the order it
 * happened, then a last word to you. The chapters and their order come from
 * the names of the photographs we sent.
 *
 * Each chapter is a stretch of the page with its number on the rail beside
 * it. `photos` lists the chapter's pictures by their names in
 * content/photos.ts (`album`): the first is the main one and is set larger.
 * Captions for single pictures are there too. TypeScript catches a
 * misspelled name.
 *
 * Everything else is optional, and shows only when you fill it in:
 *
 *   date: "2024"
 *     a date or a year on the rail above the chapter's number. The first
 *     and last chapters have theirs: we started dating on October 7, 2023,
 *     and the proposal was on July 8, 2026.
 *
 *   text: "…"
 *     a few lines of the story, set with a drop cap.
 *
 *   notes: [
 *     { by: "M", text: "He was forty minutes late." },
 *     { by: "A", text: "Thirty-five." },
 *   ]
 *     asides in the margin, initialled, one voice each: "A" for Alan and
 *     "M" for Michelle. Keep them short. They are the best part.
 *
 * TODO: our story in words. Add a year and a few lines to any chapter you
 * like. (A chapter with "TODO" in its date or text is never shown.)
 */

import type { AlbumKey, PhotoKey } from "./photos";

export type StoryNote = { by: "A" | "M"; text: string };
export type StoryMoment = {
  title: string;
  date?: string;
  text?: string;
  /** The chapter's pictures, by name in content/photos.ts (`album`). The first is the main one. */
  photos?: AlbumKey[];
  /** A single picture from the main manifest instead, with an optional caption. */
  photo?: PhotoKey;
  caption?: string;
  notes?: StoryNote[];
};

export const story: StoryMoment[] = [
  { date: "October 7, 2023", title: "Where it started: the OU trip", photos: ["ou-trip"] },
  { title: "Vermont", photos: ["vermont", "vermont-friends"] },
  { title: "Hawaiʻi", photos: ["hawaii"] },
  { title: "Yosemite", photos: ["yosemite", "yosemite-friends"] },
  { title: "Bali and Thailand", photos: ["bali", "thailand"] },
  { title: "Our first New York trip, while we were long-distance", photos: ["new-york-1", "new-york-2"] },
  { title: "Disney", photos: ["disney-1", "disney-2", "disney-3"] },
  { title: "Iceland", photos: ["iceland"] },
  { title: "Japan", photos: ["osaka-aquarium", "japan"] },
  { title: "Moving in together", photos: ["moving-in"] },
  { title: "Our two-year anniversary trip", photos: ["anniversary-1", "anniversary-2"] },
  { title: "Our first Christmas at home", photos: ["first-christmas"] },
  { title: "Guatemala", photos: ["acatenango", "guatemala"] },
  { date: "July 8, 2026", title: "Kauaʻi: the proposal", photos: ["proposal", "kauai", "ring"] },
  {
    date: "Next chapter",
    title: "Oʻahu",
    text: "We will begin married life surrounded by the mountains, the water, and all of you.",
    photo: "story4",
  },
];

/** The words around the chapters. {date} is filled in for you. */
export const storyPage = {
  tab: "Our story",
  kicker: "Our story",
  title: "The road here",
  intro: "Our story so far, chapter by chapter, in pictures. The words are still to come.",
  notesLabel: "Notes in the margin",
  who: { A: "Alan", M: "Michelle" },
  closingLabel: "Closing",
  closingMarker: "And now",
  edition: "First edition, {date}.",
};

/**
 * The last words on the page. The three Hawaiian words are from the Hawaiian
 * Dictionary: kāua and māua are both "we two", one including the person
 * spoken to and one not; kākou is all of us.
 */
export const storyClosing = {
  thanks: "Which brings us to a lawn at the foot of the Koʻolau, and to you. Thank you for coming this far with us.",
  words: [
    { word: "kāua", means: "the two of us: you and I" },
    { word: "māua", means: "the two of us, but not you" },
    { word: "kākou", means: "all of us" },
  ],
  line: "Hawaiian has more than one word for we. For one weekend in October, we would much rather say kākou.",
  /** The small print under the logo, as at the back of a book. The date is added for you. */
  colophon: "Set in Cormorant Garamond and Lora.",
};
