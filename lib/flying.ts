import { flying } from "@/content/flying";
import { site } from "@/content/site";
import { hawaiiClock, hawaiiNoon, sunTimes } from "./sun";

/**
 * How far each city is from the lawn, and what its clocks say when the sun
 * sets on the wedding day. Worked out on the server, so the picker on the
 * Travel page only has to choose between ready-made rows.
 */

export type Crossing = {
  code: string;
  city: string;
  /** Great-circle miles to the venue, to the nearest ten. */
  miles: number;
  /** Whole or half hours that Hawaiʻi is behind this city on the wedding day. */
  hoursBehind: number;
  /** The clock at home when the sun sets at Kualoa: "11:14 PM". */
  sunsetAtHome: string;
  /** True when that is already the next calendar day at home. */
  nextDay: boolean;
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in statute miles (haversine, mean Earth radius). */
export function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(h));
}

/** Minutes a time zone is ahead of UTC at a given instant. */
function offsetMinutes(tz: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at.getTime()) / 60_000);
}

export function crossings(): { sunset: string; rows: Crossing[] } {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  const { sunset } = sunTimes(hawaiiNoon(year, month, day), site.coordinates.lat, site.coordinates.lng);
  const here = offsetMinutes("Pacific/Honolulu", sunset);

  const rows = flying.airports.map((a) => {
    const there = offsetMinutes(a.tz, sunset);
    const clock = new Intl.DateTimeFormat("en-US", { timeZone: a.tz, hour: "numeric", minute: "2-digit" })
      .format(sunset)
      .replace(/\s/g, " ");
    const dayAt = (tz: string) =>
      new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(sunset);
    return {
      code: a.code,
      city: a.city,
      miles: Math.round(milesBetween(a, site.coordinates) / 10) * 10,
      hoursBehind: (there - here) / 60,
      sunsetAtHome: clock,
      nextDay: dayAt(a.tz) !== dayAt("Pacific/Honolulu"),
    };
  });
  return { sunset: hawaiiClock(sunset), rows };
}
