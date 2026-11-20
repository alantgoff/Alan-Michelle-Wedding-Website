/**
 * A thumbnail of each road over the Koʻolau, in the logo's line: the ridge,
 * and how the road gets past it. Sketches, not sections; nothing is to scale.
 *
 * The relief (hatching, flutes, trees, stipple) is shared by all three and was
 * generated once from RIDGE, so it sits on the slope; the roads are drawn over
 * a pale cut so the hatching parts around them, the way an engraver leaves a road white.
 */

const RIDGE = "M4 74 C26 70 40 44 62 30 C74 22 82 34 96 26 C110 18 120 12 134 22 C150 34 166 52 186 62 C204 70 220 73 236 74";
/** The same ridge closed along the ground, so the road can pass behind it. */
const LAND = `${RIDGE} L236 86 L4 86 Z`;
/** A lower range further back, showing only where the front ridge drops away. */
const FAR = "M150 44 C162 34 176 30 190 36 C204 42 214 52 236 58 M4 62 C12 56 20 54 30 56";
/** Shading on the faces turned away from the light. */
const HATCH = "M74.4 29.8 l-4.4 14.6 M79.0 30.6 l-4.4 14.8 M122.0 19.4 l-4.6 15.2 M126.1 20.3 l-5.1 16.9 M130.3 22.2 l-5.5 18.5 M134.1 24.6 l-6.0 19.9 M138.2 27.8 l-6.1 20.4 M141.7 30.6 l-5.8 19.5 M145.1 33.6 l-5.5 18.4 M148.8 36.8 l-5.1 17.1 M153.0 40.5 l-4.7 15.5 M156.9 43.9 l-4.2 14.0 M160.7 47.1 l-3.7 12.5 M164.8 50.5 l-3.3 10.9 M168.7 53.5 l-2.8 9.4 M172.5 56.3 l-2.4 8.2 M176.8 59.2 l-2.0 6.8 M181.1 61.8 l-1.7 5.6 M184.8 63.9 l-1.4 4.7 M188.9 65.7 l-1.2 3.9 M192.9 67.4 l-1.0 3.2";
/** Fluted gullies down the steep faces. */
const FLUTES = "M48 43.1 C46 53.0 47 61.8 49 68.0 M70 29.2 C68 41.2 69 51.7 71 59.2 M104 23.5 C102 35.5 103 46.0 105 53.5 M122 18.9 C120 30.9 121 41.4 123 48.9 M146 33.9 C144 45.9 145 56.4 147 63.9 M164 49.3 C162 56.8 163 63.3 165 68.0";
/** Trees along the foot, and a scatter of stipple on the slopes. */
const TREES = "M6 74.2 c0.6 -2.9 2.6 -2.9 3.2 0 M11.5 72.3 c0.5 -2.7 2.4 -2.7 2.9 0 M17.3 69.3 c0.8 -4.1 3.7 -4.1 4.5 0 M24.8 63.8 c0.9 -4.4 3.9 -4.4 4.8 0 M31.8 57.5 c0.8 -4.0 3.6 -4.0 4.4 0 M201.8 68.6 c0.8 -4.0 3.6 -4.0 4.3 0 M207.5 70.2 c0.9 -4.4 4.0 -4.4 4.8 0 M216.0 72.1 c0.9 -4.3 3.9 -4.3 4.8 0 M224.5 73.5 c0.7 -3.4 3.0 -3.4 3.7 0 M230.4 74.2 c0.6 -2.8 2.5 -2.8 3.1 0";
const STIPPLE = "M31.2 68.1 a0.5 0.5 0 1 0 0.01 0 M32.1 60.8 a0.8 0.8 0 1 0 0.01 0 M57.6 41.3 a0.5 0.5 0 1 0 0.01 0 M49.2 48.3 a0.5 0.5 0 1 0 0.01 0 M81.2 36.7 a0.8 0.8 0 1 0 0.01 0 M29.5 70.0 a0.7 0.7 0 1 0 0.01 0 M47.2 47.9 a0.6 0.6 0 1 0 0.01 0 M38.3 55.9 a0.8 0.8 0 1 0 0.01 0 M85.4 37.2 a0.8 0.8 0 1 0 0.01 0 M24.6 70.0 a0.5 0.5 0 1 0 0.01 0 M177.4 67.6 a0.8 0.8 0 1 0 0.01 0 M130.5 30.6 a0.8 0.8 0 1 0 0.01 0 M46.7 52.8 a0.7 0.7 0 1 0 0.01 0 M65.4 34.0 a0.7 0.7 0 1 0 0.01 0 M82.5 35.5 a0.5 0.5 0 1 0 0.01 0 M85.5 33.1 a0.6 0.6 0 1 0 0.01 0 M42.1 52.8 a0.7 0.7 0 1 0 0.01 0 M172.8 65.7 a0.6 0.6 0 1 0 0.01 0 M103.9 33.1 a0.8 0.8 0 1 0 0.01 0 M107.1 31.7 a0.6 0.6 0 1 0 0.01 0 M35.5 59.1 a0.5 0.5 0 1 0 0.01 0 M38.4 56.0 a0.5 0.5 0 1 0 0.01 0 M81.7 37.6 a0.8 0.8 0 1 0 0.01 0 M67.7 38.2 a0.6 0.6 0 1 0 0.01 0";

type Crossing = "h3" | "likelike" | "pali";

/** Each road: the open stretches, the stretch inside the mountain, portals, and any extras. */
const ROADS: Record<Crossing, { open: string[]; bore: string; portals: [number, number][]; extra?: string; wind?: string }> = {
  // In at one side, a long bore, and out onto a viaduct on tall legs.
  h3: {
    open: ["M4 60 C22 58 40 56 54 54", "M150 50 C176 49 206 50 236 52"],
    bore: "M54 54 L150 50",
    portals: [
      [54, 58],
      [150, 54],
    ],
    extra: "M166 50 V63 M184 50 V70 M202 51 V74 M220 52 V76 M166 56 L184 56 M184 58 L202 59 M202 60 L220 61",
  },
  // Up the valley, one short tunnel, and down in bends to the bay.
  likelike: {
    open: ["M4 80 C22 78 34 72 44 64 C50 60 56 58 62 58", "M128 56 C142 56 148 62 158 62 C170 62 172 70 184 71 C200 72 218 78 236 80"],
    bore: "M62 58 L128 56",
    portals: [
      [62, 62],
      [128, 60],
    ],
  },
  // The old way: up to the gap, through two short bores, where the wind comes through.
  pali: {
    open: ["M4 80 C24 76 40 62 56 48 C66 40 74 40 84 36", "M108 30 C124 36 136 50 152 58 C176 70 206 78 236 80"],
    bore: "M84 36 L108 30",
    portals: [
      [84, 39],
      [108, 33],
    ],
    // the lookout rail
    extra: "M88 22 h14 M90 22 v6 M95 22 v6 M100 22 v6",
    wind: "M122 12 c8 -4 14 2 22 -2 M128 20 c8 -4 16 2 26 -2 M118 4 c6 -3 12 1 18 -1 M150 8 c5 -2 9 1 14 -1",
  },
};

/** A tunnel mouth: a dark arch inside a hairline ring of stone. */
function portal([x, y]: [number, number]) {
  return `M${x - 4} ${y} v-1.5 a4 4 0 0 1 8 0 v1.5 Z`;
}
function ring([x, y]: [number, number]) {
  return `M${x - 6} ${y} v-1.5 a6 6 0 0 1 12 0 v1.5`;
}

export function CrossingGlyph({ id }: { id: Crossing }) {
  const road = ROADS[id];
  return (
    <svg className="crossing-glyph" viewBox="0 0 240 90" aria-hidden="true" focusable="false">
      <g filter="url(#ink)">
        <path className="ink hair crossing-far" d={FAR} />
      </g>
      <path className="wash" d={LAND} />
      <g filter="url(#ink)">
        <path className="ink hair crossing-hatch" d={HATCH} />
        <path className="ink hair crossing-flutes" d={FLUTES} />
        <path className="ink-dot crossing-stipple" d={STIPPLE} />
        <path className="ink hair crossing-trees" d={TREES} />
        <path className="ink fine" d={RIDGE} />
        {/* the cut the road runs in, then the road, with a hairline shoulder below it */}
        {road.open.map((d) => (
          <path key={`c${d}`} className="crossing-cut" d={d} />
        ))}
        {road.open.map((d) => (
          <g key={d}>
            <path className="ink fine" d={d} />
            <path className="ink hair crossing-shoulder" d={d} transform="translate(0 2.4)" />
          </g>
        ))}
        <path className="ink hair crossing-bore" d={road.bore} />
        {road.portals.map((p) => (
          <g key={p.join()}>
            <path className="crossing-portal" d={portal(p)} />
            <path className="ink hair" d={ring(p)} />
          </g>
        ))}
        {road.extra ? <path className="ink hair" d={road.extra} /> : null}
        {road.wind ? <path className="ink hair crossing-wind" d={road.wind} /> : null}
      </g>
    </svg>
  );
}
