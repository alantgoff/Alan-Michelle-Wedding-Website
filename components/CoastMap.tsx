"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import "./CoastMap.css";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel, type Stay } from "@/content/travel";
import { photos, type PhotoKey } from "@/content/photos";
import { fill } from "@/lib/fill";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

/**
 * The windward coast, drawn — a chart of where everything happens.
 *
 * Every point is a real button. Choosing one opens what happens there and
 * moves focus into the panel, so it works by keyboard and reads in order
 * for a screen reader. It is an illustration and says so: the coastline is
 * drawn by feel and nothing on it should be used to navigate.
 *
 * Activities arrive already filtered by the visitor’s invite group, so a
 * private event never reaches this component for a guest who may not see it.
 */

type PlaceId = keyof typeof travel.map.places;

/** The drawing's own layout for each place. The words are in content/travel.ts (`map`). */
type Pin = {
  id: PlaceId;
  /** Short name, written on the chart itself where room is tight. */
  short: string;
  /** Position on the 1000 x 720 chart, as a percentage. */
  x: number;
  y: number;
  side: "left" | "right";
  star?: boolean;
  /** The places to stay this point stands for, by their id in travel.stays. */
  stays?: Stay["id"][];
  photo?: PhotoKey;
};

const PINS: Pin[] = [
  // Left at every width: on the right it runs into the Waikīkī pin.
  { id: "airport", short: "HNL", x: 50.4, y: 80.5, side: "left", photo: "travel" },
  { id: "waikiki", short: "Waikīkī", x: 62, y: 79.5, side: "right", stays: ["waikiki"] },
  { id: "koolina", short: "Ko Olina", x: 26.5, y: 75.5, side: "right", stays: ["ko-olina"] },
  { id: "northshore", short: "North Shore", x: 43, y: 19.5, side: "right", stays: ["laie", "turtle-bay"], photo: "activities" },
  { id: "ridge", short: "Koʻolau", x: 60, y: 44, side: "left" },
  { id: "kaneohe", short: "Kāneʻohe", x: 70, y: 47.5, side: "right", stays: ["bay"] },
  { id: "beaches", short: "Kailua", x: 75.5, y: 58.5, side: "right", photo: "welcome" },
  { id: "venue", short: "Palikū Gardens", x: 72, y: 33, side: "right", star: true, photo: "hero" },
];

/** Days in calendar order around the wedding; a day not set yet goes last. */
const dayRank = (day: string) => offsetFromWedding(day) ?? 99;

/** Which point on the chart an event belongs to, read off its location. */
function placeOf(activity: Activity): PlaceId | null {
  const where = activity.location.toLowerCase();
  if (where.includes("paliku") || where.includes("palikū")) return "venue";
  if (where.includes("waikīkī") || where.includes("waikiki")) return "waikiki";
  if (where.includes("kāneʻohe") || where.includes("kaneohe")) return "kaneohe";
  // A beach still "to come" could be anywhere, so it is not pinned to Kailua.
  if (where.includes("beach") && !where.includes("to come")) return "beaches";
  if (where.includes("trail")) return "ridge";
  return null;
}

export function CoastMap({ activities }: { activities: Activity[] }) {
  const [selected, setSelected] = useState<PlaceId>("venue");
  const panelRef = useRef<HTMLDivElement>(null);
  const pin = PINS.find((p) => p.id === selected) ?? PINS[PINS.length - 1];
  const place = travel.map.places[pin.id];
  const words = travel.map.panel;
  // What happens here, in the order of the weekend. The full story of each
  // is on the Weekend page; the chart only names it.
  const here = activities
    .filter((a) => placeOf(a) === pin.id)
    .sort((a, b) => dayRank(a.date) - dayRank(b.date) || minutesOf(a.time) - minutesOf(b.time));
  const stays = (pin.stays ?? []).map((id) => travel.stays.find((s) => s.id === id)!);

  // Show the new place before measuring, then bring the panel into view only
  // when it is not already there: on a phone it sits below the chart; on a
  // wide screen it is beside it, unless the guest has scrolled down it.
  function open(id: PlaceId) {
    flushSync(() => setSelected(id));
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus({ preventScroll: true });
    const top = panel.getBoundingClientRect().top;
    // The page's own scroll padding is what keeps things clear of the header.
    const clearance = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    if (top < clearance || top > window.innerHeight * 0.6) panel.scrollIntoView({ block: "start" });
  }

  return (
    <div className="coast">
      <div className="coast-chart-column">
        <div className="coast-canvas">
          <CoastChart />
          {PINS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="coast-pin"
              data-place={p.id}
              data-side={p.side}
              data-star={p.star ? "true" : undefined}
              aria-pressed={selected === p.id}
              aria-controls="coast-place-panel"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => open(p.id)}
            >
              <span className="coast-pin-mark" aria-hidden="true" />
              <span className="coast-pin-name">{p.short}</span>
            </button>
          ))}
        </div>

        <div className="coast-index" role="group" aria-label={travel.map.indexLabel}>
          {PINS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="coast-index-item"
              aria-pressed={selected === p.id}
              aria-controls="coast-place-panel"
              onClick={() => open(p.id)}
            >
              <span className="coast-index-kind">{travel.map.places[p.id].kind}</span>
              <span className="coast-index-name">{travel.map.places[p.id].name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="coast-panel" id="coast-place-panel" ref={panelRef} tabIndex={-1}>
        <p className="coast-panel-kind">{place.kind}</p>
        <h3 className="coast-panel-name">{place.name}</h3>
        <p className="coast-panel-blurb">{place.blurb}</p>

        {pin.id === "venue" ? (
          <div className="coast-venue">
            <dl className="coast-facts">
              <div>
                <dt>{words.date}</dt>
                <dd>{site.weddingDate}</dd>
              </div>
              <div>
                <dt>{words.ceremony}</dt>
                <dd>{site.ceremonyTime}</dd>
              </div>
              <div>
                <dt>{words.address}</dt>
                <dd>{site.address}</dd>
              </div>
            </dl>
            <a className="coast-link" href={site.mapUrl} target="_blank" rel="noreferrer">
              {words.maps}
            </a>
            {/* A plain link: only a real page load sets :target on the Weekend page. */}
            <a className="coast-link" href="/weekend">
              {words.weekend} →
            </a>
          </div>
        ) : null}

        {stays.length > 0 ? (
          <ul className="coast-stays">
            {stays.map((s) => (
              <li key={s.id}>
                <strong>{s.title}</strong>
                <span>{fill(words.minutes, { minutes: s.minutes })}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {here.length > 0 ? (
          <div className="coast-note">
            <h4>{words.here}</h4>
            <ul className="coast-here">
              {here.map((a) => (
                <li key={a.title + a.time}>
                  <span className="coast-here-when">
                    {weekendDay(a.date)?.label ?? a.date} · {a.time}
                  </span>
                  <a href={`/weekend#${anchorFor(a.title)}`}>{a.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {place.link ? (
          <p className="more-link">
            {place.link.href.startsWith("#") ? (
              <a href={place.link.href}>{place.link.label} →</a>
            ) : (
              <Link href={place.link.href}>{place.link.label} →</Link>
            )}
          </p>
        ) : null}

        {pin.photo ? (
          <div className="coast-panel-photo">
            <Image
              src={photos[pin.photo].src}
              alt={photos[pin.photo].alt}
              fill
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

const ISLAND =
  // Kaʻena Point, the sharp western tip, then the North Shore to Kahuku
  "M122 296 C168 244 240 198 330 168 C424 138 516 122 598 120 " +
  // Kahuku Point, then south down the windward coast toward Kualoa
  "C652 124 692 146 716 186 C736 220 744 258 746 294 " +
  // Kāneʻohe Bay, bitten deep into the windward side
  "C702 306 684 336 692 366 C700 396 728 410 756 420 " +
  // Kailua and Lanikai, down to the point at Makapuʻu
  "C778 430 792 450 788 478 C780 514 750 540 712 558 " +
  // the south shore: Diamond Head, Waikīkī, town
  "C666 580 612 592 558 596 C530 598 510 590 496 572 " +
  // Pearl Harbor, cut up into the plain
  "C484 556 464 554 454 570 C444 586 426 594 400 594 " +
  // the ʻEwa plain, then the straight Waiʻanae coast back up to Kaʻena
  "C340 594 272 568 226 520 C190 482 160 424 140 366 C130 336 124 314 122 296 Z";

/**
 * A range drawn the old surveyors' way: a spine, and short strokes falling
 * away from it on both sides, longer where the slope runs out further.
 * `east` and `west` are stroke lengths at the middle of the range; they taper
 * toward its ends. Strokes are spaced along the spine and jittered by index,
 * so the drawing is the same on every render.
 */
function hachureRange(spine: number[][], west: number, east: number, step = 5): string {
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
function spurs(spine: number[][], side: 1 | -1, every: number, reach: number, turn: number): { ridges: string; ticks: string } {
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

function CoastChart() {
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

