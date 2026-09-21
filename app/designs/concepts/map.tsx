"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "./map.css";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { faqs } from "@/content/faq";
import { story } from "@/content/story";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import { photos, type PhotoKey } from "@/content/photos";

/* ============================================================
   THE MAP — organised by place, not by topic.

   The surface is a drawn chart of the windward coast. Every
   point on it is a real button; choosing one opens what happens
   there, and moves focus into it. Content that belongs to no
   single place — the story, the dress code, the questions, the
   registry — sits in a separate ledger below the chart.
   ============================================================ */

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

export default function MapDesign({ activities }: { activities: Activity[] }) {
  const [selected, setSelected] = useState<PlaceId>("venue");
  const panelRef = useRef<HTMLDivElement>(null);
  const place = PLACES.find((p) => p.id === selected) ?? PLACES[PLACES.length - 1];
  const here = activities.filter((a) => placeOf(a) === place.id);
  const days = sortedDays(activities);

  /** Open a place and take the reader there, however the layout is stacked. */
  function open(id: PlaceId) {
    setSelected(id);
    panelRef.current?.focus();
  }

  return (
    <div className="map-root">
      <header className="map-masthead">
        <div className="map-masthead-text">
          <p className="map-eyebrow">A chart of the weekend</p>
          <h1 className="map-couple">{site.couple}</h1>
          <p className="map-when">
            {site.weddingDate} · {site.ceremonyTime}
          </p>
          <p className="map-where">
            {site.venue}, {site.location}
          </p>
          <p className="map-welcome">{site.welcome}</p>
        </div>
        <figure className="map-plate">
          <div className="map-plate-image">
            <Image src={photos.hero.src} alt={photos.hero.alt} fill sizes="(max-width: 900px) 100vw, 420px" />
          </div>
          <figcaption>{site.tagline}</figcaption>
        </figure>
      </header>

      <div className="map-atlas">
        <section className="map-chart-column" aria-labelledby="map-chart-heading">
          <h2 className="map-chart-heading" id="map-chart-heading">
            The windward coast
          </h2>
          <p className="map-chart-note">
            An illustration, not a navigational chart. The coastline is drawn by feel, distances are
            invented, and nothing here should be used to find your way. Choose a point to read what
            happens there.
          </p>

          <div className="map-canvas">
            <CoastChart />
            {PLACES.map((p) => (
              <button
                key={p.id}
                type="button"
                className="map-pin"
                data-side={p.side}
                data-star={p.star ? "true" : undefined}
                aria-pressed={selected === p.id}
                aria-controls="map-place-panel"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => open(p.id)}
              >
                <span className="map-pin-mark" aria-hidden="true" />
                <span className="map-pin-name">{p.short}</span>
              </button>
            ))}
          </div>

          <nav className="map-index" aria-label="Places on the chart">
            {PLACES.map((p) => (
              <button
                key={p.id}
                type="button"
                className="map-index-item"
                aria-pressed={selected === p.id}
                aria-controls="map-place-panel"
                onClick={() => open(p.id)}
              >
                <span className="map-index-kind">{p.kind}</span>
                <span className="map-index-name">{p.name}</span>
              </button>
            ))}
          </nav>
        </section>

        <div className="map-panel" id="map-place-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
          <p className="map-panel-kind">{place.kind}</p>
          <h2 className="map-panel-name">{place.name}</h2>
          <p className="map-panel-blurb">{place.blurb}</p>

          {place.id === "venue" ? (
            <div className="map-venue">
              <dl className="map-facts">
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
              <p className="map-panel-link">
                <a href={site.mapUrl} target="_blank" rel="noreferrer">
                  Open the venue in Google Maps
                </a>
              </p>
              <h3 className="map-panel-sub">Everything, in order</h3>
              <ol className="map-schedule">
                {days.map((day) => (
                  <li key={day}>
                    <p className="map-schedule-day">{day}</p>
                    <ul className="map-schedule-list">
                      {activities
                        .filter((a) => a.date === day)
                        .map((a) => (
                          <li key={a.title + a.time}>
                            <span className="map-schedule-time">{a.time}</span>
                            <span className="map-schedule-body">
                              <strong>{a.title}</strong>
                              <span className="map-schedule-place">{a.location}</span>
                              <span className="map-schedule-text">{a.description}</span>
                              {a.link ? (
                                <a href={a.link} target="_blank" rel="noreferrer">
                                  More about this
                                </a>
                              ) : null}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {place.notes.map((n) => (
            <div className="map-note" key={n.title}>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          ))}

          {place.list ? (
            <div className="map-note">
              <h3>{place.list.heading}</h3>
              <ul className="map-bullets">
                {place.list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {here.length > 0 && place.id !== "venue" ? (
            <div className="map-note">
              <h3>Happening here</h3>
              <ul className="map-here">
                {here.map((a) => (
                  <li key={a.title + a.time}>
                    <span className="map-here-when">
                      {a.date} · {a.time}
                    </span>
                    <strong>{a.title}</strong>
                    <span className="map-here-text">{a.description}</span>
                    {a.link ? (
                      <a href={a.link} target="_blank" rel="noreferrer">
                        More about this
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {place.photo ? (
            <div className="map-panel-photo">
              <Image
                src={photos[place.photo].src}
                alt={photos[place.photo].alt}
                fill
                sizes="(max-width: 1000px) 100vw, 480px"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="map-ledger">
        <div className="map-ledger-head">
          <h2>Off the chart</h2>
          <p>
            The parts of a wedding that do not sit in any one place: how we got here, what to wear,
            what people keep asking, and the registry.
          </p>
          <ul className="map-ledger-index">
            <li>
              <a href="#map-story">Our story</a>
            </li>
            <li>
              <a href="#map-dress">What to wear</a>
            </li>
            <li>
              <a href="#map-questions">Questions</a>
            </li>
            <li>
              <a href="#map-registry">Registry</a>
            </li>
          </ul>
        </div>

        <section className="map-entry" id="map-story" aria-labelledby="map-story-h">
          <h3 className="map-entry-title" id="map-story-h">
            Our story
          </h3>
          <ol className="map-story">
            {story.map((moment) => (
              <li key={moment.title}>
                {moment.photo ? (
                  <div className="map-story-photo">
                    <Image
                      src={photos[moment.photo].src}
                      alt={photos[moment.photo].alt}
                      fill
                      sizes="(max-width: 760px) 90vw, 300px"
                    />
                  </div>
                ) : null}
                <div className="map-story-text">
                  <p className="map-story-date">{moment.date}</p>
                  <h4>{moment.title}</h4>
                  <p>{moment.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="map-entry" id="map-dress" aria-labelledby="map-dress-h">
          <h3 className="map-entry-title" id="map-dress-h">
            What to wear
          </h3>
          <div className="map-dress">
            <div>
              <p className="map-dress-title">{dressCode.title}</p>
              <p className="map-dress-intro">{dressCode.intro}</p>
              <div className="map-dress-cols">
                <div>
                  <h4>Lean into</h4>
                  <ul className="map-bullets">
                    {dressCode.lean.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Maybe skip</h4>
                  <ul className="map-bullets">
                    {dressCode.skip.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h4>Colors we are drawn to</h4>
              <ul className="map-colors">
                {dressCode.colors.map((c) => (
                  <li key={c}>
                    <span style={{ background: c }} aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="map-entry-photo">
              <Image
                src={photos.dressCode.src}
                alt={photos.dressCode.alt}
                fill
                sizes="(max-width: 900px) 100vw, 320px"
              />
            </div>
          </div>
        </section>

        <section className="map-entry" id="map-questions" aria-labelledby="map-questions-h">
          <h3 className="map-entry-title" id="map-questions-h">
            Questions
          </h3>
          <dl className="map-faq">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="map-entry" id="map-registry" aria-labelledby="map-registry-h">
          <h3 className="map-entry-title" id="map-registry-h">
            Registry
          </h3>
          <div className="map-registry">
            {registries.map((r) => (
              <article key={r.name}>
                <h4>{r.name}</h4>
                <p>{r.text}</p>
                <a href={r.url} target="_blank" rel="noreferrer">
                  Open registry
                </a>
              </article>
            ))}
          </div>
          <div className="map-entry-photo map-entry-photo-wide">
            <Image
              src={photos.registry.src}
              alt={photos.registry.alt}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
        </section>
      </div>

      <footer className="map-foot">
        <p>
          {site.couple} · {site.weddingDate} · {site.venue}, {site.location}
        </p>
      </footer>
    </div>
  );
}

/* ---------- The drawn chart ---------------------------------
   Stylised, hand-feeling, and deliberately inexact: a long
   windward coast, a bay bitten out of it, the ridge running
   down the spine. Decorative only — every way in is one of the
   buttons layered over it, so the drawing itself is hidden from
   assistive software.
   ------------------------------------------------------------ */

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
    <svg className="map-chart" viewBox="0 0 1000 720" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="map-swell" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path d="M0 13 h26" stroke="#9ec1d2" strokeWidth="1" fill="none" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="1000" height="720" fill="#dceaf1" />
      <rect x="0" y="0" width="1000" height="720" fill="url(#map-swell)" opacity="0.55" />

      {/* the island, drawn twice so the line looks pressed by hand */}
      <path className="map-chart-land" d={ISLAND} />
      <path className="map-chart-outline" d={ISLAND} transform="translate(4 3) rotate(0.5 500 360)" />

      {/* the barrier reef, drawn across the water off the bay */}
      <path className="map-chart-reef" d="M746 436 C700 400 660 360 640 300" />
      <path className="map-chart-reef" d="M770 424 C728 390 686 342 666 286" />
      <circle className="map-chart-speck" cx="690" cy="380" r="3" />
      <circle className="map-chart-speck" cx="714" cy="410" r="2.6" />
      <circle className="map-chart-speck" cx="668" cy="330" r="2.4" />
      <circle className="map-chart-speck" cx="652" cy="300" r="2.2" />

      {/* the islet off the point, the one everyone photographs */}
      <path className="map-chart-land" d="M664 200 l12 -19 l12 19 Z" />

      {/* the two ranges */}
      <g className="map-chart-ridge">
        {koolau.map(([x, y], i) => (
          <path key={`k${i}`} d={`M${x - 18} ${y + 11} L${x} ${y - (11 + (i % 3) * 3)} L${x + 18} ${y + 11}`} />
        ))}
        {waianae.map(([x, y], i) => (
          <path key={`w${i}`} d={`M${x - 14} ${y + 9} L${x} ${y - (8 + (i % 2) * 4)} L${x + 14} ${y + 9}`} />
        ))}
      </g>

      {/* swell marks in the open water */}
      <g className="map-chart-wave">
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
      <g className="map-chart-compass" transform="translate(902 628)">
        <circle r="38" />
        <circle r="28" />
        <path d="M0 -34 L9 0 L0 34 L-9 0 Z" className="map-chart-needle" />
        <path d="M-34 0 L0 -8 L34 0 L0 8 Z" />
      </g>
      <text className="map-chart-text map-chart-n" x="902" y="578" textAnchor="middle">
        N
      </text>
      <text className="map-chart-text" x="120" y="688" letterSpacing="6">
        PACIFIC OCEAN
      </text>
    </svg>
  );
}
