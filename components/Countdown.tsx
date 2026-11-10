"use client";

import { useEffect, useState } from "react";
import { fullMoonsBetween } from "@/lib/moon";

const DAY_MS = 86_400_000;

type Unit = { value: number; label: string };

/**
 * Days until the wedding, computed in the browser so the server's clock is
 * never baked into the page. Knows what to say on the day and afterwards.
 *
 * A small surprise for anyone who taps it: the count turns into weeks, then
 * into full moons over the Koʻolau, then back to days.
 */
export function Countdown({ target }: { target: string }) {
  const [days, setDays] = useState<number | null>(null);
  const [moons, setMoons] = useState(0);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDays(Math.ceil((new Date(target).getTime() - now.getTime()) / DAY_MS));
      setMoons(fullMoonsBetween(now, new Date(target)));
    };
    update();
    const id = setInterval(update, 3_600_000);
    return () => clearInterval(id);
  }, [target]);

  if (days === null) {
    return (
      <div className="countdown">
        <strong>—</strong>
        <span>days until we celebrate</span>
      </div>
    );
  }
  if (days < 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">Married</strong>
        <span>and so glad you were there</span>
      </div>
    );
  }
  if (days === 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">Today</strong>
        <span>see you on the lawn</span>
      </div>
    );
  }

  // Only offer a unit while it still says something: no "0 weeks".
  const units: Unit[] = [{ value: days, label: days === 1 ? "day until we celebrate" : "days until we celebrate" }];
  const weeks = Math.floor(days / 7);
  if (weeks >= 2) units.push({ value: weeks, label: "weeks until we celebrate" });
  if (moons >= 2) units.push({ value: moons, label: "full moons until we celebrate" });
  const shown = units[turn % units.length];

  return (
    <button
      type="button"
      className="countdown countdown-turn"
      title={units.length > 1 ? "Count another way" : undefined}
      aria-live="polite"
      onClick={() => setTurn((t) => t + 1)}
    >
      <strong key={shown.label}>{shown.value}</strong>
      <span>{shown.label}</span>
    </button>
  );
}
