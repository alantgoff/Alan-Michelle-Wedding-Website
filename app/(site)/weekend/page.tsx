import type { Metadata } from "next";
import Link from "next/link";
import { MoreLink } from "@/components/Guide";
import { PageHero, Section } from "@/components/Page";
import { Plumeria } from "@/components/Plumeria";
import { PrintButton } from "@/components/PrintButton";
import { weekendPage as copy } from "@/content/activities";
import { sky } from "@/content/sky";
import { heldGroups, visibleActivities } from "@/content/visibleActivities";
import { fill } from "@/lib/fill";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

export const metadata: Metadata = { title: copy.tab };
export const dynamic = "force-dynamic";

/**
 * The weekend, in order: the one full schedule on the site. Travel's chart
 * and the home page only point here.
 */
export default async function Weekend() {
  // Filtering happens on the server, in visibleActivities: events the visitor
  // cannot see never reach the browser, not in the HTML, not in the payload.
  const [held, visible] = await Promise.all([heldGroups(), visibleActivities()]);

  // Days in calendar order around the wedding, and events in clock order
  // within each day; a time still "to come" sorts to the end of its day.
  const days = [...new Set(visible.map((a) => a.date))].sort(
    (a, b) => (offsetFromWedding(a) ?? 99) - (offsetFromWedding(b) ?? 99),
  );
  const byTime = (a: { time: string }, b: { time: string }) => minutesOf(a.time) - minutesOf(b.time);

  // A guest's own group events carry a pressed plumeria. Only groups this
  // visitor already holds are ever named.
  const forYou = (audience: string) => held.find((g) => g.id === audience)?.forYou;
  const own = visible.filter((a) => forYou(a.audience)).length;
  const intro = own === 0 ? copy.intro : `${copy.intro} ${own === 1 ? copy.mineOne : copy.mineMany}`;

  // The moon's times are looked up for the wedding weekend's own dates, so
  // they show only while the schedule still falls on those dates.
  const moonrise = (iso: string) => sky.moons.find((m) => m.date === iso)?.moonrise;

  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={intro} photo="activities" scene="activities" />
      <Section>
        {days.map((day) => {
          const when = weekendDay(day);
          return (
            <div className="activity-day" key={day}>
              <div className="activity-day-head">
                <h2>{when ? when.label : day}</h2>
                {when ? (
                  <p className="activity-sun">
                    {fill(copy.sunset, { time: when.sunset })}
                    {moonrise(when.iso) ? ` · ${fill(copy.moonrise, { time: moonrise(when.iso)! })}` : ""}
                  </p>
                ) : null}
              </div>
              {visible
                .filter((a) => a.date === day)
                .sort(byTime)
                .map((a) => {
                  const mine = forYou(a.audience);
                  return (
                    <article
                      className={mine ? "activity activity-mine" : "activity"}
                      id={anchorFor(a.title)}
                      key={a.title}
                    >
                      <div>
                        <strong>{a.time}</strong>
                        <br />
                        <small>{a.location}</small>
                      </div>
                      <div>
                        {mine ? (
                          <p className="activity-for">
                            <Plumeria />
                            {mine}
                          </p>
                        ) : null}
                        <h3>{a.title}</h3>
                        <p>{a.description}</p>
                        {a.link ? <MoreLink href={a.link.href} label={a.link.label} /> : null}
                      </div>
                    </article>
                  );
                })}
            </div>
          );
        })}
        <PrintButton>{copy.print}</PrintButton>
      </Section>

      <aside className="onward">
        <p className="onward-text">{copy.freeTime.text}</p>
        <Link className="button button-quiet" href="/island#explore">
          {copy.freeTime.link}
        </Link>
      </aside>
    </>
  );
}
