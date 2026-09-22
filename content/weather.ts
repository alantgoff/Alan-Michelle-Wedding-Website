/**
 * WEATHER — what early October does on the windward coast.
 *
 * These are long-term typical conditions, not a forecast: rounded figures
 * for the Kāneʻohe / Kualoa side of the island, which runs a few degrees
 * cooler and a good deal wetter than Waikīkī. Adjust any of them freely.
 *
 * A real forecast for the wedding day appears here automatically once the
 * date comes within range — see components/WeatherPanel.tsx. Nothing needs
 * to be switched on.
 */

export const weather = {
  /** Shown until the forecast window opens. */
  typical: [
    { label: "Daytime high", value: "Mid 80s°F", note: "About 29°C. Humid, with real warmth in the sun." },
    { label: "Evening low", value: "Low 70s°F", note: "About 22°C. Pleasant once the sun is off the lawn." },
    { label: "Ocean", value: "About 80°F", note: "Warm enough to swim without thinking about it." },
    { label: "Wind", value: "10–15 mph", note: "Trade winds out of the northeast, straight off the bay." },
    { label: "Rain", value: "Brief showers", note: "The windward side catches them; they rarely last." },
  ],

  /** The line under the panel while it is still showing typical conditions. */
  standin:
    "No one can forecast a day this far out. Until about two weeks before the wedding, this is what early October usually does here — then the real forecast takes its place automatically.",

  /** Practical notes, shown whichever panel is up. */
  notes: [
    "A shower on the windward coast is usually five minutes and then sun again. Nobody runs for cover.",
    "Humidity is the thing to dress for, more than heat. Linen and anything loose will serve you well.",
    "The breeze off Kāneʻohe Bay picks up after dark, so something light over your shoulders is worth having.",
  ],
} as const;
