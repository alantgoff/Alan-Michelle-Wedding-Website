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

type MotifId = "ridge" | "mokolii" | "waa" | "outrigger" | "iwa" | "swell" | "swell-s" | "cloud" | "kolea" | "boards";

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
  items: Item[];
};

export type Scene = "home" | "travel" | "activities" | "island" | "story" | "dress" | "faq" | "registry" | "reef";

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
  // Arriving: the canoe making for land, the ridge coming up ahead.
  travel: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C200 158 420 161 640 159 M664 159 C900 158 1200 161 1420 160",
      items: [["ridge", 1920, 160, 1, true], ["waa", 760, 152], ["iwa", 560, 60], ["cloud", 1180, 50], ["swell", 240, 186], ["swell-s", 620, 194], ["swell", 980, 186], ["swell-s", 1240, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C80 85 180 87 262 86 M280 86 C310 85 330 87 352 86",
      items: [["ridge", 520, 86, 0.4, true], ["waa", 176, 82, 0.43], ["iwa", 90, 24, 0.5], ["swell-s", 60, 102, 0.8], ["swell-s", 246, 104, 0.8]],
    },
  },
  // The bay: paddlers out past the islet.
  activities: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 620 161 900 159 M924 159 C1010 158 1080 160 1150 159 M1292 159 C1500 158 1720 161 1926 159",
      items: [["mokolii", 1222, 160], ["outrigger", 720, 156], ["iwa", 1500, 56], ["cloud", 330, 54], ["swell", 420, 186], ["swell-s", 900, 196], ["swell", 1360, 186], ["swell-s", 1700, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C100 85 200 87 300 86 M318 86 C340 85 360 87 376 86 M468 86 C490 85 510 87 524 86",
      items: [["mokolii", 422, 86, 0.66], ["outrigger", 190, 84, 0.55], ["iwa", 300, 22, 0.5], ["swell-s", 70, 102, 0.8], ["swell-s", 290, 104, 0.8]],
    },
  },
  // The place itself: the ridge and its islet, close together.
  island: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M500 160 C600 158 660 161 730 159 M872 159 C1100 158 1500 161 1926 159",
      items: [["ridge", 0, 160], ["mokolii", 800, 160], ["waa", 1260, 152], ["iwa", 1010, 46], ["cloud", 1560, 56], ["swell", 600, 186], ["swell-s", 1000, 196], ["swell", 1460, 186], ["swell-s", 1760, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M214 86 C240 85 260 87 276 86 M366 86 C420 85 480 87 524 86",
      items: [["ridge", -20, 86, 0.44], ["mokolii", 320, 86, 0.64], ["waa", 450, 82, 0.4], ["iwa", 396, 22, 0.5], ["swell-s", 236, 102, 0.8], ["swell-s", 420, 104, 0.8]],
    },
  },
  // The logo's two boards, stood in the sand where the story has arrived.
  story: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 161 C200 159 380 162 508 160 M700 160 C900 158 1300 161 1926 159",
      items: [["boards", 600, 166, 1.3], ["mokolii", 1380, 160, 0.8], ["iwa", 1120, 58], ["swell", 820, 186], ["swell-s", 1160, 196], ["swell", 1560, 186]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 87 C40 86 80 88 108 87 M196 87 C300 85 420 88 524 86",
      items: [["boards", 150, 90, 0.66], ["mokolii", 420, 86, 0.5], ["iwa", 300, 24, 0.5], ["swell-s", 250, 102, 0.8], ["swell-s", 380, 104, 0.8]],
    },
  },
  // Two ʻiwa over the lawn: the birds an old saying compares the well dressed to.
  dress: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 700 161 1000 159 M1020 159 C1200 158 1320 161 1420 160",
      items: [["ridge", 1920, 160, 1, true], ["iwa", 700, 52, 1.1], ["iwa", 860, 84, 0.8], ["cloud", 300, 56], ["swell", 240, 186], ["swell-s", 700, 196], ["swell", 1080, 186]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C100 85 200 87 300 86 M316 86 C330 85 344 87 352 86",
      items: [["ridge", 520, 86, 0.4, true], ["iwa", 150, 26, 0.6], ["iwa", 236, 46, 0.44], ["swell-s", 80, 102, 0.8], ["swell-s", 250, 104, 0.8]],
    },
  },
  // A kōlea on the lawn, which is where you find them.
  faq: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 161 C200 159 420 162 640 160 M800 160 C1100 158 1500 161 1926 159",
      items: [["kolea", 716, 163, 1.1], ["mokolii", 1420, 160, 0.86], ["cloud", 1100, 54], ["swell", 960, 186], ["swell-s", 1260, 196], ["swell", 1620, 186]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 87 C40 86 90 88 120 87 M214 87 C300 85 420 88 524 86",
      items: [["kolea", 166, 89, 0.68], ["mokolii", 420, 86, 0.52], ["swell-s", 270, 102, 0.8], ["swell-s", 400, 104, 0.8]],
    },
  },
  // Setting out: the canoe sailing for the horizon.
  registry: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 700 161 1040 159 M1064 159 C1300 158 1600 161 1926 159",
      items: [["waa", 1180, 152, 0.9], ["iwa", 1420, 60], ["cloud", 520, 54], ["mokolii", 300, 160, 0.8], ["swell", 660, 186], ["swell-s", 980, 196], ["swell", 1400, 186], ["swell-s", 1700, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C40 85 60 87 76 86 M150 86 C240 85 300 87 340 86 M358 86 C420 85 480 87 524 86",
      items: [["waa", 396, 82, 0.42], ["iwa", 300, 24, 0.5], ["mokolii", 112, 86, 0.5], ["swell-s", 220, 102, 0.8], ["swell-s", 440, 104, 0.8]],
    },
  },
  // Past the reef: nothing but open water.
  reef: {
    wide: {
      width: 1920, height: 210, sea: 160,
      line: "M-6 160 C300 158 700 161 1040 159 M1064 159 C1300 158 1600 161 1926 159",
      items: [["iwa", 1300, 70], ["swell", 300, 186], ["swell-s", 620, 196], ["swell", 900, 184], ["swell-s", 1220, 198], ["swell", 1500, 186], ["swell-s", 1760, 196]],
    },
    narrow: {
      width: 520, height: 110, sea: 86,
      line: "M-4 86 C100 85 200 87 300 86 M318 86 C400 85 470 87 524 86",
      items: [["iwa", 380, 30, 0.5], ["swell-s", 60, 102, 0.8], ["swell-s", 200, 100, 0.8], ["swell-s", 330, 104, 0.8], ["swell-s", 450, 101, 0.8]],
    },
  },
};

function Drawing({ composition, className }: { composition: Composition; className: string }) {
  const { width, height, line, items } = composition;
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax slice" focusable="false">
      <g filter="url(#ink)">
        <path className="ink" d={line} />
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
