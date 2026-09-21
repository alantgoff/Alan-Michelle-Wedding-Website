"use client";

/**
 * THE LETTER
 *
 * The whole site is one letter written to the guest. There is no navigation
 * bar and no cards — everything (welcome, story, travel, weekend, dress,
 * questions, gifts) is written out as passages of prose on a single sheet of
 * paper. A slim index sits in the paper's left margin and follows you down,
 * marking the passage you are reading; on a narrow screen it collapses to a
 * one-line rule at the top that names where you are.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { faqs } from "@/content/faq";
import { story } from "@/content/story";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import { photos } from "@/content/photos";
import "./letter.css";

const PASSAGES = [
  { id: "invitation", numeral: "I", label: "The invitation" },
  { id: "story", numeral: "II", label: "How we got here" },
  { id: "island", numeral: "III", label: "Coming to the island" },
  { id: "weekend", numeral: "IV", label: "The weekend itself" },
  { id: "wear", numeral: "V", label: "What to wear" },
  { id: "questions", numeral: "VI", label: "Questions you may have" },
  { id: "gifts", numeral: "VII", label: "On gifts" },
  { id: "closing", numeral: "VIII", label: "With love" },
] as const;

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

const AUDIENCE_LABEL: Record<string, string> = {
  family: "family",
  college: "the college crew",
  "wedding-party": "the wedding party",
};

/** Lowercase a list item so it can be read inside a sentence. */
function runIn(item: string) {
  return /^[A-Z][a-z]/.test(item) ? item[0].toLowerCase() + item.slice(1) : item;
}

/** Join list items into one readable clause: "a; b; and c". */
function asClause(items: readonly string[]) {
  const parts = items.map(runIn);
  if (parts.length < 2) return parts.join("");
  return `${parts.slice(0, -1).join("; ")}; and ${parts[parts.length - 1]}`;
}

export default function Letter({ activities }: { activities: Activity[] }) {
  const [here, setHere] = useState<string>(PASSAGES[0].id);

  // The index follows the reader. Nothing else on the page is interactive.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      let current = PASSAGES[0].id as string;
      for (const p of PASSAGES) {
        const el = document.getElementById(`letter-${p.id}`);
        if (el && el.getBoundingClientRect().top <= 150) current = p.id;
      }
      setHere(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const days = DAY_ORDER.filter((d) => activities.some((a) => a.date === d));
  const strays = activities.filter((a) => !DAY_ORDER.includes(a.date));
  const current = PASSAGES.find((p) => p.id === here) ?? PASSAGES[0];

  const storyPlates = ["story1", "story2", "story3", "story4"] as const;

  return (
    <div className="letter-ground">
      <p className="letter-rule" aria-hidden="true">
        <span className="letter-rule-num">{current.numeral}</span>
        <span className="letter-rule-label">{current.label}</span>
        <span className="letter-rule-count">
          {PASSAGES.indexOf(current) + 1} of {PASSAGES.length}
        </span>
      </p>

      <article className="letter-sheet">
        <nav className="letter-index" aria-label="What this letter covers">
          <p className="letter-index-head">In this letter</p>
          <ol className="letter-index-list">
            {PASSAGES.map((p) => (
              <li key={p.id} className={p.id === here ? "letter-index-on" : undefined}>
                <a href={`#letter-${p.id}`} aria-current={p.id === here ? "true" : undefined}>
                  <span className="letter-index-num">{p.numeral}</span>
                  <span className="letter-index-label">{p.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="letter-index-foot">{site.couple}</p>
        </nav>

        <div className="letter-body">
          <div className="letter-plate letter-plate-wide">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              sizes="(max-width: 960px) 100vw, 660px"
              priority
            />
          </div>

          <p className="letter-dateline">
            {site.location}
            <br />
            {site.weddingDate}
          </p>

          {/* I — the invitation */}
          <section id="letter-invitation" className="letter-passage" aria-labelledby="letter-invitation-h">
            <h1 className="letter-salutation">Dear friend,</h1>
            <h2 id="letter-invitation-h" className="letter-visually-hidden">
              The invitation
            </h2>
            <p className="letter-open">{site.welcome}</p>
            <p>
              So here it is, in writing: we are being married at{" "}
              <strong>{site.venue}</strong> in {site.location}, on{" "}
              <strong>{site.weddingDate}</strong>. The ceremony is called for{" "}
              <em>{site.ceremonyTime}</em>, and the address to hand a driver is {site.address} —{" "}
              <a className="letter-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                here it is on a map
              </a>
              .
            </p>
            <p className="letter-line">{site.tagline}</p>
            <p>
              What follows is everything we know so far: how we got here, how to get
              yourself here, what each day of the weekend holds, what to put on, and
              the answers to the questions people have already asked us. Where
              something is still unsettled we have left the note to ourselves in
              plain sight rather than pretend.
            </p>
          </section>

          {/* II — the story */}
          <section id="letter-story" className="letter-passage" aria-labelledby="letter-story-h">
            <h2 id="letter-story-h" className="letter-heading">
              <span className="letter-heading-num">II</span> How we got here
            </h2>
            {story.map((moment, i) => {
              const key = moment.photo ?? storyPlates[i % storyPlates.length];
              const plate = photos[key as keyof typeof photos];
              return (
                <div
                  key={moment.title}
                  className={i % 2 === 1 ? "letter-movement letter-movement-flip" : "letter-movement"}
                >
                  <figure className="letter-tipin">
                    <Image
                      src={plate.src}
                      alt={plate.alt}
                      width={640}
                      height={800}
                      sizes="(max-width: 960px) 100vw, 200px"
                    />
                    <figcaption>{moment.title}</figcaption>
                  </figure>
                  <p>
                    <span className="letter-when">{moment.date}</span>
                    <strong>{moment.title}.</strong> {moment.text}
                  </p>
                </div>
              );
            })}
          </section>

          {/* III — travel */}
          <section id="letter-island" className="letter-passage" aria-labelledby="letter-island-h">
            <h2 id="letter-island-h" className="letter-heading">
              <span className="letter-heading-num">III</span> Coming to the island
            </h2>
            <p>
              Oʻahu is further than it looks on a map and closer than it feels once
              you are in the air. Two things are worth sorting early — how you land
              and where you sleep — and the rest of the week tends to arrange itself
              around them.
            </p>
            {travel.gettingThere.map((t) => (
              <p key={t.title}>
                <strong>{t.title}.</strong> {t.text}
              </p>
            ))}
            <div className="letter-plate letter-plate-wide">
              <Image
                src={photos.travel.src}
                alt={photos.travel.alt}
                fill
                sizes="(max-width: 960px) 100vw, 660px"
              />
            </div>
            <aside className="letter-aside">
              <p className="letter-aside-head">While you are here</p>
              <ul>
                {travel.explore.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </aside>
            <p>
              As for where to sleep, there is no wrong answer — only a trade between
              how much island you want at night and how far you want to drive on
              Saturday.
            </p>
            {travel.stays.map((s) => (
              <p key={s.title}>
                <strong>{s.title}.</strong> {s.text}
              </p>
            ))}
          </section>

          {/* IV — the weekend */}
          <section id="letter-weekend" className="letter-passage" aria-labelledby="letter-weekend-h">
            <h2 id="letter-weekend-h" className="letter-heading">
              <span className="letter-heading-num">IV</span> The weekend itself
            </h2>
            <p>
              We have tried to keep the days loose. Nothing here is obligatory except
              the part where we get married, and even that we would like you to
              arrive at slowly, with a coffee in your hand.
            </p>
            {days.map((day) => {
              const ofDay = activities
                .filter((a) => a.date === day)
                .slice()
                .sort((a, b) => clock(a.time) - clock(b.time));
              return (
                <p key={day}>
                  <span className="letter-when">{day}</span>
                  {ofDay.map((a, i) => (
                    <span key={a.title}>
                      {i > 0 ? " " : ""}
                      <em>{a.title}</em>
                      {a.time ? `, ${a.time}` : ""}
                      {a.location ? `, at ${a.location}` : ""}.{" "}
                      {a.description}
                      {a.audience !== "everyone" && AUDIENCE_LABEL[a.audience] ? (
                        <span className="letter-only"> For {AUDIENCE_LABEL[a.audience]}.</span>
                      ) : null}
                      {a.link ? (
                        <>
                          {" "}
                          <a className="letter-link" href={a.link}>
                            More on this
                          </a>
                          .
                        </>
                      ) : null}
                    </span>
                  ))}
                </p>
              );
            })}
            {strays.length > 0 && (
              <p>
                <span className="letter-when">Also</span>
                {strays.map((a, i) => (
                  <span key={a.title}>
                    {i > 0 ? " " : ""}
                    <em>{a.title}</em>
                    {a.date ? `, ${a.date}` : ""}
                    {a.time ? `, ${a.time}` : ""}. {a.description}
                  </span>
                ))}
              </p>
            )}
            <p>
              If you can only come for one day, come for the middle one. If you can
              stay for all of it, we will be the ones still at the table.
            </p>
          </section>

          {/* V — dress */}
          <section id="letter-wear" className="letter-passage" aria-labelledby="letter-wear-h">
            <h2 id="letter-wear-h" className="letter-heading">
              <span className="letter-heading-num">V</span> What to wear
            </h2>
            <p>
              <strong>{dressCode.title}.</strong> {dressCode.intro} The lawn is real
              grass and the afternoon is genuinely warm, so dress for standing
              outdoors in the sun rather than for a ballroom.
            </p>
            <p>
              <strong>Lean toward</strong> {asClause(dressCode.lean)}.
            </p>
            <p>
              <strong>Leave at home</strong> {asClause(dressCode.skip)}.
            </p>
            <p>
              These are the colors we keep coming back to, if you would like to be
              somewhere near them. None of it is a rule.
            </p>
            <ul className="letter-palette">
              {dressCode.colors.map((c) => (
                <li key={c}>
                  <span className="letter-chip" style={{ background: c }} aria-hidden="true" />
                  <span className="letter-chip-name">{c}</span>
                </li>
              ))}
            </ul>
            <div className="letter-plate letter-plate-wide">
              <Image
                src={photos.dressCode.src}
                alt={photos.dressCode.alt}
                fill
                sizes="(max-width: 960px) 100vw, 660px"
              />
            </div>
          </section>

          {/* VI — questions */}
          <section id="letter-questions" className="letter-passage" aria-labelledby="letter-questions-h">
            <h2 id="letter-questions-h" className="letter-heading">
              <span className="letter-heading-num">VI</span> Questions you may have
            </h2>
            <p>
              People have been kind enough to ask these out loud, which saved us from
              guessing. Here they are with our answers as they stand today.
            </p>
            {faqs.map((f) => (
              <p key={f.q} className="letter-qa">
                <em>{f.q}</em> {f.a}
              </p>
            ))}
          </section>

          {/* VII — gifts */}
          <section id="letter-gifts" className="letter-passage" aria-labelledby="letter-gifts-h">
            <h2 id="letter-gifts-h" className="letter-heading">
              <span className="letter-heading-num">VII</span> On gifts
            </h2>
            <p>
              Please do not bring anything. Flying to an island for us is already a
              great deal more than we would ever ask. If you would like to mark the
              day anyway, this is where we will keep the details.
            </p>
            {registries.map((r) => (
              <p key={r.name}>
                <strong>{r.name}.</strong> {r.text}
                {r.url && r.url !== "#" ? (
                  <>
                    {" "}
                    <a className="letter-link" href={r.url} target="_blank" rel="noreferrer">
                      Open it
                    </a>
                    .
                  </>
                ) : null}
              </p>
            ))}
          </section>

          {/* VIII — closing */}
          <section id="letter-closing" className="letter-passage" aria-labelledby="letter-closing-h">
            <h2 id="letter-closing-h" className="letter-visually-hidden">
              With love
            </h2>
            <p className="letter-valediction">With love, and with real excitement,</p>
            <p className="letter-signature">{site.couple}</p>
            <p className="letter-ps">
              P.S. Anything above marked <span className="letter-todo">TODO</span> is
              still being settled. We would rather show you the gaps than paper over
              them, and we will write again the moment they close.
            </p>
            <div className="letter-plate letter-plate-wide">
              <Image
                src={photos.registry.src}
                alt={photos.registry.alt}
                fill
                sizes="(max-width: 960px) 100vw, 660px"
              />
            </div>
            <p className="letter-colophon">
              {site.venue} · {site.location}
              <br />
              {site.address}
              <br />
              <a className="letter-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                Directions
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

/** Minutes past midnight, so a day's events read in order. */
function clock(time: string) {
  const m = /(\d{1,2}):(\d{2})\s*([AaPp])[Mm]/.exec(time);
  if (!m) return 12 * 60;
  const hour = Number(m[1]) % 12;
  const pm = m[3].toLowerCase() === "p";
  return (pm ? hour + 12 : hour) * 60 + Number(m[2]);
}
