import { site } from "@/content/site";
import { weather } from "@/content/weather";
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

  const stats = forecast
    ? [
        { label: "High", value: `${forecast.high}°F`, note: "On the lawn, in the afternoon sun." },
        { label: "Low", value: `${forecast.low}°F`, note: "After dark, with the breeze off the bay." },
        {
          label: "Rain",
          value: `${forecast.rainChance}%`,
          note:
            forecast.rainInches >= 0.4
              ? "Enough to be worth a plan; the pavilion is covered."
              : "Passing showers at most, if any.",
        },
        { label: "Wind", value: `${forecast.windMph} mph`, note: "Trades out of the northeast." },
        { label: "Sunset", value: hawaiiClock(sunset), note: `Sunrise was ${hawaiiClock(sunrise)}.` },
      ]
    : [
        ...weather.typical.map((t) => ({ label: t.label, value: t.value, note: t.note })),
        { label: "Sunset", value: hawaiiClock(sunset), note: `Sunrise at ${hawaiiClock(sunrise)}.` },
      ];

  return (
    <div className="weather">
      <p className="weather-status">
        {forecast ? (
          <>
            The forecast for{" "}
            <strong>
              {site.weddingDate}
              {away === 0 ? " — today" : away === 1 ? " — tomorrow" : ""}
            </strong>
            , updated through the day.
          </>
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
