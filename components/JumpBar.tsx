"use client";

import { useEffect, useRef, useState } from "react";

export type JumpItem = { id: string; label: string; numeral?: string };

/**
 * "On this page": the page's sections in a row that sticks under the header,
 * so a guest can see where they are and jump anywhere. The section they are
 * reading is highlighted and kept in view in the row.
 *
 * The links are plain anchors, so without JavaScript the row still sticks and
 * still jumps; only the highlight needs the script.
 */
export function JumpBar({ items, label }: { items: JumpItem[]; label: string }) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      // A section counts as reached a little before its top meets the bar: jumps
      // land just under it, and a chapter still fading in sits a few pixels low.
      const offset = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 48;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= offset) current = item.id;
      }
      // At the foot of the page the last section counts as reached, even if it is short.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const last = items[items.length - 1];
      if (atEnd && current && last && document.getElementById(last.id)) current = last.id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the highlighted link in view along the row, without moving the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLElement>(`[data-jump="${CSS.escape(active)}"]`);
    if (!link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: still ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav className="contents jump" id="contents" aria-label={label} ref={navRef}>
      <p className="contents-label">{label}</p>
      <ol ref={listRef}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-jump={item.id}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setActive(item.id)}
            >
              {item.numeral ? (
                <span className="contents-numeral" aria-hidden="true">
                  {item.numeral}
                </span>
              ) : null}
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
