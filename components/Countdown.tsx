"use client";

import { useEffect, useState } from "react";
import { home } from "@/content/home";
import { hawaiiToday } from "@/lib/sun";

const DAY_MS = 86_400_000;

/**
 * Days until the wedding, computed in the browser so the server's clock is
 * never baked into the page. Knows what to say on the day and afterwards.
 *
 * Counts Hawaiʻi calendar days, not 24-hour blocks to the ceremony, so it
 * reads "1" all day before, "Today" all through the wedding day and
 * "Married" from midnight after, wherever the guest happens to be.
 */
export function Countdown({ target }: { target: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const [ty, tm, td] = target.slice(0, 10).split("-").map(Number);
    const update = () => {
      const { year, month, day } = hawaiiToday(new Date());
      setDays(Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(year, month - 1, day)) / DAY_MS));
    };
    update();
    // Every minute, so the count turns over at Hawaiʻi midnight, not up to an hour later.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [target]);

  if (days !== null && days < 0) {
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
  return (
    <div className="countdown">
      <strong>{days ?? "—"}</strong>
      <span>{days === 1 ? home.countdown.day : home.countdown.days}</span>
    </div>
  );
}
