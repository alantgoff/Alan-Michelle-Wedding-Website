"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { hawaiiClock, hawaiiNoon, hawaiiToday, sunTimes } from "@/lib/sun";

/**
 * A live line about the light at the venue, right now.
 *
 * Rendered empty on the server and filled in after mount, so the server's
 * clock never disagrees with the browser's. Refreshes every half minute.
 */
export function NowAtKualoa() {
  const [line, setLine] = useState<{ clock: string; light: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const { year, month, day } = hawaiiToday(now);
      const { sunrise, sunset } = sunTimes(hawaiiNoon(year, month, day), site.coordinates.lat, site.coordinates.lng);
      const minutesLeft = Math.round((sunset.getTime() - now.getTime()) / 60_000);
      const minutesUntilRise = Math.round((sunrise.getTime() - now.getTime()) / 60_000);

      let light: string;
      if (minutesUntilRise > 0) {
        light = `Still dark over the bay; the sun comes up at ${hawaiiClock(sunrise)}.`;
      } else if (minutesLeft > 60) {
        const h = Math.floor(minutesLeft / 60);
        const m = minutesLeft % 60;
        light = `${h} hour${h === 1 ? "" : "s"}${m >= 15 ? ` and ${m} minutes` : ""} of daylight left.`;
      } else if (minutesLeft > 0) {
        light = `Golden hour. The sun sets at ${hawaiiClock(sunset)}.`;
      } else {
        light = `The sun went down at ${hawaiiClock(sunset)}; the bay is under stars.`;
      }
      setLine({ clock: hawaiiClock(now), light });
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="now" aria-live="off">
      {line ? (
        <>
          Right now at Kualoa it is <strong>{line.clock}</strong>. {line.light}
        </>
      ) : null}
    </p>
  );
}
