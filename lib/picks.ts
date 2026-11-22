import { island, type Passage, type Place } from "@/content/island";
import { POINTS, type PointKey } from "./island";
import { openNumbers, placeId } from "./plannable";

/**
 * Our picks, sorted into the parts of the island the picks map shows
 * (content/island.ts, `explorer.regions`). A place belongs to the part whose
 * points include its `at`. Worked out once on the server; the map only shows.
 */

export type PickPlace = {
  id: string;
  name: string;
  href?: string;
  area: string;
  price?: string;
  what: string;
  order?: string;
  hours?: string;
  book?: string;
  open: number[] | null;
};
export type PickOut = { id: string; title: string; first: string; rest: string; open: number[] | null };
export type PickRegion = { id: string; name: string; short: string; note: string; eat: PickPlace[]; out: PickOut[] };
/** A dot on the map for each point with picks; `open` is null if any of them has no known days. */
export type PickDot = { key: PointKey; x: number; y: number; region: string; open: number[] | null };

/** "First sentence." and the rest, for a day out's card. */
function split(text: string): { first: string; rest: string } {
  const m = /^([\s\S]+?[.!?])\s+([\s\S]+)$/.exec(text);
  return m ? { first: m[1], rest: m[2] } : { first: text, rest: "" };
}

export function picksByRegion(): { regions: PickRegion[]; dots: PickDot[] } {
  const regions = island.explorer.regions;
  const regionOf = (at: PointKey | undefined) => regions.find((r) => at && (r.points as PointKey[]).includes(at));
  const order = (at: PointKey | undefined, r: (typeof regions)[number]) => (r.points as PointKey[]).indexOf(at!);

  const places: (PickPlace & { at: PointKey })[] = island.eat.groups.flatMap((g) =>
    (g.places as Place[]).map((p) => ({
      id: placeId(p),
      name: p.name,
      href: p.href,
      area: p.area,
      price: p.price,
      what: p.what,
      order: p.order,
      hours: p.hours,
      book: p.book,
      open: openNumbers(p),
      at: p.at,
    })),
  );
  const store = island.eat.poke.store;
  places.push({ id: store.id, name: store.name, href: store.href, area: store.area, what: store.what, hours: store.hours, open: null, at: store.at });

  const outs = (island.explore.passages as readonly Passage[])
    .filter((p) => p.id && p.at)
    .map((p) => ({ id: p.id!, title: p.title, ...split(p.text), open: openNumbers(p), at: p.at! }));

  const out: PickRegion[] = regions.map((r) => ({
    id: r.id,
    name: r.name,
    short: r.short,
    note: r.note,
    eat: places.filter((p) => regionOf(p.at)?.id === r.id).sort((a, b) => order(a.at, r) - order(b.at, r)).map(({ at: _at, ...p }) => p),
    out: outs.filter((p) => regionOf(p.at)?.id === r.id).sort((a, b) => order(a.at, r) - order(b.at, r)).map(({ at: _at, ...p }) => p),
  }));

  // One dot per point that has picks.
  const byPoint = new Map<PointKey, (number[] | null)[]>();
  for (const p of [...places, ...outs]) byPoint.set(p.at, [...(byPoint.get(p.at) ?? []), p.open]);
  const dots: PickDot[] = [];
  for (const [key, opens] of byPoint) {
    const region = regionOf(key);
    if (!region) continue;
    const [x, y] = POINTS[key];
    const open = opens.some((o) => o === null) ? null : [...new Set(opens.flatMap((o) => o ?? []))].sort();
    dots.push({ key, x, y, region: region.id, open });
  }
  return { regions: out, dots };
}
