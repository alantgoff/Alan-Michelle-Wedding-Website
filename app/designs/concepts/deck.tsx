"use client";

/**
 * THE DECK — one idea per screen, moved through sideways.
 *
 * The page never scrolls down. A horizontal track of full-height panels
 * snaps one screen at a time, and the whole weekend is read left to right:
 * names, invitation, story, travel, schedule, dress, questions, registry.
 *
 * Movement is offered four ways so nothing depends on knowing to swipe —
 * the helm's previous/next buttons, the progress ticks (each a button that
 * jumps to its panel), the arrow keys, and a vertical mouse wheel that is
 * translated into sideways travel once a panel has nothing left to scroll.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Activity } from "@/content/activities";
import { dressCode } from "@/content/dressCode";
import { faqs } from "@/content/faq";
import { photos } from "@/content/photos";
import { registries } from "@/content/registry";
import { site } from "@/content/site";
import { story } from "@/content/story";
import { travel } from "@/content/travel";
import "./deck.css";

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function byDay(list: Activity[]): [string, Activity[]][] {
  const days = new Map<string, Activity[]>();
  for (const item of list) {
    const found = days.get(item.date);
    if (found) found.push(item);
    else days.set(item.date, [item]);
  }
  const rank = (day: string) => {
    const i = DAY_ORDER.indexOf(day);
    return i === -1 ? DAY_ORDER.length : i;
  };
  return [...days.entries()].sort((a, b) => rank(a[0]) - rank(b[0]));
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Deck({ activities }: { activities: Activity[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const days = byDay(activities);

  const panels: { id: string; label: string; tone: string; body: React.ReactNode }[] = [
    {
      id: "names",
      label: "The names",
      tone: "photo",
      body: (
        <div className="deck-plate">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="deck-plate-scrim" />
          <div className="deck-plate-copy">
            <p className="deck-eyebrow">{site.location}</p>
            <h1 className="deck-names">{site.couple}</h1>
            <p className="deck-date">{site.weddingDate}</p>
            <p className="deck-tagline">{site.tagline}</p>
            <p className="deck-hint">Eight screens, left to right. Use the arrows below or your arrow keys.</p>
          </div>
        </div>
      ),
    },
    {
      id: "invitation",
      label: "Date & place",
      tone: "paper",
      body: (
        <div className="deck-inner deck-two">
          <div>
            <p className="deck-eyebrow">Panel two</p>
            <h2 className="deck-title">The invitation</h2>
            <p className="deck-lede">{site.welcome}</p>
          </div>
          <dl className="deck-spec">
            <div>
              <dt>Date</dt>
              <dd>{site.weddingDate}</dd>
            </div>
            <div>
              <dt>Ceremony</dt>
              <dd>{site.ceremonyTime}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{site.venue}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                {site.address}
                <br />
                <a className="deck-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                  Open in maps
                </a>
              </dd>
            </div>
          </dl>
        </div>
      ),
    },
    {
      id: "story",
      label: "Our story",
      tone: "ink",
      body: (
        <div className="deck-inner">
          <p className="deck-eyebrow">Panel three</p>
          <h2 className="deck-title">How we got here</h2>
          <ol className="deck-chapters">
            {story.map((chapter) => {
              const shot = chapter.photo ? photos[chapter.photo] : null;
              return (
                <li key={chapter.title} className="deck-chapter">
                  {shot ? (
                    <div className="deck-chapter-shot">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 900px) 70vw, 20vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : null}
                  <p className="deck-when">{chapter.date}</p>
                  <h3 className="deck-sub">{chapter.title}</h3>
                  <p className="deck-copy">{chapter.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      ),
    },
    {
      id: "travel",
      label: "Getting there",
      tone: "paper",
      body: (
        <div className="deck-inner">
          <p className="deck-eyebrow">Panel four</p>
          <h2 className="deck-title">Getting to the windward coast</h2>
          <div className="deck-columns">
            <div>
              <h3 className="deck-sub">Getting there</h3>
              {travel.gettingThere.map((item) => (
                <div key={item.title} className="deck-note">
                  <h4 className="deck-note-title">{item.title}</h4>
                  <p className="deck-copy">{item.text}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="deck-sub">Where to stay</h3>
              {travel.stays.map((item) => (
                <div key={item.title} className="deck-note">
                  <h4 className="deck-note-title">{item.title}</h4>
                  <p className="deck-copy">{item.text}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="deck-sub">While you are here</h3>
              <ul className="deck-list">
                {travel.explore.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "schedule",
      label: "The weekend",
      tone: "ink",
      body: (
        <div className="deck-inner">
          <p className="deck-eyebrow">Panel five</p>
          <h2 className="deck-title">The weekend, in order</h2>
          <div className="deck-days">
            {days.map(([day, items]) => (
              <section key={day} className="deck-day">
                <h3 className="deck-day-name">{day}</h3>
                <ul className="deck-events">
                  {items.map((item) => (
                    <li key={item.title} className="deck-event">
                      <p className="deck-when">{item.time}</p>
                      <h4 className="deck-note-title">{item.title}</h4>
                      <p className="deck-where">{item.location}</p>
                      <p className="deck-copy">{item.description}</p>
                      {item.link ? (
                        <a className="deck-link" href={item.link} target="_blank" rel="noreferrer">
                          Details
                        </a>
                      ) : null}
                      {item.audience !== "everyone" ? (
                        <p className="deck-badge">For your group</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "dress",
      label: "What to wear",
      tone: "mist",
      body: (
        <div className="deck-inner deck-two">
          <div>
            <p className="deck-eyebrow">Panel six</p>
            <h2 className="deck-title">{dressCode.title}</h2>
            <p className="deck-lede">{dressCode.intro}</p>
            <ul className="deck-chips" aria-label="Colours we are leaning on">
              {dressCode.colors.map((colour) => (
                <li key={colour}>
                  <span className="deck-chip" style={{ background: colour }} aria-hidden="true" />
                  <span className="deck-chip-label">{colour}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="deck-columns deck-columns-two">
            <div>
              <h3 className="deck-sub">Lean into</h3>
              <ul className="deck-list">
                {dressCode.lean.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="deck-sub">Maybe skip</h3>
              <ul className="deck-list deck-list-skip">
                {dressCode.skip.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "questions",
      label: "Questions",
      tone: "paper",
      body: (
        <div className="deck-inner">
          <p className="deck-eyebrow">Panel seven</p>
          <h2 className="deck-title">Questions, answered</h2>
          <dl className="deck-faq">
            {faqs.map((entry) => (
              <div key={entry.q}>
                <dt>{entry.q}</dt>
                <dd>{entry.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
    {
      id: "registry",
      label: "Registry",
      tone: "ink",
      body: (
        <div className="deck-inner deck-centered">
          <p className="deck-eyebrow">Last panel</p>
          <h2 className="deck-title">Registry</h2>
          <p className="deck-lede">
            Your presence on the windward coast is the whole gift. If you would like to mark the day with
            something, these are the places to look.
          </p>
          <ul className="deck-registry">
            {registries.map((entry) => (
              <li key={entry.name}>
                <h3 className="deck-sub">{entry.name}</h3>
                <p className="deck-copy">{entry.text}</p>
                <a className="deck-link" href={entry.url}>
                  Visit
                </a>
              </li>
            ))}
          </ul>
          <p className="deck-signoff">
            {site.couple} — {site.venue}
          </p>
        </div>
      ),
    },
  ];

  const count = panels.length;

  /* The bar above this design wraps onto more lines on a narrow screen, so
     the exact height is measured rather than assumed. 38px is the fallback. */
  useEffect(() => {
    const root = rootRef.current;
    const bar = document.querySelector<HTMLElement>(".design-bar");
    if (!root || !bar) return;
    const apply = () => root.style.setProperty("--deck-bar", `${bar.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: reducedMotion() ? "auto" : "smooth" });
      setIndex(clamped);
    },
    [count],
  );

  /* Which panel is on screen, read back from the track's own scroll. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const width = track.clientWidth || 1;
      setIndex(Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / width))));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  /* Arrow keys, Home and End move the deck unless a field has focus. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(count - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goTo, index, count]);

  /* A vertical wheel is turned sideways, but only once the panel under the
     pointer has no more of itself left to show. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let last = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const panel = (event.target as HTMLElement | null)?.closest<HTMLElement>(".deck-panel");
      if (panel && panel.scrollHeight - panel.clientHeight > 4) {
        const atTop = panel.scrollTop <= 0;
        const atEnd = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atEnd)) return;
      }
      const now = Date.now();
      if (now - last < 520) {
        event.preventDefault();
        return;
      }
      last = now;
      event.preventDefault();
      const width = track.clientWidth || 1;
      goTo(Math.round(track.scrollLeft / width) + (event.deltaY > 0 ? 1 : -1));
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, [goTo]);

  const current = panels[index] ?? panels[0];

  return (
    <div className="deck" ref={rootRef}>
      <div
        className="deck-track"
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`${site.couple} — ${count} panels, moved through sideways`}
      >
        {panels.map((panel, i) => (
          <section
            key={panel.id}
            id={`deck-${panel.id}`}
            className={`deck-panel deck-tone-${panel.tone}`}
            aria-label={`${i + 1} of ${count}: ${panel.label}`}
          >
            {panel.body}
          </section>
        ))}
      </div>

      <div className="deck-helm">
        <button
          type="button"
          className="deck-step"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous panel"
        >
          <span aria-hidden="true">&#8592;</span> Back
        </button>

        <div className="deck-helm-middle">
          <ol className="deck-progress">
            {panels.map((panel, i) => (
              <li key={panel.id}>
                <button
                  type="button"
                  className="deck-tick"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Panel ${i + 1} of ${count}: ${panel.label}`}
                >
                  <span aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
          <p className="deck-readout" aria-live="polite">
            <span className="deck-readout-num">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <span className="deck-readout-label">{current.label}</span>
          </p>
        </div>

        <button
          type="button"
          className="deck-step"
          onClick={() => goTo(index + 1)}
          disabled={index === count - 1}
          aria-label="Next panel"
        >
          Next <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </div>
  );
}
