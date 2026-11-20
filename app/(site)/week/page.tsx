import { IslandDot } from "@/components/IslandDot";
import type { Metadata } from "next";
import Link from "next/link";
import { BoatVote } from "@/components/BoatVote";
import { MoreLink } from "@/components/Guide";
import { PageHero, Section } from "@/components/Page";
import { Plumeria } from "@/components/Plumeria";
import { PrintButton } from "@/components/PrintButton";
import { weekPage as copy } from "@/content/activities";
import { boatVote } from "@/content/boatVote";
import { heldGroups, visibleActivities } from "@/content/visibleActivities";
import { fill } from "@/lib/fill";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

export const metadata: Metadata = { title: copy.tab };
export const dynamic = "force-dynamic";

/**
 * The week, in order: the one full schedule on the site. Travel's chart
 * and the home page only point here.
 */
export default async function Week({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Filtering happens on the server, in visibleActivities: events the visitor
  // cannot see never reach the browser, not in the HTML, not in the payload.
  const [held, visible, { vote }] = await Promise.all([heldGroups(), visibleActivities(), searchParams]);

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

  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={intro} photo="activities" scene="week" />
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
                        {a.at ? <IslandDot at={a.at} label={a.location} /> : <small>{a.location}</small>}
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

      {/* The friends' boat vote: rendered only for guests holding that group's link. */}
      {held.some((g) => g.id === boatVote.audience) ? (
        <Section>
          <BoatVote status={typeof vote === "string" ? vote : undefined} />
        </Section>
      ) : null}

      <aside className="onward">
        <p className="onward-text">{copy.freeTime.text}</p>
        <Link className="button button-quiet" href="/island#explore">
          {copy.freeTime.link}
        </Link>
      </aside>
    </>
  );
}
