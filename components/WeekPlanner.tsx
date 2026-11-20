"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { MyWeekWords } from "@/content/myWeek";
import { fill } from "@/lib/fill";
import { place, read, readOnServer, remove, subscribe, type Saved } from "@/lib/myWeek";
import type { Plannable } from "@/lib/plannable";
import type { WeekDay } from "@/lib/week";
import { IslandDot } from "./IslandDot";

/**
 * My week, built around the days.
 *
 * A guest adds a restaurant or a day out to a day ("Add to my week" → pick a
 * day; the days it is closed are greyed out), and their plans sit on the Week
 * page in that day, beside ours. The Island and Utility pages show the week
 * as a strip of days. Everything is kept in the browser (lib/myWeek.ts).
 *
 * Nothing here renders until the browser has read the list, so without
 * JavaScript the pages simply show without it.
 */

type Planner = { days: WeekDay[]; words: MyWeekWords; catalog: Map<string, Plannable> };
const PlannerContext = createContext<Planner | null>(null);

export function PlannerProvider({
  days,
  words,
  catalog,
  children,
}: {
  days: WeekDay[];
  words: MyWeekWords;
  catalog: Plannable[];
  children: ReactNode;
}) {
  const value = useMemo(() => ({ days, words, catalog: new Map(catalog.map((c) => [c.id, c])) }), [days, words, catalog]);
  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

function usePlanner(): Planner {
  const planner = useContext(PlannerContext);
  if (!planner) throw new Error("My week needs a PlannerProvider around it");
  return planner;
}

function useSaved(): Saved[] | null {
  return useSyncExternalStore(subscribe, read, readOnServer);
}

const isClosed = (open: number[] | null | undefined, weekday: number) => Boolean(open && !open.includes(weekday));

/** A popover that closes on Escape or a tap outside it, handing focus back to its button. */
function usePopover() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    // Focus the first day that can be picked.
    wrap.current?.querySelector<HTMLButtonElement>(".day-pick button:not(:disabled)")?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  return { open, setOpen, close, wrap, button };
}

/** The nine days as buttons, the closed ones disabled, plus "Not sure yet" and Remove. */
function DayPick({
  current,
  open,
  onPick,
  onRemove,
}: {
  current: string | null | undefined;
  open: number[] | null;
  onPick: (iso: string | null) => void;
  onRemove?: () => void;
}) {
  const { days, words } = usePlanner();
  return (
    <span className="day-pick" role="group" aria-label={words.pick}>
      <span className="day-pick-title">{words.pick}</span>
      <span className="day-pick-days">
        {days.map((d) => {
          const closed = isClosed(open, d.weekday);
          return (
            <button
              type="button"
              key={d.iso}
              className={d.offset === 0 ? "is-wedding" : undefined}
              disabled={closed}
              aria-pressed={current === d.iso}
              onClick={() => onPick(d.iso)}
            >
              <span className="day-pick-wd">{d.short}</span>
              <span className="day-pick-date">{d.date}</span>
              {closed ? <span className="day-pick-mark">{words.closed}</span> : d.offset === 0 ? <span className="day-pick-mark">{words.wedding}</span> : null}
            </button>
          );
        })}
      </span>
      <span className="day-pick-foot">
        <button type="button" className="day-pick-text" aria-pressed={current === null} onClick={() => onPick(null)}>
          {words.someday}
        </button>
        {onRemove ? (
          <button type="button" className="day-pick-text" onClick={onRemove}>
            {words.remove}
          </button>
        ) : null}
      </span>
    </span>
  );
}

const dayName = (days: WeekDay[], iso: string | null | undefined) => {
  const d = days.find((x) => x.iso === iso);
  return d ? `${d.short} ${d.date}` : null;
};

/** "Add to my week" on a restaurant or day out; once planned it reads "✓ Tue 3" and changes the day. */
export function AddToWeek({ id }: { id: string }) {
  const { days, words, catalog } = usePlanner();
  const saved = useSaved();
  const pop = usePopover();
  const item = catalog.get(id);
  if (saved === null || !item) return null;
  const mine = saved.find((s) => s.id === id);
  const on = mine ? dayName(days, mine.day) : null;
  const pick = (iso: string | null) => {
    place({ id: item.id, name: item.name, note: item.note }, iso);
    pop.close();
  };
  return (
    <span className="add-week" ref={pop.wrap}>
      <button
        type="button"
        ref={pop.button}
        className="add-week-toggle"
        aria-pressed={Boolean(mine)}
        aria-expanded={pop.open}
        aria-label={mine ? fill(words.onLabel, { name: item.name, day: on ?? words.someday }) : fill(words.addLabel, { name: item.name })}
        onClick={() => pop.setOpen(!pop.open)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          {mine ? <path d="M3 8.5 6.5 12 13 4.5" /> : <path d="M8 3v10M3 8h10" />}
        </svg>
        {mine ? (
          (on ?? words.someday)
        ) : (
          <>
            <span className="add-week-long">{words.add}</span>
            <span className="add-week-short">{words.addShort}</span>
          </>
        )}
      </button>
      {pop.open ? (
        <span className="add-week-pop">
          <DayPick
            current={mine ? (mine.day ?? null) : undefined}
            open={item.open}
            onPick={pick}
            onRemove={
              mine
                ? () => {
                    remove(id);
                    pop.close();
                  }
                : undefined
            }
          />
        </span>
      ) : null}
    </span>
  );
}

/** One plan in a day: name, where, a closed-that-day warning, Move and Remove. */
function PlanRow({ s, weekday, loose = false }: { s: Saved; weekday?: number; loose?: boolean }) {
  const { words, catalog } = usePlanner();
  const pop = usePopover();
  const item = catalog.get(s.id);
  const closed = weekday !== undefined && isClosed(item?.open, weekday);
  return (
    <li className={closed ? "plan plan-closed" : "plan"}>
      <span className="plan-what">
        <a href={item?.href ?? `/island#${s.id}`}>{s.name}</a>
        {item?.at ? <IslandDot at={item.at} label={item.note ?? s.note ?? ""} /> : s.note ? <span className="plan-note">{s.note}</span> : null}
        {closed ? <span className="plan-warn">{words.closedThatDay}</span> : null}
      </span>
      <span className="plan-actions add-week" ref={pop.wrap}>
        <button
          type="button"
          ref={pop.button}
          className="plan-button"
          aria-expanded={pop.open}
          aria-label={fill(words.moveLabel, { name: s.name })}
          onClick={() => pop.setOpen(!pop.open)}
        >
          {loose ? words.pickDay : words.move}
        </button>
        <button type="button" className="plan-button" aria-label={fill(words.removeLabel, { name: s.name })} onClick={() => remove(s.id)}>
          {words.remove}
        </button>
        {pop.open ? (
          <span className="add-week-pop">
            <DayPick
              current={s.day ?? null}
              open={item?.open ?? null}
              onPick={(iso) => {
                place({ id: s.id, name: s.name, note: s.note }, iso);
                pop.close();
              }}
            />
          </span>
        ) : null}
      </span>
    </li>
  );
}

/** Choose something to add to this day: places closed that day are greyed out. */
function AddPlan({ day }: { day: WeekDay }) {
  const { words, catalog } = usePlanner();
  const saved = useSaved() ?? [];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  const q = query.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯʻ]/g, "");
  const match = (c: Plannable) => !q || `${c.name} ${c.note ?? ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯʻ]/g, "").includes(q);
  const items = [...catalog.values()].filter(match);
  const label = `${day.short} ${day.date}`;
  if (!open) {
    return (
      <button type="button" className="add-plan-open" aria-label={fill(words.addPlanLabel, { day: label })} onClick={() => setOpen(true)}>
        + {words.addPlan}
      </button>
    );
  }
  const group = (kind: Plannable["kind"], title: string) => {
    const list = items.filter((c) => c.kind === kind);
    if (!list.length) return null;
    return (
      <div className="add-plan-group">
        <p className="add-plan-kind">{title}</p>
        <ul>
          {list.map((c) => {
            const closed = isClosed(c.open, day.weekday);
            const here = saved.some((s) => s.id === c.id && s.day === day.iso);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={closed || here}
                  onClick={() => place({ id: c.id, name: c.name, note: c.note }, day.iso)}
                >
                  <span className="add-plan-name">{c.name}</span>
                  {c.note ? <span className="add-plan-note">{c.note}</span> : null}
                  {closed ? <span className="add-plan-mark">{words.closed}</span> : here ? <span className="add-plan-mark">{words.added}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="add-plan" role="group" aria-label={fill(words.addPlanLabel, { day: label })}>
      <div className="add-plan-head">
        <input
          ref={input}
          type="search"
          className="add-plan-filter"
          placeholder={words.filter}
          aria-label={words.filter}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <button type="button" className="plan-button" onClick={() => setOpen(false)}>
          {words.done}
        </button>
      </div>
      {group("eat", words.eat)}
      {group("out", words.out)}
    </div>
  );
}

/** A day's own plans on the Week page, with a way to add more. */
export function DayPlans({ iso }: { iso: string }) {
  const { days, words } = usePlanner();
  const saved = useSaved();
  const day = days.find((d) => d.iso === iso);
  if (saved === null || !day) return null;
  const mine = saved.filter((s) => s.day === iso);
  return (
    <div className="day-plans">
      <p className="day-plans-title">{words.yours}</p>
      {mine.length ? (
        <ul className="plans">
          {mine.map((s) => (
            <PlanRow key={s.id} s={s} weekday={day.weekday} />
          ))}
        </ul>
      ) : null}
      <AddPlan day={day} />
    </div>
  );
}

/** Plans not on a day yet (saved before days existed, or "not sure yet"). */
export function Unplaced() {
  const { days, words } = usePlanner();
  const saved = useSaved();
  if (saved === null) return null;
  const loose = saved.filter((s) => !s.day || !days.some((d) => d.iso === s.day));
  if (!loose.length) return null;
  return (
    <aside className="unplaced" aria-label={words.unplaced}>
      <p className="day-plans-title">{words.unplaced}</p>
      <p className="unplaced-hint">{words.unplacedHint}</p>
      <ul className="plans">
        {loose.map((s) => (
          <PlanRow key={s.id} s={s} loose />
        ))}
      </ul>
    </aside>
  );
}

/** The week as a strip of days, each with a dot per plan, linking to that day on the Week page. */
export function WeekStrip() {
  const { days, words } = usePlanner();
  const saved = useSaved();
  if (saved === null) return null;
  const count = saved.length;
  return (
    <aside className="week-strip" aria-label={words.stripLabel}>
      <div className="week-strip-head">
        <p className="week-strip-title">
          {words.title}
          {count ? <span className="week-strip-count">{count === 1 ? words.plansOne : fill(words.plans, { n: count })}</span> : null}
        </p>
        <a className="week-strip-link" href="/week">
          {words.stripLink} →
        </a>
      </div>
      <ol className="week-strip-days">
        {days.map((d) => {
          const on = saved.filter((s) => s.day === d.iso);
          return (
            <li key={d.iso}>
              <a
                href={`/week#day-${d.iso}`}
                className={d.offset === 0 ? "is-wedding" : undefined}
                title={on.map((s) => s.name).join(", ") || undefined}
              >
                <span className="week-strip-wd">{d.short}</span>
                <span className="week-strip-date">{d.date}</span>
                <span className="week-strip-dots" aria-label={on.length ? (on.length === 1 ? words.plansOne : fill(words.plans, { n: on.length })) : undefined}>
                  {on.slice(0, 4).map((s) => (
                    <i key={s.id} />
                  ))}
                  {on.length > 4 ? <b>+{on.length - 4}</b> : null}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      {count === 0 ? <p className="week-strip-empty">{words.stripEmpty}</p> : <p className="week-strip-note">{words.note}</p>}
    </aside>
  );
}

/** Utility's list of the guest's plans, day by day, with Move and Remove. */
export function WeekAgenda() {
  const { days } = usePlanner();
  const saved = useSaved();
  if (saved === null) return null;
  const withPlans = days.filter((d) => saved.some((s) => s.day === d.iso));
  return (
    <div className="week-agenda">
      <Unplaced />
      {withPlans.map((d) => (
        <section className="week-agenda-day" key={d.iso}>
          <h3>
            <a href={`/week#day-${d.iso}`}>{d.medium}</a>
          </h3>
          <ul className="plans">
            {saved
              .filter((s) => s.day === d.iso)
              .map((s) => (
                <PlanRow key={s.id} s={s} weekday={d.weekday} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
