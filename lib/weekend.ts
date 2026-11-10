import { site } from "@/content/site";
import { hawaiiClock, hawaiiNoon, sunTimes } from "./sun";

/**
 * Turns the day names used in content/activities.ts ("Thursday", "Saturday")
 * into real calendar dates around the wedding, with that evening's sunset.
 *
 * Everything follows `isoDate` in content/site.ts, so moving the wedding
 * moves every heading with it.
 */

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function weddingParts() {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  return { year, month, day };
}

/** Days from the wedding to the nearest day with this name, from -3 to +3. */
export function offsetFromWedding(dayName: string): number | null {
  const target = WEEKDAYS.indexOf(dayName);
  if (target < 0) return null;
  const { year, month, day } = weddingParts();
  const weddingWeekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const forward = (target - weddingWeekday + 7) % 7;
  return forward > 3 ? forward - 7 : forward;
}

/** "Friday, October 6" and "6:14 PM" for a day name, or null if it is not one. */
export function weekendDay(dayName: string): { label: string; sunset: string } | null {
  const offset = offsetFromWedding(dayName);
  if (offset === null) return null;
  const { year, month, day } = weddingParts();
  const date = new Date(Date.UTC(year, month - 1, day + offset));
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
  const { sunset } = sunTimes(
    hawaiiNoon(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()),
    site.coordinates.lat,
    site.coordinates.lng,
  );
  return { label, sunset: hawaiiClock(sunset) };
}

/** Minutes past midnight for "5:30 PM"; unparseable times ("TODO") sort last. */
export function minutesOf(time: string): number {
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return Number.POSITIVE_INFINITY;
  const hour = (Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0);
  return hour * 60 + Number(m[2]);
}

/** A stable page anchor for an event title: "Family dinner" → "family-dinner". */
export function anchorFor(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
