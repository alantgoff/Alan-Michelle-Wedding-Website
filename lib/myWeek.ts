/**
 * The "My week" list: what a guest has saved on the Island page, kept in
 * their own browser (localStorage) and nowhere else.
 *
 * Shaped for useSyncExternalStore: `read` returns the same array until the
 * stored value changes, `subscribe` hears this tab (a custom event) and other
 * tabs (the storage event). If storage is blocked, the list still works for
 * the visit and is forgotten on reload.
 */

export type Saved = { id: string; name: string; note?: string };

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

function valid(item: unknown): item is Saved {
  return typeof item === "object" && item !== null && typeof (item as Saved).id === "string" && typeof (item as Saved).name === "string";
}

export function read(): Saved[] {
  const raw = load();
  if (raw === lastRaw) return lastList;
  lastRaw = raw;
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    lastList = Array.isArray(parsed) ? parsed.filter(valid) : [];
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

export function toggle(item: Saved) {
  const list = read();
  store(list.some((s) => s.id === item.id) ? list.filter((s) => s.id !== item.id) : [...list, item]);
}

export function remove(id: string) {
  store(read().filter((s) => s.id !== id));
}

export function clear() {
  store([]);
}
