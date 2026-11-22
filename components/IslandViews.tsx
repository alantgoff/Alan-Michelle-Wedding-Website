"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

type View = "map" | "list";
const KEY = "wedding-island-view";

/**
 * Our picks as a map or as a list. Both are on the page; CSS shows one.
 * Without JavaScript only the list shows, as it always has. The choice is
 * remembered on the device.
 *
 * Links into the list never break: arriving at, or clicking, an address like
 * /island#hanauma whose target is in the list switches to the list first.
 */
export function IslandViews({ words, map, list }: { words: { label: string; map: string; list: string }; map: ReactNode; list: ReactNode }) {
  const [view, setView] = useState<View | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inList = (hash: string) => {
      if (!hash || hash === "#") return null;
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      return el && listRef.current?.contains(el) ? el : null;
    };
    let saved: View | null = null;
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === "map" || v === "list") saved = v;
    } catch {
      // Private mode: the map, every visit.
    }
    // Arriving at a link into the list: show it, and aim again once the parts
    // that only draw in the browser (the week strip, the day chips) have
    // pushed the page down, since the browser jumped before they were there.
    const target = inList(window.location.hash);
    setView(target ? "list" : (saved ?? "map"));
    const settle = (el: HTMLElement) => {
      requestAnimationFrame(() => requestAnimationFrame(() => el.scrollIntoView({ block: "start" })));
      window.setTimeout(() => el.scrollIntoView({ block: "start" }), 400);
    };
    if (target) settle(target);

    const onHash = () => {
      const el = inList(window.location.hash);
      if (!el) return;
      flushSync(() => setView("list"));
      settle(el);
    };
    // Capture clicks on links into the list before the browser scrolls, so the
    // list is showing by the time it looks for the target.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !inList(url.hash)) return;
      flushSync(() => setView("list"));
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      window.localStorage.setItem(KEY, v);
    } catch {
      // See above.
    }
  };

  return (
    <div className="island-views" data-view={view ?? undefined}>
      {view ? (
        <div className="views-toggle" role="group" aria-label={words.label}>
          <button type="button" aria-pressed={view === "map"} onClick={() => choose("map")}>
            {words.map}
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => choose("list")}>
            {words.list}
          </button>
        </div>
      ) : null}
      <div className="views-map">{map}</div>
      <div className="views-list" ref={listRef}>
        {list}
      </div>
    </div>
  );
}
