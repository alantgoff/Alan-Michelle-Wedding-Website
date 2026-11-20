"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { fill } from "@/lib/fill";

export type OpenOnDay = { offset: number; weekday: number; short: string; date: number };
export type OpenOnWords = { label: string; any: string; wedding: string; count: string; all: string };

const noop = () => () => {};

/**
 * "Open on…": tap a day of the week we're there and the restaurants closed
 * that day fade back, with a line saying so. The fading is CSS, keyed on the
 * day's weekday against each place's `data-open` list. Without JavaScript the
 * chips never appear and every place shows as usual.
 */
export function OpenOn({
  days,
  opens,
  words,
  children,
}: {
  days: OpenOnDay[];
  /** Each place's open weekdays (0 = Sunday), or null when its hours aren't known. */
  opens: (number[] | null)[];
  words: OpenOnWords;
  children: ReactNode;
}) {
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const [picked, setPicked] = useState<OpenOnDay | null>(null);
  const total = opens.length;
  const open = picked ? opens.filter((o) => o === null || o.includes(picked.weekday)).length : total;

  return (
    <div className="open-on" data-day={picked?.weekday}>
      {ready ? (
        <div className="open-on-bar">
          <p className="open-on-label" id="open-on-label">
            {words.label}
          </p>
          <div className="open-on-days" role="group" aria-labelledby="open-on-label">
            <button type="button" className="open-on-day open-on-any" aria-pressed={picked === null} onClick={() => setPicked(null)}>
              {words.any}
            </button>
            {days.map((d) => (
              <button
                type="button"
                key={d.offset}
                className={`open-on-day${d.offset === 0 ? " is-wedding" : ""}`}
                aria-pressed={picked?.offset === d.offset}
                onClick={() => setPicked(picked?.offset === d.offset ? null : d)}
              >
                <span className="open-on-wd">{d.short}</span>
                <span className="open-on-date">{d.date}</span>
                {d.offset === 0 ? <span className="open-on-mark">{words.wedding}</span> : null}
              </button>
            ))}
          </div>
          <p className="open-on-count" aria-live="polite">
            {picked ? fill(words.count, { n: open, total }) : fill(words.all, { total })}
          </p>
        </div>
      ) : null}
      {children}
    </div>
  );
}
