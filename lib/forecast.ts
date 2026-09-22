/**
 * The wedding-day forecast, from Open-Meteo.
 *
 * Open-Meteo is free and needs no API key, which is why it is used here:
 * nothing has to be configured or kept secret for this to work on Vercel.
 *
 * Forecast models reach roughly two weeks out, so this returns null until
 * the wedding is inside that window, and null again on any failure — a
 * missing forecast simply leaves the typical-conditions panel in place.
 */

/** How far ahead the model actually forecasts. */
const FORECAST_HORIZON_DAYS = 16;
const ENDPOINT = "https://api.open-meteo.com/v1/forecast";

export type Forecast = {
  high: number;
  low: number;
  rainChance: number;
  rainInches: number;
  windMph: number;
};

/** Days between today and a YYYY-MM-DD date, in whole days. */
export function daysUntil(isoDay: string, now = new Date()): number {
  const target = Date.parse(`${isoDay}T00:00:00Z`);
  const today = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
  return Math.round((target - today) / 86_400_000);
}

/** True once a forecast for that day could exist at all. */
export function withinForecastWindow(isoDay: string, now = new Date()): boolean {
  const days = daysUntil(isoDay, now);
  return days >= 0 && days <= FORECAST_HORIZON_DAYS;
}

const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

/** First entry of a daily array, when the response has the shape we expect. */
function first(daily: Record<string, unknown>, key: string): number | null {
  const values = daily[key];
  if (!Array.isArray(values) || !isNumber(values[0])) return null;
  return values[0];
}

/**
 * The forecast for one day at one point, or null.
 *
 * Never throws: the caller renders a panel either way, and a weather widget
 * is not worth failing a page over.
 */
export async function getForecast(isoDay: string, lat: number, lng: number): Promise<Forecast | null> {
  if (!withinForecastWindow(isoDay)) return null;

  const url = new URL(ENDPOINT);
  url.search = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "Pacific/Honolulu",
    start_date: isoDay,
    end_date: isoDay,
  }).toString();

  try {
    const response = await fetch(url, {
      // An hour is plenty: the models themselves only update a few times a day.
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;

    const body: unknown = await response.json();
    const daily = (body as { daily?: Record<string, unknown> })?.daily;
    if (!daily || typeof daily !== "object") return null;

    const high = first(daily, "temperature_2m_max");
    const low = first(daily, "temperature_2m_min");
    const windMph = first(daily, "wind_speed_10m_max");
    if (high === null || low === null || windMph === null) return null;

    return {
      high: Math.round(high),
      low: Math.round(low),
      rainChance: Math.round(first(daily, "precipitation_probability_max") ?? 0),
      rainInches: first(daily, "precipitation_sum") ?? 0,
      windMph: Math.round(windMph),
    };
  } catch {
    // Offline, rate-limited, slow, or the shape changed. The page is fine.
    return null;
  }
}
