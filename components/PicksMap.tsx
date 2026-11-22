"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./CoastMap.css";
import { fill } from "@/lib/fill";
import type { PointKey } from "@/lib/island";
import type { PickDot, PickRegion } from "@/lib/picks";
import { CoastChart } from "./IslandChart";
import { RegionChart } from "./RegionChart";
import { REGION_MAPS } from "./region-maps";
import { AddToWeek } from "./WeekPlanner";

type Words = {
  indexLabel: string;
  whole: string;
  wholeHint: string;
  eat: string;
  out: string;
  more: string;
  order: string;
  eatCount: string;
  eatOne: string;
  outCount: string;
  outOne: string;
};

/** Where each part's pin sits on the whole-island chart (percent), and which side its name reads. */
const PINS: Record<string, { x: number; y: number; side: "left" | "right" | "below" }> = {
  waikiki: { x: 65, y: 85, side: "below" },
  town: { x: 52, y: 86.5, side: "left" },
  southeast: { x: 74.5, y: 74, side: "right" },
  windward: { x: 71, y: 52, side: "left" },
  kualoa: { x: 72, y: 30, side: "right" },
  north: { x: 47, y: 19, side: "right" },
};

/** The island's main roads on the overview: H-1, H-2, H-3, the coast road, and around the east end. */
const OVERVIEW_ROADS = [
  "M300 556 C360 556 420 552 460 548 C500 548 530 566 560 572 C600 578 640 574 668 568",
  "M466 548 C458 480 446 400 436 320 C432 260 430 200 428 152",
  "M428 152 C480 140 540 130 600 128 C650 134 690 156 712 192 C730 226 736 262 726 290 C712 310 694 330 684 352",
  "M482 556 C540 490 610 430 684 376",
  "M668 568 C700 560 730 548 752 530 C772 510 782 488 780 466 C776 446 764 434 744 430",
  "M300 556 C260 540 230 520 210 490 C190 460 170 420 158 380",
];
const OVERVIEW_LABELS: { x: number; y: number; t: string; k: string; r?: number; a?: "start" | "middle" | "end" }[] = [
  { x: 420, y: 196, t: "Haleʻiwa", k: "small", a: "end" },
  { x: 420, y: 352, t: "Wahiawā", k: "small", a: "end" },
  { x: 128, y: 286, t: "Kaʻena Point", k: "small", a: "start" },
  { x: 232, y: 400, t: "Waiʻanae Range", k: "small", r: 62 },
  { x: 610, y: 270, t: "Koʻolau Range", k: "small", r: 66 },
  { x: 380, y: 548, t: "H-1", k: "feature" },
];

/** Where a pick sits on its part's close-up map: its own spot, or its neighborhood with a small fan-out. */
function spotOf(regionId: string, id: string, at: PointKey, nth: number): [number, number] {
  const map = REGION_MAPS[regionId];
  const own = map?.spots[id];
  if (own) return own;
  const [x, y] = map?.anchors[at] ?? [500, 360];
  const a = nth * 2.4;
  return [x + Math.cos(a) * 22 * Math.min(nth, 1), y + Math.sin(a) * 22 * Math.min(nth, 1)];
}

/**
 * Our picks on a drawn Oʻahu. Choose a part of the island and the chart
 * zooms to a close-up of it, with every pick there a numbered pin; the list
 * beside it (below it on a phone) scrolls on its own, so the map stays in
 * view. Tap a pin to bring its card up; point at a card to light its pin.
 * "Whole island" goes back to the overview, where each part is a pin.
 * The "Open on…" filter around this fades the pins and cards closed that day.
 */
export function PicksMap({ regions, dots, words, labels }: { regions: PickRegion[]; dots: PickDot[]; words: Words; labels: { closed: string } }) {
  const [selected, setSelected] = useState(regions[0]?.id);
  const [zoomed, setZoomed] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const region = regions.find((r) => r.id === selected) ?? regions[0];
  const picks = [...region.eat.map((p) => ({ ...p, kind: "eat" as const, label: p.name })), ...region.out.map((o) => ({ ...o, kind: "out" as const, label: o.title }))];
  const numberOf = (id: string) => picks.findIndex((p) => p.id === id) + 1;

  const counts = (r: PickRegion) =>
    [
      r.eat.length ? (r.eat.length === 1 ? words.eatOne : fill(words.eatCount, { n: r.eat.length })) : null,
      r.out.length ? (r.out.length === 1 ? words.outOne : fill(words.outCount, { n: r.out.length })) : null,
    ]
      .filter(Boolean)
      .join(" · ");

  /** Choose a part: zoom the chart to it and start its list from the top. */
  function choose(id: string) {
    flushSync(() => {
      setSelected(id);
      setZoomed(true);
      setActive(null);
    });
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTo({ top: 0 });
    // On a phone the list sits under the chart; bring its top into view only if it is off screen.
    const top = panel.getBoundingClientRect().top;
    if (top > window.innerHeight - 80) panel.scrollIntoView({ block: "end" });
  }

  /** A pin was tapped: scroll the list (not the page) to its card. */
  function show(id: string) {
    setActive(id);
    const panel = panelRef.current;
    const card = panel?.querySelector<HTMLElement>(`[data-pick="${CSS.escape(id)}"]`);
    if (!panel || !card) return;
    const head = panel.querySelector<HTMLElement>(".picks-panel-head")?.offsetHeight ?? 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.scrollTo({ top: card.offsetTop - head - 8, behavior: still ? "auto" : "smooth" });
  }

  return (
    <div className="coast picks-map">
      <div className="coast-chart-column">
        <div className="coast-canvas picks-canvas">
          {zoomed && REGION_MAPS[region.id] ? (
            <>
              <RegionChart id={region.id} map={REGION_MAPS[region.id]} />
              {picks.map((p, i) => {
                const [x, y] = spotOf(region.id, p.id, p.at, i);
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={p.kind === "out" ? "pick-pin pick-pin-out" : "pick-pin"}
                    data-open={p.open?.join(" ")}
                    aria-pressed={active === p.id}
                    aria-controls="picks-panel"
                    aria-label={p.label}
                    style={{ left: `${x / 10}%`, top: `${(y / 720) * 100}%` }}
                    onClick={() => show(p.id)}
                    onMouseEnter={() => setActive(p.id)}
                  >
                    <span className="pick-pin-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="pick-pin-name" aria-hidden="true">
                      {p.label}
                    </span>
                  </button>
                );
              })}
              <button type="button" className="picks-whole" onClick={() => setZoomed(false)}>
                ← {words.whole}
              </button>
            </>
          ) : (
            <>
              <CoastChart quiet />
              <svg className="picks-dots" viewBox="0 0 1000 720" aria-hidden="true" focusable="false">
                {/* the main roads, and a few names to steer by */}
                <g>
                  {OVERVIEW_ROADS.map((d) => (
                    <path key={`c${d}`} className="rm-road-case rm-highway ov-road" d={d} />
                  ))}
                  {OVERVIEW_ROADS.map((d) => (
                    <path key={`f${d}`} className="rm-road-fill rm-highway ov-road" d={d} />
                  ))}
                  <path className="rm-crater" d="M656 586 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" />
                </g>
                {OVERVIEW_LABELS.map((l) => (
                  <text key={l.t} className={`rm-label ov-label rm-label-${l.k === "small" || l.k === "feature" ? "area" : l.k}`} x={l.x} y={l.y} textAnchor={l.a ?? "middle"} transform={l.r ? `rotate(${l.r} ${l.x} ${l.y})` : undefined}>
                    {l.t}
                  </text>
                ))}
                {dots.map((d) => (
                  <circle key={d.key} className={d.region === selected ? "picks-dot is-on" : "picks-dot"} cx={d.x} cy={d.y} r="9" data-open={d.open?.join(" ")} />
                ))}
              </svg>
              {regions.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  className="coast-pin picks-pin"
                  data-side={PINS[r.id]?.side ?? "right"}
                  aria-pressed={selected === r.id}
                  aria-controls="picks-panel"
                  aria-label={r.name}
                  style={{ left: `${PINS[r.id]?.x ?? 50}%`, top: `${PINS[r.id]?.y ?? 50}%` }}
                  onClick={() => choose(r.id)}
                >
                  <span className="coast-pin-mark" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="coast-pin-name" aria-hidden="true">
                    {r.short}
                  </span>
                </button>
              ))}
              <p className="picks-hint">{words.wholeHint}</p>
            </>
          )}
        </div>

        <div className="coast-index picks-index" role="group" aria-label={words.indexLabel}>
          {regions.map((r, i) => (
            <button
              key={r.id}
              type="button"
              className="coast-index-item"
              aria-pressed={selected === r.id && zoomed}
              aria-controls="picks-panel"
              onClick={() => choose(r.id)}
            >
              <span className="coast-index-kind">
                {i + 1} · {counts(r)}
              </span>
              <span className="coast-index-name">{r.name}</span>
              <span className="coast-index-short">
                {i + 1} {r.short}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="coast-panel picks-panel" id="picks-panel" ref={panelRef} tabIndex={-1} aria-label={region.name}>
        <div className="picks-panel-head">
          <p className="coast-panel-kind">{counts(region)}</p>
          <h3 className="coast-panel-name">{region.name}</h3>
        </div>
        <div className="picks-panel-body">
          <p className="coast-panel-blurb">{region.note}</p>

          {region.eat.length ? (
            <>
              <p className="picks-kind">{words.eat}</p>
              <ul className="picks-cards">
                {region.eat.map((p) => (
                  <li
                    className={active === p.id ? "place pick is-active" : "place pick"}
                    key={p.id}
                    data-pick={p.id}
                    data-open={p.open?.join(" ")}
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                  >
                    {p.open ? <p className="place-closed">{labels.closed}</p> : null}
                    <div className="place-head">
                      <span className="pick-n" aria-hidden="true">
                        {numberOf(p.id)}
                      </span>
                      {p.href ? (
                        <a className="place-name" href={p.href} target="_blank" rel="noreferrer">
                          {p.name}
                        </a>
                      ) : (
                        <span className="place-name">{p.name}</span>
                      )}
                      <AddToWeek id={p.id} />
                    </div>
                    <p className="pick-meta">
                      {p.area}
                      {p.price ? ` · ${p.price}` : ""}
                    </p>
                    <p className="place-what">{p.what}</p>
                    {p.order ? (
                      <p className="place-order">
                        <span>{words.order}</span> {p.order}
                      </p>
                    ) : null}
                    {p.hours || p.book ? (
                      <p className="place-when">
                        {p.hours}
                        {p.hours && p.book ? " · " : ""}
                        {p.book}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {region.out.length ? (
            <>
              <p className="picks-kind">{words.out}</p>
              <ul className="picks-cards">
                {region.out.map((o) => (
                  <li
                    className={active === o.id ? "place pick pick-out is-active" : "place pick pick-out"}
                    key={o.id}
                    data-pick={o.id}
                    data-open={o.open?.join(" ")}
                    onMouseEnter={() => setActive(o.id)}
                    onFocus={() => setActive(o.id)}
                  >
                    {o.open ? <p className="place-closed">{labels.closed}</p> : null}
                    <div className="place-head">
                      <span className="pick-n" aria-hidden="true">
                        {numberOf(o.id)}
                      </span>
                      <h4 className="place-name">{o.title}</h4>
                      <AddToWeek id={o.id} />
                    </div>
                    <p className="place-what">{o.first}</p>
                    {o.rest ? (
                      <details className="pick-more">
                        <summary>{words.more}</summary>
                        <p>{o.rest}</p>
                      </details>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
