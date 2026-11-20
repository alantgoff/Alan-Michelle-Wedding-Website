import { site } from "@/content/site";
import { hawaiiClock, hawaiiNoon, sunTimes } from "./sun";

/**
 * The week we suggest guests make of it: from the Saturday before the
 * wedding to the Sunday after. Everything that is laid out by day (the Week
 * page, My week, "Open on…", the sunrise and sunset table) reads its days from
 * here, so moving the wedding in content/site.ts moves them all.
 */
export const WEEK_FROM = -6;
export const WEEK_TO = 2;

export type WeekDay = {
  /** Days from the wedding: -6 … 2. */
  offset: number;
  /** "2028-10-06" */
  iso: string;
  /** 0 = Sunday */
  weekday: number;
  /** "Fri" */
  short: string;
  /** 6 */
  date: number;
  /** "Friday, October 6" */
  label: string;
  /** "Friday, Oct 6" */
  medium: string;
  sunrise: string;
  sunset: string;
};

export function suggestedWeek(): WeekDay[] {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  const short = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });
  const long = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
  const medium = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" });
  const days: WeekDay[] = [];
  for (let offset = WEEK_FROM; offset <= WEEK_TO; offset += 1) {
    const date = new Date(Date.UTC(year, month - 1, day + offset));
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    const { sunrise, sunset } = sunTimes(hawaiiNoon(y, m, d), site.coordinates.lat, site.coordinates.lng);
    days.push({
      offset,
      iso: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      weekday: date.getUTCDay(),
      short: short.format(date),
      date: d,
      label: long.format(date),
      medium: medium.format(date),
      sunrise: hawaiiClock(sunrise),
      sunset: hawaiiClock(sunset),
    });
  }
  return days;
}
