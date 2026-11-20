import { island, type Passage, type Place, type Weekday } from "@/content/island";
import type { PointKey } from "./island";
import { slug } from "./slug";

/**
 * Everything a guest can put on a day of My week, gathered from the content
 * files: every restaurant, Foodland's poke counter, and each day out on The
 * island that has an anchor. Each knows the weekdays it opens, so the day
 * pickers can grey out the days it is closed.
 */

const WEEKDAY_NUMBER: Record<Weekday, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type Plannable = {
  id: string;
  name: string;
  /** Where, in small type beside its locator map. */
  note?: string;
  at?: PointKey;
  /** Weekdays it opens (0 = Sunday), or null when that isn't known. */
  open: number[] | null;
  href: string;
  kind: "eat" | "out";
};

/** Open weekdays as numbers (0 = Sunday), or null when they aren't known. */
export function openNumbers(item: { open?: Weekday[] }): number[] | null {
  return item.open ? item.open.map((d) => WEEKDAY_NUMBER[d]) : null;
}

/** "Helena’s Hawaiian Food" → "helenas-hawaiian-food": the anchor of its entry on The island. */
export function placeId(p: Place): string {
  return p.id ?? slug(p.name);
}

export function plannable(): Plannable[] {
  const eat: Plannable[] = island.eat.groups.flatMap((g) =>
    g.places.map((p) => ({ id: placeId(p), name: p.name, note: p.area, at: p.at, open: openNumbers(p), href: `/island#${placeId(p)}`, kind: "eat" as const })),
  );
  const store = island.eat.poke.store;
  eat.push({ id: store.id, name: store.name, note: store.area, at: store.at, open: null, href: `/island#${store.id}`, kind: "eat" });
  const out: Plannable[] = (island.explore.passages as readonly Passage[])
    .filter((p) => p.id)
    .map((p) => ({ id: p.id!, name: p.title, at: p.at, open: openNumbers(p), href: `/island#${p.id}`, kind: "out" as const }));
  return [...eat, ...out];
}
