/**
 * Ten design explorations.
 *
 * Each one is a different idea about what this wedding site could feel like,
 * applied to the same real content. Browse them at /designs.
 *
 * These live alongside the real site rather than replacing it: the site at
 * "/" is untouched. When you pick one, we fold its theme into the base
 * design and delete this folder.
 *
 * To drop a design, remove its entry here and its block in
 * app/designs/designs.css.
 */

export type Design = {
  /** URL segment: /designs/<slug> */
  slug: string;
  /** Shown in the picker. */
  name: string;
  /** The idea in one line. */
  idea: string;
  /** What is distinctive about it, for when two look similar at a glance. */
  note: string;
};

export const designs: Design[] = [
  {
    slug: "tide-table",
    name: "Tide Table",
    idea: "The weekend as a beautiful almanac.",
    note: "Hairline rules, tabular alignment, and small letterspaced labels. Information first, ornament last.",
  },
  {
    slug: "letterpress",
    name: "Letterpress",
    idea: "The engraved invitation, made digital.",
    note: "Centered and symmetric on heavy cream, with ornamental rules and no color but ink.",
  },
  {
    slug: "sea-glass",
    name: "Sea Glass",
    idea: "Frosted panels floating over the water.",
    note: "Translucent cards, soft aqua, deep corner radii. Nothing in it has a hard edge.",
  },
  {
    slug: "botanical",
    name: "Botanical Plate",
    idea: "A vintage plant study from the islands.",
    note: "Warm paper, fine double borders, a drop cap, and deep garden green.",
  },
  {
    slug: "horizon",
    name: "Horizon",
    idea: "One line runs through everything.",
    note: "Architectural and severe. Enormous type, full-bleed rules, almost no ornament at all.",
  },
  {
    slug: "postcard",
    name: "Postcard",
    idea: "Sent from the island, stamped and posted.",
    note: "Photographs with thick white borders, postmark lettering, and a perforated edge.",
  },
  {
    slug: "linen",
    name: "Linen",
    idea: "Woven texture and quiet neutrals.",
    note: "A tactile weave under everything, stitched borders, and the softest palette of the ten.",
  },
  {
    slug: "sea-chart",
    name: "Sea Chart",
    idea: "A navigator's elegance.",
    note: "Depth contours, bearing marks, and navy on ivory, as though the weekend were plotted.",
  },
  {
    slug: "watercolor",
    name: "Watercolor",
    idea: "Painted washes bleeding between sections.",
    note: "The closest to the original Monet idea: soft pastel color fields with no edges.",
  },
  {
    slug: "film",
    name: "Film",
    idea: "A 35mm contact sheet of the weekend.",
    note: "Frame borders, sprocket edges, and caption lettering under every photograph.",
  },
];

export function designBySlug(slug: string) {
  return designs.find((d) => d.slug === slug);
}
