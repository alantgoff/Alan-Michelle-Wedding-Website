"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import "./suite.css";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { faqs } from "@/content/faq";
import { story } from "@/content/story";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import { photos } from "@/content/photos";

/* ============================================================
   THE INVITATION SUITE — a stack of cards in an envelope.

   One enclosure on screen at a time, centred, stepped through
   in the order you would lift them out of the envelope. There
   is no navigation bar, no scrolling page and no home page: the
   whole site is eight pieces of stationery and a quiet stepper.
   ============================================================ */

type CardId =
  | "invitation"
  | "details"
  | "weekend"
  | "travel"
  | "attire"
  | "story"
  | "questions"
  | "registry";

type CardMeta = { id: CardId; label: string; eyebrow: string; title: string };

const CARDS: CardMeta[] = [
  { id: "invitation", label: "The invitation", eyebrow: "Together with their families", title: site.couple },
  { id: "details", label: "The details", eyebrow: "Enclosure one", title: "The details" },
  { id: "weekend", label: "The weekend", eyebrow: "Enclosure two", title: "The weekend" },
  { id: "travel", label: "Travel", eyebrow: "Enclosure three", title: "Travel & stays" },
  { id: "attire", label: "Attire", eyebrow: "Enclosure four", title: "What to wear" },
  { id: "story", label: "Our story", eyebrow: "Enclosure five", title: "Our story" },
  { id: "questions", label: "Questions", eyebrow: "Enclosure six", title: "Questions" },
  { id: "registry", label: "Registry", eyebrow: "Enclosure seven", title: "Registry" },
];

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function orderedDays(activities: Activity[]) {
  const days = Array.from(new Set(activities.map((a) => a.date)));
  days.sort((a, b) => {
    const ai = DAY_ORDER.indexOf(a);
    const bi = DAY_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return days;
}

function Ornament() {
  return (
    <svg className="suite-ornament" viewBox="0 0 220 16" aria-hidden="true" focusable="false">
      <path d="M2 8 H88" />
      <path d="M132 8 H218" />
      <path d="M110 2 L118 8 L110 14 L102 8 Z" />
      <circle cx="94" cy="8" r="1.8" />
      <circle cx="126" cy="8" r="1.8" />
    </svg>
  );
}

export default function SuiteDesign({ activities }: { activities: Activity[] }) {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * The bar above this design is one line on a desktop and three on a phone,
   * so the height it steals is not a constant. Measuring our own offset keeps
   * the card and the stepper inside one screen at every width.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const top = Math.max(0, Math.round(root.getBoundingClientRect().top + window.scrollY));
      root.style.setProperty("--suite-top", `${top}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const card = CARDS[index];
  const previous = index > 0 ? CARDS[index - 1] : null;
  const next = index < CARDS.length - 1 ? CARDS[index + 1] : null;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" && next) {
      event.preventDefault();
      setIndex(index + 1);
    }
    if (event.key === "ArrowLeft" && previous) {
      event.preventDefault();
      setIndex(index - 1);
    }
  }

  return (
    <div className="suite-root" ref={rootRef} onKeyDown={onKeyDown}>
      <div className="suite-stage">
        <article
          className="suite-card"
          key={card.id}
          tabIndex={0}
          aria-labelledby="suite-card-title"
          aria-roledescription="enclosure card"
        >
          <div className="suite-rule" aria-hidden="true" />
          <div className="suite-card-inner">
            <p className="suite-eyebrow">{card.eyebrow}</p>
            <h1 className="suite-title" id="suite-card-title">
              {card.title}
            </h1>
            <Ornament />
            <CardBody id={card.id} activities={activities} />
          </div>
        </article>
      </div>

      <nav className="suite-stepper" aria-label="Invitation suite">
        <button
          type="button"
          className="suite-step"
          onClick={() => previous && setIndex(index - 1)}
          disabled={!previous}
        >
          <span aria-hidden="true">←</span>
          <span className="suite-step-label">{previous ? previous.label : "First card"}</span>
        </button>

        <ol className="suite-dots">
          {CARDS.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                className="suite-dot"
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
              >
                <span className="suite-dot-mark" aria-hidden="true" />
                <span className="suite-dot-text">
                  Card {i + 1} of {CARDS.length}: {c.label}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="suite-step"
          onClick={() => next && setIndex(index + 1)}
          disabled={!next}
        >
          <span className="suite-step-label">{next ? next.label : "Last card"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>

      <p className="suite-count" aria-live="polite">
        {card.label} — card {index + 1} of {CARDS.length}
      </p>
    </div>
  );
}

function CardBody({ id, activities }: { id: CardId; activities: Activity[] }) {
  if (id === "invitation") {
    return (
      <div className="suite-body suite-centered">
        <p className="suite-lead">request the pleasure of your company</p>
        <p className="suite-lead">at their marriage</p>
        <p className="suite-date">{site.weddingDate}</p>
        <p className="suite-time">{site.ceremonyTime}</p>
        <div className="suite-rule-thin" aria-hidden="true" />
        <p className="suite-venue">{site.venue}</p>
        <p className="suite-place">{site.location}</p>
        <p className="suite-tagline">{site.tagline}</p>
      </div>
    );
  }

  if (id === "details") {
    return (
      <div className="suite-body">
        <p className="suite-note suite-centered">{site.welcome}</p>
        <dl className="suite-facts">
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
            <dd>{site.venue}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{site.address}</dd>
          </div>
        </dl>
        <p className="suite-centered suite-link">
          <a href={site.mapUrl} target="_blank" rel="noreferrer">
            Directions to the venue
          </a>
        </p>
        <figure className="suite-plate">
          <div className="suite-plate-image">
            <Image
              src={photos.welcome.src}
              alt={photos.welcome.alt}
              fill
              sizes="(max-width: 700px) 84vw, 520px"
            />
          </div>
          <figcaption>{site.location}</figcaption>
        </figure>
      </div>
    );
  }

  if (id === "weekend") {
    const days = orderedDays(activities);
    return (
      <div className="suite-body suite-centered">
        <p className="suite-note">
          Everything we have planned so far, in order. Times marked TODO are still being settled.
        </p>
        {days.map((day) => (
          <section className="suite-day" key={day}>
            <h2>{day}</h2>
            <ul className="suite-plain">
              {activities
                .filter((a) => a.date === day)
                .map((a) => (
                  <li key={a.title + a.time}>
                    <p className="suite-item-time">{a.time}</p>
                    <p className="suite-item-title">{a.title}</p>
                    <p className="suite-item-where">{a.location}</p>
                    <p className="suite-item-text">{a.description}</p>
                    {a.link ? (
                      <p className="suite-link">
                        <a href={a.link} target="_blank" rel="noreferrer">
                          More about this
                        </a>
                      </p>
                    ) : null}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }

  if (id === "travel") {
    return (
      <div className="suite-body">
        <section className="suite-block">
          <h2 className="suite-centered">Getting here</h2>
          {travel.gettingThere.map((t) => (
            <div className="suite-entry" key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </section>
        <section className="suite-block">
          <h2 className="suite-centered">Where to stay</h2>
          {travel.stays.map((s) => (
            <div className="suite-entry" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </section>
        <section className="suite-block">
          <h2 className="suite-centered">While you are here</h2>
          <ul className="suite-list">
            {travel.explore.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <figure className="suite-plate">
          <div className="suite-plate-image">
            <Image
              src={photos.travel.src}
              alt={photos.travel.alt}
              fill
              sizes="(max-width: 700px) 84vw, 520px"
            />
          </div>
          <figcaption>The windward side, forty minutes from town.</figcaption>
        </figure>
      </div>
    );
  }

  if (id === "attire") {
    return (
      <div className="suite-body">
        <p className="suite-lead suite-centered">{dressCode.title}</p>
        <p className="suite-note suite-centered">{dressCode.intro}</p>
        <section className="suite-block">
          <h2 className="suite-centered">Lean into</h2>
          <ul className="suite-list">
            {dressCode.lean.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="suite-block">
          <h2 className="suite-centered">Maybe skip</h2>
          <ul className="suite-list">
            {dressCode.skip.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="suite-block">
          <h2 className="suite-centered">Colours we are drawn to</h2>
          <ul className="suite-colors">
            {dressCode.colors.map((c) => (
              <li key={c}>
                <span style={{ background: c }} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </section>
        <figure className="suite-plate">
          <div className="suite-plate-image">
            <Image
              src={photos.dressCode.src}
              alt={photos.dressCode.alt}
              fill
              sizes="(max-width: 700px) 84vw, 520px"
            />
          </div>
          <figcaption>Bright, easy, and made for an afternoon on grass.</figcaption>
        </figure>
      </div>
    );
  }

  if (id === "story") {
    return (
      <div className="suite-body">
        <p className="suite-note suite-centered">How the two of us arrived at a lawn on Oʻahu.</p>
        <ol className="suite-story">
          {story.map((moment) => (
            <li key={moment.title}>
              {moment.photo ? (
                <div className="suite-story-photo">
                  <Image
                    src={photos[moment.photo].src}
                    alt={photos[moment.photo].alt}
                    fill
                    sizes="(max-width: 700px) 36vw, 180px"
                  />
                </div>
              ) : null}
              <div className="suite-story-text">
                <p className="suite-item-time">{moment.date}</p>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (id === "questions") {
    return (
      <div className="suite-body">
        <dl className="suite-faq">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
        <figure className="suite-plate">
          <div className="suite-plate-image">
            <Image src={photos.faq.src} alt={photos.faq.alt} fill sizes="(max-width: 700px) 84vw, 520px" />
          </div>
          <figcaption>Anything still unanswered, ask either of us.</figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div className="suite-body">
      <p className="suite-note suite-centered">
        Your presence on the island is the gift. If you would like to mark the day with something else,
        these are the places to look.
      </p>
      {registries.map((r) => (
        <div className="suite-entry suite-centered" key={r.name}>
          <h3>{r.name}</h3>
          <p>{r.text}</p>
          <p className="suite-link">
            <a href={r.url} target="_blank" rel="noreferrer">
              Open registry
            </a>
          </p>
        </div>
      ))}
      <figure className="suite-plate">
        <div className="suite-plate-image">
          <Image
            src={photos.registry.src}
            alt={photos.registry.alt}
            fill
            sizes="(max-width: 700px) 84vw, 520px"
          />
        </div>
        <figcaption>
          {site.couple} · {site.weddingDate}
        </figcaption>
      </figure>
    </div>
  );
}
