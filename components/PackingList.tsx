"use client";

import { useEffect, useState } from "react";
import { fill } from "@/lib/fill";

const STORAGE_KEY = "wedding-packing";

/**
 * A packing list guests can tick off. Ticks are remembered on the device
 * only — nothing is sent anywhere. Reads storage after mount so the server
 * and the browser render the same first frame.
 */
export function PackingList({
  items,
  status,
}: {
  items: readonly string[];
  /** The line above the list: nothing packed, all packed, and "{packed} of {total} packed". */
  status: { none: string; all: string; some: string };
}) {
  const [packed, setPacked] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) setPacked(new Set(saved.filter((s) => items.includes(s))));
    } catch {
      // Private mode or blocked storage: the list still works, it just forgets.
    }
  }, [items]);

  function toggle(item: string) {
    setPacked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // See above.
      }
      return next;
    });
  }

  return (
    <div className="packing-wrap">
      <p className="packing-count" aria-live="polite">
        {packed.size === 0
          ? status.none
          : packed.size === items.length
            ? status.all
            : fill(status.some, { packed: packed.size, total: items.length })}
      </p>
      <ul className="packing">
        {items.map((item) => (
          <li key={item}>
            <label>
              <input type="checkbox" checked={packed.has(item)} onChange={() => toggle(item)} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
