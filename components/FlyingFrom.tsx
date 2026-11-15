"use client";

import { useEffect, useId, useState } from "react";
import type { Crossing } from "@/lib/flying";

const STORAGE_KEY = "wedding-flying-from";

/** The far end of the ruler, in miles: a little past the furthest city. */
const SPAN = 5400;
const W = 760;
const H = 190;
const SEA = 138; // the waterline
const LEFT = 78; // where the lawn is
const RIGHT = W - 124; // room beyond the furthest city for its name
const xAt = (miles: number) => Math.round(LEFT + (miles / SPAN) * (RIGHT - LEFT));

const words = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
function hoursInWords(h: number): string {
  const whole = Math.floor(h);
  const half = h - whole >= 0.5;
  const n = words[whole] ?? String(whole);
  if (half) return whole === 0 ? "half an hour" : `${n} and a half hours`;
  return `${n} hour${whole === 1 ? "" : "s"}`;
}

/**
 * "How far you are coming": pick a city and the crossing is drawn, with the
 * miles and what the clocks will say. The choice is remembered on the guest's
 * own device only. Without JavaScript the full table underneath still reads.
 */
export function FlyingFrom({
  rows,
  sunset,
  title,
  intro,
  prompt,
  tableLabel,
}: {
  rows: Crossing[];
  sunset: string;
  title: string;
  intro: string;
  prompt: string;
  tableLabel: string;
}) {
  const [code, setCode] = useState("");
  const selectId = useId();
  const row = rows.find((r) => r.code === code);

  // After mount, so the server and the browser draw the same first frame.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && rows.some((r) => r.code === saved)) setCode(saved);
    } catch {
      // Private mode or blocked storage: the picker still works, it just forgets.
    }
  }, [rows]);

  function choose(next: string) {
    setCode(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, next);
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // See above.
    }
  }

  const x = row ? xAt(row.miles) : RIGHT;
  // Higher for a longer crossing, like a longer throw.
  const lift = row ? 34 + (row.miles / SPAN) * 78 : 0;
  const midX = (x + LEFT) / 2;
  const arc = `M${x} ${SEA - 6} Q${midX} ${SEA - 6 - lift * 2} ${LEFT + 14} ${SEA - 5}`;
  // The bird rides the top of the arc.
  const birdY = SEA - 6 - lift;

  return (
    <div className="flying">
      <h3>{title}</h3>
      <p>{intro}</p>

      <p className="flying-pick">
        <label htmlFor={selectId}>Flying from</label>
        <select id={selectId} value={code} onChange={(e) => choose(e.target.value)}>
          <option value="">Choose a city</option>
          {rows.map((r) => (
            <option key={r.code} value={r.code}>
              {r.city} ({r.code})
            </option>
          ))}
        </select>
      </p>

      <svg className="flying-chart" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <g filter="url(#ink)">
          {/* The sea, ruled off every thousand miles. */}
          <path className="ink fine" d={`M${LEFT - 60} ${SEA} H${W - 6}`} />
          {[1000, 2000, 3000, 4000, 5000].map((m) => (
            <path key={m} className="ink hair" d={`M${xAt(m)} ${SEA} v7`} />
          ))}
          <path
            className="ink hair"
            d={`M${xAt(600)} ${SEA + 42} c9 -6 18 6 27 0 M${xAt(2500)} ${SEA + 44} c9 -6 18 6 27 0 c9 -6 18 6 27 0 M${xAt(4400)} ${SEA + 41} c9 -6 18 6 27 0`}
          />
        </g>
        <g filter="url(#ink)">
          <use href="#m-mokolii" x={-70} y={-84} width={140} height={100} transform={`translate(${LEFT - 30} ${SEA}) scale(0.55)`} />
        </g>
        <g className="flying-miles">
          {[1000, 2000, 3000, 4000, 5000].map((m) => (
            <text key={m} x={xAt(m)} y={SEA + 24} textAnchor="middle">
              {m.toLocaleString("en-US")}
              {m === 5000 ? " miles" : ""}
            </text>
          ))}
        </g>
        {row ? (
          <g key={row.code} className="flying-arc">
            <g filter="url(#ink)">
              <path className="ink fine flying-path" d={arc} pathLength={1} />
            </g>
            <circle className="ink-dot" cx={x} cy={SEA - 6} r="4.5" />
            <g className="flying-bird" filter="url(#ink)">
              <use href="#m-iwa" x={-50} y={-20} width={100} height={40} transform={`translate(${midX} ${birdY - 12}) scale(0.5)`} />
            </g>
            <text className="flying-home" x={x + 11} y={SEA - 11}>
              {row.city}
            </text>
          </g>
        ) : null}
      </svg>

      <div className="flying-result" aria-live="polite">
        {row ? (
          <>
            <p className="flying-figure">
              <span className="flying-number">{row.miles.toLocaleString("en-US")}</span> miles, in a straight line
            </p>
            <ul>
              <li>
                {row.hoursBehind === 0
                  ? "No need to touch your watch: we keep the same time."
                  : `Set your watch back ${hoursInWords(row.hoursBehind)} when you land.`}
              </li>
              <li>
                When the sun sets on our wedding day, at {sunset} at Kualoa, it will be {row.sunsetAtHome}
                {row.nextDay ? " the next morning" : ""} in {row.city}.
              </li>
            </ul>
          </>
        ) : (
          <p className="flying-prompt">{prompt}</p>
        )}
      </div>

      <details className="flying-table">
        <summary>{tableLabel}</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">From</th>
              <th scope="col">Miles</th>
              <th scope="col">Hawaiʻi is behind by</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code}>
                <th scope="row">{r.city}</th>
                <td>{r.miles.toLocaleString("en-US")}</td>
                <td>{hoursInWords(r.hoursBehind)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
