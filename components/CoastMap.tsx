"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import "./CoastMap.css";
import { CoastChart } from "./IslandChart";
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
  // What happens here, in the order of the week. The full story of each
  // is on the Week page; the chart only names it.
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
    // Its scroll margin is what keeps it clear of the header and section bar.
    const clearance = parseFloat(getComputedStyle(panel).scrollMarginTop) || 0;
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
            {/* A plain link: only a real page load sets :target on the Week page. */}
            <a className="coast-link" href="/week">
              {words.week} →
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
                  <a href={`/week#${anchorFor(a.title)}`}>{a.title}</a>
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
