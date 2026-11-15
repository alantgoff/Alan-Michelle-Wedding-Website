import { skyChart, type SkyBody } from "@/content/skyChart";
import { MoonGlyph } from "./MoonGlyph";

/**
 * The sky over the lawn on the wedding night, as a chart to hold overhead:
 * straight up is the centre, the horizon is the rim, and east is on the LEFT
 * because this is the sky seen from underneath. Every position comes from
 * content/skyChart.ts, which is computed for the date, the hour and the place.
 *
 * The drawing is decorative for assistive technology: the page lists the
 * same things in words beside it.
 */

const R = 220; // the horizon's radius, in drawing units
const rad = (deg: number) => (deg * Math.PI) / 180;
const n = (v: number) => Math.round(v * 10) / 10;

/** Height above the horizon and compass bearing → a point on the chart. */
function point(alt: number, az: number): [number, number] {
  const r = (R * (90 - alt)) / 90;
  return [n(-r * Math.sin(rad(az))), n(-r * Math.cos(rad(az)))];
}

function skylineAt(az: number): number {
  const s = skyChart.skyline;
  for (let i = 0; i < s.length - 1; i += 1) {
    const [a0, h0] = s[i];
    const [a1, h1] = s[i + 1];
    if (az >= a0 && az <= a1) return h0 + ((h1 - h0) * (az - a0)) / (a1 - a0);
  }
  return 0;
}

/** Where each name is written, as an offset from its star. */
const LABELS: Record<string, { text: string; dx: number; dy: number; anchor?: "start" | "middle" | "end" }> = {
  polaris: { text: "Hōkūpaʻa", dx: -9, dy: 5, anchor: "end" },
  vega: { text: "Vega", dx: 9, dy: -4 },
  deneb: { text: "Deneb", dx: -8, dy: -7, anchor: "end" },
  altair: { text: "Altair", dx: 9, dy: 9 },
  fomalhaut: { text: "Fomalhaut", dx: 9, dy: 5 },
  saturn: { text: "Saturn", dx: 13, dy: 5 },
  alcyone: { text: "Makaliʻi", dx: 11, dy: -3 },
};
/** Names for the drawn figures, placed by hand where the chart has room. */
const FIGURES: { text: string; x: number; y: number; anchor?: "start" | "middle" | "end" }[] = [
  { text: "Cassiopeia", x: -94, y: -137 },
  { text: "Great Square", x: -84, y: 34, anchor: "middle" },
  { text: "The fishhook", x: 122, y: 152, anchor: "end" },
];

const byId = new Map(skyChart.bodies.map((b) => [b.id, b]));
const at = (b: SkyBody) => point(b.alt, b.az);

/** Brighter stars are drawn larger. Magnitude runs backwards: lower is brighter. */
const size = (mag: number) => n(Math.max(1.3, Math.min(4.8, 4.5 - mag * 1.05)));

function ridgePath(): { fill: string; edge: string; flutes: string } {
  const outer: string[] = [];
  const inner: string[] = [];
  const flutes: string[] = [];
  // From due south round through west to a little past north, where the land is.
  for (let a = 183; a <= 387; a += 3) {
    const az = a % 360;
    const h = skylineAt(az);
    const [ox, oy] = point(0, az);
    const [ix, iy] = point(h, az);
    outer.push(`${ox} ${oy}`);
    inner.push(`${ix} ${iy}`);
    // The Koʻolau's fluted cliffs: short strokes falling from the ridge line.
    if (h > 6 && a % 6 === 0) {
      const fall = h * (0.42 + 0.3 * Math.abs(Math.sin(a * 1.7)));
      const [fx, fy] = point(h - fall, az);
      const [sx, sy] = point(h - 1.2, az);
      flutes.push(`M${sx} ${sy} L${fx} ${fy}`);
    }
  }
  return {
    fill: `M${outer.join(" L")} L${[...inner].reverse().join(" L")} Z`,
    edge: `M${inner.join(" L")}`,
    flutes: flutes.join(" "),
  };
}

export function SkyDisc() {
  const ridge = ridgePath();
  const [mx, my] = point(skyChart.moon.alt, skyChart.moon.az);
  // The moon's dark edge is turned up and a little to the south, away from the
  // sun below the western horizon: straight at the zenith, plus its computed lean.
  const moonTilt = n((Math.atan2(-my, -mx) * 180) / Math.PI + skyChart.moon.darkLimb);

  const lines = Object.entries(skyChart.lines).map(([name, ids]) => {
    const pts = ids.map((id) => byId.get(id)).filter((b): b is SkyBody => Boolean(b));
    return { name, d: `M${pts.map((b) => at(b).join(" ")).join(" L")}` };
  });

  return (
    <svg className="sky-disc" viewBox="-262 -262 524 524" aria-hidden="true" focusable="false">
      <defs>
        {/* Clockwise, so lettering stands outside the rim: east up the left, north over the top, west down the right. */}
        <path id="sky-rim-over" d="M0 233 A233 233 0 1 1 0.01 233" />
        {/* Anticlockwise from the top, so SOUTH reads upright along the bottom. */}
        <path id="sky-rim-under" d="M0 -246 A246 246 0 1 0 0.01 -246" />
      </defs>

      <circle className="sky-paper" r={R} />
      <g filter="url(#ink)">
        <circle className="ink hair sky-ring" r={n((R * 30) / 90)} />
        <circle className="ink hair sky-ring" r={n((R * 60) / 90)} />
        {lines.map((l) => (
          <path key={l.name} className="ink hair sky-figure" d={l.d} />
        ))}
      </g>

      <path className="sky-land" d={ridge.fill} />
      <g filter="url(#ink)">
        <path className="ink hair" d={ridge.flutes} />
        <path className="ink fine" d={ridge.edge} />
        <circle className="ink" r={R} />
        <path className="ink hair" d="M-5 0 H5 M0 -5 V5" />
      </g>

      {skyChart.bodies.map((b) => {
        const [x, y] = at(b);
        if (b.id === "alcyone") {
          // Seven sisters; six dots is what most eyes find.
          return (
            <g key={b.id} transform={`translate(${x} ${y})`}>
              {[
                [0, 0, 1.5],
                [3.4, -1.6, 1.2],
                [-3, -2, 1.2],
                [1, 3.2, 1.1],
                [-2.6, 2.2, 1],
                [4.6, 2, 1],
              ].map(([dx, dy, r]) => (
                <circle key={`${dx},${dy}`} className="ink-dot" cx={dx} cy={dy} r={r} />
              ))}
            </g>
          );
        }
        if (b.kind === "planet") {
          return (
            <g key={b.id} transform={`translate(${x} ${y})`}>
              <circle className="ink-dot" r="3.6" />
              <ellipse className="ink hair" rx="8.4" ry="2.6" transform="rotate(-24)" />
            </g>
          );
        }
        return b.hidden ? (
          <circle key={b.id} className="ink hair sky-hidden" cx={x} cy={y} r={size(b.mag)} />
        ) : (
          <circle key={b.id} className="ink-dot" cx={x} cy={y} r={size(b.mag)} />
        );
      })}
      <MoonGlyph lit={skyChart.moon.lit} tilt={moonTilt} at={{ x: mx, y: my, size: 25 }} />

      <g className="sky-names">
        {Object.entries(LABELS).map(([id, l]) => {
          const b = byId.get(id);
          if (!b) return null;
          const [x, y] = at(b);
          return (
            <text key={id} x={n(x + l.dx)} y={n(y + l.dy)} textAnchor={l.anchor ?? "start"}>
              {l.text}
            </text>
          );
        })}
        <text x={n(mx + 16)} y={n(my + 11)}>
          Moon
        </text>
        {FIGURES.map((f) => (
          <text key={f.text} className="sky-figure-name" x={f.x} y={f.y} textAnchor={f.anchor ?? "start"}>
            {f.text}
          </text>
        ))}
      </g>

      <g className="sky-compass">
        <text>
          <textPath href="#sky-rim-over" startOffset="25%" textAnchor="middle">
            East · the sea
          </textPath>
        </text>
        <text>
          <textPath href="#sky-rim-over" startOffset="50%" textAnchor="middle">
            North
          </textPath>
        </text>
        <text>
          <textPath href="#sky-rim-over" startOffset="75%" textAnchor="middle">
            West · the ridge
          </textPath>
        </text>
        <text>
          <textPath href="#sky-rim-under" startOffset="50%" textAnchor="middle">
            South
          </textPath>
        </text>
      </g>
    </svg>
  );
}
