/**
 * THE SKY ON THE NIGHT — Friday, October 6, 2028, at Kualoa.
 *
 * These are astronomical facts for that date and that place, checked against
 * two independent sources. They are not computed by the site: if the wedding
 * date ever changes, every figure here must be looked up again. (The star
 * chart’s own numbers live in skyChart.ts and carry the same warning.)
 */

export type Tide = { time: string; kind: "high" | "low"; feet: number };
export type MoonNight = { date: string; day: string; sunset: string; moonrise: string; lit: number; ours?: boolean };

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
   * Roughly when the sun drops behind the ridge and the lawn falls into
   * shade. An estimate from a terrain model: two independent runs put it an
   * hour or more before sunset, and earlier the nearer the cliff you stand.
   * Stand on the lawn one afternoon before the timeline is fixed.
   */
  ridgeShade: "5:00 PM",

  /**
   * The tide in Kāneʻohe Bay on the day: NOAA’s predictions for Moku o Loʻe
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
    { date: "2028-10-05", day: "Thursday", sunset: "6:15 PM", moonrise: "7:29 PM", lit: 0.94 },
    { date: "2028-10-06", day: "Friday", sunset: "6:14 PM", moonrise: "8:12 PM", lit: 0.88, ours: true },
    { date: "2028-10-07", day: "Saturday", sunset: "6:13 PM", moonrise: "8:59 PM", lit: 0.81 },
    { date: "2028-10-08", day: "Sunday", sunset: "6:12 PM", moonrise: "9:52 PM", lit: 0.72 },
  ] satisfies MoonNight[],

  heading: "A moon for the dancing",
  text: "The sun sets at 6:14 and the last light is gone about twenty minutes later. Then, around 8:12, the moon comes up out of the sea to the east-northeast, nine-tenths full, if the trade-wind clouds allow.",

  /** From the Hawaiian Dictionary (Pukui & Elbert). */
  saying: "Pali ke kua, mahina ke alo.",
  sayingMeans: "“The back is a cliff, the front a moon”",
  sayingNote:
    "An old Hawaiian compliment for a handsome person. At Palikū, with the ridge behind us and the moon rising over the sea, that will be every one of us.",

  /** The island page's chapter on the day's light, tide and stars. */
  chapter: {
    lede:
      "The ridge stands at our backs to the west, and to the east the sea is open all the way to the horizon. That gives the day a shape of its own: sunrise out of the sea, early shade, a short dusk, and a moon that comes up over the water.",
    dayTitle: "The day, in one line",
    dayText:
      "The line is the tide in Kāneʻohe Bay on our wedding day, from before dawn until after moonrise, with the sun and the moon marked above it. The water is on its way out all evening.",
    tideCredit:
      "Tide times are NOAA’s predictions for Moku o Loʻe (Coconut Island) in Kāneʻohe Bay, in feet above the long-run average of each day’s lowest tide. The curve between them is drawn by rule of thumb.",
    moonsTitle: "The moon, night by night",
    moonsText:
      "That year’s Harvest Moon is full over Kualoa on the Tuesday before we marry. Each night of the weekend it rises about three-quarters of an hour later and a little slimmer. In the Hawaiian moon calendar our night falls among the three Lāʻau nights; by one Oʻahu count it is the first of them, Lāʻau Kūkahi.",
    chartTitle: "Overhead at nine",
    chartText:
      "Hold this over your head and turn it until the edge marked West points at the ridge, and it matches the sky above the lawn at nine o’clock. East is on the left because you are looking up, not down. A bright moon and the lights of a party hide the faint stars; these are the ones that hold their own.",
    lookFor: [
      { name: "The moon", text: "Low over the sea to the east-northeast, nine-tenths full, up since 8:12." },
      { name: "Saturn", text: "Above the moon and to its right. It shines steadily where the stars around it twinkle." },
      { name: "Makaliʻi, the Pleiades", text: "The little cluster below the moon and to its left, up from the sea at about half past eight. Beside so bright a moon you may need binoculars and a little patience." },
      { name: "The Summer Triangle", text: "Vega, Deneb and Altair, three bright stars high in the west, over the ridge." },
      { name: "Ka Makau Nui o Māui", text: "The big fishhook of Māui, which is Scorpius. Low in the southwest, its curled point is sinking toward the mountains; its red heart, Antares, has already gone behind them." },
      { name: "Fomalhaut", text: "The one bright star in an otherwise empty stretch of the southern sky." },
      { name: "Hōkūpaʻa, the North Star", text: "The immovable star, to Hawaiian navigators. Due north and low: about as many degrees above the horizon as Kualoa is north of the equator, twenty-one and a half." },
    ],
    /** The Hawaiian star names are the ones taught by the Polynesian Voyaging Society. */
    namesCredit:
      "Hawaiian star names as taught by the Polynesian Voyaging Society, whose star lines are a modern arrangement by the navigator Nainoa Thompson.",
    passages: [
      {
        title: "Makaliʻi",
        text: "When Makaliʻi rises at sunset, in mid-November, the Makahiki season begins: a time of peace, games and harvest, kept for the god Lono. On our evening it rises a little after half past eight, out of the sea to the east-northeast. It will reach the sunset, and Makahiki, about six weeks later.",
      },
      {
        title: "The star that is not on the chart",
        text: "Hōkūleʻa, the clear or happy star, is Arcturus, which passes almost straight over Hawaiʻi. The voyaging canoe that carries its name first met the sea here at Kualoa in 1975; its designer chose the name after dreaming of that star growing so bright that it woke him. On our evening it slips behind the cliffs before the sky is dark enough to see it.",
      },
    ],
  },
};
