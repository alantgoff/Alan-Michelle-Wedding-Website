/**
 * The drawn coast that closes every page banner.
 *
 * The photograph of the sea dissolves into the paper, and across that seam
 * runs one navy line: the horizon at Kualoa, with whatever stands on it for
 * that page. Each page shows its own stretch, so moving through the site is
 * a little like turning your head along one shore.
 *
 * It is an illustration drawn by feel, like the coast chart: decorative,
 * hidden from screen readers, and never a guide to what you can see from
 * where. Motifs come from InkDefs; a scene only says what goes where.
 */

type MotifId =
  | "ridge" | "mokolii" | "waa" | "outrigger" | "iwa" | "swell" | "swell-s" | "cloud" | "kolea" | "boards"
  | "honu" | "catamaran" | "snorkeler" | "umbrella" | "plane" | "diamondhead" | "towers" | "shuttle" | "palms" | "mokulua" | "falls" | "kayak" | "chairlift" | "halfdome" | "gate" | "icefalls" | "torii" | "volcano" | "kauai" | "clothesline" | "tower" | "signpost" | "mailbox" | "bottle" | "breakers" | "kit";

/** Each motif's own drawing box: [min-x, min-y, width, height], waterline at y = 0. */
const BOX: Record<MotifId, [number, number, number, number]> = {
  ridge: [0, -150, 520, 190],
  mokolii: [-70, -84, 140, 100],
  waa: [-70, -78, 140, 100],
  outrigger: [-60, -30, 120, 50],
  iwa: [-50, -20, 100, 40],
  swell: [0, -8, 80, 16],
  "swell-s": [0, -8, 40, 16],
  cloud: [0, -26, 76, 30],
  kolea: [-50, -70, 100, 76],
  boards: [-50, -120, 100, 130],
  honu: [-40, -36, 80, 72],
  catamaran: [-82, -70, 170, 86],
  snorkeler: [-24, -16, 48, 24],
  umbrella: [-64, -82, 128, 88],
  plane: [-160, -40, 230, 64],
  diamondhead: [-6, -80, 292, 86],
  towers: [-6, -72, 170, 76],
  shuttle: [-40, -26, 80, 30],
  palms: [-52, -124, 134, 128],
  mokulua: [-100, -46, 202, 56],
  falls: [-6, -124, 226, 132],
  kayak: [-44, -30, 88, 38],
  chairlift: [-52, -86, 104, 90],
  halfdome: [-70, -88, 136, 92],
  gate: [-48, -90, 96, 94],
  icefalls: [-62, -72, 124, 76],
  torii: [-48, -80, 112, 84],
  volcano: [-80, -92, 160, 96],
  kauai: [-52, -98, 104, 102],
  clothesline: [-112, -100, 224, 104],
  tower: [-62, -108, 124, 112],
  signpost: [-44, -92, 88, 96],
  mailbox: [-36, -78, 92, 82],
  bottle: [-34, -22, 68, 32],
  breakers: [-84, -18, 168, 24],
  kit: [-92, -50, 184, 54],
};

/** [motif, x of its origin, y of its waterline, scale, mirrored?] */
type Item = [MotifId, number, number, number?, boolean?];

type Composition = {
  /** Canvas width; the height is fixed, so a wider canvas draws everything smaller. */
  width: number;
  height: number;
  /** y of the waterline. */
  sea: number;
  /** The horizon itself, as one or more strokes with the brush lifted between. */
  line: string;
  /** Optional: a dotted route drawn across the sky (Our story's road here). */
  route?: string;
  items: Item[];
};

export type Scene = "home" | "travel" | "week" | "island" | "story" | "dress" | "faq" | "registry" | "reef" | "utility";

// Wide scenes are drawn on a 210-high canvas with the sea at 160; phones get
// their own tighter composition on a 110-high canvas with the sea at 86.
const SCENES: Record<Scene, { wide: Composition; narrow: Composition }> = {
  // The whole view: the ridge, a voyaging canoe, the islet, a bird overhead.
  home: {
    wide: {
      width: 1440, height: 210, sea: 160,
      line: "M500 160 C640 158 720 161 838 159 M858 159 C900 158 930 160 962 159 M1090 159 C1180 158 1300 161 1446 159",
      items: [["ridge", 0, 160], ["cloud", 330, 44], ["waa", 760, 152], ["mokolii", 1028, 160], ["iwa", 1240, 54], ["swell", 560, 186], ["swell-s", 880, 194], ["swell", 1130, 186], ["swell-s", 1330, 198]],
    },
    narrow: {
      width: 390, height: 110, sea: 86,
      line: "M168 86 C196 85 214 87 232 86 M252 86 C262 85 268 87 278 86 M352 86 C366 85 380 87 394 86",
      items: [["ridge", -44, 86, 0.42], ["waa", 226, 82, 0.43], ["mokolii", 315, 86, 0.61], ["iwa", 326, 16, 0.5], ["swell-s", 196, 101, 0.8], ["swell-s", 322, 104, 0.8]],
    },
  },
  // Arriving: a flight coming in over Waikīkī, the hotels along the sand,
  // Diamond Head beyond, and the wedding-day shuttle at the kerb.
  travel: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C400 158 900 161 1300 159 C1500 158 1700 161 1926 159",
      items: [["plane", 640, 66, 1.1], ["cloud", 260, 52], ["cloud", 1060, 40, 0.8], ["towers", 1376, 160], ["shuttle", 1300, 160], ["diamondhead", 1566, 160], ["swell", 220, 186], ["swell-s", 640, 194], ["swell", 1000, 186], ["swell-s", 1700, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C120 85 260 87 524 86",
      items: [["plane", 170, 28, 0.55], ["towers", 262, 86, 0.46], ["diamondhead", 362, 86, 0.54], ["swell-s", 60, 102, 0.8], ["swell-s", 200, 104, 0.8]],
    },
  },
  // The week: a beach umbrella on the sand, the snorkel charter with its
  // flag up, a honu under the water and swimmers beside it.
  week: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C120 158 200 161 224 160 M416 160 C560 158 700 161 780 159 M1004 159 C1200 158 1460 161 1580 160 M1700 160 C1800 158 1880 161 1926 159",
      items: [["umbrella", 320, 160, 1.45], ["cloud", 600, 46], ["catamaran", 890, 157, 1.45], ["honu", 1110, 188, 0.8], ["snorkeler", 1230, 166, 1.4], ["snorkeler", 1320, 170, 1.2, true], ["iwa", 1480, 58], ["mokolii", 1640, 160, 0.85], ["swell", 500, 188], ["swell-s", 1420, 196], ["swell", 1780, 192]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C10 85 30 87 38 86 M102 86 C160 85 220 87 244 86 M340 86 C380 85 420 87 442 86 M498 86 C510 85 520 87 524 86",
      items: [["umbrella", 70, 86, 0.5], ["catamaran", 290, 84, 0.56], ["honu", 372, 100, 0.34], ["iwa", 190, 22, 0.45], ["mokolii", 470, 86, 0.4]],
    },
  },
  // Out exploring: a waterfall in the Koʻolau, palms on the sand, a kayak
  // heading out, and the twin Mokulua off Lanikai.
  island: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M224 160 C400 158 700 161 1290 160 M1512 160 C1700 158 1850 161 1926 159",
      items: [["falls", 10, 160], ["palms", 540, 160], ["kayak", 930, 162, 1.35], ["iwa", 1140, 50], ["mokulua", 1400, 160, 1.1], ["cloud", 1680, 50], ["swell", 700, 186], ["swell-s", 1110, 194], ["swell", 1640, 190]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M100 86 C200 85 300 87 345 86 M456 86 C490 85 510 87 524 86",
      items: [["falls", 0, 86, 0.45], ["palms", 166, 86, 0.5], ["kayak", 282, 88, 0.5], ["mokulua", 400, 86, 0.55]],
    },
  },
  // The road here, left to right: Vermont, Yosemite, Bali, Iceland, Japan,
  // Guatemala, Kauaʻi, and the logo's two boards where it arrives, on Oʻahu.
  story: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C400 158 900 161 1300 159 C1500 158 1700 161 1926 159",
      route: "M60 72 C160 14 260 22 330 44 C420 66 480 14 560 34 C640 56 700 24 780 48 C860 68 920 18 1000 40 C1080 62 1160 12 1240 36 C1320 58 1400 10 1470 32 C1560 56 1640 6 1700 30",
      items: [["chairlift", 110, 160], ["halfdome", 330, 160], ["gate", 560, 160], ["icefalls", 780, 160], ["torii", 990, 160], ["volcano", 1240, 160], ["kauai", 1470, 160], ["boards", 1700, 166, 1.1], ["swell", 1810, 186], ["swell-s", 440, 194], ["swell-s", 1100, 194]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      route: "M40 40 C80 8 120 12 160 26 C200 40 230 6 280 20 C320 34 350 4 390 14 C420 22 440 8 460 18",
      line: "M-4 86 C120 85 260 87 524 86",
      items: [["torii", 64, 86, 0.5], ["volcano", 180, 86, 0.5], ["kauai", 300, 86, 0.5], ["boards", 440, 90, 0.6]],
    },
  },
  // What to wear, on the line in the garden: an aloha shirt, a sundress, a
  // hat, sandals below, and the ridge we will be under.
  dress: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 700 161 1000 159 C1200 158 1320 161 1420 160",
      items: [["ridge", 1920, 160, 1, true], ["clothesline", 760, 160, 1.4], ["iwa", 300, 52], ["cloud", 1110, 56], ["swell", 240, 186], ["swell-s", 1080, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C100 85 200 87 300 86 M316 86 C330 85 344 87 352 86",
      items: [["ridge", 520, 86, 0.4, true], ["clothesline", 160, 86, 0.62], ["iwa", 46, 22, 0.42]],
    },
  },
  // Answers: a lifeguard tower (ask them about the water), a signpost, and
  // a kōlea on the sand.
  faq: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C400 158 900 161 1444 160 M1556 160 C1700 158 1850 161 1926 159",
      items: [["tower", 620, 160, 1.25], ["signpost", 850, 160, 1.15], ["kolea", 1010, 163, 1], ["cloud", 1160, 54], ["mokolii", 1500, 160, 0.8], ["swell", 300, 186], ["swell-s", 1260, 196], ["swell", 1660, 188]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C120 85 300 87 418 86 M482 86 C500 85 512 87 524 86",
      items: [["tower", 120, 86, 0.55], ["signpost", 236, 86, 0.5], ["kolea", 320, 88, 0.5], ["mokolii", 450, 86, 0.45]],
    },
  },
  // Gifts: a mailbox with its flag up and a parcel beside it, and the canoe
  // sailing off with the post.
  registry: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 700 161 1180 159 M1320 159 C1500 158 1700 161 1926 159",
      items: [["mailbox", 720, 160, 1.4], ["palms", 470, 160, 0.9], ["waa", 1250, 152, 0.9], ["iwa", 1460, 60], ["cloud", 960, 50], ["swell", 900, 186], ["swell-s", 1600, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C120 85 260 87 352 86 M412 86 C460 85 500 87 524 86",
      items: [["mailbox", 150, 86, 0.6], ["waa", 382, 82, 0.42], ["iwa", 290, 24, 0.45]],
    },
  },
  // Utility: the kit for a day out, laid on the sand under the palms.
  utility: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C400 158 900 161 1444 160 M1556 160 C1700 158 1850 161 1926 159",
      items: [["palms", 560, 160, 0.95], ["kit", 860, 160, 1.6], ["cloud", 1160, 50], ["iwa", 340, 56], ["mokolii", 1500, 160, 0.8], ["swell", 240, 188], ["swell-s", 1260, 196], ["swell", 1660, 188]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C120 85 300 87 418 86 M482 86 C500 85 512 87 524 86",
      items: [["palms", 90, 86, 0.5], ["kit", 260, 86, 0.9], ["mokolii", 450, 86, 0.45]],
    },
  },
  // Past the reef: the break behind you, a message in a bottle, open water.
  reef: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C400 158 900 161 1300 159 C1500 158 1700 161 1926 159",
      items: [["breakers", 620, 178, 2], ["bottle", 1180, 182, 1.9], ["iwa", 1420, 64], ["waa", 1720, 154, 0.4], ["swell", 300, 190], ["swell-s", 980, 196], ["swell", 1500, 188]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C100 85 200 87 300 86 M318 86 C400 85 470 87 524 86",
      items: [["breakers", 150, 96, 0.6], ["bottle", 380, 100, 0.75], ["iwa", 300, 26, 0.45]],
    },
  },
};

/**
 * Light on the water: rows of short dashes under the horizon, thinning out
 * toward the viewer. Laid out by a small fixed sequence, so every visit (and
 * the server and the browser) draws the same sea.
 */
function seaTexture(width: number, sea: number, rowGap: number): string {
  let seed = width * 7 + sea;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const parts: string[] = [];
  for (let row = 0; row < 3; row += 1) {
    const y = sea + rowGap * (row + 1) - 2;
    let x = -10 + next() * 40;
    while (x < width) {
      const len = 8 + next() * (row === 0 ? 34 : 20);
      parts.push(`M${Math.round(x)} ${Math.round(y + next() * 3)} h${Math.round(len)}`);
      x += len + 30 + next() * (row + 1) * 70;
    }
  }
  return parts.join(" ");
}

function Drawing({ composition, className }: { composition: Composition; className: string }) {
  const { width, height, line, items, sea } = composition;
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax slice" focusable="false">
      <g filter="url(#ink)">
        <path className="ink hair sea-texture" d={seaTexture(width, sea, height > 150 ? 11 : 6)} />
        <path className="ink" d={line} />
        {composition.route ? <path className="ink hair horizon-route" d={composition.route} /> : null}
        {items.map(([id, x, y, scale = 1, mirrored], i) => {
          const [bx, by, bw, bh] = BOX[id];
          return (
            <use
              key={i}
              href={`#m-${id}`}
              x={bx}
              y={by}
              width={bw}
              height={bh}
              transform={`translate(${x} ${y}) scale(${mirrored ? -scale : scale} ${scale})`}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Horizon({ scene, draw = false }: { scene: Scene; draw?: boolean }) {
  const { wide, narrow } = SCENES[scene];
  return (
    <div className={`horizon${draw ? " horizon-draw" : ""}`} aria-hidden="true">
      <Drawing composition={wide} className="horizon-wide" />
      <Drawing composition={narrow} className="horizon-narrow" />
    </div>
  );
}
