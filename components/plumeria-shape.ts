/**
 * The five-petal plumeria from the logo, as SVG path data, shared by the
 * still flower (Plumeria.tsx) and the scattering one (PlumeriaBurst.tsx).
 *
 * A plain module on purpose: constants exported from a "use client" file
 * reach server components as client references, not as strings.
 */
export const PLUMERIA_INK = "#013d72";
export const PLUMERIA_CENTRE = "#f3d27e";

/** One petal leaning clockwise; five of them rotated 72° apart overlap in a pinwheel. */
export const PLUMERIA_PETAL = "M32 32 C 23 27 21 11 31 4 C 40 8 41 24 32 32 Z";
export const PLUMERIA_TURNS = [0, 72, 144, 216, 288];
