/**
 * Counting full moons, for the countdown.
 *
 * Uses the mean lunar cycle from a known full moon. A real full moon can land
 * up to about half a day either side of the mean, so the count is exact
 * except within hours of a full moon at either end — fine for saying how
 * many moons stand between today and the wedding.
 */
const SYNODIC_MONTH_MS = 29.530588853 * 86_400_000;
const KNOWN_FULL_MOON = Date.UTC(2000, 0, 21, 4, 41);

/** Full moons that rise after `from` and on or before `to`. */
export function fullMoonsBetween(from: Date, to: Date): number {
  const first = Math.ceil((from.getTime() - KNOWN_FULL_MOON) / SYNODIC_MONTH_MS);
  const last = Math.floor((to.getTime() - KNOWN_FULL_MOON) / SYNODIC_MONTH_MS);
  return Math.max(0, last - first + 1);
}
