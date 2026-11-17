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

function CoastChart() {
  // The Koʻolau run down the windward side, Kahuku to Makapuʻu.
  const koolau = [
    [636, 196],
    [656, 240],
    [672, 286],
    [686, 332],
    [700, 378],
    [714, 424],
    [726, 468],
    [736, 508],
  ];
  // The Waiʻanae range along the west coast.
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

      {/* the two ranges */}
      <g className="coast-chart-ridge">
        {koolau.map(([x, y], i) => (
          <path key={`k${i}`} d={`M${x - 18} ${y + 11} L${x} ${y - (11 + (i % 3) * 3)} L${x + 18} ${y + 11}`} />
        ))}
        {waianae.map(([x, y], i) => (
          <path key={`w${i}`} d={`M${x - 14} ${y + 9} L${x} ${y - (8 + (i % 2) * 4)} L${x + 14} ${y + 9}`} />
        ))}
      </g>

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
        <path d="M0 -34 L9 0 L0 34 L-9 0 Z" className="coast-chart-needle" />
        <path d="M-34 0 L0 -8 L34 0 L0 8 Z" />
      </g>
      </g>
      <text className="coast-chart-text coast-chart-n" x="902" y="578" textAnchor="middle">
        N
      </text>
      <text className="coast-chart-text" x="120" y="688" letterSpacing="6">
        PACIFIC OCEAN
      </text>
    </svg>
  );
}

