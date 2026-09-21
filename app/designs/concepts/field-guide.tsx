import Image from "next/image";
import type { ReactNode } from "react";
import type { Activity } from "@/content/activities";
import { groups } from "@/content/groups";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { faqs } from "@/content/faq";
import { story } from "@/content/story";
import { dressCode } from "@/content/dressCode";
import { registries } from "@/content/registry";
import { photos } from "@/content/photos";
import "./field-guide.css";

/**
 * THE FIELD GUIDE
 *
 * A reference book, not a brochure. Every fact is a numbered entry, the text
 * sets in two dense columns with notes in the outer margin, entries
 * cross-reference each other by number, and an alphabetical index closes the
 * book. You look things up here; you do not scroll past them.
 */

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/** Sort key for a clock time. Entries still marked TODO sort to the end. */
function minutesOfDay(time: string) {
  const m = /^(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)$/i.exec(time.trim());
  if (!m) return 24 * 60 + 1;
  const hour = Number(m[1]) % 12;
  const pm = m[3].toLowerCase().startsWith("p");
  return (pm ? hour + 12 : hour) * 60 + Number(m[2]);
}

const anchorOf = (n: string) => `fg-${n.replace(/\./g, "-")}`;

function Ref({ n, children }: { n: string; children?: ReactNode }) {
  return (
    <a className="field-guide-ref" href={`#${anchorOf(n)}`}>
      {children ?? n}
    </a>
  );
}

function PartRef({ n, children }: { n: number; children: ReactNode }) {
  return (
    <a className="field-guide-ref" href={`#fg-part-${n}`}>
      {children}
    </a>
  );
}

function Mark({ k }: { k: string }) {
  return (
    <a className="field-guide-mark" href={`#fg-note-${k}`} aria-label={`Margin note ${k}`}>
      <sup>{k.replace(/^\d+/, "")}</sup>
    </a>
  );
}

function Note({ k, children }: { k: string; children: ReactNode }) {
  return (
    <p className="field-guide-note" id={`fg-note-${k}`}>
      <span className="field-guide-note-key">{k.replace(/^\d+/, "")}</span>
      {children}
    </p>
  );
}

function Entry({
  n,
  title,
  meta,
  children,
}: {
  n: string;
  title: string;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="field-guide-entry" id={anchorOf(n)}>
      <h3 className="field-guide-entry-head">
        <span className="field-guide-entry-num">{n}</span>
        <span className="field-guide-entry-name">{title}</span>
      </h3>
      {meta ? <p className="field-guide-entry-meta">{meta}</p> : null}
      {children}
    </article>
  );
}

function Book({
  roman,
  n,
  title,
  strapline,
  notes,
  plate,
  children,
}: {
  roman: string;
  n: number;
  title: string;
  strapline: string;
  notes: ReactNode;
  plate?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="field-guide-book" id={`fg-part-${n}`} aria-labelledby={`fg-part-${n}-h`}>
      <header className="field-guide-book-head">
        <span className="field-guide-book-roman">{roman}</span>
        <h2 id={`fg-part-${n}-h`}>{title}</h2>
        <p className="field-guide-book-strap">{strapline}</p>
      </header>
      <div className="field-guide-text">{children}</div>
      <aside className="field-guide-notes" aria-label={`Plate and margin notes to part ${roman}`}>
        {plate}
        <p className="field-guide-notes-head">Notes</p>
        {notes}
      </aside>
    </section>
  );
}

function Plate({
  plate,
  photo,
  shape = "wide",
}: {
  plate: string;
  photo: { src: string; alt: string };
  shape?: "wide" | "tall";
}) {
  return (
    <figure className={`field-guide-plate field-guide-plate-${shape}`}>
      <span className="field-guide-plate-media">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 780px) 92vw, 30vw" />
      </span>
      <figcaption>
        <span className="field-guide-plate-num">Plate {plate}</span> {photo.alt}
      </figcaption>
    </figure>
  );
}

export default function FieldGuide({ activities }: { activities: Activity[] }) {
  const groupName = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

  const dayNames = Array.from(
    new Set([...DAY_ORDER, ...activities.map((a) => a.date)]),
  ).filter((d) => activities.some((a) => a.date === d));

  let running = 0;
  const weekend = dayNames.map((day) => ({
    day,
    items: activities
      .filter((a) => a.date === day)
      .sort((a, b) => minutesOfDay(a.time) - minutesOfDay(b.time))
      .map((a) => ({ a, n: `2.${++running}` })),
  }));
  const allEvents = weekend.flatMap((d) => d.items);
  const ceremonyRef = allEvents.find((e) => /ceremony/i.test(e.a.title))?.n ?? "2.1";

  const weatherRef = `8.${(faqs.findIndex((f) => /weather/i.test(f.q)) + 1) || faqs.length}`;
  const shuttleRef = `8.${(faqs.findIndex((f) => /transport|shuttle/i.test(f.q)) + 1) || faqs.length}`;
  const childrenRef = `8.${(faqs.findIndex((f) => /child/i.test(f.q)) + 1) || faqs.length}`;
  const guestRef = `8.${(faqs.findIndex((f) => /guest/i.test(f.q)) + 1) || faqs.length}`;

  const parts = [
    { n: 1, title: "The occasion", count: 2 },
    { n: 2, title: "The weekend", count: allEvents.length },
    { n: 3, title: "Getting there", count: travel.gettingThere.length },
    { n: 4, title: "Where to stay", count: travel.stays.length },
    { n: 5, title: "The island", count: 1 },
    { n: 6, title: "What to wear", count: 4 },
    { n: 7, title: "How we got here", count: story.length },
    { n: 8, title: "Questions", count: faqs.length },
    { n: 9, title: "Gifts", count: registries.length },
  ];

  const index: { term: string; refs: string[] }[] = [
    { term: "Address, venue", refs: ["1.2"] },
    { term: "Aloha attire", refs: ["6.1"] },
    { term: "Beaches", refs: ["5.1"] },
    { term: "Ceremony, hour of", refs: ["1.1", ceremonyRef] },
    { term: "Children", refs: [childrenRef] },
    { term: "Colours", refs: ["6.4"] },
    { term: "Driving times", refs: ["3.1", "4.1"] },
    { term: "Guests, additional", refs: [guestRef] },
    { term: "Honolulu airport (HNL)", refs: ["3.1"] },
    { term: "Kāneʻohe", refs: ["1.2", "4.3"] },
    { term: "Map link", refs: ["1.2"] },
    { term: "Pālikū Gardens", refs: ["1.2", ceremonyRef] },
    { term: "Proposal", refs: [`7.${Math.max(1, story.findIndex((s) => /proposal/i.test(s.title)) + 1)}`] },
    { term: "Rain", refs: ["5.1", weatherRef] },
    { term: "Rental car", refs: ["3.2", shuttleRef] },
    { term: "Shoes", refs: ["6.2", "6.3"] },
    { term: "Shuttles", refs: ["3.2", shuttleRef] },
    { term: "Sunscreen, reef-safe", refs: ["5.1"] },
    { term: "Weather", refs: [weatherRef, "5.1"] },
    ...allEvents.map((e) => ({ term: e.a.title, refs: [e.n] })),
    ...travel.stays.map((s, i) => ({ term: s.title, refs: [`4.${i + 1}`] })),
    ...travel.gettingThere.map((g, i) => ({ term: g.title, refs: [`3.${i + 1}`] })),
    ...registries.map((r, i) => ({ term: r.name, refs: [`9.${i + 1}`] })),
  ].sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));

  return (
    <div className="field-guide">
      <a className="field-guide-skip" href="#fg-part-1">
        Skip to the first entry
      </a>

      {/* ---- Title plate --------------------------------------------- */}
      <header className="field-guide-plate-page">
        <div className="field-guide-titleblock">
          <p className="field-guide-runninghead">A field guide to the weekend</p>
          <h1>{site.couple}</h1>
          <p className="field-guide-subtitle">{site.tagline}</p>
          <dl className="field-guide-imprint">
            <div>
              <dt>Date</dt>
              <dd>{site.weddingDate}</dd>
            </div>
            <div>
              <dt>Hour</dt>
              <dd>{site.ceremonyTime}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{site.venue}</dd>
            </div>
            <div>
              <dt>Coast</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>
          <p className="field-guide-howto">
            Every fact here is a numbered entry: <strong>3.1</strong> is the first entry of part <strong>III</strong>. A
            number set in rust, like <Ref n="3.1" />, is a cross-reference — follow it. Small letters in the text mark
            notes in the outer margin. The index at the back lists the whole weekend alphabetically, by entry rather
            than by page.
          </p>
        </div>
        <span className="field-guide-frontispiece">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            sizes="(max-width: 900px) 92vw, 34vw"
            priority
          />
        </span>
      </header>

      <div className="field-guide-page">
        {/* ---- Contents rail ----------------------------------------- */}
        <nav className="field-guide-rail" aria-label="Contents">
          <p className="field-guide-rail-head">Contents</p>
          <ol className="field-guide-rail-list">
            {parts.map((p, i) => (
              <li key={p.n}>
                <a href={`#fg-part-${p.n}`}>
                  <span className="field-guide-rail-roman">{ROMAN[i]}</span>
                  <span className="field-guide-rail-name">{p.title}</span>
                  <span className="field-guide-rail-count">{p.count}</span>
                </a>
              </li>
            ))}
            <li className="field-guide-rail-index">
              <a href="#fg-index">
                <span className="field-guide-rail-roman">—</span>
                <span className="field-guide-rail-name">Index</span>
                <span className="field-guide-rail-count">{index.length}</span>
              </a>
            </li>
          </ol>
          <p className="field-guide-rail-foot">
            {site.venue}
            <br />
            {site.weddingDate}
          </p>
        </nav>

        <main className="field-guide-body">
          {/* ---- I. The occasion ------------------------------------- */}
          <Book
            roman={ROMAN[0]}
            n={1}
            title="The occasion"
            strapline="Who, when, and precisely where."
            notes={
              <>
                <Note k="1a">
                  The hour of the ceremony is the one detail still unsettled. Where you see TODO in this guide, it is
                  deliberate: the entry exists, the fact does not yet.
                </Note>
                <Note k="1b">
                  Two place names, one destination. The postal address reads Kāneʻohe; the gardens themselves sit up the
                  windward coast at Kaʻaʻawa. Put the address into your map, not the town.
                </Note>
              </>
            }
          >
            <Entry n="1.1" title="Alan and Michelle" meta={`${site.weddingDate} · ${site.ceremonyTime}`}>
              <p>
                {site.welcome}
                <Mark k="1a" />
              </p>
              <p>
                The weekend runs longer than the wedding. Parts <PartRef n={2}>II</PartRef> through{" "}
                <PartRef n={5}>V</PartRef> cover the days on either side of it
                {allEvents.length > 0 ? (
                  <>
                    ; <Ref n={ceremonyRef} /> is the ceremony itself
                  </>
                ) : null}
                .
              </p>
            </Entry>

            <Entry n="1.2" title={site.venue} meta={site.location}>
              <p>
                {site.address}
                <Mark k="1b" />
              </p>
              <p>
                The ceremony is on the lawn and the dinner is under the pavilion, so the ground underfoot is grass from
                the first handshake to the last song — the single fact behind every line of <Ref n="6.2" />.
              </p>
              <p className="field-guide-away">
                <a href={site.mapUrl} rel="noreferrer">
                  Open in maps
                </a>{" "}
                · roads and driving time at <Ref n="3.1" />
              </p>
            </Entry>
          </Book>

          {/* ---- II. The weekend ------------------------------------- */}
          <Book
            roman={ROMAN[1]}
            n={2}
            title="The weekend"
            strapline="Every gathering, in the order it happens."
            notes={
              <>
                <Note k="2a">
                  An entry marked <em>open to all</em> is exactly that. Entries naming a group appear only for the guests
                  that group was invited by, so your copy of this part may be shorter or longer than your neighbour&rsquo;s.
                </Note>
                <Note k="2b">
                  Nothing here needs booking. Arrive at the hour given and the day takes care of itself.
                </Note>
                <Note k="2c">
                  Dress for each of these is the same: see <Ref n="6.1" />. Distances between them: <Ref n="3.1" />.
                </Note>
              </>
            }
            plate={<Plate plate="I" photo={photos.activities} />}
          >
            {weekend.map((day) => (
              <div className="field-guide-day" key={day.day}>
                <h3 className="field-guide-daymark">
                  {day.day}
                  <span aria-hidden>{" — "}</span>
                  <span className="field-guide-daycount">
                    {day.items.length} {day.items.length === 1 ? "entry" : "entries"}
                  </span>
                </h3>
                {day.items.map(({ a, n }, i) => (
                  <Entry
                    key={n}
                    n={n}
                    title={a.title}
                    meta={
                      <>
                        {a.time} · {a.location} ·{" "}
                        <span className="field-guide-aud">
                          {a.audience === "everyone" ? "open to all" : groupName(a.audience)}
                        </span>
                      </>
                    }
                  >
                    <p>
                      {a.description}
                      {i === 0 && day.day === weekend[0]?.day ? <Mark k="2a" /> : null}
                      {n === ceremonyRef ? <Mark k="2c" /> : null}
                    </p>
                    {a.link ? (
                      <p className="field-guide-away">
                        <a href={a.link} rel="noreferrer">
                          Details
                        </a>
                      </p>
                    ) : null}
                  </Entry>
                ))}
              </div>
            ))}
            {allEvents.length === 0 ? (
              <p className="field-guide-empty">
                No entries are visible on this copy. Open your invitation link and this part fills in.
              </p>
            ) : null}
          </Book>

          {/* ---- III. Getting there ---------------------------------- */}
          <Book
            roman={ROMAN[2]}
            n={3}
            title="Getting there"
            strapline="Air, road, and the hour it takes."
            notes={
              <>
                <Note k="3a">
                  Two numbers decide the day: how long from the airport, and what time the last flight home leaves. Settle
                  the second before you book the first.
                </Note>
                <Note k="3b">
                  Shuttle arrangements are unconfirmed. Plan as though there will be none and treat any later news as a
                  reprieve. See also <Ref n={shuttleRef} />.
                </Note>
              </>
            }
            plate={<Plate plate="II" photo={photos.travel} />}
          >
            {travel.gettingThere.map((t, i) => (
              <Entry key={t.title} n={`3.${i + 1}`} title={t.title}>
                <p>
                  {t.text}
                  <Mark k={i === 0 ? "3a" : "3b"} />
                </p>
              </Entry>
            ))}
          </Book>

          {/* ---- IV. Where to stay ----------------------------------- */}
          <Book
            roman={ROMAN[3]}
            n={4}
            title="Where to stay"
            strapline="Three bases, and what each one costs you in driving."
            notes={
              <>
                <Note k="4a">
                  Nightlife, quiet, or proximity: the three entries opposite are the three trade-offs, and you can only
                  have two.
                </Note>
                <Note k="4b">
                  Whichever you choose, <Ref n="3.2" /> still holds. Plan on a car.
                </Note>
              </>
            }
            plate={<Plate plate="III" photo={photos.welcome} />}
          >
            {travel.stays.map((s, i) => (
              <Entry key={s.title} n={`4.${i + 1}`} title={s.title}>
                <p>
                  {s.text}
                  {i === 0 ? <Mark k="4a" /> : null}
                  {i === travel.stays.length - 1 ? <Mark k="4b" /> : null}
                </p>
              </Entry>
            ))}
          </Book>

          {/* ---- V. The island --------------------------------------- */}
          <Book
            roman={ROMAN[4]}
            n={5}
            title="The island"
            strapline="What to do with the hours that are yours."
            notes={
              <>
                <Note k="5a">
                  Reef-safe sunscreen is the local standard rather than a nicety. Read the list opposite as instructions.
                </Note>
                <Note k="5b">
                  A light rain layer earns its place on the windward side; the showers are brief and frequent. See{" "}
                  <Ref n={weatherRef} />.
                </Note>
              </>
            }
          >
            <Entry n="5.1" title="Worth the drive">
              <p>
                Between the entries in part <PartRef n={2}>II</PartRef> the coast is yours. These are the things we
                would do with a free afternoon.
                <Mark k="5a" />
              </p>
              <ul className="field-guide-list">
                {travel.explore.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p className="field-guide-away">
                Weather and what it does to a plan: <Ref n={weatherRef} />
                <Mark k="5b" />
              </p>
            </Entry>
          </Book>

          {/* ---- VI. What to wear ------------------------------------ */}
          <Book
            roman={ROMAN[5]}
            n={6}
            title="What to wear"
            strapline="Field marks of a well-dressed guest."
            notes={
              <>
                <Note k="6a">
                  Grass, not pavement. That single constraint explains every line of <Ref n="6.2" /> and <Ref n="6.3" />.
                </Note>
                <Note k="6b">
                  The colours in <Ref n="6.4" /> are taken from the water and the lawn. Read them as a range to sit
                  inside, not a uniform to match.
                </Note>
              </>
            }
            plate={<Plate plate="IV" photo={photos.dressCode} />}
          >
            <Entry n="6.1" title={dressCode.title}>
              <p>
                {dressCode.intro}
                <Mark k="6a" />
              </p>
            </Entry>
            <Entry n="6.2" title="Lean into">
              <ul className="field-guide-list">
                {dressCode.lean.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Entry>
            <Entry n="6.3" title="Leave at home">
              <ul className="field-guide-list field-guide-list-skip">
                {dressCode.skip.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Entry>
            <Entry n="6.4" title="Colour key">
              <ul className="field-guide-colours">
                {dressCode.colors.map((c) => (
                  <li key={c}>
                    <span className="field-guide-chip" style={{ background: c }} aria-hidden />
                    <span className="field-guide-chip-hex">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="field-guide-away">
                Sampled from the plates in this guide.
                <Mark k="6b" />
              </p>
            </Entry>
          </Book>

          {/* ---- VII. How we got here -------------------------------- */}
          <Book
            roman={ROMAN[6]}
            n={7}
            title="How we got here"
            strapline="A short natural history of the two of us."
            notes={
              <>
                <Note k="7a">
                  The entries marked TODO are the ones we are still writing, and the photographs beside them are the sea
                  standing in for us until we choose better ones.
                </Note>
                <Note k="7b">
                  Where the history arrives: <Ref n="1.2" />.
                </Note>
              </>
            }
          >
            {story.map((s, i) => (
              <Entry key={s.title} n={`7.${i + 1}`} title={s.title} meta={s.date}>
                {s.photo ? <Plate plate={ROMAN[i + 4] ?? String(i + 5)} photo={photos[s.photo]} shape="tall" /> : null}
                <p>
                  {s.text}
                  {i === 0 ? <Mark k="7a" /> : null}
                  {i === story.length - 1 ? <Mark k="7b" /> : null}
                </p>
              </Entry>
            ))}
          </Book>

          {/* ---- VIII. Questions ------------------------------------- */}
          <Book
            roman={ROMAN[7]}
            n={8}
            title="Questions"
            strapline="Asked often enough to earn an entry."
            notes={
              <>
                <Note k="8a">
                  Anything answered later will be answered here first. This part is the one to re-read closer to October.
                </Note>
                <Note k="8b">
                  Dress, <Ref n="6.1" />. Roads, <Ref n="3.1" />. Beds, <Ref n="4.1" />.
                </Note>
              </>
            }
            plate={<Plate plate="IX" photo={photos.faq} />}
          >
            {faqs.map((f, i) => (
              <Entry key={f.q} n={`8.${i + 1}`} title={f.q}>
                <p>
                  {f.a}
                  {i === 0 ? <Mark k="8a" /> : null}
                  {i === faqs.length - 1 ? <Mark k="8b" /> : null}
                </p>
              </Entry>
            ))}
          </Book>

          {/* ---- IX. Gifts ------------------------------------------- */}
          <Book
            roman={ROMAN[8]}
            n={9}
            title="Gifts"
            strapline="For anyone who insists."
            notes={
              <>
                <Note k="9a">
                  Crossing an ocean to stand on a lawn with us is the gift. The entries opposite are for the people who
                  will ask anyway.
                </Note>
                <Note k="9b">Both links are placeholders at press time.</Note>
              </>
            }
            plate={<Plate plate="X" photo={photos.registry} />}
          >
            {registries.map((r, i) => (
              <Entry key={r.name} n={`9.${i + 1}`} title={r.name}>
                <p>
                  {r.text}
                  {i === 0 ? <Mark k="9a" /> : null}
                  {i === registries.length - 1 ? <Mark k="9b" /> : null}
                </p>
                <p className="field-guide-away">
                  <a href={r.url} rel="noreferrer">
                    {r.url === "#" ? "Link to come" : "Open registry"}
                  </a>
                </p>
              </Entry>
            ))}
          </Book>

          {/* ---- Index ------------------------------------------------ */}
          <section className="field-guide-index" id="fg-index" aria-labelledby="fg-index-h">
            <header className="field-guide-book-head">
              <span className="field-guide-book-roman">—</span>
              <h2 id="fg-index-h">Index</h2>
              <p className="field-guide-book-strap">
                Numbers refer to entries, not pages. {site.couple}, {site.weddingDate}.
              </p>
            </header>
            <ul className="field-guide-index-list">
              {index.map((row) => (
                <li className="field-guide-index-item" key={`${row.term}-${row.refs.join()}`}>
                  <span className="field-guide-index-term">{row.term}</span>
                  <span className="field-guide-index-dots" aria-hidden />
                  <span className="field-guide-index-refs">
                    {row.refs.map((r, i) => (
                      <span key={r}>
                        {i > 0 ? ", " : ""}
                        <Ref n={r} />
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="field-guide-colophon">
            <p>
              <strong>{site.couple}</strong> · {site.venue}, {site.location} · {site.weddingDate}
            </p>
            <p>
              Set in EB Garamond and Spectral. Entries revised as details are confirmed; the marks reading TODO are the
              ones still open. <a href="#fg-index">Return to the index</a>.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
