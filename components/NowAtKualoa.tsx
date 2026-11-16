"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { sky } from "@/content/sky";
import { fill } from "@/lib/fill";
import { hawaiiClock, hawaiiNoon, hawaiiToday, sunTimes } from "@/lib/sun";

/**
 * A live line about the light at the venue, right now.
 *
 * Rendered empty on the server and filled in after mount, so the server's
 * clock never disagrees with the browser's. Refreshes every half minute.
 * A guest in another time zone also sees their own clock beside Kualoa's.
 */
export function NowAtKualoa() {
  const [line, setLine] = useState<{ clock: string; home: string | null; light: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const { year, month, day } = hawaiiToday(now);
      const { sunrise, sunset } = sunTimes(hawaiiNoon(year, month, day), site.coordinates.lat, site.coordinates.lng);
      const minutesLeft = Math.round((sunset.getTime() - now.getTime()) / 60_000);
      const minutesUntilRise = Math.round((sunrise.getTime() - now.getTime()) / 60_000);

      let light: string;
      const words = sky.now;
      if (minutesUntilRise > 0) {
        light = fill(words.dark, { time: hawaiiClock(sunrise) });
      } else if (minutesLeft > 60) {
        const h = Math.floor(minutesLeft / 60);
        const m = minutesLeft % 60;
        light = fill(words.left, {
          hours: h,
          unit: h === 1 ? words.hour : words.hours,
          minutes: m >= 15 ? fill(words.minutes, { minutes: m }) : "",
        });
      } else if (minutesLeft > 0) {
        light = fill(words.setting, { time: hawaiiClock(sunset) });
      } else {
        light = fill(words.gone, { time: hawaiiClock(sunset) });
      }
      // The visitor's own clock, when it differs: Hawaiʻi is UTC−10 all year.
      const elsewhere = now.getTimezoneOffset() !== 600;
      const home = elsewhere
        ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(now).replace(/\s/g, " ")
        : null;
      setLine({ clock: hawaiiClock(now), home, light });
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="now" aria-live="off">
      {line ? (
        <>
          {sky.now.lead} <strong>{line.clock}</strong>
          {line.home ? ` ${fill(sky.now.yours, { home: line.home })}` : ""}. {line.light}
        </>
      ) : null}
    </p>
  );
}
