import { hachureRange } from "./IslandChart";
import { MAP_ICONS } from "./map-icons";
import type { Landmark, RegionMap, Road } from "./region-maps";

/*
 * One part of the island, drawn close up from components/region-maps.ts.
 * Calm on purpose: flat water with a lighter band of shallows along the
 * shore, crisp lines, and names in a clear order of size (neighborhoods,
 * then roads written along themselves, then landmarks). The pins for the
 * picks are laid over it by PicksMap.
 */

/** A crater: its rim, an inner ring, and short strokes down the inside wall. */
function crater({ x, y, r }: { x: number; y: number; r: number }): string {
  const ring = (rr: number) => `M${x - rr} ${y} a${rr} ${rr} 0 1 0 ${2 * rr} 0 a${rr} ${rr} 0 1 0 ${-2 * rr} 0`;
  const strokes: string[] = [];
  for (let i = 0; i < 36; i += 1) {
    const a = (i / 36) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    strokes.push(`M${(x + c * r * 0.96).toFixed(1)} ${(y + s * r * 0.96).toFixed(1)} L${(x + c * r * 0.84).toFixed(1)} ${(y + s * r * 0.84).toFixed(1)}`);
  }
  return `${ring(r)} ${strokes.join(" ")}`;
}

/** Fields as rows, slightly slanted. */
function rows({ x, y, w, h }: { x: number; y: number; w: number; h: number }): string {
  const parts: string[] = [];
  for (let yy = y; yy <= y + h; yy += 12) parts.push(`M${x} ${yy} l${w} ${-w * 0.08}`);
  return parts.join(" ");
}

const STAR = "M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z";

const ROAD_ORDER: Road["kind"][] = ["street", "major", "highway"];

function LandmarkMark({ l }: { l: Landmark }) {
  const icon = MAP_ICONS[l.icon] as { d: string; fill?: boolean };
  const side = l.side ?? "right";
  const at =
    side === "right"
      ? { x: l.x + 22, y: l.y + 6, a: "start" as const }
      : side === "left"
        ? { x: l.x - 22, y: l.y + 6, a: "end" as const }
        : side === "above"
          ? { x: l.x, y: l.y - 22, a: "middle" as const }
          : { x: l.x, y: l.y + 34, a: "middle" as const };
  return (
    <g className="rm-landmark">
      <g transform={`translate(${l.x} ${l.y})`}>
        <circle className="rm-badge" r="15" />
        <path className={icon.fill ? "rm-icon rm-icon-fill" : "rm-icon"} d={icon.d} />
      </g>
      {l.label ? (
        <text className="rm-label rm-label-landmark" x={at.x} y={at.y} textAnchor={at.a}>
          {l.label}
        </text>
      ) : null}
    </g>
  );
}

export function RegionChart({ id, map }: { id: string; map: RegionMap }) {
  const roads = ROAD_ORDER.flatMap((kind) => map.roads.map((r, i) => ({ ...r, i })).filter((r) => r.kind === kind));
  const pathId = (i: number) => `rm-${id}-road-${i}`;
  return (
    <svg className="coast-chart region-chart" viewBox="0 0 1000 720" aria-hidden="true" focusable="false">
      <rect className="rm-sea" x="0" y="0" width="1000" height="720" />

      {/* shallows: wide light strokes of the shore, the land hides their inland half */}
      {[map.land, map.islets].filter(Boolean).map((d) => (
        <g key={d}>
          <path className="rm-shallows-2" d={d} />
          <path className="rm-shallows-1" d={d} />
        </g>
      ))}

      {map.islets ? <path className="rm-land" d={map.islets} /> : null}
      <path className="rm-land" d={map.land} />
      {map.hotels ? <path className="rm-hotels" d={map.hotels} /> : null}
      {map.parks ? <path className="rm-park" d={map.parks} /> : null}
      {map.fields?.map((f) => <path key={`${f.x}-${f.y}`} className="rm-field" d={rows(f)} />)}
      {map.ridges?.map((r) => (
        <g key={r.spine.join()}>
          <path className="rm-ridge-band" d={`M${r.spine.map(([x, y]) => `${x} ${y}`).join(" L")}`} />
          <path className="rm-hachure" d={hachureRange(r.spine, r.west, r.east, 6)} />
          <path className="rm-crest" d={`M${r.spine.map(([x, y]) => `${x} ${y}`).join(" L")}`} />
        </g>
      ))}
      {map.craters?.map((c) => <path key={`${c.x}-${c.y}`} className="rm-crater" d={crater(c)} />)}
      {map.water ? <path className="rm-water" d={map.water} /> : null}
      {map.canals?.map((d) => (
        <g key={d}>
          <path className="rm-canal-edge" d={d} />
          <path className="rm-canal" d={d} />
        </g>
      ))}
      {map.beaches?.map((d) => <path key={d} className="rm-beach" d={d} />)}
      <path className="rm-coastline" d={map.land} />
      {map.islets ? <path className="rm-coastline" d={map.islets} /> : null}
      {map.shoals?.map((d) => <path key={d} className="rm-shoal" d={d} />)}

      {/* roads: casings first, then fills, smallest first */}
      {roads.map((r) => (r.kind === "trail" ? null : <path key={`c${r.i}`} className={`rm-road-case rm-${r.kind}`} d={r.d} />))}
      {roads.map((r) => (r.kind === "trail" ? null : <path key={`f${r.i}`} id={pathId(r.i)} className={`rm-road-fill rm-${r.kind}`} d={r.d} />))}
      {map.roads.map((r, i) => (r.kind === "trail" ? <path key={`t${i}`} className="rm-trail" d={r.d} /> : null))}
      {map.roads.map((r, i) =>
        r.name ? (
          <text key={`n${i}`} className={`rm-label rm-road-name rm-road-name-${r.kind}`} dy={r.kind === "highway" ? 6 : -10}>
            <textPath href={`#${pathId(i)}`} startOffset={`${r.at ?? 50}%`} textAnchor="middle">
              {r.name}
            </textPath>
          </text>
        ) : null,
      )}

      {map.landmarks?.map((l) => <LandmarkMark key={`${l.icon}-${l.x}-${l.y}`} l={l} />)}

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

      <g className="rm-north" transform="translate(956 660)">
        <path d="M0 -26 L9 4 L0 -3 L-9 4 Z" />
        <text x="0" y="26" textAnchor="middle">
          N
        </text>
      </g>
      {map.star ? (
        <g className="rm-star">
          <path d={STAR} transform={`translate(${map.star.x} ${map.star.y}) scale(1.6)`} />
          <text className="rm-label rm-label-star" x={map.star.x - 26} y={map.star.y + 9} textAnchor="end">
            {map.star.t}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
