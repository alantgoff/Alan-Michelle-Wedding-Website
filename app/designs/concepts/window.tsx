"use client";

/**
 * THE WINDOW — the ocean stays, the words move.
 *
 * One photograph is pinned to the viewport and never scrolls. Everything
 * there is to read travels up a narrow column over the left of it, and as
 * each scene reaches the middle of the screen the photograph behind it
 * crossfades to that scene's image. The only navigation is a thin index of
 * chapters down the right-hand edge, which marks where you are.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Activity } from "@/content/activities";
import { dressCode } from "@/content/dressCode";
import { faqs } from "@/content/faq";
import { photos, type PhotoKey } from "@/content/photos";
import { registries } from "@/content/registry";
import { site } from "@/content/site";
import { story } from "@/content/story";
import { travel } from "@/content/travel";
import "./window.css";

const CHAPTERS = [
  { id: "opening", label: "The day" },
  { id: "welcome", label: "Welcome" },
  { id: "story", label: "Our story" },
  { id: "travel", label: "Travel" },
  { id: "weekend", label: "The weekend" },
  { id: "dress", label: "What to wear" },
  { id: "questions", label: "Questions" },
  { id: "registry", label: "Registry" },
];

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

type Scene = { chapter: string; photo: PhotoKey; body: React.ReactNode };

export default function WindowDesign({ activities }: { activities: Activity[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const days = byDay(activities);

  const scenes: Scene[] = [
    {
      chapter: "opening",
      photo: "hero",
      body: (
        <>
          <p className="window-eyebrow">{site.location}</p>
          <h1 className="window-names">{site.couple}</h1>
          <p className="window-date">{site.weddingDate}</p>
          <p className="window-tagline">{site.tagline}</p>
          <dl className="window-spec">
            <div>
              <dt>Ceremony</dt>
              <dd>{site.ceremonyTime}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{site.venue}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                {site.address}
                <br />
                <a className="window-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                  Open in maps
                </a>
              </dd>
            </div>
          </dl>
          <p className="window-cue">
            <span aria-hidden="true" className="window-cue-mark" />
            Keep reading. The view changes as you go.
          </p>
        </>
      ),
    },
    {
      chapter: "welcome",
      photo: "welcome",
      body: (
        <>
          <p className="window-eyebrow">Welcome</p>
          <h2 className="window-heading">A note before you book anything</h2>
          <p className="window-lede">{site.welcome}</p>
        </>
      ),
    },
    ...story.map((moment, i) => ({
      chapter: "story",
      photo: (moment.photo ?? "story") as PhotoKey,
      body: (
        <>
          {i === 0 ? (
            <>
              <p className="window-eyebrow">Our story</p>
              <h2 className="window-heading">Four moments</h2>
            </>
          ) : null}
          <div className="window-moment">
            <p className="window-when">{moment.date}</p>
            <h3 className="window-subheading">{moment.title}</h3>
            <p className="window-copy">{moment.text}</p>
          </div>
        </>
      ),
    })),
    {
      chapter: "travel",
      photo: "travel",
      body: (
        <>
          <p className="window-eyebrow">Travel</p>
          <h2 className="window-heading">Getting here, and staying</h2>
          <div className="window-block">
            <h3 className="window-subheading">Getting there</h3>
            {travel.gettingThere.map((item) => (
              <div key={item.title} className="window-note">
                <h4 className="window-note-title">{item.title}</h4>
                <p className="window-copy">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="window-block">
            <h3 className="window-subheading">Where to stay</h3>
            {travel.stays.map((item) => (
              <div key={item.title} className="window-note">
                <h4 className="window-note-title">{item.title}</h4>
                <p className="window-copy">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="window-block">
            <h3 className="window-subheading">While you are here</h3>
            <ul className="window-list">
              {travel.explore.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      chapter: "weekend",
      photo: "activities",
      body: (
        <>
          <p className="window-eyebrow">The weekend</p>
          <h2 className="window-heading">What is happening, and when</h2>
          {days.map(([day, items]) => (
            <div key={day} className="window-block">
              <h3 className="window-day">{day}</h3>
              <ul className="window-events">
                {items.map((item) => (
                  <li key={item.title}>
                    <p className="window-when">{item.time}</p>
                    <h4 className="window-note-title">{item.title}</h4>
                    <p className="window-where">{item.location}</p>
                    <p className="window-copy">{item.description}</p>
                    {item.link ? (
                      <a className="window-link" href={item.link} target="_blank" rel="noreferrer">
                        Details
                      </a>
                    ) : null}
                    {item.audience !== "everyone" ? <p className="window-badge">For your group</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ),
    },
    {
      chapter: "dress",
      photo: "dressCode",
      body: (
        <>
          <p className="window-eyebrow">What to wear</p>
          <h2 className="window-heading">{dressCode.title}</h2>
          <p className="window-lede">{dressCode.intro}</p>
          <div className="window-block">
            <h3 className="window-subheading">Lean into</h3>
            <ul className="window-list">
              {dressCode.lean.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="window-block">
            <h3 className="window-subheading">Maybe skip</h3>
            <ul className="window-list window-list-skip">
              {dressCode.skip.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ul className="window-chips" aria-label="Colours in the day">
            {dressCode.colors.map((colour) => (
              <li key={colour}>
                <span className="window-chip" style={{ background: colour }} aria-hidden="true" />
                <span className="window-chip-label">{colour}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      chapter: "questions",
      photo: "faq",
      body: (
        <>
          <p className="window-eyebrow">Questions</p>
          <h2 className="window-heading">Everything people have asked</h2>
          <dl className="window-faq">
            {faqs.map((entry) => (
              <div key={entry.q}>
                <dt>{entry.q}</dt>
                <dd>{entry.a}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
    {
      chapter: "registry",
      photo: "registry",
      body: (
        <>
          <p className="window-eyebrow">Registry</p>
          <h2 className="window-heading">If you would like to mark the day</h2>
          <p className="window-lede">
            Coming all this way is the gift. For anyone who asks anyway, these are the places to look.
          </p>
          {registries.map((entry) => (
            <div key={entry.name} className="window-note">
              <h3 className="window-note-title">{entry.name}</h3>
              <p className="window-copy">{entry.text}</p>
              <a className="window-link" href={entry.url}>
                Visit
              </a>
            </div>
          ))}
          <p className="window-signoff">
            {site.couple}
            <span aria-hidden="true"> · </span>
            {site.venue}
            <span aria-hidden="true"> · </span>
            {site.weddingDate}
          </p>
        </>
      ),
    },
  ];

  /* The first scene of each chapter carries that chapter's anchor. */
  const anchored = new Set<string>();
  const anchors = scenes.map((scene) => {
    if (anchored.has(scene.chapter)) return undefined;
    anchored.add(scene.chapter);
    return `window-${scene.chapter}`;
  });

  /* One layer per distinct photograph, so a repeated image is not loaded twice. */
  const sources: string[] = [];
  for (const scene of scenes) {
    const src = photos[scene.photo].src;
    if (!sources.includes(src)) sources.push(src);
  }

  const currentPhoto = photos[(scenes[active] ?? scenes[0]).photo];
  const currentChapter = (scenes[active] ?? scenes[0]).chapter;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number(entry.target.getAttribute("data-scene"));
          if (Number.isFinite(i)) setActive(i);
        }
      },
      // Only whatever crosses the middle tenth of the screen counts.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    marks.forEach((mark) => observer.observe(mark));
    return () => observer.disconnect();
  }, [scenes.length]);

  return (
    <div className="window" ref={rootRef}>
      <div className="window-backdrop" role="img" aria-label={currentPhoto.alt}>
        {sources.map((src, i) => (
          <div
            key={src}
            className="window-plate"
            data-showing={src === currentPhoto.src ? "true" : "false"}
            aria-hidden="true"
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className="window-scrim" aria-hidden="true" />

      <div className="window-rail">
        {scenes.map((scene, i) => (
          <section
            key={`${scene.chapter}-${i}`}
            className={`window-scene window-scene-${scene.chapter}`}
            data-scene={i}
            id={anchors[i]}
          >
            {scene.body}
          </section>
        ))}
      </div>

      <nav className="window-index" aria-label="Chapters">
        <ol>
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#window-${chapter.id}`}
                aria-current={chapter.id === currentChapter ? "true" : undefined}
              >
                <span className="window-dot" aria-hidden="true" />
                <span className="window-index-label">{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
