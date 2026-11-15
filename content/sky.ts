/**
 * THE SKY ON THE NIGHT — Friday, October 6, 2028, at Kualoa.
 *
 * These are astronomical facts for that date and that place, checked against
 * two independent sources. They are not computed by the site: if the wedding
 * date ever changes, every figure here must be looked up again. (The star
 * chart’s own numbers live in skyChart.ts and carry the same warning.)
 */

export type Tide = { time: string; kind: "high" | "low"; feet: number };
export type MoonNight = { day: string; sunset: string; moonrise: string; lit: number; ours?: boolean };

export const sky = {
  /** Start of civil twilight: when the sky first lightens. */
  firstLight: "6:02 AM",
  sunrise: "6:24 AM",
  sunset: "6:14 PM",
  /** End of civil twilight: when the last usable light goes. */
  lastLight: "6:36 PM",
  moonrise: "8:12 PM",
  /** Fraction of the moon's face that is lit, 0–1. Three nights past full. */
  moonLit: 0.88,
  moonPhrase: "nine-tenths full",

  /**
   * When the sun drops behind the ridge and the lawn falls into shade. An
   * estimate from a coarse terrain model, good to a quarter of an hour at
   * best: worth checking on the lawn itself before the timeline is fixed.
   */
  ridgeShade: "5:15 PM",

  /**
   * The tide in Kāneʻohe Bay on the day: NOAA’s predictions for Mokuoloʻe
   * (Coconut Island), in feet above the average of the lowest daily tides.
   */
  tides: [
    { time: "4:08 AM", kind: "high", feet: 2.2 },
    { time: "10:09 AM", kind: "low", feet: 1.1 },
    { time: "2:25 PM", kind: "high", feet: 1.5 },
    { time: "9:18 PM", kind: "low", feet: 0 },
  ] satisfies Tide[],

  /** The moon over the weekend: it rises later and a little slimmer each night. */
  moons: [
    { day: "Thursday", sunset: "6:15 PM", moonrise: "7:29 PM", lit: 0.94 },
    { day: "Friday", sunset: "6:14 PM", moonrise: "8:12 PM", lit: 0.88, ours: true },
    { day: "Saturday", sunset: "6:13 PM", moonrise: "8:59 PM", lit: 0.81 },
    { day: "Sunday", sunset: "6:12 PM", moonrise: "9:52 PM", lit: 0.72 },
  ] satisfies MoonNight[],

  heading: "A moon for the dancing",
  text: "The sun sets at 6:14 and the last light is gone about twenty minutes later. Then, around 8:12, the moon comes up out of the sea to the east-northeast, nine-tenths full, if the trade-wind clouds allow.",

  /** From the Hawaiian Dictionary (Pukui & Elbert). */
  saying: "Pali ke kua, mahina ke alo.",
  sayingMeans: "“The back a cliff, the front a moon”",
  sayingNote:
    "An old Hawaiian compliment for a handsome person. At Palikū, with the ridge behind us and the moon rising over the sea, that will be every one of us.",

  /** The island page's chapter on the day's light, tide and stars. */
  chapter: {
    lede:
      "The lawn looks east, with the ridge at our backs and the open Pacific in front. That gives the day a shape of its own: sunrise out of the sea, early shade, a short dusk, and a moon that comes up over the water.",
    dayTitle: "The day, in one line",
    dayText:
      "The line is the tide in Kāneʻohe Bay on our wedding day, from before dawn until after moonrise, with the sun and the moon marked above it. The water is on its way out all evening.",
    tideCredit:
      "Tide times are NOAA’s predictions for Mokuoloʻe (Coconut Island) in Kāneʻohe Bay, in feet above the average of the day’s lowest tides. The curve between them is drawn by rule of thumb.",
    moonsTitle: "The moon, night by night",
    moonsText:
      "The moon was full on the Tuesday before. Each night of the weekend it rises about three-quarters of an hour later and a little slimmer.",
    chartTitle: "Overhead at nine",
    chartText:
      "Hold this over your head with the ridge behind you and it matches the sky above the lawn at nine o’clock. East is on the left because you are looking up, not down. A bright moon and the lights of a party hide the faint stars; these are the ones that hold their own.",
    lookFor: [
      { name: "The moon", text: "Low over the sea to the east-northeast, nine-tenths full, up since 8:12." },
      { name: "Saturn", text: "Above the moon and to its right. It shines steadily where the stars around it twinkle." },
      { name: "The Pleiades", text: "The little cluster just below the moon, rising with it. Beside so bright a moon it is a faint smudge; binoculars help." },
      { name: "The Summer Triangle", text: "Vega, Deneb and Altair, three bright stars high in the west, over the ridge." },
      { name: "Scorpius", text: "Low in the southwest, the Scorpion’s curled tail is sinking toward the ridge. Its red heart, Antares, has already gone behind it." },
      { name: "Fomalhaut", text: "The one bright star in an otherwise empty stretch of the southern sky." },
      { name: "Polaris", text: "Due north and low: about as many degrees above the horizon as Kualoa is north of the equator, twenty-one and a half." },
    ],
  },
};
