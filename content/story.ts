/**
 * Our Story — a timeline of moments, set like a small book.
 *
 * `photo` points at a key in content/photos.ts. Leave it off and the moment
 * renders as text only. Add, remove, and reorder entries freely.
 *
 * Two optional extras, shown only when you fill them in:
 *
 *   caption: "Kailua, 2021"
 *     a line under the photograph, printed as "Plate II · Kailua, 2021".
 *
 *   notes: [
 *     { by: "M", text: "He was forty minutes late." },
 *     { by: "A", text: "Thirty-five." },
 *   ]
 *     asides in the margin, initialled, one voice each: "A" for Alan and
 *     "M" for Michelle. Keep them short. They are the best part.
 */

import type { PhotoKey } from "./photos";

export type StoryNote = { by: "A" | "M"; text: string };
export type StoryMoment = { date: string; title: string; text: string; photo?: PhotoKey; caption?: string; notes?: StoryNote[] };

export const story: StoryMoment[] = [
  {
    date: "TODO: Year",
    title: "How we met",
    text: "TODO: Tell the story of the first conversation, first impression, or first date. The small specific detail is what people remember.",
    photo: "story1",
  },
  {
    date: "TODO: Year",
    title: "The adventure begins",
    text: "TODO: A favorite shared trip, a move, or an ordinary moment that turned out to matter.",
    photo: "story2",
  },
  {
    date: "TODO: Date",
    title: "The proposal",
    text: "TODO: Tell the proposal story in your own words. Include who cried.",
    photo: "story3",
  },
  {
    date: "Next chapter",
    title: "Oʻahu",
    text: "We will begin married life surrounded by the mountains, the water, and all of you.",
    photo: "story4",
  },
];

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
