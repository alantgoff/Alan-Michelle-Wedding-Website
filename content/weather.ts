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
  /**
   * The panel once the real forecast is in. The figures come from the
   * forecast; these are the words beside them. {date}, {when} and {time}
   * are filled in for you.
   */
  forecast: {
    status: "The forecast for {date}{when}, updated through the day.",
    today: " — today",
    tomorrow: " — tomorrow",
    high: { label: "High", note: "On the lawn, in the afternoon sun." },
    low: { label: "Low", note: "After dark, with the breeze off the water." },
    rain: { label: "Rain", wet: "Enough to bring a rain layer; there is a covered pavilion and a tent on the lawn.", dry: "Passing showers at most, if any." },
    wind: { label: "Wind", note: "Usually strongest in the early afternoon, easing after dark." },
  },
  /** Always shown last, from the sun's own times for the day. */
  sunset: { label: "Sunset", note: "Sunrise at {time}." },

  /** Shown until the forecast window opens. */
  typical: [
    { label: "Daytime high", value: "Mid 80s°F", note: "About 29°C. Humid, with real warmth in the sun." },
    { label: "Evening low", value: "Low 70s°F", note: "About 22°C. Pleasant once the sun is off the lawn." },
    { label: "Ocean", value: "About 80°F", note: "Warm enough to swim without thinking about it." },
    { label: "Wind", value: "10–15 mph", note: "Trade winds out of the east-northeast, straight off the ocean." },
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
    "Pluck a lehua blossom, a well-loved island story goes, and you part the lovers ʻŌhiʻa and Lehua, and their tears bring rain that same day. We will be leaving every lehua on its tree.",
  ],

  /** The wind here has a name of its own. */
  wind: {
    name: "Holopali",
    text: "In the old chant of Oʻahu’s winds, each place has a wind of its own. Here it is Holopali, the wind of Kaʻaʻawa and Kualoa.",
    credit: "From The Wind Gourd of Laʻamaomao, by Moses K. Nakuina, translated by Esther T. Mookini and Sarah Nākoa.",
  },
} as const;
