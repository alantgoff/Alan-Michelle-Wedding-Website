/**
 * Small landmark icons for the close-up maps on The island, drawn in a
 * 24-unit box around their own centre and shown inside a white badge. Line
 * icons unless `fill` says the shape is solid.
 */
export const MAP_ICONS = {
  park: { d: "M0 9 V2 M-7 2 C-9 -3 -5 -9 0 -9 C5 -9 9 -3 7 2 Z" },
  zoo: { d: "M-5 5 C-5 0 5 0 5 5 C5 8.5 -5 8.5 -5 5 Z M-8 -1 a2.2 2.2 0 1 0 0.1 0 M-3.5 -6 a2.2 2.2 0 1 0 0.1 0 M3.5 -6 a2.2 2.2 0 1 0 0.1 0 M8 -1 a2.2 2.2 0 1 0 0.1 0", fill: true },
  aquarium: { d: "M-9 0 C-5 -6 3 -6 7 0 C3 6 -5 6 -9 0 Z M7 0 L11 -4 L11 4 Z M-4 -1 h0.1" },
  lighthouse: { d: "M-4 9 L-2.5 -5 L2.5 -5 L4 9 Z M-3.5 -5 L0 -9 L3.5 -5 M-2 0 h4 M-2.6 4 h5.2 M5 -8 L9 -10 M5 -6 L9 -5" },
  temple: { d: "M-10 -3 L0 -9 L10 -3 Z M-6 -3 V8 M6 -3 V8 M-9 8 H9 M-3 8 V2 H3 V8" },
  harbor: { d: "M0 -9 a2 2 0 1 0 0.1 0 M0 -7 V8 M-5 -3 H5 M-8 3 C-6 9 6 9 8 3" },
  shop: { d: "M-7 -3 H7 L6 9 H-6 Z M-3.5 -3 V-6 C-3.5 -9.5 3.5 -9.5 3.5 -6 V-3" },
  school: { d: "M-10 -3 L0 -8 L10 -3 L0 2 Z M-6 0 V5 C-3 8 3 8 6 5 V0 M10 -3 V4" },
  palace: { d: "M-9 8 H9 M-8 8 V0 M8 8 V0 M-10 0 H10 L0 -7 Z M-4 8 V3 M0 8 V3 M4 8 V3" },
  tower: { d: "M-3 9 V-4 L0 -10 L3 -4 V9 Z M-6 9 H6 M0 -1.5 a1.8 1.8 0 1 0 0.1 0" },
  fishpond: { d: "M-9 3 C-9 -6 9 -6 9 3 M-6 5 c2 -1.5 3 1.5 5 0 c2 -1.5 3 1.5 5 0" },
  blowhole: { d: "M-8 8 H8 M0 8 V0 M0 0 C-2 -4 -6 -4 -7 -8 M0 0 C2 -4 6 -4 7 -8 M0 -1 V-9" },
  trail: { d: "M-9 8 L-2 -3 L2 2 L5 -2 L9 8 Z M-2 -3 V-9 L3 -7.5 L-2 -6" },
  farm: { d: "M-8 9 V-1 L0 -8 L8 -1 V9 Z M-3 9 V3 H3 V9 M-8 -1 H8" },
  bridge: { d: "M-10 4 H10 M-8 4 C-8 -4 8 -4 8 4 M-4 4 V0 M0 4 V-1 M4 4 V0" },
  surf: { d: "M-9 6 C-9 -4 1 -9 6 -4 C2 -5 -1 -2 0 2 C1 5 5 5 8 3" },
  snorkel: { d: "M-8 -2 C-8 -6 8 -6 8 -2 C8 2 4 3 2 1 C1 0 -1 0 -2 1 C-4 3 -8 2 -8 -2 Z M8 -2 C10 -2 11 -5 11 -9" },
  beach: { d: "M-9 -1 C-8 -8 8 -8 9 -1 Z M0 -1 V9 M-6 9 H6" },
  marsh: { d: "M-6 9 C-6 2 -7 -3 -9 -7 M-2 9 C-2 0 -1 -5 -2 -9 M2 9 C2 1 4 -4 7 -8 M6 9 C6 4 8 1 10 -2 M-9 9 H10" },
  lookout: { d: "M-9 0 C-5 -6 5 -6 9 0 C5 6 -5 6 -9 0 Z M0 -3 a3 3 0 1 0 0.1 0" },
  pineapple: { d: "M-5 2 C-5 -3 5 -3 5 2 C5 8 -5 8 -5 2 Z M0 -3 L-4 -9 M0 -3 L0 -10 M0 -3 L4 -9 M-4 0 L4 6 M4 0 L-4 6" },
  ranch: { d: "M-6 8 C-9 0 -7 -8 0 -8 C7 -8 9 0 6 8 M-6 8 h-2 M6 8 h2" },
} satisfies Record<string, { d: string; fill?: boolean }>;

export type IconId = keyof typeof MAP_ICONS;
