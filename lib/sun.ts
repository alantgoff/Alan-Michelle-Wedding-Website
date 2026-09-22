/**
 * Sunrise and sunset at the venue.
 *
 * The standard sunrise equation, good to a minute or two — plenty for
 * telling guests when the light goes. Everything about Hawaiʻi time is
 * simple: it is UTC−10 all year, with no daylight saving, so a local calendar
 * date maps to a fixed UTC instant without a time-zone library.
 */

const DAY_MS = 86_400_000;
const J2000 = 2_451_545;
const HAWAII_OFFSET_HOURS = -10;

export type SunTimes = { sunrise: Date; sunset: Date };

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const fromJulian = (jd: number) => new Date((jd - 2_440_587.5) * DAY_MS);

/** Sunrise and sunset on the day containing `at`, for a point on Earth. */
export function sunTimes(at: Date, lat: number, lng: number): SunTimes {
  // Days since J2000 for the calendar day of `at`. Callers pass local noon,
  // so rounding lands on the right day at any longitude.
  const jd = at.getTime() / DAY_MS + 2_440_587.5;
  const n = Math.round(jd - J2000);
  const meanSolarTime = n - lng / 360;
  const meanAnomaly = (357.5291 + 0.98560028 * meanSolarTime) % 360;
  const m = rad(meanAnomaly);
  const centre = 1.9148 * Math.sin(m) + 0.02 * Math.sin(2 * m) + 0.0003 * Math.sin(3 * m);
  const eclipticLng = rad((meanAnomaly + centre + 180 + 102.9372) % 360);
  const transit = J2000 + meanSolarTime + 0.0053 * Math.sin(m) - 0.0069 * Math.sin(2 * eclipticLng);
  const declination = Math.asin(Math.sin(eclipticLng) * Math.sin(rad(23.4397)));
  const hourAngle = deg(
    Math.acos(
      (Math.sin(rad(-0.833)) - Math.sin(rad(lat)) * Math.sin(declination)) /
        (Math.cos(rad(lat)) * Math.cos(declination)),
    ),
  );
  return {
    sunrise: fromJulian(transit - hourAngle / 360),
    sunset: fromJulian(transit + hourAngle / 360),
  };
}

/** Noon in Hawaiʻi on a calendar date, as an instant. Month is 1–12. */
export function hawaiiNoon(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 12 - HAWAII_OFFSET_HOURS));
}

/** Today's calendar date in Hawaiʻi, whatever the visitor's own clock says. */
export function hawaiiToday(now = new Date()): { year: number; month: number; day: number } {
  const local = new Date(now.getTime() + HAWAII_OFFSET_HOURS * 3_600_000);
  return { year: local.getUTCFullYear(), month: local.getUTCMonth() + 1, day: local.getUTCDate() };
}

/** "6:14 PM", in Hawaiʻi time. */
export function hawaiiClock(date: Date): string {
  // Intl puts a narrow no-break space before AM/PM; a plain space sets better.
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Pacific/Honolulu",
    hour: "numeric",
    minute: "2-digit",
  })
    .format(date)
    .replace(/\u202f/g, " ");
}
