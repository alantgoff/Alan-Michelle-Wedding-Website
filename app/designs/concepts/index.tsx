"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Activity } from "@/content/activities";
import { groups } from "@/content/groups";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { story } from "@/content/story";
import { faqs } from "@/content/faq";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import "./index.css";

/**
 * THE INDEX — a book's table of contents, and nothing else.
 *
 * The site opens as a set of chapter entries: numeral, title, dot leaders,
 * folio. No photographs anywhere, no navigation bar, no scrolling past one
 * section into the next. Choosing a chapter replaces the contents with that
 * chapter set full-bleed, a running head above it and a folio below. Escape
 * or the quiet "Contents" line at the foot returns you to the list. One
 * surface, one piece of state — no routing.
 */

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function groupByDay(list: Activity[]) {
  const days = Array.from(new Set(list.map((a) => a.date)));
  days.sort((a, b) => {
    const ia = DAY_ORDER.indexOf(a);
    const ib = DAY_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  return days.map((day) => ({ day, items: list.filter((a) => a.date === day) }));
}

function audienceName(audience: Activity["audience"]) {
  if (audience === "everyone") return null;
  return groups.find((g) => g.id === audience)?.name ?? null;
}

type Chapter = { title: string; gloss: string; folio: number; body: ReactNode };

export default function Index({ activities }: { activities: Activity[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const lastOpened = useRef<number | null>(null);

  useEffect(() => {
    if (open !== null) {
      // globals.css sets scroll-behavior:smooth; "auto" keeps the jump instant.
      window.scrollTo({ top: 0, behavior: "auto" });
      headingRef.current?.focus({ preventScroll: true });
      return;
    }
    if (lastOpened.current === null) return;
    const back = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-chapter="${lastOpened.current}"]`,
    );
    back?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function go(index: number) {
    lastOpened.current = index;
    setOpen(index);
  }

  const days = groupByDay(activities);

  const chapters: Chapter[] = [
    {
      title: "The invitation",
      gloss: "Who, when, and exactly where",
      folio: 3,
      body: (
        <>
          <p className="index-lede">{site.tagline}</p>
          <p>{site.welcome}</p>
          <dl className="index-particulars">
            <div>
              <dt>Date</dt>
              <dd>{site.weddingDate}</dd>
            </div>
            <div>
              <dt>Ceremony</dt>
              <dd>{site.ceremonyTime}</dd>
            </div>
            <div>
              <dt>Place</dt>
              <dd>
                {site.venue}
                <br />
                {site.location}
              </dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                {site.address}
                <br />
                <a className="index-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      title: "Our story",
      gloss: "Four moments, in order",
      folio: 11,
      body: (
        <ol className="index-moments">
          {story.map((m) => (
            <li key={m.title}>
              <p className="index-marginal">{m.date}</p>
              <div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "The weekend",
      gloss: "Thursday to Sunday, hour by hour",
      folio: 23,
      body: (
        <>
          <p className="index-lede">
            Everything on the calendar, in the order it happens. Entries marked TODO are still being
            settled.
          </p>
          {days.map(({ day, items }) => (
            <section key={day} className="index-day">
              <h3>{day}</h3>
              <ul className="index-events">
                {items.map((a) => {
                  const who = audienceName(a.audience);
                  return (
                    <li key={`${a.title}-${a.time}`}>
                      <p className="index-marginal">{a.time}</p>
                      <div>
                        <h4>
                          {a.title}
                          {who ? <em className="index-aside"> — {who}</em> : null}
                        </h4>
                        <p className="index-place">{a.location}</p>
                        <p>{a.description}</p>
                        {a.link ? (
                          <p>
                            <a className="index-link" href={a.link}>
                              Details
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </>
      ),
    },
    {
      title: "Getting there",
      gloss: "Flights, cars, and where to sleep",
      folio: 37,
      body: (
        <>
          <h3>Arriving</h3>
          <dl className="index-defs">
            {travel.gettingThere.map((t) => (
              <div key={t.title}>
                <dt>{t.title}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
          <h3>Where to stay</h3>
          <dl className="index-defs">
            {travel.stays.map((t) => (
              <div key={t.title}>
                <dt>{t.title}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
          <h3>While you are here</h3>
          <ul className="index-runners">
            {travel.explore.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "What to wear",
      gloss: dressCode.title,
      folio: 49,
      body: (
        <>
          <p className="index-lede">{dressCode.intro}</p>
          <h3>Lean into</h3>
          <ul className="index-runners">
            {dressCode.lean.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <h3>Maybe skip</h3>
          <ul className="index-runners">
            {dressCode.skip.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h3>The colours we keep returning to</h3>
          <ul className="index-specimen">
            {dressCode.colors.map((c) => (
              <li key={c}>
                <span className="index-swatch" style={{ background: c }} aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "Questions",
      gloss: "What guests have asked so far",
      folio: 57,
      body: (
        <ol className="index-questions">
          {faqs.map((f) => (
            <li key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "Gifts",
      gloss: "Only if you would like to",
      folio: 66,
      body: (
        <>
          <p className="index-lede">
            Your being on the island with us is the whole of it. If you would like to do something
            more, these are the places.
          </p>
          <dl className="index-defs">
            {registries.map((r) => (
              <div key={r.name}>
                <dt>{r.name}</dt>
                <dd>
                  {r.text}
                  <br />
                  <a className="index-link" href={r.url}>
                    {r.name}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
  ];

  if (open === null) {
    return (
      <div className="index-root">
        <div className="index-contents">
          <p className="index-imprint">The wedding of</p>
          <h1 className="index-halftitle">{site.couple}</h1>
          <p className="index-dateline">
            {site.weddingDate}
            <span className="index-dot" aria-hidden="true">
              &middot;
            </span>
            {site.venue}, {site.location}
          </p>

          <p className="index-label">Contents</p>
          <ol className="index-entries" ref={listRef}>
            {chapters.map((c, i) => (
              <li key={c.title}>
                <button
                  type="button"
                  className="index-entry"
                  data-chapter={i}
                  onClick={() => go(i)}
                >
                  <span className="index-rule">
                    <span className="index-numeral">{NUMERALS[i]}</span>
                    <span className="index-name">{c.title}</span>
                    <span className="index-leader" aria-hidden="true" />
                    <span className="index-folio">{c.folio}</span>
                  </span>
                  <span className="index-gloss">{c.gloss}</span>
                </button>
              </li>
            ))}
          </ol>

          <p className="index-note">Seven chapters. Choose one.</p>
        </div>
      </div>
    );
  }

  const chapter = chapters[open];
  const next = open + 1 < chapters.length ? chapters[open + 1] : null;

  return (
    <div className="index-root index-reading">
      <div className="index-head">
        <span className="index-head-a">{site.couple}</span>
        <span className="index-head-b">
          {NUMERALS[open]} &middot; {chapter.title}
        </span>
      </div>

      <article className="index-chapter">
        <p className="index-chapter-no">Chapter {NUMERALS[open]}</p>
        <h2 className="index-chapter-title" tabIndex={-1} ref={headingRef}>
          {chapter.title}
        </h2>
        <div className="index-prose">{chapter.body}</div>
      </article>

      <div className="index-foot">
        <button type="button" className="index-quiet" onClick={() => setOpen(null)}>
          Contents
        </button>
        <span className="index-folio-mark">{chapter.folio}</span>
        {next ? (
          <button type="button" className="index-quiet index-quiet-b" onClick={() => go(open + 1)}>
            {next.title}
          </button>
        ) : (
          <span className="index-quiet index-quiet-b index-end">End</span>
        )}
      </div>
    </div>
  );
}
