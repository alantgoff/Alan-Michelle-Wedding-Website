import { site } from "@/content/site";
import { weather } from "@/content/weather";
import { fill } from "@/lib/fill";
import { daysUntil, getForecast } from "@/lib/forecast";
import { hawaiiClock, hawaiiNoon, sunTimes } from "@/lib/sun";

/**
 * The weather on the wedding day.
 *
 * Two panels behind one heading. Until the day is inside the forecast models'
 * reach it shows what early October typically does here; from then on it shows
 * the actual forecast, fetched hourly. The switch is automatic — there is
 * nothing to turn on, and nothing to take down afterwards.
 *
 * If the forecast cannot be fetched for any reason, the typical panel simply
 * stays up. A guest never sees an error where the weather should be.
 */
export async function WeatherPanel() {
  const day = site.isoDate.slice(0, 10);
  const [year, month, date] = day.split("-").map(Number);
  const { sunrise, sunset } = sunTimes(hawaiiNoon(year, month, date), site.coordinates.lat, site.coordinates.lng);
  const forecast = await getForecast(day, site.coordinates.lat, site.coordinates.lng);
  const away = daysUntil(day);

  const f = weather.forecast;
  const sun = { label: weather.sunset.label, value: hawaiiClock(sunset), note: fill(weather.sunset.note, { time: hawaiiClock(sunrise) }) };
  const stats = forecast
    ? [
        { label: f.high.label, value: `${forecast.high}°F`, note: f.high.note },
        { label: f.low.label, value: `${forecast.low}°F`, note: f.low.note },
        { label: f.rain.label, value: `${forecast.rainChance}%`, note: forecast.rainInches >= 0.4 ? f.rain.wet : f.rain.dry },
        { label: f.wind.label, value: `${forecast.windMph} mph`, note: f.wind.note },
        sun,
      ]
    : [...weather.typical.map((t) => ({ label: t.label, value: t.value, note: t.note })), sun];

  return (
    <div className="weather">
      <p className="weather-status">
        {forecast ? (
          fill(f.status, { date: site.weddingDate, when: away === 0 ? f.today : away === 1 ? f.tomorrow : "" })
        ) : away < 0 ? (
          weather.after
        ) : (
          weather.standin
        )}
      </p>

      <dl className="weather-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>
              <span className="weather-figure">{stat.value}</span>
              <span className="weather-note">{stat.note}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="weather-lines">
        {weather.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

    </div>
  );
}
