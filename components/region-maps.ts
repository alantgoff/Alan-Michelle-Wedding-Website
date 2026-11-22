/**
 * The close-up maps on The island's picks map: one simple drawing for each
 * part of the island (content/island.ts, `explorer.regions`), in a 1000 × 720
 * box with north up. Drawn by feel from the real shapes, not to scale and not
 * for finding your way: the coast, the main roads by name, the landmarks
 * people steer by, and where each pick is.
 *
 * Roads are drawn west to east (or south to north), so their names read the
 * right way up along them. `spots` puts a pick (by its id) on the drawing; a
 * pick without a spot sits at its neighborhood's `anchors` point, so a new
 * place still shows up.
 */
import type { PointKey } from "@/lib/island";
import type { IconId } from "./map-icons";

export type Road = {
  d: string;
  kind: "highway" | "major" | "street" | "trail";
  /** Written along the road. */
  name?: string;
  /** Where along the road the name sits, in percent (default 50). */
  at?: number;
};
export type Landmark = { x: number; y: number; icon: IconId; label?: string; side?: "left" | "right" | "above" | "below" };
export type Label = { x: number; y: number; t: string; k: "place" | "water" | "area"; r?: number; a?: "start" | "middle" | "end" };

export type RegionMap = {
  /** The land; the sea is everything else. */
  land: string;
  /** Small islands and rocks offshore. */
  islets?: string;
  /** Bays, ponds and lakes inside the land, filled as water. */
  water?: string;
  /** A canal or stream, drawn as a ribbon of water. */
  canals?: string[];
  parks?: string;
  /** Sand along the shore, drawn as a strip. */
  beaches?: string[];
  /** A light tint where the hotels stand. */
  hotels?: string;
  /** Fields, drawn as rows. */
  fields?: { x: number; y: number; w: number; h: number }[];
  /** Mountain crests, drawn as a soft band with light hachures. */
  ridges?: { spine: number[][]; west: number; east: number }[];
  craters?: { x: number; y: number; r: number }[];
  /** A reef or sandbar, dotted. */
  shoals?: string[];
  roads: Road[];
  landmarks?: Landmark[];
  /** Neighborhood, area and water names. */
  labels: Label[];
  anchors: Partial<Record<PointKey, [number, number]>>;
  spots: Record<string, [number, number]>;
  /** The venue, where it is on this map. */
  star?: { x: number; y: number; t: string };
};

export const REGION_MAPS: Record<string, RegionMap> = {
  // Waikīkī between the Ala Wai and the sea, Kapahulu Avenue from the zoo up
  // to the freeway, Kaimukī along Waiʻalae Avenue, and Lēʻahi to the east.
  waikiki: {
    land: "M0 548 C100 552 200 564 300 584 C380 600 440 620 490 640 C530 656 566 672 610 684 C660 698 720 706 790 708 C860 710 930 704 1000 698 L1000 0 L0 0 Z",
    canals: ["M0 452 C110 440 230 422 340 404 C400 394 450 382 490 362"],
    parks: "M500 600 C520 572 560 552 610 548 C650 546 690 556 712 580 C724 610 716 640 696 660 C660 668 620 662 590 652 C556 640 524 624 500 600 Z M380 372 C420 346 476 332 532 336 L540 300 C484 290 420 300 368 336 Z",
    beaches: ["M0 548 C100 552 200 564 300 584 C380 600 440 620 490 640"],
    hotels: "M50 470 C160 458 280 440 390 420 L486 392 L492 600 C446 584 400 570 340 558 C240 540 130 530 50 526 Z",
    craters: [{ x: 836, y: 592, r: 84 }],
    roads: [
      { d: "M0 206 C200 202 420 196 600 190 C760 186 880 184 1000 182", kind: "highway", name: "H-1", at: 22 },
      { d: "M598 236 C680 250 760 260 840 266 C900 270 950 272 1000 274", kind: "major", name: "Waiʻalae Ave", at: 16 },
      { d: "M40 532 C140 538 250 552 350 572 C410 586 456 604 496 624 C530 642 566 660 604 674 C640 686 680 694 730 698", kind: "major", name: "Kalākaua Ave", at: 12 },
      { d: "M70 500 C180 496 290 506 380 524 C420 532 456 544 486 558", kind: "street", name: "Kūhiō Ave", at: 74 },
      { d: "M60 468 C170 456 290 438 400 420 C440 414 466 404 488 392", kind: "street", name: "Ala Wai Blvd", at: 70 },
      { d: "M500 612 C516 560 534 496 550 440 C572 370 590 300 600 236", kind: "major", name: "Kapahulu Ave", at: 72 },
      { d: "M704 570 C730 548 754 528 780 512", kind: "street" },
      { d: "M780 512 C840 494 912 520 940 576 C958 622 940 672 906 700", kind: "street", name: "Diamond Head Rd", at: 22 },
      { d: "M712 216 L722 340 M776 222 L784 344 M940 228 L948 342", kind: "street" },
      { d: "M836 612 C836 594 830 580 836 560", kind: "trail" },
    ],
    landmarks: [
      { x: 568, y: 578, icon: "zoo", label: "Honolulu Zoo", side: "above" },
      { x: 642, y: 690, icon: "aquarium", label: "Aquarium", side: "left" },
      { x: 836, y: 560, icon: "trail" },
      { x: 884, y: 696, icon: "lighthouse" },
    ],
    labels: [
      { x: 260, y: 492, t: "WAIKĪKĪ", k: "place", r: 6 },
      { x: 740, y: 436, t: "KAPAHULU", k: "place" },
      { x: 846, y: 328, t: "KAIMUKĪ", k: "place" },
      { x: 300, y: 320, t: "MŌʻILIʻILI", k: "place" },
      { x: 450, y: 364, t: "Ala Wai golf course", k: "area", r: -14 },
      { x: 620, y: 616, t: "Kapiʻolani Park", k: "area" },
      { x: 836, y: 616, t: "Lēʻahi · Diamond Head", k: "area" },
      { x: 160, y: 426, t: "Ala Wai Canal", k: "water", r: -7 },
      { x: 220, y: 606, t: "Waikīkī Beach", k: "water", r: 9 },
      { x: 380, y: 690, t: "PACIFIC OCEAN", k: "water" },
    ],
    anchors: { waikiki: [250, 528], kapahulu: [540, 470], kaimuki: [830, 262] },
    spots: {
      "kona-coffee-purveyors": [250, 524],
      "arden-waikiki": [704, 676],
      "cafe-kaila": [598, 262],
      "rainbow-drive-in": [510, 576],
      "ono-seafood": [528, 508],
      "leonards-bakery": [552, 428],
      "mud-hen-water": [742, 260],
      "koko-head-cafe": [826, 230],
      "the-pig-the-lady": [920, 272],
    },
  },

  // Town: Kalihi up by the freeway, Chinatown and downtown behind the harbor,
  // Kakaʻako, Ala Moana by the beach park, and Mōʻiliʻili toward the university.
  town: {
    land: "M0 562 C50 558 90 554 120 554 L170 550 C190 550 200 560 204 574 L208 606 L252 606 L256 576 C262 560 280 552 300 552 C360 554 420 568 470 582 C520 596 560 608 600 614 C640 620 680 626 712 630 C736 634 752 650 774 652 C796 654 806 640 826 632 C866 618 920 610 1000 606 L1000 0 L0 0 Z",
    islets: "M40 650 C110 634 200 636 250 646 C240 670 160 678 60 672 Z",
    parks: "M600 614 C640 620 690 626 712 630 C736 634 752 650 774 652 C796 654 806 640 826 632 L822 616 C780 618 740 612 700 606 C660 600 630 596 604 594 Z",
    beaches: ["M600 614 C640 620 680 626 712 630"],
    roads: [
      { d: "M0 252 C200 248 420 238 600 230 C760 224 900 224 1000 222", kind: "highway", name: "H-1", at: 40 },
      { d: "M0 450 C200 454 400 456 600 450 C760 444 900 434 1000 424", kind: "major", name: "King St", at: 62 },
      { d: "M0 540 C80 536 160 534 230 532 C280 532 320 536 360 546", kind: "major", name: "Nimitz Hwy", at: 17 },
      { d: "M360 546 C440 562 520 580 600 594 C680 606 760 612 840 608 C900 606 950 602 1000 598", kind: "major", name: "Ala Moana Blvd", at: 86 },
      { d: "M380 524 C500 500 640 482 760 472 C860 466 940 466 1000 466", kind: "major", name: "Kapiʻolani Blvd", at: 26 },
      { d: "M150 252 L136 140", kind: "street" },
      { d: "M922 470 C918 390 910 300 900 140", kind: "street", name: "University Ave", at: 70 },
    ],
    landmarks: [
      { x: 268, y: 562, icon: "tower", label: "Aloha Tower", side: "right" },
      { x: 412, y: 420, icon: "palace", label: "ʻIolani Palace", side: "right" },
      { x: 516, y: 604, icon: "harbor", label: "Kewalo Basin", side: "below" },
      { x: 900, y: 120, icon: "school", label: "University of Hawaiʻi", side: "left" },
    ],
    labels: [
      { x: 150, y: 180, t: "KALIHI", k: "place" },
      { x: 240, y: 420, t: "CHINATOWN", k: "place" },
      { x: 520, y: 562, t: "Kakaʻako", k: "area", r: 8 },
      { x: 714, y: 552, t: "Ala Moana Center", k: "area", a: "start" },
      { x: 800, y: 514, t: "ALA MOANA", k: "place" },
      { x: 770, y: 330, t: "MŌʻILIʻILI", k: "place" },
      { x: 714, y: 642, t: "Ala Moana Beach Park", k: "area" },
      { x: 220, y: 632, t: "Honolulu Harbor", k: "water" },
      { x: 600, y: 690, t: "Māmala Bay", k: "water" },
      { x: 24, y: 494, t: "← Airport", k: "area", a: "start" },
      { x: 990, y: 544, t: "Waikīkī →", k: "area", a: "end" },
    ],
    anchors: { kalihi: [150, 300], chinatown: [318, 478], "ala-moana": [664, 540], moiliili: [880, 474] },
    spots: {
      "helenas-hawaiian-food": [148, 300],
      fete: [300, 478],
      "foodland-ala-moana": [690, 546],
      "waiola-shave-ice": [878, 432],
    },
  },

  // The southeast shore: Hawaiʻi Kai's marina, Koko Head and the bowl of
  // Hanauma Bay, the blowhole and Sandy Beach, and Makapuʻu with its lighthouse.
  southeast: {
    land: "M0 420 C60 430 120 440 170 452 C210 462 240 480 262 500 C280 516 292 540 300 566 C320 616 360 640 404 636 C412 612 430 598 450 598 C472 598 488 614 494 636 C540 640 600 622 644 600 C700 572 758 522 800 470 C830 430 836 380 828 330 C820 280 830 200 850 120 C860 80 870 40 880 0 L0 0 Z",
    islets: "M926 250 C946 228 978 236 990 258 C970 282 938 278 926 250 Z",
    water: "M100 330 C150 312 210 322 236 348 C214 374 160 376 116 360 Z",
    canals: ["M150 364 C170 392 190 420 212 448"],
    beaches: ["M600 622 C640 604 680 584 716 556", "M829 300 C826 250 832 190 846 130"],
    craters: [
      { x: 352, y: 574, r: 40 },
      { x: 584, y: 420, r: 84 },
    ],
    shoals: ["M420 626 C436 616 466 616 480 626 C466 636 436 636 420 626 Z"],
    roads: [
      { d: "M0 300 C80 320 160 360 220 400 C260 430 300 470 336 516 C372 556 440 566 500 576 C560 586 620 572 662 548 C712 516 752 466 772 416 C792 366 802 300 810 240 C820 160 840 80 858 0", kind: "highway", name: "Kalanianaʻole Hwy", at: 30 },
      { d: "M440 572 L450 600", kind: "street" },
      { d: "M776 448 C792 436 806 420 822 404", kind: "trail" },
    ],
    landmarks: [
      { x: 560, y: 612, icon: "blowhole", label: "Hālona Blowhole", side: "below" },
      { x: 676, y: 568, icon: "beach", label: "Sandy Beach", side: "below" },
      { x: 832, y: 404, icon: "lighthouse", label: "Makapuʻu Lighthouse", side: "above" },
      { x: 842, y: 210, icon: "beach", label: "Makapuʻu Beach", side: "left" },
      { x: 958, y: 286, icon: "park", label: "Mānana", side: "below" },
    ],
    labels: [
      { x: 210, y: 270, t: "HAWAIʻI KAI", k: "place" },
      { x: 170, y: 316, t: "marina", k: "area" },
      { x: 352, y: 640, t: "Koko Head", k: "area" },
      { x: 584, y: 426, t: "Koko Crater", k: "area" },
      { x: 120, y: 540, t: "Maunalua Bay", k: "water" },
      { x: 450, y: 686, t: "Hanauma Bay", k: "water" },
      { x: 860, y: 610, t: "PACIFIC OCEAN", k: "water" },
      { x: 864, y: 30, t: "Waimānalo ↑", k: "area", a: "start" },
    ],
    anchors: { hanauma: [450, 612], makapuu: [790, 444] },
    spots: { hanauma: [450, 614], makapuu: [780, 452] },
  },

  // Our side of the mountains: the Koʻolau along the left, Kāneʻohe Bay with
  // its reef, sandbar, fishpond and Coconut Island, Mokapu, Kailua and Lanikai.
  windward: {
    land: "M430 0 C436 50 446 100 462 150 C476 196 492 236 512 270 C532 306 552 336 580 356 C606 374 630 384 660 378 C700 370 740 352 790 340 C840 330 890 328 930 350 C940 372 920 404 890 414 C860 424 830 430 806 442 C780 456 762 480 760 510 C758 540 770 566 790 590 C812 616 834 640 850 670 C860 690 866 706 870 720 L0 720 L0 0 Z",
    islets: "M604 300 C616 288 636 290 644 302 C636 316 614 318 604 306 Z M904 664 C914 648 930 648 938 664 Z M946 682 C952 672 962 672 966 684 Z",
    water: "M300 446 C314 430 346 430 356 446 C346 462 312 462 300 446 Z",
    parks: "M560 470 C590 450 640 452 660 476 C664 510 640 530 604 530 C576 528 556 504 560 470 Z",
    beaches: ["M806 442 C780 456 762 480 760 510 C758 540 770 566 790 590", "M812 616 C834 640 850 670 860 696"],
    ridges: [{ spine: [[140, 0], [170, 120], [210, 240], [260, 360], [310, 480], [360, 600], [400, 720]], west: 46, east: 22 }],
    shoals: ["M612 170 C632 156 676 158 694 170 C676 184 632 184 612 170 Z", "M560 30 C620 110 700 196 770 300"],
    roads: [
      { d: "M404 0 C414 60 428 120 444 170 C460 220 476 262 498 296 C516 326 536 352 560 370", kind: "highway", name: "Kamehameha Hwy", at: 54 },
      { d: "M150 470 C240 448 330 420 420 392", kind: "highway", name: "Likelike Hwy", at: 32 },
      { d: "M190 560 C300 520 420 470 520 430 C580 404 620 392 664 390", kind: "highway", name: "H-3", at: 30 },
      { d: "M260 720 C350 662 460 604 560 566 C620 544 680 530 740 524", kind: "highway", name: "Pali Hwy", at: 30 },
      { d: "M660 560 C700 550 740 544 790 538", kind: "street" },
      { d: "M846 636 C860 620 872 604 880 590", kind: "trail" },
    ],
    landmarks: [
      { x: 540, y: 248, icon: "fishpond", label: "Heʻeia Fishpond", side: "right" },
      { x: 610, y: 494, icon: "marsh", label: "Kawainui Marsh", side: "above" },
      { x: 884, y: 588, icon: "trail", label: "Pillbox trail", side: "left" },
    ],
    labels: [
      { x: 740, y: 110, t: "KĀNEʻOHE BAY", k: "water" },
      { x: 400, y: 366, t: "KĀNEʻOHE", k: "place" },
      { x: 676, y: 632, t: "KAILUA", k: "place" },
      { x: 730, y: 700, t: "LANIKAI", k: "place" },
      { x: 860, y: 312, t: "Mokapu", k: "area" },
      { x: 930, y: 710, t: "Mokulua", k: "area" },
      { x: 680, y: 210, t: "Ahu o Laka sandbar", k: "area" },
      { x: 770, y: 250, t: "the reef", k: "water", r: 52 },
      { x: 250, y: 330, t: "Koʻolau Range", k: "area", r: 66 },
      { x: 444, y: 30, t: "Waiāhole", k: "area", a: "start" },
      { x: 910, y: 470, t: "Kailua Bay", k: "water" },
    ],
    anchors: { waiahole: [424, 70], kaneohe: [420, 340], heeia: [520, 270], kailua: [740, 540], lanikai: [830, 640] },
    spots: {
      waiahole: [426, 72],
      "byodo-in": [400, 262],
      hoomaluhia: [328, 446],
      "coconut-island": [624, 302],
      sandbar: [652, 170],
      kailua: [788, 520],
      "over-easy": [708, 548],
    },
  },

  // Around the venue: the ranch and Mokoliʻi off Kualoa Point, the old
  // fishpond, Kaʻaʻawa and the Crouching Lion, and Kahana Bay and valley.
  kualoa: {
    land: "M720 0 C700 60 680 120 660 170 C650 196 640 216 620 230 C600 244 580 256 566 272 C556 290 566 310 590 322 C610 334 620 360 616 400 C612 440 620 480 650 520 C670 546 690 556 700 570 C690 590 660 600 640 620 C620 650 600 690 590 720 L0 720 L0 0 Z",
    islets: "M766 574 C776 550 784 524 792 514 C800 526 810 552 820 574 Z",
    water: "M606 640 C630 624 664 626 672 650 C664 676 624 684 600 670 Z",
    canals: ["M300 224 C340 232 380 238 420 252 C470 270 520 282 560 290"],
    beaches: ["M616 400 C612 440 620 480 650 520 C670 546 690 556 700 570"],
    ridges: [
      { spine: [[200, 0], [250, 160], [300, 320], [360, 480], [420, 600], [460, 720]], west: 40, east: 24 },
    ],
    roads: [
      { d: "M592 720 C612 654 640 614 664 584 C656 556 628 526 610 480 C598 430 602 380 604 330 C588 314 572 298 578 274 C594 248 622 226 640 190 C660 140 682 70 700 0", kind: "highway", name: "Kamehameha Hwy", at: 84 },
    ],
    landmarks: [
      { x: 604, y: 372, icon: "lookout", label: "Crouching Lion", side: "left" },
      { x: 636, y: 652, icon: "fishpond", label: "Molii Fishpond", side: "below" },
      { x: 440, y: 470, icon: "ranch", label: "Kaʻaʻawa Valley", side: "below" },
    ],
    labels: [
      { x: 380, y: 552, t: "KUALOA RANCH", k: "place" },
      { x: 560, y: 420, t: "KAʻAʻAWA", k: "place", a: "end" },
      { x: 800, y: 500, t: "Mokoliʻi", k: "area" },
      { x: 700, y: 290, t: "Kahana Bay", k: "water" },
      { x: 400, y: 220, t: "Kahana Valley", k: "area", r: -16 },
      { x: 860, y: 380, t: "PACIFIC OCEAN", k: "water" },
      { x: 250, y: 420, t: "Koʻolau Range", k: "area", r: 70 },
      { x: 712, y: 30, t: "Lāʻie ↑", k: "area", a: "start" },
      { x: 556, y: 706, t: "Kāneʻohe ↓", k: "area", a: "end" },
    ],
    anchors: { kualoa: [628, 560], kahana: [470, 266], laie: [700, 40] },
    spots: { "aunty-pats-cafe": [632, 552], "kualoa-tours": [612, 590], kahana: [470, 266] },
    star: { x: 548, y: 590, t: "Palikū Gardens" },
  },

  // The North Shore along the top: Haleʻiwa and its harbor, Waimea Bay and
  // valley, Pūpūkea, Pipeline and Sunset, Turtle Bay and Kahuku; inland,
  // past the pineapple fields, Wahiawā.
  north: {
    land: "M0 300 C60 290 120 280 170 262 C190 254 200 236 214 230 C240 220 270 214 300 206 C340 196 380 186 404 176 C412 196 430 208 450 200 C462 186 470 170 490 160 C530 146 580 132 630 120 C680 108 730 96 770 80 C790 72 800 60 820 64 C840 70 860 80 890 84 C930 90 970 100 1000 110 L1000 720 L0 720 Z",
    water: "M146 604 C186 588 238 594 262 612 C232 636 180 634 148 620 Z",
    canals: ["M436 212 C462 252 492 290 530 322", "M204 244 C214 264 220 284 222 306"],
    beaches: ["M300 206 C340 196 380 186 404 176", "M490 160 C530 146 580 132 630 120 C680 108 730 96 770 80"],
    fields: [
      { x: 110, y: 380, w: 210, h: 130 },
      { x: 250, y: 520, w: 120, h: 50 },
    ],
    ridges: [
      { spine: [[900, 180], [840, 320], [780, 460], [720, 600], [680, 720]], west: 30, east: 20 },
      { spine: [[0, 440], [50, 540], [90, 640], [120, 720]], west: 20, east: 30 },
    ],
    roads: [
      { d: "M0 322 C80 306 150 292 190 272 C230 252 280 238 330 228 C380 218 410 216 440 222 C470 220 500 186 540 174 C600 160 660 148 720 130 C780 112 830 106 880 110 C930 114 970 122 1000 130", kind: "highway", name: "Kamehameha Hwy", at: 30 },
      { d: "M228 720 C224 680 220 620 214 560 C210 500 206 420 200 340 C198 310 196 290 192 272", kind: "major", name: "Hwy 99", at: 66 },
    ],
    landmarks: [
      { x: 108, y: 266, icon: "harbor", label: "Haleʻiwa Harbor", side: "above" },
      { x: 474, y: 262, icon: "park", label: "Waimea Valley", side: "right" },
      { x: 548, y: 150, icon: "snorkel", label: "Shark's Cove", side: "above" },
      { x: 700, y: 106, icon: "surf", label: "Sunset Beach", side: "above" },
      { x: 806, y: 72, icon: "beach", label: "Turtle Bay", side: "above" },
      { x: 930, y: 210, icon: "farm", label: "Kahuku farms", side: "below" },
      { x: 254, y: 446, icon: "pineapple", label: "Dole Plantation", side: "right" },
    ],
    labels: [
      { x: 224, y: 372, t: "HALEʻIWA", k: "place", a: "start" },
      { x: 860, y: 168, t: "KAHUKU", k: "place" },
      { x: 340, y: 640, t: "WAHIAWĀ", k: "place" },
      { x: 396, y: 140, t: "Waimea Bay", k: "water" },
      { x: 560, y: 40, t: "PACIFIC OCEAN", k: "water" },
      { x: 198, y: 690, t: "Lake Wilson", k: "water", a: "end" },
      { x: 340, y: 548, t: "pineapple fields", k: "area", a: "start" },
      { x: 250, y: 706, t: "H-2 to town ↓", k: "area", a: "start" },
    ],
    anchors: { haleiwa: [176, 288], pupukea: [500, 168], kahuku: [884, 108], wahiawa: [212, 560], "turtle-bay": [790, 92] },
    spots: {
      "matsumoto-shave-ice": [168, 292],
      "haleiwa-seafood": [204, 306],
      "giovannis-shrimp-truck": [886, 112],
      "green-world-coffee-farm": [214, 560],
      "north-shore": [488, 192],
    },
  },
};
