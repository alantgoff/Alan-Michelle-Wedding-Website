/**
 * My week: what a guest has planned, day by day, kept in their own browser
 * (localStorage) and nowhere else.
 *
 * Each entry is a place or a day out and the day it is on ("2028-10-03"), or
 * no day yet. Lists saved before days existed load as "no day yet", so
 * nothing anyone saved is lost.
 *
 * Shaped for useSyncExternalStore: `read` returns the same array until the
 * stored value changes, `subscribe` hears this tab (a custom event) and other
 * tabs (the storage event). If storage is blocked, the list still works for
 * the visit and is forgotten on reload.
 */

export type Saved = { id: string; name: string; note?: string; day?: string | null };

const KEY = "wedding-my-week";
const EVENT = "wedding-my-week";

let memory: string | null = null;
let lastRaw: string | null | undefined;
let lastList: Saved[] = [];

function load(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return memory;
  }
}

function store(list: Saved[]) {
  const raw = JSON.stringify(list);
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    memory = raw;
  }
  window.dispatchEvent(new Event(EVENT));
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function valid(item: unknown): item is Saved {
  return typeof item === "object" && item !== null && typeof (item as Saved).id === "string" && typeof (item as Saved).name === "string";
}

export function read(): Saved[] {
  const raw = load();
  if (raw === lastRaw) return lastList;
  lastRaw = raw;
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    lastList = Array.isArray(parsed)
      ? parsed.filter(valid).map((s) => ({ ...s, day: typeof s.day === "string" && ISO.test(s.day) ? s.day : null }))
      : [];
  } catch {
    lastList = [];
  }
  return lastList;
}

/** On the server, and in the first render on the client, there is no list yet. */
export const readOnServer = (): Saved[] | null => null;

export function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Put an item on a day (or on no day yet), adding it if it isn't planned. */
export function place(item: Omit<Saved, "day">, day: string | null) {
  const list = read();
  const found = list.some((s) => s.id === item.id);
  store(found ? list.map((s) => (s.id === item.id ? { ...s, day } : s)) : [...list, { ...item, day }]);
}

export function remove(id: string) {
  store(read().filter((s) => s.id !== id));
}

export function clear() {
  store([]);
}
