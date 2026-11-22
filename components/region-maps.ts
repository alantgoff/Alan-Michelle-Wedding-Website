/**
 * The close-up maps on The island's picks map: one simple drawing for each
 * part of the island (content/island.ts, `explorer.regions`), in a 1000 × 720
 * box with north up. Drawn by feel from the real shapes, like the coast chart:
 * the coast, the main roads, the landmarks people steer by, and where each
 * pick is. Not to scale, and not for finding your way.
 *
 * `spots` puts a pick (by its id) on the drawing. A pick without a spot sits
 * at its neighborhood's `anchors` point, so a new place still shows up.
 */
import type { PointKey } from "@/lib/island";

export type Label = { x: number; y: number; t: string; k: "place" | "street" | "water" | "feature" | "small"; r?: number; a?: "start" | "middle" | "end" };

export type RegionMap = {
  /** The land; the sea is everything else. */
  land: string;
  /** Small islands and rocks offshore. */
  islets?: string;
  /** Bays, lakes and harbors inside the land, filled as water. */
  water?: string;
  /** A canal or stream, drawn as a ribbon of water. */
  canals?: string[];
  parks?: string;
  /** Fields, drawn as rows. */
  fields?: { x: number; y: number; w: number; h: number }[];
  /** Mountain crests: a spine with hachures falling west and east. */
  ridges?: { spine: number[][]; west: number; east: number }[];
  craters?: { x: number; y: number; r: number }[];
  highways?: string[];
  streets?: string[];
  trails?: string[];
  /** A reef or sandbar, dotted. */
  shoals?: string[];
  /** Buildings, as small blocks. */
  blocks?: string;
  labels: Label[];
  anchors: Partial<Record<PointKey, [number, number]>>;
  spots: Record<string, [number, number]>;
  /** The venue, where it is on this map. */
  star?: { x: number; y: number; t: string };
};

/** Hotel towers along Waikīkī, as a row of small blocks between the canal and the beach. */
function hotels(): string {
  const parts: string[] = [];
  for (let x = 70; x < 460; x += 24) {
    const shore = 470 + (x / 460) * 80;
    for (let row = 0; row < 3; row += 1) {
      const y = shore - 28 - row * 22 - ((x * 7) % 9);
      if (y < 400 + (x / 460) * -20 + 12) continue;
      // leave room for the name
      if (x > 170 && x < 340 && y < 478) continue;
      parts.push(`M${x} ${y} h${14 - row * 2} v${10 + ((x + row) % 3) * 3} h${-(14 - row * 2)} Z`);
    }
  }
  return parts.join(" ");
}

export const REGION_MAPS: Record<string, RegionMap> = {
  // Waikīkī, between the Ala Wai and the sea; Kapahulu Avenue running up
  // from the zoo; Kaimukī along Waiʻalae Avenue; Lēʻahi to the southeast.
  waikiki: {
    land: "M0 468 C60 470 120 476 170 488 C230 502 300 520 360 536 C410 550 450 556 486 572 C520 588 548 606 578 622 C610 640 640 654 676 666 C720 682 780 694 840 696 C900 698 950 690 1000 684 L1000 0 L0 0 Z",
    canals: ["M0 432 C120 420 260 402 380 384 C420 378 452 372 478 360"],
    parks: "M486 566 C500 526 540 508 596 518 C640 528 662 560 668 604 C640 622 604 620 580 612 C544 596 512 582 486 566 Z M392 372 C420 344 470 330 506 338 L512 304 C466 294 412 306 378 340 Z",
    craters: [{ x: 806, y: 566, r: 92 }],
    highways: ["M0 236 C200 234 420 226 560 214 C700 202 860 196 1000 192"],
    streets: [
      "M40 452 C140 462 260 490 360 514 C420 528 460 542 488 558 C520 576 552 600 582 618 C604 630 624 642 646 652",
      "M488 558 C500 520 512 470 524 420 C536 370 552 320 570 280 C580 258 588 240 594 222",
      "M0 318 C200 298 420 270 594 242",
      "M594 242 C680 258 760 270 840 276 C900 280 950 282 1000 284",
      "M70 440 C180 450 300 474 430 500",
      "M584 604 C614 560 650 512 694 486 C722 468 736 432 744 396 C752 360 762 324 772 290",
      "M786 226 L792 340 M866 226 L872 340",
    ],
    blocks: hotels(),
    labels: [
      { x: 255, y: 466, t: "WAIKĪKĪ", k: "place", r: 9 },
      { x: 664, y: 452, t: "KAPAHULU", k: "place" },
      { x: 820, y: 176, t: "KAIMUKĪ", k: "place" },
      { x: 200, y: 404, t: "Ala Wai Canal", k: "water", r: -6 },
      { x: 330, y: 540, t: "Kalākaua Ave", k: "street", r: 15 },
      { x: 584, y: 326, t: "Kapahulu Ave", k: "street", r: -71 },
      { x: 700, y: 248, t: "Waiʻalae Ave", k: "street", r: 4 },
      { x: 300, y: 222, t: "H-1", k: "feature" },
      { x: 586, y: 578, t: "Kapiʻolani Park", k: "small" },
      { x: 448, y: 330, t: "Ala Wai golf course", k: "small", r: -14 },
      { x: 806, y: 572, t: "Lēʻahi · Diamond Head", k: "feature" },
      { x: 150, y: 560, t: "Waikīkī Beach", k: "water", r: 12 },
      { x: 330, y: 660, t: "PACIFIC OCEAN", k: "water" },
      { x: 18, y: 300, t: "← Ala Moana", k: "small", a: "start" },
    ],
    anchors: { waikiki: [240, 488], kapahulu: [528, 410], kaimuki: [830, 282] },
    spots: {
      "kona-coffee-purveyors": [238, 486],
      "arden-waikiki": [620, 640],
      "cafe-kaila": [604, 252],
      "rainbow-drive-in": [508, 486],
      "ono-seafood": [522, 432],
      "leonards-bakery": [542, 372],
      "mud-hen-water": [790, 282],
      "the-pig-the-lady": [906, 292],
      "koko-head-cafe": [870, 252],
    },
  },

  // Town: Kalihi up by the freeway, Chinatown behind the harbor, Kakaʻako,
  // Ala Moana Center by the beach park, Mōʻiliʻili toward the university.
  town: {
    land: "M0 560 C40 556 80 550 110 552 L160 548 C182 548 196 556 204 570 L210 604 L252 604 L258 572 C264 556 282 548 302 548 C360 550 420 566 470 580 C520 594 560 606 600 612 C640 618 680 626 712 630 C736 634 750 652 772 654 C792 656 802 640 822 632 C862 618 920 610 1000 606 L1000 0 L0 0 Z",
    islets: "M50 640 C120 626 200 628 250 638 C240 662 160 670 70 664 Z",
    parks: "M600 612 C640 618 690 626 712 630 L708 608 C670 602 640 596 604 592 Z",
    highways: ["M0 250 C200 246 420 236 600 228 C760 222 900 222 1000 220"],
    streets: [
      "M0 528 C120 526 220 530 300 528 C400 532 480 548 560 566 C640 584 720 596 800 600 C880 604 940 600 1000 598",
      "M0 420 C200 424 400 430 600 430 C760 430 900 420 1000 410",
      "M380 520 C500 480 640 450 760 430 C860 414 940 400 1000 392",
      "M900 226 L918 420",
      "M130 250 L150 150",
    ],
    blocks: "M600 498 L722 498 L728 556 L604 556 Z M290 440 h18 v14 h-18 Z M314 440 h18 v14 h-18 Z M338 440 h18 v14 h-18 Z M290 460 h18 v14 h-18 Z M314 460 h18 v14 h-18 Z M338 460 h18 v14 h-18 Z M262 556 h10 v20 h-10 Z",
    labels: [
      { x: 120, y: 200, t: "KALIHI", k: "place" },
      { x: 296, y: 506, t: "CHINATOWN", k: "place" },
      { x: 506, y: 516, t: "Kakaʻako", k: "small", r: 8 },
      { x: 664, y: 486, t: "ALA MOANA", k: "place" },
      { x: 856, y: 300, t: "MŌʻILIʻILI", k: "place" },
      { x: 230, y: 628, t: "Honolulu Harbor", k: "water" },
      { x: 268, y: 548, t: "Aloha Tower", k: "small" },
      { x: 664, y: 578, t: "Ala Moana Center", k: "small" },
      { x: 660, y: 660, t: "Ala Moana Beach", k: "water", r: 6 },
      { x: 300, y: 236, t: "H-1", k: "feature" },
      { x: 520, y: 424, t: "King St", k: "street" },
      { x: 150, y: 690, t: "Sand Island", k: "small" },
      { x: 18, y: 512, t: "← Airport", k: "small", a: "start" },
      { x: 982, y: 580, t: "Waikīkī →", k: "small", a: "end" },
    ],
    anchors: { kalihi: [140, 232], chinatown: [330, 458], "ala-moana": [664, 520], moiliili: [910, 340] },
    spots: {
      "helenas-hawaiian-food": [142, 232],
      fete: [324, 452],
      "foodland-ala-moana": [664, 522],
      "waiola-shave-ice": [912, 340],
    },
  },

  // The southeast shore: Hawaiʻi Kai's marina, Koko Head and the bowl of
  // Hanauma Bay, Sandy Beach, and the point at Makapuʻu with its lighthouse.
  southeast: {
    land: "M0 420 C60 430 120 440 170 452 C210 462 240 480 262 500 C280 516 292 540 300 566 C320 616 360 640 404 636 C412 612 430 598 450 598 C472 598 488 614 494 636 C540 640 600 622 644 600 C700 572 758 522 800 470 C830 430 836 380 828 330 C820 280 830 200 850 120 C860 80 870 40 880 0 L0 0 Z",
    islets: "M926 250 C946 228 978 236 990 258 C970 282 938 278 926 250 Z",
    water: "M110 330 C150 316 200 326 222 350 C204 372 160 374 124 360 Z",
    craters: [
      { x: 352, y: 574, r: 40 },
      { x: 584, y: 420, r: 84 },
    ],
    highways: ["M0 300 C80 320 160 360 220 400 C260 430 300 470 336 516 C372 556 440 566 500 576 C560 586 620 572 662 548 C712 516 752 466 772 416 C792 366 802 300 810 240 C820 160 840 80 858 0"],
    trails: ["M772 430 C790 420 806 410 820 400"],
    labels: [
      { x: 200, y: 270, t: "HAWAIʻI KAI", k: "place" },
      { x: 352, y: 580, t: "Koko Head", k: "small" },
      { x: 448, y: 680, t: "Hanauma Bay", k: "water" },
      { x: 584, y: 426, t: "Koko Crater", k: "feature" },
      { x: 660, y: 640, t: "Sandy Beach", k: "water", r: -20 },
      { x: 860, y: 450, t: "Makapuʻu Point", k: "small", a: "start" },
      { x: 958, y: 306, t: "Mānana", k: "small" },
      { x: 110, y: 520, t: "Maunalua Bay", k: "water" },
      { x: 864, y: 30, t: "Waimānalo ↑", k: "small", a: "start" },
      { x: 520, y: 600, t: "Kalanianaʻole Hwy", k: "street", r: 2 },
    ],
    anchors: { hanauma: [450, 612], makapuu: [818, 400] },
    spots: { hanauma: [450, 612], makapuu: [820, 400] },
  },

  // Our side of the mountains: the Koʻolau along the left, Kāneʻohe Bay with
  // its reef, sandbar and Coconut Island, Mokapu, Kailua Bay and Lanikai.
  windward: {
    land: "M430 0 C436 50 446 100 462 150 C476 196 492 236 512 270 C532 306 552 336 580 356 C606 374 630 384 660 378 C700 370 740 352 790 340 C840 330 890 328 930 350 C940 372 920 404 890 414 C860 424 830 430 806 442 C780 456 762 480 760 510 C758 540 770 566 790 590 C812 616 834 640 850 670 C860 690 866 706 870 720 L0 720 L0 0 Z",
    islets: "M604 300 C616 288 636 290 644 302 C636 316 614 318 604 306 Z M904 664 C914 648 930 648 938 664 Z M946 682 C952 672 962 672 966 684 Z",
    ridges: [{ spine: [[140, 0], [170, 120], [210, 240], [260, 360], [310, 480], [360, 600], [400, 720]], west: 46, east: 22 }],
    highways: [
      "M404 0 C414 60 428 120 444 170 C460 220 476 262 498 296 C516 326 536 352 560 370",
      "M190 560 C300 520 420 470 520 430 C580 404 620 392 664 390",
      "M260 720 C350 662 460 604 560 566 C620 544 680 530 740 524",
    ],
    shoals: ["M612 170 C632 156 676 158 694 170 C676 184 632 184 612 170 Z", "M560 30 C620 110 700 196 770 300"],
    labels: [
      { x: 720, y: 120, t: "KĀNEʻOHE BAY", k: "water" },
      { x: 500, y: 392, t: "KĀNEʻOHE", k: "place" },
      { x: 660, y: 600, t: "KAILUA", k: "place" },
      { x: 780, y: 690, t: "LANIKAI", k: "place" },
      { x: 860, y: 316, t: "Mokapu", k: "small" },
      { x: 930, y: 710, t: "Mokulua", k: "small", a: "middle" },
      { x: 624, y: 336, t: "Coconut Island", k: "small" },
      { x: 654, y: 206, t: "Ahu o Laka sandbar", k: "small" },
      { x: 760, y: 250, t: "the reef", k: "water", r: 52 },
      { x: 250, y: 330, t: "Koʻolau Range", k: "feature", r: 66 },
      { x: 440, y: 30, t: "Waiāhole", k: "small", a: "start" },
      { x: 900, y: 500, t: "Kailua Bay", k: "water" },
      { x: 400, y: 640, t: "Pali Hwy", k: "street", r: -27 },
      { x: 330, y: 498, t: "H-3", k: "feature" },
    ],
    anchors: { waiahole: [424, 70], kaneohe: [420, 340], heeia: [520, 270], kailua: [740, 540], lanikai: [830, 640] },
    spots: {
      waiahole: [424, 72],
      "byodo-in": [410, 262],
      hoomaluhia: [388, 404],
      "coconut-island": [624, 302],
      sandbar: [652, 170],
      kailua: [790, 534],
      "over-easy": [700, 552],
    },
  },

  // Around the venue: the ranch and Mokoliʻi off Kualoa Point, Kaʻaʻawa,
  // Kahana Bay and its valley, and the road on up toward Lāʻie.
  kualoa: {
    land: "M720 0 C700 60 680 120 660 170 C650 196 640 216 620 230 C600 244 580 256 566 272 C556 290 566 310 590 322 C610 334 620 360 616 400 C612 440 620 480 650 520 C670 546 690 556 700 570 C690 590 660 600 640 620 C620 650 600 690 590 720 L0 720 L0 0 Z",
    islets: "M766 574 C776 550 784 524 792 514 C800 526 810 552 820 574 Z",
    canals: ["M560 290 C520 282 470 270 420 252 C380 238 340 232 300 224"],
    ridges: [
      { spine: [[200, 0], [250, 160], [300, 320], [360, 480], [420, 600], [460, 720]], west: 40, east: 24 },
      { spine: [[452, 420], [500, 440], [550, 470], [598, 500]], west: 18, east: 18 },
    ],
    highways: ["M700 0 C682 70 660 140 640 190 C622 226 594 248 578 274 C572 298 588 314 604 330 C602 380 598 430 610 480 C628 526 656 556 664 584 C640 614 612 654 592 720"],
    labels: [
      { x: 420, y: 604, t: "KUALOA", k: "place" },
      { x: 800, y: 500, t: "Mokoliʻi", k: "small" },
      { x: 690, y: 290, t: "Kahana Bay", k: "water" },
      { x: 410, y: 230, t: "Kahana Valley", k: "feature", r: -16 },
      { x: 560, y: 420, t: "Kaʻaʻawa", k: "small", a: "end" },
      { x: 706, y: 30, t: "Lāʻie ↑", k: "small", a: "start" },
      { x: 600, y: 706, t: "Kāneʻohe ↓", k: "small", a: "end" },
      { x: 250, y: 420, t: "Koʻolau Range", k: "feature", r: 70 },
      { x: 840, y: 380, t: "PACIFIC OCEAN", k: "water" },
    ],
    anchors: { kualoa: [628, 560], kahana: [470, 266], laie: [700, 40] },
    spots: { "aunty-pats-cafe": [630, 556], "kualoa-tours": [612, 590], kahana: [470, 266] },
    star: { x: 560, y: 600, t: "Palikū Gardens" },
  },

  // The North Shore along the top: Haleʻiwa and its harbor, Waimea Bay,
  // Pūpūkea, Sunset Beach, Turtle Bay and Kahuku; Wahiawā down the road.
  north: {
    land: "M0 300 C60 290 120 280 170 262 C190 254 200 236 214 230 C240 220 270 214 300 206 C340 196 380 186 404 176 C412 196 430 208 450 200 C462 186 470 170 490 160 C530 146 580 132 630 120 C680 108 730 96 770 80 C790 72 800 60 820 64 C840 70 860 80 890 84 C930 90 970 100 1000 110 L1000 720 L0 720 Z",
    water: "M146 604 C186 588 238 594 262 612 C232 636 180 634 148 620 Z",
    canals: ["M440 210 C470 258 500 298 540 330"],
    fields: [
      { x: 110, y: 380, w: 210, h: 130 },
      { x: 250, y: 520, w: 120, h: 60 },
    ],
    ridges: [
      { spine: [[900, 180], [840, 320], [780, 460], [720, 600], [680, 720]], west: 30, east: 20 },
      { spine: [[0, 440], [50, 540], [90, 640], [120, 720]], west: 20, east: 30 },
    ],
    highways: [
      "M0 322 C80 306 150 292 190 272 C230 252 280 238 330 228 C380 218 410 216 440 222 C470 220 500 186 540 174 C600 160 660 148 720 130 C780 112 830 106 880 110 C930 114 970 122 1000 130",
      "M192 272 C200 340 206 420 210 500 C212 540 214 580 220 640 C224 680 226 700 228 720",
    ],
    labels: [
      { x: 128, y: 356, t: "HALEʻIWA", k: "place" },
      { x: 420, y: 140, t: "Waimea Bay", k: "water" },
      { x: 548, y: 214, t: "Pūpūkea", k: "small" },
      { x: 640, y: 84, t: "Sunset Beach", k: "water", r: -12 },
      { x: 790, y: 44, t: "Turtle Bay", k: "water" },
      { x: 860, y: 196, t: "KAHUKU", k: "place" },
      { x: 340, y: 628, t: "WAHIAWĀ", k: "place" },
      { x: 204, y: 660, t: "Lake Wilson", k: "water" },
      { x: 214, y: 460, t: "pineapple fields", k: "small" },
      { x: 250, y: 706, t: "Town & H-2 ↓", k: "small", a: "start" },
      { x: 560, y: 40, t: "PACIFIC OCEAN", k: "water" },
      { x: 680, y: 170, t: "Kamehameha Hwy", k: "street", r: -14 },
    ],
    anchors: { haleiwa: [176, 288], pupukea: [500, 168], kahuku: [884, 108], wahiawa: [212, 540], "turtle-bay": [790, 92] },
    spots: {
      "matsumoto-shave-ice": [160, 286],
      "haleiwa-seafood": [200, 300],
      "giovannis-shrimp-truck": [884, 110],
      "green-world-coffee-farm": [212, 548],
      "north-shore": [498, 170],
    },
  },
};
