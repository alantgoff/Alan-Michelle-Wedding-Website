"use client";

import { useSyncExternalStore } from "react";
import { fill } from "@/lib/fill";
import { clear, read, readOnServer, remove, subscribe, toggle, type Saved } from "@/lib/myWeek";

export type MyWeekWords = {
  title: string;
  empty: string;
  note: string;
  save: string;
  saved: string;
  saveLabel: string;
  remove: string;
  removeLabel: string;
  clear: string;
};

function useSaved(): Saved[] | null {
  return useSyncExternalStore(subscribe, read, readOnServer);
}

/**
 * The list itself, near the top of the page: each saved place links down to
 * its entry. Nothing renders until the browser has read the list, so without
 * JavaScript there is no empty box.
 */
export function MyWeek({ words }: { words: MyWeekWords }) {
  const saved = useSaved();
  if (saved === null) return null;
  return (
    <aside className="my-week" aria-labelledby="my-week-title">
      <div className="my-week-head">
        <h2 id="my-week-title">
          {words.title}
          {saved.length ? <span className="my-week-count">{saved.length}</span> : null}
        </h2>
        <p className="my-week-note">{words.note}</p>
      </div>
      {saved.length === 0 ? (
        <p className="my-week-empty">{words.empty}</p>
      ) : (
        <>
          <ul className="my-week-list">
            {saved.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.name}</a>
                {s.note ? <span className="my-week-where">{s.note}</span> : null}
                <button
                  type="button"
                  className="my-week-remove"
                  onClick={() => remove(s.id)}
                  aria-label={fill(words.removeLabel, { name: s.name })}
                >
                  {words.remove}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="my-week-clear" onClick={clear}>
            {words.clear}
          </button>
        </>
      )}
    </aside>
  );
}

/** The small Save button on a restaurant or a day out. */
export function SaveToggle({ item, words }: { item: Saved; words: Pick<MyWeekWords, "save" | "saved" | "saveLabel"> }) {
  const saved = useSaved();
  if (saved === null) return null;
  const on = saved.some((s) => s.id === item.id);
  return (
    <button
      type="button"
      className="save-toggle"
      aria-pressed={on}
      aria-label={fill(words.saveLabel, { name: item.name })}
      onClick={() => toggle(item)}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M4 2.5h8v11l-4-3-4 3z" />
      </svg>
      {on ? words.saved : words.save}
    </button>
  );
}
