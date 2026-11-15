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

  /** The line under the panel once the wedding day has passed. */
  after: "The day has come and gone. This is what early October usually brings to this side of the island.",

  /**
   * Practical notes, shown whichever panel is up. The figures come from
   * eleven Octobers of hourly records at the Kāneʻohe Bay weather station.
   */
  notes: [
    "Most October rain on this coast falls at night. At the Kāneʻohe Bay weather station about three-fifths of it arrives between 8 PM and 8 AM, and only about one late-afternoon hour in twenty brings measurable rain. The ranch, tucked under the cliffs, gets a good deal more, but a shower there is usually a passing one.",
    "Humidity is the thing to dress for, more than heat. Linen and anything loose will serve you well.",
    "The trade wind blows from the east-northeast most days and is strongest in the early afternoon. After dark it eases, so a light layer is for comfort rather than cold.",
  ],

  /** The wind here has a name of its own. */
  wind: {
    name: "Holopali",
    text: "In the old chant of Oʻahu’s winds, each place has a wind of its own. Here it is Holopali, the wind of Kaʻaʻawa and Kualoa.",
    credit: "From The Wind Gourd of Laʻamaomao, by Moses K. Nakuina, translated by Esther T. Mookini and Sarah Nākoa.",
  },
} as const;
