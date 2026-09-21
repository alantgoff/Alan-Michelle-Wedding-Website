import type { ReactNode } from "react";
import Image from "next/image";
import type { Activity } from "@/content/activities";
import { groups } from "@/content/groups";
import { site } from "@/content/site";
import { photos } from "@/content/photos";
import { travel } from "@/content/travel";
import { story } from "@/content/story";
import { faqs } from "@/content/faq";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import "./album.css";

/**
 * THE ALBUM — photographs first, words only when you ask.
 *
 * The whole site is a mosaic of plates. There is no navigation, no scrolling
 * hierarchy and no headings until you open something: each plate is a
 * <details> whose <summary> is the photograph itself. Opening one lets it
 * break the mosaic and unfold across the full width — picture on one side,
 * text on the other, like a spread in a printed album. No JavaScript, and
 * keyboard operable by virtue of being a real disclosure widget.
 */

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

type Plate = {
  no: string;
  name: string;
  note: string;
  photo: { src: string; alt: string };
  shape: string;
  children: ReactNode;
};

function Plate({ no, name, note, photo, shape, children }: Plate) {
  return (
    <details className={`album-plate ${shape}`}>
      <summary className="album-face">
        <span className="album-shot">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1039px) 60vw, 48vw"
          />
        </span>
        <span className="album-veil" aria-hidden="true" />
        <span className="album-caption">
          <span className="album-no">Plate {no}</span>
          <span className="album-name">{name}</span>
          <span className="album-note">{note}</span>
        </span>
        <span className="album-cue" aria-hidden="true">
          <i className="album-cue-h" />
          <i className="album-cue-v" />
        </span>
      </summary>
      <div className="album-leaf">
        <div className="album-measure">{children}</div>
      </div>
    </details>
  );
}

export default function Album({ activities }: { activities: Activity[] }) {
  const days = groupByDay(activities);

  return (
    <div className="album-root">
      <div className="album-mosaic">
        <header className="album-title">
          <span className="album-shot">
            <Image src={photos.hero.src} alt={photos.hero.alt} fill priority sizes="100vw" />
          </span>
          <span className="album-veil album-veil-deep" aria-hidden="true" />
          <div className="album-plaque">
            <p className="album-overline">Plates from a wedding weekend</p>
            <h1>{site.couple}</h1>
            <p className="album-stamp">{site.weddingDate}</p>
            <p className="album-stamp">
              {site.venue} &middot; {site.location}
            </p>
            <p className="album-hint">Seven plates follow. Open any one to read it.</p>
          </div>
        </header>

        <div className="album-band album-band-a">
          <Plate
            no="I"
            name="The weekend"
            note="Thursday through Sunday, hour by hour"
            photo={photos.activities}
            shape="album-g7"
          >
            <h2>The weekend</h2>
            <p className="album-lede">
              Everything on the calendar, in the order it happens. Times marked TODO are still being
              settled.
            </p>
            {days.map(({ day, items }) => (
              <section key={day} className="album-day">
                <h3>{day}</h3>
                <ul className="album-entries">
                  {items.map((a) => {
                    const who = audienceName(a.audience);
                    return (
                      <li key={`${a.title}-${a.time}`} className="album-entry">
                        <p className="album-when">{a.time}</p>
                        <div>
                          <h4>
                            {a.title}
                            {who ? <span className="album-tag">{who}</span> : null}
                          </h4>
                          <p className="album-where">{a.location}</p>
                          <p>{a.description}</p>
                          {a.link ? (
                            <p>
                              <a className="album-link" href={a.link}>
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
          </Plate>

          <Plate
            no="II"
            name="Our story"
            note="Four pictures, in order"
            photo={photos.story}
            shape="album-g5"
          >
            <h2>Our story</h2>
            <ol className="album-moments">
              {story.map((m) => (
                <li key={m.title} className="album-moment">
                  {m.photo ? (
                    <span className="album-inset">
                      <Image
                        src={photos[m.photo].src}
                        alt={photos[m.photo].alt}
                        fill
                        sizes="(max-width: 639px) 45vw, 190px"
                      />
                    </span>
                  ) : null}
                  <div>
                    <p className="album-when">{m.date}</p>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Plate>
        </div>

        <div className="album-band album-band-b">
          <Plate
            no="III"
            name="Getting here"
            note="Flights, cars and where to sleep"
            photo={photos.travel}
            shape="album-g5"
          >
            <h2>Getting here</h2>
            <h3>Arriving</h3>
            <dl className="album-defs">
              {travel.gettingThere.map((t) => (
                <div key={t.title}>
                  <dt>{t.title}</dt>
                  <dd>{t.text}</dd>
                </div>
              ))}
            </dl>
            <h3>Where to stay</h3>
            <dl className="album-defs">
              {travel.stays.map((t) => (
                <div key={t.title}>
                  <dt>{t.title}</dt>
                  <dd>{t.text}</dd>
                </div>
              ))}
            </dl>
            <h3>While you are here</h3>
            <ul className="album-ticks">
              {travel.explore.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Plate>

          <Plate
            no="IV"
            name="What to wear"
            note={dressCode.title}
            photo={photos.dressCode}
            shape="album-g4"
          >
            <h2>{dressCode.title}</h2>
            <p className="album-lede">{dressCode.intro}</p>
            <div className="album-columns">
              <section>
                <h3>Lean into</h3>
                <ul className="album-ticks">
                  {dressCode.lean.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Maybe skip</h3>
                <ul className="album-ticks album-ticks-skip">
                  {dressCode.skip.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            </div>
            <h3>Colours we keep coming back to</h3>
            <ul className="album-chips">
              {dressCode.colors.map((c) => (
                <li key={c}>
                  <span className="album-chip" style={{ background: c }} aria-hidden="true" />
                  <span className="album-hex">{c}</span>
                </li>
              ))}
            </ul>
          </Plate>

          <Plate
            no="V"
            name="Questions"
            note="The things people have asked"
            photo={photos.faq}
            shape="album-g3"
          >
            <h2>Questions</h2>
            <dl className="album-defs">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </Plate>
        </div>

        <div className="album-band album-band-c">
          <Plate
            no="VI"
            name="Gifts"
            note="Only if you would like to"
            photo={photos.registry}
            shape="album-g4"
          >
            <h2>Gifts</h2>
            <p className="album-lede">
              Your being on the island with us is the whole gift. If you would like to do something
              more, these are the places.
            </p>
            <ul className="album-gifts">
              {registries.map((r) => (
                <li key={r.name}>
                  <h3>{r.name}</h3>
                  <p>{r.text}</p>
                  <a className="album-link" href={r.url}>
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </Plate>

          <Plate
            no="VII"
            name="A note from us"
            note="And where to point the car"
            photo={photos.welcome}
            shape="album-g8"
          >
            <h2>A note from us</h2>
            <p className="album-lede">{site.tagline}</p>
            <p>{site.welcome}</p>
            <dl className="album-defs">
              <div>
                <dt>Ceremony</dt>
                <dd>
                  {site.weddingDate} &middot; {site.ceremonyTime}
                </dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>
                  {site.venue}, {site.location}
                  <br />
                  {site.address}
                </dd>
              </div>
            </dl>
            <p>
              <a className="album-link" href={site.mapUrl} target="_blank" rel="noreferrer">
                Open the venue in Maps
              </a>
            </p>
          </Plate>
        </div>
      </div>

      <footer className="album-colophon">
        <span className="album-shot">
          <Image src={photos.card.src} alt="" fill sizes="100vw" />
        </span>
        <span className="album-veil album-veil-deep" aria-hidden="true" />
        <div className="album-plaque album-plaque-quiet">
          <p className="album-overline">{site.couple}</p>
          <p className="album-stamp">
            {site.weddingDate} &middot; {site.venue}
          </p>
        </div>
      </footer>
    </div>
  );
}
