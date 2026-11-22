import { ISLAND } from "@/lib/island";

/*
 * Oʻahu, drawn: the chart behind the coast map on Travel and the picks map on
 * The island. Line work only, in the site's one pen; the pins and anything
 * interactive are laid over it by those components. It is an illustration,
 * drawn by feel, and nothing on it should be used to navigate.
 */

/**
 * A range drawn the old surveyors' way: a spine, and short strokes falling
 * away from it on both sides, longer where the slope runs out further.
 * `east` and `west` are stroke lengths at the middle of the range; they taper
 * toward its ends. Strokes are spaced along the spine and jittered by index,
 * so the drawing is the same on every render.
 */
export function hachureRange(spine: number[][], west: number, east: number, step = 5): string {
  const parts: string[] = [];
  let total = 0;
  const lengths = spine.slice(1).map(([x, y], i) => Math.hypot(x - spine[i][0], y - spine[i][1]));
  const whole = lengths.reduce((a, b) => a + b, 0);
  lengths.forEach((len, i) => {
    const [x0, y0] = spine[i];
    const [x1, y1] = spine[i + 1];
    const ux = (x1 - x0) / len;
    const uy = (y1 - y0) / len;
    // the normal pointing east (to the right of a spine that runs south)
    const nx = -uy;
    const ny = ux;
    for (let d = 0; d < len; d += step) {
      const k = Math.round((total + d) / step);
      const taper = Math.sin(Math.PI * Math.min(1, Math.max(0, (total + d) / whole))) * 0.75 + 0.25;
      const jit = 0.75 + 0.25 * Math.sin(k * 2.39);
      const x = x0 + ux * d;
      const y = y0 + uy * d;
      const e = east * taper * jit;
      const w = west * taper * (0.8 + 0.2 * Math.cos(k * 1.7));
      parts.push(`M${(x + nx * 2).toFixed(1)} ${(y + ny * 2).toFixed(1)} l${(nx * e).toFixed(1)} ${(ny * e).toFixed(1)}`);
      parts.push(`M${(x - nx * 2).toFixed(1)} ${(y - ny * 2).toFixed(1)} l${(-nx * w).toFixed(1)} ${(-ny * w).toFixed(1)}`);
    }
    total += len;
  });
  return parts.join(" ");
}

/**
 * The long side ridges that run off a crest, with tiny hachures down both
 * sides of each. `side` 1 runs east of a south-running spine, -1 west; `turn`
 * swings the spurs toward the coast they fall to (radians).
 */
export function spurs(spine: number[][], side: 1 | -1, every: number, reach: number, turn: number): { ridges: string; ticks: string } {
  const ridges: string[] = [];
  const ticks: string[] = [];
  let carried = every / 2;
  spine.slice(1).forEach(([x1, y1], i) => {
    const [x0, y0] = spine[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const ux = (x1 - x0) / len;
    const uy = (y1 - y0) / len;
    for (let d = carried; d < len; d += every) {
      const k = ridges.length;
      const a = Math.atan2(-side * ux, side * uy) + turn + 0.12 * Math.sin(k * 2.1);
      const dx = Math.cos(a);
      const dy = Math.sin(a);
      const L = reach * (0.7 + 0.3 * Math.sin(k * 1.3 + 0.6));
      const sx = x0 + ux * d;
      const sy = y0 + uy * d;
      // the spur bends a little as it falls, like a real ridge
      const ex = sx + dx * L;
      const ey = sy + dy * L;
      const cx = sx + dx * L * 0.5 - dy * L * 0.08;
      const cy = sy + dy * L * 0.5 + dx * L * 0.08;
      ridges.push(`M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
      for (let t = 0.12; t < 0.95; t += 0.11) {
        const px = sx + dx * L * t;
        const py = sy + dy * L * t;
        const h = 6 * (1 - t) + 1.5;
        ticks.push(`M${(px - dy * 1.5).toFixed(1)} ${(py + dx * 1.5).toFixed(1)} l${(-dy * h).toFixed(1)} ${(dx * h).toFixed(1)}`);
        ticks.push(`M${(px + dy * 1.5).toFixed(1)} ${(py - dx * 1.5).toFixed(1)} l${(dy * h * 0.7).toFixed(1)} ${(-dx * h * 0.7).toFixed(1)}`);
      }
    }
    carried = ((carried - len) % every + every) % every;
  });
  return { ridges: ridges.join(" "), ticks: ticks.join(" ") };
}

export function CoastChart() {
  // The Koʻolau run down the windward side, Kahuku to Makapuʻu.
  const koolau = [
    [636, 196],
    [650, 240],
    [658, 286],
    [666, 332],
    [680, 378],
    [696, 424],
    [712, 468],
    [724, 508],
  ];
  // The Waiʻanae range, hugging the west coast.
  const waianae = [
    [196, 344],
    [220, 396],
    [248, 444],
    [278, 490],
  ];

  return (
    <svg className="coast-chart" viewBox="0 0 1000 720" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="coast-swell" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path className="coast-chart-swell" d="M0 13 h26" />
        </pattern>
      </defs>

      <rect className="coast-chart-water" x="0" y="0" width="1000" height="720" />
      <rect x="0" y="0" width="1000" height="720" fill="url(#coast-swell)" opacity="0.55" />

      {/* Everything from here is line work, drawn with the site's one pen. */}
      <g filter="url(#ink)">
      {/* the island, drawn twice so the line looks pressed by hand */}
      <path className="coast-chart-land" d={ISLAND} />
      <path className="coast-chart-outline" d={ISLAND} transform="translate(4 3) rotate(0.5 500 360)" />

      {/* the barrier reef, drawn across the water off the bay */}
      <path className="coast-chart-reef" d="M746 436 C700 400 660 360 640 300" />
      <path className="coast-chart-reef" d="M770 424 C728 390 686 342 666 286" />
      <circle className="coast-chart-speck" cx="690" cy="380" r="3" />
      <circle className="coast-chart-speck" cx="714" cy="410" r="2.6" />
      <circle className="coast-chart-speck" cx="668" cy="330" r="2.4" />
      <circle className="coast-chart-speck" cx="652" cy="300" r="2.2" />

      {/* the islet off the point, the one everyone photographs */}
      <path className="coast-chart-land" d="M664 200 l12 -19 l12 19 Z" />

      {/* The two ranges as hachured relief. The Koʻolau fall away in short steep
          strokes on the windward side and long ones toward town; the Waiʻanae
          slope more evenly both ways. A few peaks are marked on the crest. */}
      <g className="coast-chart-ridge">
        <path className="coast-chart-hachure" d={hachureRange(koolau, 16, 12, 3.6)} />
        <path className="coast-chart-hachure" d={hachureRange(waianae, 14, 14, 3.8)} />
        {[spurs(koolau, -1, 24, 86, -0.45), spurs(waianae, 1, 22, 56, 0.4), spurs(waianae, -1, 28, 30, 0)].map((sp, i) => (
          <g key={`s${i}`}>
            <path className="coast-chart-spur" d={sp.ridges} />
            <path className="coast-chart-hachure" d={sp.ticks} />
          </g>
        ))}
        <path className="coast-chart-spine" d={`M${koolau.map(([x, y]) => `${x} ${y}`).join(" L")}`} />
        <path className="coast-chart-spine" d={`M${waianae.map(([x, y]) => `${x} ${y}`).join(" L")}`} />
        {[koolau[2], koolau[5], waianae[1]].map(([x, y]) => (
          <path key={`p${x}`} className="coast-chart-peak" d={`M${x - 5} ${y + 3} L${x} ${y - 6} L${x + 5} ${y + 3} Z`} />
        ))}
      </g>

      {/* the shallows: a dotted line just off the shore all the way round */}
      <path className="coast-chart-shallows" d={ISLAND} transform="translate(500 360) scale(1.035) translate(-500 -360)" />

      {/* swell marks in the open water */}
      <g className="coast-chart-wave">
        <path d="M812 176 c10 -8 20 8 30 0" />
        <path d="M812 190 c10 -8 20 8 30 0" />
        <path d="M886 320 c10 -8 20 8 30 0" />
        <path d="M886 334 c10 -8 20 8 30 0" />
        <path d="M168 596 c10 -8 20 8 30 0" />
        <path d="M168 610 c10 -8 20 8 30 0" />
        <path d="M96 150 c10 -8 20 8 30 0" />
        <path d="M96 164 c10 -8 20 8 30 0" />
        <path d="M816 566 c10 -8 20 8 30 0" />
        <path d="M816 580 c10 -8 20 8 30 0" />
      </g>

      {/* compass */}
      <g className="coast-chart-compass" transform="translate(902 628)">
        <circle r="38" />
        <circle r="28" />
        <circle r="4" />
        {/* sixteen ticks round the rim, longer at the cardinal points */}
        <path
          className="coast-chart-ticks"
          d={Array.from({ length: 16 }, (_, i) => {
            const a = (i * Math.PI) / 8;
            const r0 = i % 4 === 0 ? 30 : 33;
            return `M${(Math.sin(a) * r0).toFixed(1)} ${(-Math.cos(a) * r0).toFixed(1)} L${(Math.sin(a) * 38).toFixed(1)} ${(-Math.cos(a) * 38).toFixed(1)}`;
          }).join(" ")}
        />
        <path d="M0 -34 L9 0 L0 34 L-9 0 Z" className="coast-chart-needle" />
        <path d="M-34 0 L0 -8 L34 0 L0 8 Z" />
        <path d="M-20 -20 L0 -4 L20 20 L4 0 Z M20 -20 L4 0 L-20 20 L0 4 Z" className="coast-chart-ticks" />
      </g>
      </g>
      <text className="coast-chart-text coast-chart-n" x="902" y="578" textAnchor="middle">
        N
      </text>
      <text className="coast-chart-text" x="120" y="688" letterSpacing="6">
        PACIFIC OCEAN
      </text>
      <text className="coast-chart-text coast-chart-water-label" x="826" y="372" letterSpacing="3">
        Kāneʻohe Bay
      </text>
      <text className="coast-chart-text coast-chart-water-label" x="560" y="650" letterSpacing="3">
        Māmala Bay
      </text>
    </svg>
  );
}

