"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./CoastMap.css";
import { fill } from "@/lib/fill";
import type { PickDot, PickRegion } from "@/lib/picks";
import { CoastChart } from "./IslandChart";
import { AddToWeek } from "./WeekPlanner";

type Words = {
  indexLabel: string;
  eat: string;
  out: string;
  more: string;
  order: string;
  eatCount: string;
  eatOne: string;
  outCount: string;
  outOne: string;
};

/** Where each part's pin sits on the chart (percent of its width and height), and which side its name reads. */
const PINS: Record<string, { x: number; y: number; side: "left" | "right" | "below" }> = {
  waikiki: { x: 65, y: 85, side: "below" },
  town: { x: 52, y: 86.5, side: "left" },
  southeast: { x: 74.5, y: 74, side: "right" },
  windward: { x: 71, y: 52, side: "left" },
  kualoa: { x: 72, y: 30, side: "right" },
  north: { x: 47, y: 19, side: "right" },
};

/**
 * Our picks on a drawn Oʻahu: the island in five parts, each a pin. Choose
 * one and its restaurants and days out open beside the chart (below it on a
 * phone), with "Add to my week" on each. Every pick is a dot on the chart,
 * and the "Open on…" filter around this fades the dots and cards closed that
 * day. Built like the coast map on Travel, and works by keyboard the same way.
 */
export function PicksMap({ regions, dots, words, labels }: { regions: PickRegion[]; dots: PickDot[]; words: Words; labels: { closed: string } }) {
  const [selected, setSelected] = useState(regions[0]?.id);
  const panelRef = useRef<HTMLDivElement>(null);
  const region = regions.find((r) => r.id === selected) ?? regions[0];

  const counts = (r: PickRegion) =>
    [
      r.eat.length ? (r.eat.length === 1 ? words.eatOne : fill(words.eatCount, { n: r.eat.length })) : null,
      r.out.length ? (r.out.length === 1 ? words.outOne : fill(words.outCount, { n: r.out.length })) : null,
    ]
      .filter(Boolean)
      .join(" · ");

  function open(id: string) {
    flushSync(() => setSelected(id));
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus({ preventScroll: true });
    const top = panel.getBoundingClientRect().top;
    const clearance = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    if (top < clearance || top > window.innerHeight * 0.6) panel.scrollIntoView({ block: "start" });
  }

  return (
    <div className="coast picks-map">
      <div className="coast-chart-column">
        <div className="coast-canvas">
          <CoastChart />
          <svg className="picks-dots" viewBox="0 0 1000 720" aria-hidden="true" focusable="false">
            {dots.map((d) => (
              <circle
                key={d.key}
                className={d.region === selected ? "picks-dot is-on" : "picks-dot"}
                cx={d.x}
                cy={d.y}
                r="9"
                data-open={d.open?.join(" ")}
              />
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
              onClick={() => open(r.id)}
            >
              <span className="coast-pin-mark" aria-hidden="true">
                {i + 1}
              </span>
              <span className="coast-pin-name" aria-hidden="true">
                {r.short}
              </span>
            </button>
          ))}
        </div>

        <div className="coast-index" role="group" aria-label={words.indexLabel}>
          {regions.map((r, i) => (
            <button
              key={r.id}
              type="button"
              className="coast-index-item"
              aria-pressed={selected === r.id}
              aria-controls="picks-panel"
              onClick={() => open(r.id)}
            >
              <span className="coast-index-kind">
                {i + 1} · {counts(r)}
              </span>
              <span className="coast-index-name">{r.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="coast-panel picks-panel" id="picks-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
        <p className="coast-panel-kind">{counts(region)}</p>
        <h3 className="coast-panel-name">{region.name}</h3>
        <p className="coast-panel-blurb">{region.note}</p>

        {region.eat.length ? (
          <>
            <p className="picks-kind">{words.eat}</p>
            <ul className="picks-cards">
              {region.eat.map((p) => (
                <li className="place pick" key={p.id} data-open={p.open?.join(" ")}>
                  {p.open ? <p className="place-closed">{labels.closed}</p> : null}
                  <div className="place-head">
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
                <li className="place pick pick-out" key={o.id} data-open={o.open?.join(" ")}>
                  {o.open ? <p className="place-closed">{labels.closed}</p> : null}
                  <div className="place-head">
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
  );
}
