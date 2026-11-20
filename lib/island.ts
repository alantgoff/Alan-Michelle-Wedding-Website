/**
 * Oʻahu as the site draws it: one outline, shared by the coast map on Travel
 * and the little locator maps beside places, plus the named points those
 * maps put a dot on.
 *
 * A plain module (no "use client"), so server pages can read the strings.
 * The outline is drawn by feel, not surveyed: points are placed against it
 * by eye, the way the coast map's pins are, in its 1000 × 720 box.
 */

export const ISLAND_BOX = { width: 1000, height: 720 };

export const ISLAND =
  // Kaʻena Point, the sharp western tip, then the North Shore to Kahuku
  "M122 296 C168 244 240 198 330 168 C424 138 516 122 598 120 " +
  // Kahuku Point, then south down the windward coast toward Kualoa
  "C652 124 692 146 716 186 C736 220 744 258 746 294 " +
  // Kāneʻohe Bay, bitten deep into the windward side
  "C702 306 684 336 692 366 C700 396 728 410 756 420 " +
  // Kailua and Lanikai, down to the point at Makapuʻu
  "C778 430 792 450 788 478 C780 514 750 540 712 558 " +
  // the south shore: Diamond Head, Waikīkī, town
  "C666 580 612 592 558 596 C530 598 510 590 496 572 " +
  // Pearl Harbor, cut up into the plain
  "C484 556 464 554 454 570 C444 586 426 594 400 594 " +
  // the ʻEwa plain, then the straight Waiʻanae coast back up to Kaʻena
  "C340 594 272 568 226 520 C190 482 160 424 140 366 C130 336 124 314 122 296 Z";

/** Where a place is, by name. Keys are what content files use in `at`. */
export const POINTS = {
  // Town and the south shore
  waikiki: [620, 572],
  kapahulu: [638, 572],
  kaimuki: [652, 562],
  moiliili: [606, 566],
  "ala-moana": [590, 576],
  chinatown: [550, 580],
  kalihi: [530, 572],
  airport: [504, 580],
  hanauma: [722, 548],
  makapuu: [770, 512],
  // Windward, on our side of the mountains
  kailua: [742, 432],
  lanikai: [776, 446],
  kaneohe: [676, 352],
  heeia: [682, 324],
  waiahole: [726, 268],
  kualoa: [720, 238],
  kahana: [722, 212],
  laie: [690, 166],
  // The north and the middle
  kahuku: [640, 134],
  "turtle-bay": [612, 130],
  pupukea: [530, 134],
  haleiwa: [430, 146],
  wahiawa: [432, 318],
  // The west
  "ko-olina": [265, 544],
  waianae: [178, 420],
} satisfies Record<string, [number, number]>;

export type PointKey = keyof typeof POINTS;
