import { sky } from "@/content/sky";
import { minutesOf as minutes } from "@/lib/weekend";
import { MoonGlyph } from "./MoonGlyph";

/**
 * The wedding day drawn as one line: the tide in Kāneʻohe Bay from before
 * dawn to after moonrise, with the sun's rising and setting and the moon's
 * rising marked above it. The times are the ones in content/sky.ts.
 *
 * Decorative for assistive technology: the page lists every time in words.
 */

const n = (v: number) => Math.round(v * 10) / 10;

const START = 3 * 60 + 30; // the strip runs from 3:30 in the morning…
const END = 22 * 60; //        …to ten at night

function strip(width: number, height: number, hours: [number, string][]) {
  const pad = 14;
  const x = (min: number) => n(pad + ((min - START) / (END - START)) * (width - pad * 2));
  const top = height * 0.4; // the highest tide reaches here
  const floor = height - 38; // and a tide of nothing sits here
  const highest = Math.max(...sky.tides.map((t) => t.feet));
  const y = (feet: number) => n(floor - (feet / highest) * (floor - top));

  // Between one turn of the tide and the next the water follows a cosine,
  // which is the sailor's rule of thumb and close enough for a drawing.
  const turns = sky.tides.map((t) => ({ at: minutes(t.time), feet: t.feet }));
  const curve: string[] = [];
  for (let i = 0; i < turns.length - 1; i += 1) {
    const a = turns[i];
    const b = turns[i + 1];
    for (let t = a.at; t < b.at; t += 12) {
      const f = a.feet + ((b.feet - a.feet) * (1 - Math.cos((Math.PI * (t - a.at)) / (b.at - a.at)))) / 2;
      curve.push(`${x(t)} ${y(f)}`);
    }
  }
  const last = turns[turns.length - 1];
  curve.push(`${x(last.at)} ${y(last.feet)}`);
  const first = turns[0];

  const dawn = x(minutes(sky.firstLight));
  const rise = x(minutes(sky.sunrise));
  const set = x(minutes(sky.sunset));
  const dark = x(minutes(sky.lastLight));
  const moon = x(minutes(sky.moonrise));
  const horizon = n(height * 0.3);
  const arc = n((set - rise) / 2);
  const bed = height - 24;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <defs>
        {/* Night thins into day across dawn, and day into night across dusk. */}
        <linearGradient id={`almanac-dawn-${width}`} gradientUnits="userSpaceOnUse" x1="0" x2={rise}>
          <stop className="almanac-night" offset="0" />
          <stop className="almanac-night" offset={n(dawn / rise)} />
          <stop className="almanac-night almanac-clear" offset="1" />
        </linearGradient>
        <linearGradient id={`almanac-dusk-${width}`} gradientUnits="userSpaceOnUse" x1={set} x2={width}>
          <stop className="almanac-night almanac-clear" offset="0" />
          <stop className="almanac-night" offset={n((dark - set) / (width - set))} />
          <stop className="almanac-night" offset="1" />
        </linearGradient>
      </defs>
      <rect fill={`url(#almanac-dawn-${width})`} x="0" y="0" width={rise} height={bed} />
      <rect fill={`url(#almanac-dusk-${width})`} x={set} y="0" width={n(width - set)} height={bed} />
      {/* A few stars in the dark at either end. */}
      {[
        [dawn * 0.22, 0.2, 1.5],
        [dawn * 0.62, 0.11, 1.1],
        [dawn * 0.86, 0.3, 1.2],
        [dark + (width - dark) * 0.2, 0.1, 1.2],
        [dark + (width - dark) * 0.66, 0.16, 1.5],
        [dark + (width - dark) * 0.9, 0.34, 1.1],
        [dark + (width - dark) * 0.42, 0.52, 1],
      ].map(([sx, sy, r]) => (
        <circle key={`${sx}`} className="ink-dot" cx={n(sx)} cy={n(height * sy)} r={r} />
      ))}
      <path className="almanac-water" d={`M${x(first.at)} ${bed} L${curve.join(" L")} L${x(last.at)} ${bed} Z`} />
      <g filter="url(#ink)">
        {/* The sun's day: up out of the sea, over, and down behind the ridge. */}
        <path className="ink hair almanac-course" d={`M${rise} ${horizon} A${arc} ${n(horizon - 10)} 0 0 1 ${set} ${horizon}`} />
        <path className="ink" d={`M${curve.join(" L")}`} />
        <path className="ink hair" d={`M0 ${bed} H${width}`} />
        {hours.map(([min]) => (
          <path key={min} className="ink hair" d={`M${x(min)} ${bed} v6`} />
        ))}
        {turns.map((t) => (
          <path key={t.at} className="ink hair almanac-drop" d={`M${x(t.at)} ${n(y(t.feet) + 7)} V${bed}`} />
        ))}
      </g>
      {[rise, set].map((sx) => (
        <g key={sx} transform={`translate(${sx} ${horizon})`}>
          <circle className="almanac-sun" r="6.5" />
          <g filter="url(#ink)">
            <circle className="ink fine" r="6.5" />
            <path className="ink hair" d="M0 -10.5 V-14 M7.4 -7.4 L9.9 -9.9 M10.5 0 H14 M7.4 7.4 L9.9 9.9 M0 10.5 V14 M-7.4 7.4 L-9.9 9.9 M-10.5 0 H-14 M-7.4 -7.4 L-9.9 -9.9" />
          </g>
        </g>
      ))}
      <MoonGlyph lit={sky.moonLit} at={{ x: moon, y: horizon, size: 24 }} />
      {turns.map((t) => (
        <circle key={t.at} className="ink-dot" cx={x(t.at)} cy={y(t.feet)} r="3.2" />
      ))}
      <g className="almanac-hours">
        {hours.map(([min, label]) => (
          <text key={min} x={x(min)} y={height - 4} textAnchor="middle">
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
}

export function Almanac() {
  return (
    <div className="almanac-strip" aria-hidden="true">
      <div className="almanac-wide">
        {strip(960, 200, [
          [6 * 60, "6 am"],
          [9 * 60, "9 am"],
          [12 * 60, "noon"],
          [15 * 60, "3 pm"],
          [18 * 60, "6 pm"],
          [21 * 60, "9 pm"],
        ])}
      </div>
      <div className="almanac-narrow">
        {strip(400, 190, [
          [6 * 60, "6 am"],
          [12 * 60, "noon"],
          [18 * 60, "6 pm"],
        ])}
      </div>
    </div>
  );
}
