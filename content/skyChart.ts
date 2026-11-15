/**
 * THE SKY OVER THE LAWN — computed, not written.
 *
 * Where the bright stars, the planets and the moon stand at 9:00 PM Hawaiʻi
 * time on 2028-10-06, seen from 21.5205, -157.8378. `alt` is height above the
 * horizon and `az` the compass bearing, both in degrees; `hidden` means
 * behind the ridge. Positions were worked out with the astronomy-engine
 * library from J2000 star coordinates (Yale Bright Star Catalog).
 *
 * If the wedding date, the hour shown or the venue's coordinates change,
 * these numbers must be computed again: they cannot be edited by hand.
 */

export type SkyBody = { id: string; name: string; kind: "star" | "planet"; alt: number; az: number; mag: number; hidden: boolean };

export const skyChart = {
  time: "9:00 PM",
  bodies: [
    {id: "polaris", name: "Polaris", kind: "star", alt: 21.6, az: 0.7, mag: 2, hidden: false},
    {id: "vega", name: "Vega", kind: "star", alt: 48.6, az: 304.9, mag: 0, hidden: false},
    {id: "altair", name: "Altair", kind: "star", alt: 62.4, az: 246.9, mag: 0.8, hidden: false},
    {id: "deneb", name: "Deneb", kind: "star", alt: 63.9, az: 339, mag: 1.3, hidden: false},
    {id: "fomalhaut", name: "Fomalhaut", kind: "star", alt: 35.1, az: 157.4, mag: 1.2, hidden: false},
    {id: "alcyone", name: "Pleiades", kind: "star", alt: 5.6, az: 66.1, mag: 1.6, hidden: false},
    {id: "hamal", name: "Hamal", kind: "star", alt: 27.3, az: 73.7, mag: 2, hidden: false},
    {id: "alpheratz", name: "Alpheratz", kind: "star", alt: 54.2, az: 69.4, mag: 2.1, hidden: false},
    {id: "mirach", name: "Mirach", kind: "star", alt: 41, az: 60.7, mag: 2.1, hidden: false},
    {id: "almach", name: "Almach", kind: "star", alt: 30.5, az: 52.4, mag: 2.1, hidden: false},
    {id: "schedar", name: "Schedar", kind: "star", alt: 41, az: 32.1, mag: 2.2, hidden: false},
    {id: "caph", name: "Caph", kind: "star", alt: 43.2, az: 26.2, mag: 2.3, hidden: false},
    {id: "navi", name: "Gamma Cassiopeiae", kind: "star", alt: 37.3, az: 28.4, mag: 2.4, hidden: false},
    {id: "ruchbah", name: "Ruchbah", kind: "star", alt: 34.1, az: 30.5, mag: 2.7, hidden: false},
    {id: "markab", name: "Markab", kind: "star", alt: 67.4, az: 101.9, mag: 2.5, hidden: false},
    {id: "scheat", name: "Scheat", kind: "star", alt: 68.4, az: 67.3, mag: 2.4, hidden: false},
    {id: "algenib", name: "Algenib", kind: "star", alt: 51.6, az: 92.3, mag: 2.8, hidden: false},
    {id: "enif", name: "Enif", kind: "star", alt: 78.2, az: 166.5, mag: 2.4, hidden: false},
    {id: "sadr", name: "Sadr", kind: "star", alt: 65.9, az: 325.3, mag: 2.2, hidden: false},
    {id: "gienah", name: "Gienah", kind: "star", alt: 73.7, az: 323, mag: 2.5, hidden: false},
    {id: "albireo", name: "Albireo", kind: "star", alt: 61.5, az: 289.4, mag: 3.1, hidden: false},
    {id: "rasalhague", name: "Rasalhague", kind: "star", alt: 32.7, az: 271.4, mag: 2.1, hidden: false},
    {id: "kochab", name: "Kochab", kind: "star", alt: 17.8, az: 343.5, mag: 2.1, hidden: false},
    {id: "eltanin", name: "Eltanin", kind: "star", alt: 38.7, az: 319.6, mag: 2.2, hidden: false},
    {id: "alderamin", name: "Alderamin", kind: "star", alt: 48.7, az: 357.4, mag: 2.5, hidden: false},
    {id: "mirfak", name: "Mirfak", kind: "star", alt: 17.6, az: 42.4, mag: 1.8, hidden: false},
    {id: "algol", name: "Algol", kind: "star", alt: 18.4, az: 52.2, mag: 2.1, hidden: false},
    {id: "diphda", name: "Diphda", kind: "star", alt: 29, az: 126.5, mag: 2, hidden: false},
    {id: "alnair", name: "Alnair", kind: "star", alt: 21.2, az: 173.5, mag: 1.7, hidden: false},
    {id: "peacock", name: "Peacock", kind: "star", alt: 10.7, az: 189.2, mag: 1.9, hidden: false},
    {id: "ankaa", name: "Ankaa", kind: "star", alt: 14.9, az: 148.3, mag: 2.4, hidden: false},
    {id: "nunki", name: "Nunki", kind: "star", alt: 28.9, az: 220.5, mag: 2.1, hidden: false},
    {id: "kaus-australis", name: "Kaus Australis", kind: "star", alt: 18.5, az: 219.6, mag: 1.8, hidden: false},
    {id: "sabik", name: "Sabik", kind: "star", alt: 15.7, az: 245.6, mag: 2.4, hidden: false},
    {id: "alphecca", name: "Alphecca", kind: "star", alt: 9.9, az: 294.9, mag: 2.2, hidden: true},
    {id: "antares", name: "Antares", kind: "star", alt: 2.6, az: 240.3, mag: 1.1, hidden: true},
    {id: "tau-sco", name: "Tau Scorpii", kind: "star", alt: 3.1, az: 238, mag: 2.8, hidden: true},
    {id: "eps-sco", name: "Epsilon Scorpii", kind: "star", alt: 3, az: 231.2, mag: 2.3, hidden: true},
    {id: "mu-sco", name: "Mu Scorpii", kind: "star", alt: 1.6, az: 227.8, mag: 3, hidden: true},
    {id: "eta-sco", name: "Eta Scorpii", kind: "star", alt: 2.2, az: 221.3, mag: 3.3, hidden: true},
    {id: "sargas", name: "Sargas", kind: "star", alt: 6, az: 218.9, mag: 1.9, hidden: false},
    {id: "iota-sco", name: "Iota Scorpii", kind: "star", alt: 9.2, az: 220.1, mag: 3, hidden: false},
    {id: "kappa-sco", name: "Kappa Scorpii", kind: "star", alt: 9.1, az: 221.5, mag: 2.4, hidden: false},
    {id: "shaula", name: "Shaula", kind: "star", alt: 8.9, az: 224.2, mag: 1.6, hidden: false},
    {id: "saturn", name: "Saturn", kind: "planet", alt: 18.8, az: 84, mag: -0.2, hidden: false},
  ] as SkyBody[],
  moon: {alt: 9.4, az: 69.3, lit: 0.88},
  lines: {"fishhook":["antares", "tau-sco", "eps-sco", "mu-sco", "eta-sco", "sargas", "iota-sco", "kappa-sco", "shaula"], "triangle":["vega", "deneb", "altair", "vega"], "square":["alpheratz", "scheat", "markab", "algenib", "alpheratz"], "cassiopeia":["caph", "schedar", "navi", "ruchbah"]} as Record<string, string[]>,
  /**
   * [compass bearing, height of the land above a flat horizon], in degrees:
   * the Kualoa ridge to the west and north-west, open sea to the east.
   * Sampled from a 90 m elevation model, so a sketch of the skyline.
   */
  skyline: [[0, 1], [30, 0], [180, 0], [210, 0.7], [225, 3.5], [240, 7.1], [250, 11.3], [255, 11.8], [260, 13.2], [265, 16.7], [270, 20.5], [280, 22.8], [290, 24.1], [300, 23.2], [315, 25.4], [330, 24.5], [345, 12.8], [360, 1]] as [number, number][],
  /** Clock times that evening, Hawaiʻi time. */
  events: {sunset: "6:14 PM", lastLight: "6:36 PM", fullDark: "7:28 PM", saturnRise: "7:36 PM", moonrise: "8:12 PM", pleiadesRise: "8:31 PM"},
};
