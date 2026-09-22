"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "./CoastMap.css";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { photos, type PhotoKey } from "@/content/photos";

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

type PlaceId = "airport" | "waikiki" | "northshore" | "ridge" | "kaneohe" | "beaches" | "venue";

type Place = {
  id: PlaceId;
  /** Full name, used in the index and at the head of the panel. */
  name: string;
  /** Short name, used on the chart itself where room is tight. */
  short: string;
  kind: string;
  /** Position on the 1000 x 720 chart, as a percentage. */
  x: number;
  y: number;
  side: "left" | "right";
  star?: boolean;
  blurb: string;
  notes: { title: string; text: string }[];
  list?: { heading: string; items: string[] };
  photo?: PhotoKey;
};

const PLACES: Place[] = [
  {
    id: "airport",
    name: "Honolulu airport",
    short: "HNL",
    kind: "Where you land",
    x: 50.4,
    y: 80.5,
    side: "right",
    blurb: "Every guest starts here. Collect the car before you do anything else.",
    notes: travel.gettingThere,
    photo: "travel",
  },
  {
    id: "waikiki",
    name: "Waikīkī",
    short: "Waikīkī",
    kind: "Where to stay",
    x: 62,
    y: 79.5,
    side: "right",
    blurb: "The south shore. Most rooms, most restaurants, longest drive to us.",
    notes: [{ title: travel.stays[0].title, text: travel.stays[0].text }],
  },
  {
    id: "northshore",
    name: "North Shore",
    short: "North Shore",
    kind: "Where to stay",
    x: 43,
    y: 19.5,
    side: "right",
    blurb: "The far side of the island, quiet and green, and closer than it looks.",
    notes: [{ title: travel.stays[1].title, text: travel.stays[1].text }],
    photo: "activities",
  },
  {
    id: "ridge",
    name: "The Koʻolau ridge",
    short: "Koʻolau",
    kind: "The wall down the middle",
    x: 60,
    y: 44,
    side: "left",
    blurb:
      "The green wall that separates the windward side from town. Every drive to the venue crosses it or runs along its foot, and it is the reason the weather changes in ten minutes.",
    notes: [
      {
        title: "Allow for the crossing",
        text: "The tunnels and the pali road are the only quick ways through. Traffic stacks up on weekday mornings and again at the end of the afternoon.",
      },
    ],
  },
  {
    id: "kaneohe",
    name: "Kāneʻohe",
    short: "Kāneʻohe",
    kind: "Where to stay",
    x: 70,
    y: 47.5,
    side: "right",
    blurb: "The bay town nearest the venue, with a reef flat in front of it.",
    notes: [{ title: travel.stays[2].title, text: travel.stays[2].text }],
  },
  {
    id: "beaches",
    name: "Kailua & Lanikai",
    short: "Kailua",
    kind: "Where to spend a morning",
    x: 75.5,
    y: 58.5,
    side: "right",
    blurb: "Flat turquoise water and pale sand, twenty minutes south of the venue.",
    notes: [
      {
        title: "Go early",
        text: "Parking around Lanikai is residential and fills by mid-morning. Kailua Beach Park has a proper lot and the same water.",
      },
    ],
    list: { heading: "While you are on this coast", items: [...travel.explore] },
    photo: "welcome",
  },
  {
    id: "venue",
    name: site.venue,
    short: "Pālikū Gardens",
    kind: "The wedding",
    x: 72,
    y: 33,
    side: "right",
    star: true,
    blurb: site.tagline,
    notes: [],
    photo: "hero",
  },
];

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

/** Which point on the chart an event belongs to, read off its location. */
function placeOf(activity: Activity): PlaceId | null {
  const where = activity.location.toLowerCase();
  if (where.includes("paliku") || where.includes("pālikū")) return "venue";
  if (where.includes("waikīkī") || where.includes("waikiki")) return "waikiki";
  if (where.includes("kāneʻohe") || where.includes("kaneohe")) return "kaneohe";
  if (where.includes("beach")) return "beaches";
  if (where.includes("trail")) return "ridge";
  return null;
}

function sortedDays(activities: Activity[]) {
  const days = Array.from(new Set(activities.map((a) => a.date)));
  days.sort((a, b) => {
    const ai = DAY_ORDER.indexOf(a);
    const bi = DAY_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return days;
}

export function CoastMap({ activities }: { activities: Activity[] }) {
  const [selected, setSelected] = useState<PlaceId>("venue");
  const panelRef = useRef<HTMLDivElement>(null);
  const place = PLACES.find((p) => p.id === selected) ?? PLACES[PLACES.length - 1];
  const here = activities.filter((a) => placeOf(a) === place.id);
  const days = sortedDays(activities);

  function open(id: PlaceId) {
    setSelected(id);
    panelRef.current?.focus();
  }

  return (
    <div className="coast">
      <div className="coast-chart-column">
        <div className="coast-canvas">
          <CoastChart />
          {PLACES.map((p) => (
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

        <nav className="coast-index" aria-label="Places on the chart">
          {PLACES.map((p) => (
            <button
              key={p.id}
              type="button"
              className="coast-index-item"
              aria-pressed={selected === p.id}
              aria-controls="coast-place-panel"
              onClick={() => open(p.id)}
            >
              <span className="coast-index-kind">{p.kind}</span>
              <span className="coast-index-name">{p.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="coast-panel" id="coast-place-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
        <p className="coast-panel-kind">{place.kind}</p>
        <h3 className="coast-panel-name">{place.name}</h3>
        <p className="coast-panel-blurb">{place.blurb}</p>

        {place.id === "venue" ? (
          <div className="coast-venue">
            <dl className="coast-facts">
              <div>
                <dt>Date</dt>
                <dd>{site.weddingDate}</dd>
              </div>
              <div>
                <dt>Ceremony</dt>
                <dd>{site.ceremonyTime}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{site.address}</dd>
              </div>
            </dl>
            <a className="coast-link" href={site.mapUrl} target="_blank" rel="noreferrer">
              Open the venue in Google Maps
            </a>
            {days.length > 0 ? (
              <>
                <h4 className="coast-panel-sub">The weekend, in order</h4>
                <ol className="coast-schedule">
                  {days.map((day) => (
                    <li key={day}>
                      <p className="coast-schedule-day">{day}</p>
                      <ul className="coast-schedule-list">
                        {activities
                          .filter((a) => a.date === day)
                          .map((a) => (
                            <li key={a.title + a.time}>
                              <span className="coast-schedule-time">{a.time}</span>
                              <span className="coast-schedule-body">
                                <strong>{a.title}</strong>
                                <span className="coast-schedule-place">{a.location}</span>
                                <span className="coast-schedule-text">{a.description}</span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </>
            ) : null}
          </div>
        ) : null}

        {place.notes.map((n) => (
          <div className="coast-note" key={n.title}>
            <h4>{n.title}</h4>
            <p>{n.text}</p>
          </div>
        ))}

        {place.list ? (
          <div className="coast-note">
            <h4>{place.list.heading}</h4>
            <ul className="coast-bullets">
              {place.list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {here.length > 0 && place.id !== "venue" ? (
          <div className="coast-note">
            <h4>Happening here</h4>
            <ul className="coast-here">
              {here.map((a) => (
                <li key={a.title + a.time}>
                  <span className="coast-here-when">
                    {a.date} · {a.time}
                  </span>
                  <strong>{a.title}</strong>
                  <span className="coast-here-text">{a.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {place.photo ? (
          <div className="coast-panel-photo">
            <Image
              src={photos[place.photo].src}
              alt={photos[place.photo].alt}
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
      <text className="coast-chart-text coast-chart-n" x="902" y="578" textAnchor="middle">
        N
      </text>
      <text className="coast-chart-text" x="120" y="688" letterSpacing="6">
        PACIFIC OCEAN
      </text>
    </svg>
  );
}

