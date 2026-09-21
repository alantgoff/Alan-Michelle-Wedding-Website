/**
 * THE ITINERARY
 *
 * The site is the weekend itself. One time spine runs from "how we got here"
 * through Thursday, Friday, Saturday and Sunday to the morning after, and
 * every piece of content is pinned to the moment you actually need it:
 * travel at Thursday, dress code immediately before the ceremony, questions
 * wherever they come up, registry at the very end.
 *
 * Day markers ride down a left rail — each one is sticky inside its own day,
 * so the day you are in stays named beside you with no JavaScript at all.
 */

import Image from "next/image";
import type { Activity } from "@/content/activities";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { faqs } from "@/content/faq";
import { story } from "@/content/story";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import { photos } from "@/content/photos";
import "./itinerary.css";

const DAYS = [
  { name: "Thursday", note: "Arrivals" },
  { name: "Friday", note: "The gathering" },
  { name: "Saturday", note: "The wedding day" },
  { name: "Sunday", note: "One last swim" },
];

const AUDIENCE_LABEL: Record<string, string> = {
  family: "Family",
  college: "College friends",
  "wedding-party": "Wedding party",
};

/** Minutes past midnight, so a day reads in order. Unset times sit at noon. */
function clock(time: string) {
  const m = /(\d{1,2}):(\d{2})\s*([AaPp])[Mm]/.exec(time);
  if (!m) return 12 * 60;
  const hour = Number(m[1]) % 12;
  return ((m[3].toLowerCase() === "p" ? hour + 12 : hour) * 60) + Number(m[2]);
}

export default function Itinerary({ activities }: { activities: Activity[] }) {
  // Questions are split across the weekend rather than piled in one list.
  const pick = (re: RegExp) => faqs.filter((f) => re.test(f.q));
  const beforeYouBook = pick(/transport|guest|children/i);
  const weather = pick(/weather/i);
  const dayOf = pick(/wear|when is the wedding/i);
  const placed = new Set([...beforeYouBook, ...weather, ...dayOf]);
  const leftovers = faqs.filter((f) => !placed.has(f));

  const known = DAYS.map((d) => d.name);
  const extraDays = Array.from(new Set(activities.map((a) => a.date))).filter(
    (d) => !known.includes(d),
  );
  const schedule = [...DAYS, ...extraDays.map((name) => ({ name, note: "Also this weekend" }))];

  const forDay = (day: string) =>
    activities
      .filter((a) => a.date === day)
      .slice()
      .sort((a, b) => clock(a.time) - clock(b.time));

  return (
    <div className="itinerary-page">
      <header className="itinerary-open">
        <div className="itinerary-open-photo">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="itinerary-scrim" />
        </div>
        <div className="itinerary-open-text">
          <p className="itinerary-open-kick">Four days on the windward coast</p>
          <h1 className="itinerary-open-names">{site.couple}</h1>
          <p className="itinerary-open-when">{site.weddingDate}</p>
          <p className="itinerary-open-where">
            {site.venue} · {site.location}
          </p>
          <p className="itinerary-open-tag">{site.tagline}</p>
        </div>
      </header>

      <nav className="itinerary-jump" aria-label="Jump to a day">
        <a href="#itinerary-before">Before</a>
        {schedule.map((d) => (
          <a key={d.name} href={`#itinerary-${d.name.toLowerCase()}`}>
            {d.name}
          </a>
        ))}
        <a href="#itinerary-after">Afterward</a>
      </nav>

      <div className="itinerary-spine">
        {/* ---- before the weekend: the story, on the same spine ---- */}
        <section id="itinerary-before" className="itinerary-day" aria-labelledby="itinerary-before-h">
          <div className="itinerary-rail">
            <div className="itinerary-marker">
              <span className="itinerary-marker-day" id="itinerary-before-h">
                Before
              </span>
              <span className="itinerary-marker-note">How we got here</span>
            </div>
          </div>
          <div className="itinerary-track itinerary-track-dashed">
            <div className="itinerary-entry itinerary-entry-note">
              <p className="itinerary-eyebrow">First, a note</p>
              <div className="itinerary-note">
                <div className="itinerary-note-photo">
                  <Image
                    src={photos.welcome.src}
                    alt={photos.welcome.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 620px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="itinerary-lede">{site.welcome}</p>
              </div>
            </div>

            {story.map((moment) => {
              const plate = moment.photo ? photos[moment.photo] : null;
              return (
                <article key={moment.title} className="itinerary-entry itinerary-entry-past">
                  <p className="itinerary-eyebrow">
                    <span className="itinerary-clock">{moment.date}</span>
                  </p>
                  <div className="itinerary-past">
                    {plate && (
                      <div className="itinerary-past-photo">
                        <Image
                          src={plate.src}
                          alt={plate.alt}
                          width={480}
                          height={600}
                          sizes="120px"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="itinerary-event-title">{moment.title}</h3>
                      <p className="itinerary-text">{moment.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ---- the four days ---- */}
        {schedule.map((day) => {
          const events = forDay(day.name);
          return (
            <section
              key={day.name}
              id={`itinerary-${day.name.toLowerCase()}`}
              className="itinerary-day"
              aria-labelledby={`itinerary-h-${day.name.toLowerCase()}`}
            >
              <div className="itinerary-rail">
                <div className="itinerary-marker">
                  <span className="itinerary-marker-day" id={`itinerary-h-${day.name.toLowerCase()}`}>
                    {day.name}
                  </span>
                  <span className="itinerary-marker-note">{day.note}</span>
                </div>
              </div>

              <div className="itinerary-track">
                {/* Thursday carries everything about getting yourself here. */}
                {day.name === "Thursday" && (
                  <>
                    <div className="itinerary-entry itinerary-entry-note">
                      <p className="itinerary-eyebrow">Before you land</p>
                      <div className="itinerary-note">
                        <div className="itinerary-note-photo">
                          <Image
                            src={photos.travel.src}
                            alt={photos.travel.alt}
                            fill
                            sizes="(max-width: 820px) 100vw, 620px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <h3 className="itinerary-note-title">Getting here</h3>
                        {travel.gettingThere.map((t) => (
                          <div key={t.title} className="itinerary-point">
                            <h4>{t.title}</h4>
                            <p>{t.text}</p>
                          </div>
                        ))}
                        <h3 className="itinerary-note-title">Where to stay</h3>
                        {travel.stays.map((s) => (
                          <div key={s.title} className="itinerary-point">
                            <h4>{s.title}</h4>
                            <p>{s.text}</p>
                          </div>
                        ))}
                        <h3 className="itinerary-note-title">Worth doing while you are here</h3>
                        <ul className="itinerary-list">
                          {travel.explore.map((e) => (
                            <li key={e}>{e}</li>
                          ))}
                        </ul>
                        <p className="itinerary-address">
                          {site.venue}, {site.address} ·{" "}
                          <a
                            className="itinerary-link"
                            href={site.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Map
                          </a>
                        </p>
                      </div>
                    </div>
                    {beforeYouBook.length > 0 && (
                      <QuestionNote label="Ask before you book" items={beforeYouBook} />
                    )}
                  </>
                )}

                {/* Friday: one practical question about the days outside. */}
                {day.name === "Friday" && weather.length > 0 && (
                  <QuestionNote label="On the day" items={weather} />
                )}

                {/* Saturday: what to wear, read immediately before the ceremony. */}
                {day.name === "Saturday" && (
                  <>
                    <div className="itinerary-entry itinerary-entry-note">
                      <p className="itinerary-eyebrow">Before you get dressed</p>
                      <div className="itinerary-note">
                        <div className="itinerary-note-photo">
                          <Image
                            src={photos.dressCode.src}
                            alt={photos.dressCode.alt}
                            fill
                            sizes="(max-width: 820px) 100vw, 620px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <h3 className="itinerary-note-title">{dressCode.title}</h3>
                        <p>{dressCode.intro}</p>
                        <div className="itinerary-two">
                          <div>
                            <h4>Lean toward</h4>
                            <ul className="itinerary-list">
                              {dressCode.lean.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4>Leave at home</h4>
                            <ul className="itinerary-list itinerary-list-skip">
                              {dressCode.skip.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <h4>Colors we keep coming back to</h4>
                        <ul className="itinerary-colors">
                          {dressCode.colors.map((c) => (
                            <li key={c}>
                              <span
                                className="itinerary-chip"
                                style={{ background: c }}
                                aria-hidden="true"
                              />
                              <span className="itinerary-chip-name">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {dayOf.length > 0 && <QuestionNote label="Two you asked twice" items={dayOf} />}
                  </>
                )}

                {events.map((a) => (
                  <article
                    key={`${a.date}-${a.title}`}
                    className={
                      a.title.toLowerCase().includes("ceremony")
                        ? "itinerary-entry itinerary-entry-event itinerary-entry-main"
                        : "itinerary-entry itinerary-entry-event"
                    }
                  >
                    <p className="itinerary-eyebrow">
                      <span className="itinerary-clock">{a.time}</span>
                      {a.audience !== "everyone" && AUDIENCE_LABEL[a.audience] ? (
                        <span className="itinerary-tag">{AUDIENCE_LABEL[a.audience]} only</span>
                      ) : null}
                    </p>
                    <h3 className="itinerary-event-title">{a.title}</h3>
                    <p className="itinerary-where">{a.location}</p>
                    <p className="itinerary-text">{a.description}</p>
                    {a.link ? (
                      <p className="itinerary-text">
                        <a className="itinerary-link" href={a.link}>
                          Details
                        </a>
                      </p>
                    ) : null}
                    {a.title.toLowerCase().includes("ceremony") && (
                      <div className="itinerary-main-photo">
                        <Image
                          src={photos.activities.src}
                          alt={photos.activities.alt}
                          fill
                          sizes="(max-width: 820px) 100vw, 620px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </article>
                ))}

                {events.length === 0 && (
                  <p className="itinerary-quiet">
                    Nothing on the schedule for {day.name}. The island is yours.
                  </p>
                )}
              </div>
            </section>
          );
        })}

        {/* ---- after ---- */}
        <section id="itinerary-after" className="itinerary-day" aria-labelledby="itinerary-after-h">
          <div className="itinerary-rail">
            <div className="itinerary-marker">
              <span className="itinerary-marker-day" id="itinerary-after-h">
                Afterward
              </span>
              <span className="itinerary-marker-note">Flights home</span>
            </div>
          </div>
          <div className="itinerary-track itinerary-track-dashed">
            {leftovers.length > 0 && <QuestionNote label="Anything else" items={leftovers} />}

            <div className="itinerary-entry itinerary-entry-note">
              <p className="itinerary-eyebrow">If you would like to</p>
              <div className="itinerary-note">
                <div className="itinerary-note-photo">
                  <Image
                    src={photos.registry.src}
                    alt={photos.registry.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 620px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="itinerary-note-title">Registry</h3>
                <p>
                  Getting yourselves to Oʻahu is already more than enough. If you want
                  to mark the weekend anyway, this is where the details will live.
                </p>
                {registries.map((r) => (
                  <div key={r.name} className="itinerary-point">
                    <h4>{r.name}</h4>
                    <p>
                      {r.text}
                      {r.url && r.url !== "#" ? (
                        <>
                          {" "}
                          <a
                            className="itinerary-link"
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="itinerary-entry itinerary-entry-end">
              <p className="itinerary-eyebrow">
                <span className="itinerary-clock">Then home</span>
              </p>
              <p className="itinerary-sign">{site.couple}</p>
              <p className="itinerary-text">
                {site.venue} · {site.location} · {site.address}
              </p>
              <p className="itinerary-text">
                <a className="itinerary-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                  Directions to the venue
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/** A question, pinned to the point in the weekend where it comes up. */
function QuestionNote({ label, items }: { label: string; items: { q: string; a: string }[] }) {
  return (
    <div className="itinerary-entry itinerary-entry-note">
      <p className="itinerary-eyebrow">{label}</p>
      <div className="itinerary-note itinerary-note-quiet">
        {items.map((f) => (
          <div key={f.q} className="itinerary-q">
            <h4>{f.q}</h4>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
