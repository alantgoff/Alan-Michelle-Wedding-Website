/**
 * Our Story — set like a small book: an album of photographs in the order
 * they happened, then the moments told in words, then a last word to you.
 *
 * The photographs are in content/photos.ts (`album`), where each can be
 * given a caption.
 *
 * THE MOMENTS. Each one is a stretch of the page with its date on the rail
 * beside it. `photo` points at a key in content/photos.ts; leave it off and
 * the moment is words only. Add, remove and reorder freely. Two optional
 * extras, shown only when you fill them in:
 *
 *   caption: "Kailua, 2021"
 *     a line under the photograph, printed as "Plate XXVI · Kailua, 2021".
 *
 *   notes: [
 *     { by: "M", text: "He was forty minutes late." },
 *     { by: "A", text: "Thirty-five." },
 *   ]
 *     asides in the margin, initialled, one voice each: "A" for Alan and
 *     "M" for Michelle. Keep them short. They are the best part.
 *
 * TODO: our story in words. The story itself is still to be written, so
 * only the last moment is here. When you are ready, add moments above it
 * like these (a moment with "TODO" in its date or text is never shown):
 *
 *   { date: "2019", title: "How we met", text: "The first conversation, first impression, or first date. The small specific detail is what people remember." },
 *   { date: "2021", title: "The adventure begins", text: "A favorite shared trip, a move, or an ordinary moment that turned out to matter." },
 *   { date: "2027", title: "The proposal", text: "The proposal in your own words. Include who cried." },
 */

import type { PhotoKey } from "./photos";

export type StoryNote = { by: "A" | "M"; text: string };
export type StoryMoment = { date: string; title: string; text: string; photo?: PhotoKey; caption?: string; notes?: StoryNote[] };

export const story: StoryMoment[] = [
  {
    date: "Next chapter",
    title: "Oʻahu",
    text: "We will begin married life surrounded by the mountains, the water, and all of you.",
    photo: "story4",
  },
];

/** The words around the album and the moments. {date} is filled in for you. */
export const storyPage = {
  tab: "Our story",
  kicker: "Our story",
  title: "The road here",
  intro: "Our story so far, in pictures, in the order it happened. The words are still to come.",
  /** On the rail beside the album. */
  albumMarker: "In pictures",
  albumLabel: "Our story in pictures",
  /** Before each plate's numeral: "Plate IV". */
  plate: "Plate",
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
