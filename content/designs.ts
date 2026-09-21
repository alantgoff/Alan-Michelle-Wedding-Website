/**
 * Ten reimaginings of the site.
 *
 * These are not themes. Each one is a different answer to "what shape is a
 * wedding website?" — a different navigation model, a different way the
 * content is organised, different components. Some are a single scrolling
 * surface, some step through panels, one is a map. They share only the
 * content in this folder.
 *
 * Browse them at /designs. The real site at "/" is untouched.
 *
 * Each concept is two files, and nothing else references them:
 *   app/designs/concepts/<slug>.tsx
 *   app/designs/concepts/<slug>.css
 */

export type Design = {
  /** URL segment: /designs/<slug> */
  slug: string;
  name: string;
  /** The structural idea — what is actually different about it. */
  idea: string;
  /** How you move through it. */
  structure: string;
  /** Swatch for the picker. */
  colors: [string, string, string, string, string];
};

export const designs: Design[] = [
  {
    slug: "letter",
    name: "The Letter",
    idea: "The whole site is one long letter written to you.",
    structure: "No navigation bar at all. A single column of prose you read top to bottom, with a slim index that follows you down the margin.",
    colors: ["#2b2622", "#7a6a55", "#c9b99c", "#ece3d2", "#f8f4ea"],
  },
  {
    slug: "itinerary",
    name: "The Itinerary",
    idea: "The site is the weekend, hour by hour.",
    structure: "A time spine runs down the page from Thursday to Sunday. Travel, dress and questions are attached to the moment you actually need them.",
    colors: ["#163a44", "#2c7b83", "#8fc2c4", "#e2ece9", "#f6faf9"],
  },
  {
    slug: "field-guide",
    name: "The Field Guide",
    idea: "A reference book for the island and the weekend.",
    structure: "Dense two-column text with notes in the margin, numbered entries and cross-references. Built for looking things up, not scrolling past.",
    colors: ["#2a3b2c", "#5d7348", "#b3c19b", "#e6e2d0", "#f7f4e8"],
  },
  {
    slug: "album",
    name: "The Album",
    idea: "Photographs first, words only when you ask.",
    structure: "A full-bleed mosaic of images. Tap any one and its text unfolds in place. Almost no interface until you touch it.",
    colors: ["#1d1f22", "#5c6672", "#a9b6c0", "#dde3e7", "#f4f6f7"],
  },
  {
    slug: "broadsheet",
    name: "The Broadsheet",
    idea: "The wedding as the front page of a newspaper.",
    structure: "A masthead, a dateline and real multi-column text. Everything sits on one page in columns, the way a paper puts the whole world on a single sheet.",
    colors: ["#1a1a18", "#6b5f4e", "#bfb39c", "#e8e3d7", "#faf8f2"],
  },
  {
    slug: "deck",
    name: "The Deck",
    idea: "One idea per screen, swiped sideways.",
    structure: "Full-height panels that snap horizontally. No scrolling down at all — you move through the weekend left to right.",
    colors: ["#122c33", "#1d7a78", "#79c2b4", "#e4efe6", "#fbfdf9"],
  },
  {
    slug: "index",
    name: "The Index",
    idea: "A book's table of contents, and nothing else.",
    structure: "Opens as a numbered list of chapters with no images at all. Choosing one drops you into that chapter full-bleed, with a running head and folio.",
    colors: ["#20211f", "#585a54", "#a5a79d", "#dcdcd4", "#f6f6f0"],
  },
  {
    slug: "map",
    name: "The Map",
    idea: "Organised by place, not by topic.",
    structure: "A drawn map of the windward coast. The airport, the hotels, the beaches and the venue are points you open; the content lives where it happens.",
    colors: ["#14384f", "#3a7ca5", "#9ec6dc", "#ecdfc4", "#f8f2e4"],
  },
  {
    slug: "suite",
    name: "The Invitation Suite",
    idea: "A stack of cards in an envelope.",
    structure: "One card at a time, centered, stepped through like the enclosures in a real invitation. Nothing else is on screen.",
    colors: ["#2d2a2e", "#8a6a72", "#d4b2b8", "#efe2e2", "#faf5f4"],
  },
  {
    slug: "window",
    name: "The Window",
    idea: "The ocean stays. The words move.",
    structure: "One photograph fills the screen and never scrolls. The content slides over it in a narrow panel, and the image changes beneath as you go.",
    colors: ["#0e2f33", "#2a6f70", "#7fb6ad", "#dcebe4", "#ffffff"],
  },
];

export function designBySlug(slug: string) {
  return designs.find((d) => d.slug === slug);
}
