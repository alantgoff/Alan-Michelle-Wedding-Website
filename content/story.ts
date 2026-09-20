/**
 * Our Story — a timeline of moments.
 *
 * `photo` points at a key in content/photos.ts. Leave it off and the moment
 * renders as text only. Add, remove, and reorder entries freely.
 */

import type { PhotoKey } from "./photos";

export type StoryMoment = { date: string; title: string; text: string; photo?: PhotoKey };

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
