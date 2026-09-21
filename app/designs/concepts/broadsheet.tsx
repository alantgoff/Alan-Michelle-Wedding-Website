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
import "./broadsheet.css";

/**
 * THE BROADSHEET
 *
 * The whole wedding on a single sheet, set the way a front page is set: a
 * masthead, a dateline, a lead story that runs in real columns, boxed
 * sidebars for travel and dress, a ruled schedule table, a question column
 * and classified listings for the registry. Nothing is hidden behind
 * navigation — a paper puts everything in front of you at once.
 */

const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

function minutesOfDay(time: string) {
  const m = /^(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)$/i.exec(time.trim());
  if (!m) return 24 * 60 + 1;
  const hour = Number(m[1]) % 12;
  const pm = m[3].toLowerCase().startsWith("p");
  return (pm ? hour + 12 : hour) * 60 + Number(m[2]);
}

function Folio({ mark, children }: { mark: string; children: ReactNode }) {
  return (
    <h2 className="broadsheet-sectionhead">
      <span className="broadsheet-folio">{mark}</span>
      <span className="broadsheet-sectionname">{children}</span>
    </h2>
  );
}

export default function Broadsheet({ activities }: { activities: Activity[] }) {
  const groupName = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

  const dayNames = Array.from(
    new Set([...DAY_ORDER, ...activities.map((a) => a.date)]),
  ).filter((d) => activities.some((a) => a.date === d));

  const schedule = dayNames.map((day) => ({
    day,
    items: activities
      .filter((a) => a.date === day)
      .sort((a, b) => minutesOfDay(a.time) - minutesOfDay(b.time)),
  }));

  const weather = faqs.find((f) => /weather/i.test(f.q));
  const inside = [
    { id: "bs-schedule", mark: "A2", label: "The order of the weekend" },
    { id: "bs-travel", mark: "A3", label: "Travel desk" },
    { id: "bs-dress", mark: "A2", label: "What to wear" },
    { id: "bs-archive", mark: "A4", label: "From the archive" },
    { id: "bs-questions", mark: "A5", label: "Asked & answered" },
    { id: "bs-classified", mark: "A6", label: "Classified" },
  ];

  return (
    <div className="broadsheet">
      {/* ---- Masthead ------------------------------------------------ */}
      <header className="broadsheet-masthead">
        <div className="broadsheet-ears">
          <span>Vol. I &nbsp;·&nbsp; No. 1</span>
          <span>One edition only</span>
        </div>
        <h1 className="broadsheet-nameplate">{site.couple}</h1>
        <p className="broadsheet-motto">{site.tagline}</p>
        <div className="broadsheet-dateline">
          <span className="broadsheet-dateline-place">{site.location}</span>
          <span className="broadsheet-dateline-date">{site.weddingDate}</span>
          <span className="broadsheet-dateline-weather">
            <strong>Weather:</strong> {weather ? weather.a : "Warm, with brief showers possible."}
          </span>
        </div>
        <nav className="broadsheet-inside" aria-label="Inside this edition">
          <span className="broadsheet-inside-label">Inside</span>
          <ul>
            {inside.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>
                  {i.label} <span className="broadsheet-inside-mark">{i.mark}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="broadsheet-sheet">
        {/* ---- Lead story -------------------------------------------- */}
        <section className="broadsheet-lead" id="bs-lead" aria-labelledby="bs-lead-h">
          <div className="broadsheet-leadhead">
            <p className="broadsheet-overline">The lead &nbsp;·&nbsp; {site.venue}</p>
            <h2 className="broadsheet-headline" id="bs-lead-h">
              Two families, one lawn, and a weekend on the windward coast
            </h2>
            <p className="broadsheet-deck">
              {site.couple} will marry at {site.venue} in {site.location} on {site.weddingDate}. Ceremony on the grass,
              dinner under the pavilion, and three more days of island either side of it.
            </p>
            <p className="broadsheet-byline">
              By the couple &nbsp;|&nbsp; Filed from {site.location}
            </p>
          </div>

          <figure className="broadsheet-cut">
            <span className="broadsheet-cut-media">
              <Image src={photos.hero.src} alt={photos.hero.alt} fill sizes="(max-width: 900px) 100vw, 66vw" priority />
            </span>
            <figcaption>
              <strong>The water you are flying toward.</strong> {photos.hero.alt}.
            </figcaption>
          </figure>

          <div className="broadsheet-leadbody">
            <p className="broadsheet-drop">{site.welcome}</p>
            <p>
              The ceremony is called for <strong>{site.ceremonyTime}</strong> at {site.venue}, {site.address}. The lawn
              sits inland of the highway where the valley closes; the reception follows in the pavilion beside it,
              without anyone having to move a car.
            </p>
            <p>
              Everything a guest needs is printed on this sheet. The hours of the weekend run below in{" "}
              <a href="#bs-schedule">the order of the weekend</a>; flights, cars and beds are at the{" "}
              <a href="#bs-travel">travel desk</a>; the question of what to put on is settled at{" "}
              <a href="#bs-dress">what to wear</a>.
            </p>
            <p>
              Items still marked TODO are the details we have not settled yet. They are printed as they stand rather
              than guessed at, and this sheet is reset as each one is confirmed.
            </p>
            <p className="broadsheet-jump">
              <a href={site.mapUrl} rel="noreferrer">
                Map and directions
              </a>{" "}
              &nbsp;·&nbsp; {site.address}
            </p>
          </div>
        </section>

        {/* ---- Schedule well + sidebars ------------------------------ */}
        <div className="broadsheet-fold">
          <section className="broadsheet-well" id="bs-schedule" aria-labelledby="bs-schedule-h">
            <Folio mark="A2">
              <span id="bs-schedule-h">The order of the weekend</span>
            </Folio>
            <p className="broadsheet-standfirst">
              Every gathering, with its hour and its ground. Events listed for a named party appear only on the copies of
              the guests invited to them.
            </p>
            <table className="broadsheet-table">
              <caption className="broadsheet-caption">
                {activities.length} {activities.length === 1 ? "listing" : "listings"} &nbsp;·&nbsp; all times local
              </caption>
              <thead>
                <tr>
                  <th scope="col">Hour</th>
                  <th scope="col">Event</th>
                  <th scope="col">Place</th>
                  <th scope="col">Who</th>
                </tr>
              </thead>
              {schedule.map((day) => (
                <tbody key={day.day}>
                  <tr className="broadsheet-daybreak">
                    <th scope="colgroup" colSpan={4}>
                      {day.day}
                    </th>
                  </tr>
                  {day.items.map((a) => (
                    <tr key={`${day.day}-${a.title}`}>
                      <td data-label="Hour" className="broadsheet-hour">
                        {a.time}
                      </td>
                      <td data-label="Event">
                        <strong>{a.title}</strong>
                        <span className="broadsheet-rowtext">{a.description}</span>
                        {a.link ? (
                          <a className="broadsheet-rowlink" href={a.link} rel="noreferrer">
                            Details
                          </a>
                        ) : null}
                      </td>
                      <td data-label="Place">{a.location}</td>
                      <td data-label="Who" className="broadsheet-who">
                        {a.audience === "everyone" ? "All guests" : groupName(a.audience)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
            {activities.length === 0 ? (
              <p className="broadsheet-standfirst">
                No listings appear on this copy. Open the invitation link you were sent and the table fills in.
              </p>
            ) : null}
            <section className="broadsheet-box broadsheet-box-wide" id="bs-dress" aria-labelledby="bs-dress-h">
              <h3 className="broadsheet-boxhead" id="bs-dress-h">
                What to wear
              </h3>
              <span className="broadsheet-boxmark">A2</span>
              <p className="broadsheet-dresstitle">{dressCode.title}</p>
              <p>{dressCode.intro}</p>
              <div className="broadsheet-dressgrid">
                <div>
                  <h4 className="broadsheet-subhead">Lean into</h4>
                  <ul className="broadsheet-ruledlist">
                    {dressCode.lean.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="broadsheet-subhead">Leave at home</h4>
                  <ul className="broadsheet-ruledlist broadsheet-ruledlist-no">
                    {dressCode.skip.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="broadsheet-subhead">The colour range</h4>
                  <ul className="broadsheet-chips">
                    {dressCode.colors.map((c) => (
                      <li key={c}>
                        <span className="broadsheet-chip" style={{ background: c }} aria-hidden />
                        <span className="broadsheet-chiphex">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </section>

          <aside className="broadsheet-rail">
            <section className="broadsheet-box" id="bs-travel" aria-labelledby="bs-travel-h">
              <h3 className="broadsheet-boxhead" id="bs-travel-h">
                The travel desk
              </h3>
              <span className="broadsheet-boxmark">A3</span>
              {travel.gettingThere.map((t) => (
                <div className="broadsheet-item" key={t.title}>
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              ))}
              <h4 className="broadsheet-subhead">Where to put your bags</h4>
              <dl className="broadsheet-deflist">
                {travel.stays.map((s) => (
                  <div key={s.title}>
                    <dt>{s.title}</dt>
                    <dd>{s.text}</dd>
                  </div>
                ))}
              </dl>
              <h4 className="broadsheet-subhead">Worth the drive</h4>
              <ul className="broadsheet-ruledlist">
                {travel.explore.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <figure className="broadsheet-thumb">
                <span className="broadsheet-thumb-media">
                  <Image src={photos.travel.src} alt={photos.travel.alt} fill sizes="(max-width: 900px) 100vw, 28vw" />
                </span>
                <figcaption>{photos.travel.alt}.</figcaption>
              </figure>
            </section>

          </aside>
        </div>

        {/* ---- From the archive -------------------------------------- */}
        <section className="broadsheet-archive" id="bs-archive" aria-labelledby="bs-archive-h">
          <Folio mark="A4">
            <span id="bs-archive-h">From the archive</span>
          </Folio>
          <p className="broadsheet-standfirst">
            How a couple arrives at a lawn on the windward coast, in four filings.
          </p>
          <div className="broadsheet-strip">
            {story.map((s) => (
              <article className="broadsheet-strip-item" key={s.title}>
                {s.photo ? (
                  <span className="broadsheet-strip-media">
                    <Image
                      src={photos[s.photo].src}
                      alt={photos[s.photo].alt}
                      fill
                      sizes="(max-width: 780px) 100vw, 24vw"
                    />
                  </span>
                ) : null}
                <p className="broadsheet-strip-date">{s.date}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Q & A --------------------------------------------------- */}
        <section className="broadsheet-qa" id="bs-questions" aria-labelledby="bs-questions-h">
          <Folio mark="A5">
            <span id="bs-questions-h">Asked &amp; answered</span>
          </Folio>
          <p className="broadsheet-standfirst">
            Correspondence from the guest list, answered in the order it arrived.
          </p>
          <div className="broadsheet-qabody">
            {faqs.map((f) => (
              <div className="broadsheet-qaitem" key={f.q}>
                <p className="broadsheet-q">{f.q}</p>
                <p className="broadsheet-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Classified ---------------------------------------------- */}
        <section className="broadsheet-classified" id="bs-classified" aria-labelledby="bs-classified-h">
          <Folio mark="A6">
            <span id="bs-classified-h">Classified</span>
          </Folio>
          <div className="broadsheet-ads">
            {registries.map((r) => (
              <div className="broadsheet-ad" key={r.name}>
                <p className="broadsheet-ad-head">{r.name}</p>
                <p>{r.text}</p>
                <p className="broadsheet-ad-link">
                  <a href={r.url} rel="noreferrer">
                    {r.url === "#" ? "Link to follow" : "Open the list"}
                  </a>
                </p>
              </div>
            ))}
            <div className="broadsheet-ad">
              <p className="broadsheet-ad-head">Notice to all guests</p>
              <p>
                Presence on the lawn is the whole of the gift. The listings above are printed for the people who will
                ask anyway.
              </p>
              <p className="broadsheet-ad-link">
                <a href="#bs-schedule">See the order of the weekend</a>
              </p>
            </div>
            <div className="broadsheet-ad">
              <p className="broadsheet-ad-head">Standing notice</p>
              <p>
                {site.venue}, {site.address}. Roughly 40&ndash;60 minutes from Honolulu, traffic permitting.
              </p>
              <p className="broadsheet-ad-link">
                <a href={site.mapUrl} rel="noreferrer">
                  Directions
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ---- Colophon ------------------------------------------------- */}
        <footer className="broadsheet-colophon">
          <p className="broadsheet-colophon-name">{site.couple}</p>
          <p>
            {site.venue} &nbsp;·&nbsp; {site.location} &nbsp;·&nbsp; {site.weddingDate} &nbsp;·&nbsp;{" "}
            {site.ceremonyTime}
          </p>
          <p>
            Set in Bodoni Moda and Crimson Pro. Printed in advance of the day; entries marked TODO are still being
            confirmed and this sheet is reset as they are. <a href="#bs-lead">Back to the top of the page</a>.
          </p>
        </footer>
      </main>
    </div>
  );
}
