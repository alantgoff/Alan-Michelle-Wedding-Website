"use client";

import { useEffect, useState } from "react";
import { home } from "@/content/home";
import { fullMoonsBetween } from "@/lib/moon";
import { hawaiiToday } from "@/lib/sun";

const DAY_MS = 86_400_000;

type Unit = { value: number; label: string };

/**
 * Days until the wedding, computed in the browser so the server's clock is
 * never baked into the page. Knows what to say on the day and afterwards.
 *
 * Counts Hawaiʻi calendar days, not 24-hour blocks to the ceremony, so it
 * reads "1" all day before, "Today" all through the wedding day and
 * "Married" from midnight after, wherever the guest happens to be.
 *
 * A small surprise for anyone who taps it: the count turns into weeks, then
 * into full moons over the Koʻolau, then back to days.
 */
export function Countdown({ target }: { target: string }) {
  const [days, setDays] = useState<number | null>(null);
  const [moons, setMoons] = useState(0);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const [ty, tm, td] = target.slice(0, 10).split("-").map(Number);
    const update = () => {
      const now = new Date();
      const { year, month, day } = hawaiiToday(now);
      setDays(Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(year, month - 1, day)) / DAY_MS));
      setMoons(fullMoonsBetween(now, new Date(target)));
    };
    update();
    // Every minute, so the count turns over at Hawaiʻi midnight, not up to an hour later.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [target]);

  if (days === null) {
    return (
      <div className="countdown">
        <strong>—</strong>
        <span>{home.countdown.days}</span>
      </div>
    );
  }
  if (days < 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">{home.countdown.after.word}</strong>
        <span>{home.countdown.after.line}</span>
      </div>
    );
  }
  if (days === 0) {
    return (
      <div className="countdown">
        <strong className="countdown-word">{home.countdown.today.word}</strong>
        <span>{home.countdown.today.line}</span>
      </div>
    );
  }

  // Only offer a unit while it still says something: no "0 weeks".
  const units: Unit[] = [{ value: days, label: days === 1 ? home.countdown.day : home.countdown.days }];
  const weeks = Math.floor(days / 7);
  if (weeks >= 2) units.push({ value: weeks, label: home.countdown.weeks });
  if (moons >= 2) units.push({ value: moons, label: home.countdown.moons });
  const shown = units[turn % units.length];

  return (
    <button
      type="button"
      className="countdown countdown-turn"
      title={units.length > 1 ? home.countdown.another : undefined}
      aria-live="polite"
      onClick={() => setTurn((t) => t + 1)}
    >
      <strong key={shown.label}>{shown.value}</strong>
      <span>{shown.label}</span>
    </button>
  );
}
