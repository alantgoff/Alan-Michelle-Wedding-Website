import { hachureRange } from "./IslandChart";
import type { RegionMap } from "./region-maps";

/*
 * One part of the island, drawn close up from components/region-maps.ts in
 * the same pen and colours as the coast chart. Line work only; the pins for
 * the picks are laid over it by PicksMap.
 */

/** A crater: its rim, an inner ring, and short strokes down the inside wall. */
function crater({ x, y, r }: { x: number; y: number; r: number }): string {
  const ring = (rr: number) => `M${x - rr} ${y} a${rr} ${rr} 0 1 0 ${2 * rr} 0 a${rr} ${rr} 0 1 0 ${-2 * rr} 0`;
  const strokes: string[] = [];
  for (let i = 0; i < 44; i += 1) {
    const a = (i / 44) * Math.PI * 2;
    const len = 0.16 + 0.1 * Math.max(0, Math.sin(a + 0.6));
    const c = Math.cos(a);
    const s = Math.sin(a);
    strokes.push(`M${(x + c * r * 0.97).toFixed(1)} ${(y + s * r * 0.97).toFixed(1)} L${(x + c * r * (0.97 - len)).toFixed(1)} ${(y + s * r * (0.97 - len)).toFixed(1)}`);
  }
  return `${ring(r)} ${ring(r * 0.7)} ${strokes.join(" ")}`;
}

/** Fields as rows, slightly slanted, like a plowed hillside seen from above. */
function rows({ x, y, w, h }: { x: number; y: number; w: number; h: number }): string {
  const parts: string[] = [];
  for (let yy = y; yy <= y + h; yy += 9) parts.push(`M${x} ${yy} l${w} ${-w * 0.08}`);
  return parts.join(" ");
}

const STAR = "M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z";

export function RegionChart({ map }: { map: RegionMap }) {
  return (
    <svg className="coast-chart region-chart" viewBox="0 0 1000 720" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="rm-swell" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path className="coast-chart-swell" d="M0 13 h26" />
        </pattern>
      </defs>
      <rect className="coast-chart-water" x="0" y="0" width="1000" height="720" />
      <rect x="0" y="0" width="1000" height="720" fill="url(#rm-swell)" opacity="0.55" />

      <g filter="url(#ink)">
        {map.islets ? <path className="rm-land" d={map.islets} /> : null}
        <path className="rm-land" d={map.land} />
        <path className="rm-coast" d={map.land} transform="translate(3 2)" />
        {map.water ? <path className="rm-water" d={map.water} /> : null}
        {map.parks ? <path className="rm-park" d={map.parks} /> : null}
        {map.fields?.map((f) => <path key={`${f.x}-${f.y}`} className="rm-field" d={rows(f)} />)}
        {map.canals?.map((d) => (
          <g key={d}>
            <path className="rm-canal-edge" d={d} />
            <path className="rm-canal" d={d} />
          </g>
        ))}
        {map.ridges?.map((r) => (
          <g key={r.spine.join()}>
            <path className="rm-hachure" d={hachureRange(r.spine, r.west, r.east, 4)} />
            <path className="rm-crest" d={`M${r.spine.map(([x, y]) => `${x} ${y}`).join(" L")}`} />
          </g>
        ))}
        {map.craters?.map((c) => <path key={`${c.x}-${c.y}`} className="rm-crater" d={crater(c)} />)}
        {map.shoals?.map((d) => <path key={d} className="rm-shoal" d={d} />)}
        {map.blocks ? <path className="rm-block" d={map.blocks} /> : null}
        {map.streets?.map((d) => <path key={d} className="rm-street" d={d} />)}
        {map.highways?.map((d) => (
          <g key={d}>
            <path className="rm-road-edge" d={d} />
            <path className="rm-road" d={d} />
          </g>
        ))}
        {map.trails?.map((d) => <path key={d} className="rm-trail" d={d} />)}
      </g>

      {map.labels.map((l) => (
        <text
          key={l.t + l.x}
          className={`rm-label rm-label-${l.k}`}
          x={l.x}
          y={l.y}
          textAnchor={l.a ?? "middle"}
          transform={l.r ? `rotate(${l.r} ${l.x} ${l.y})` : undefined}
        >
          {l.t}
        </text>
      ))}
      {/* north */}
      <g className="rm-north" transform="translate(952 662)">
        <path d="M0 -26 L8 4 L0 -2 L-8 4 Z" />
        <text x="0" y="24" textAnchor="middle">
          N
        </text>
      </g>
      {map.star ? (
        <g className="rm-star">
          <path d={STAR} transform={`translate(${map.star.x} ${map.star.y}) scale(1.5)`} />
          <text className="rm-label rm-label-star" x={map.star.x} y={map.star.y + 34} textAnchor="middle">
            {map.star.t}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
