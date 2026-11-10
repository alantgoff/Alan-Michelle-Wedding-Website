import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Page";
import { Plumeria } from "@/components/Plumeria";
import { PrintButton } from "@/components/PrintButton";
import { heldGroups, visibleActivities } from "@/content/visibleActivities";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

export const metadata: Metadata = { title: "Activities" };
export const dynamic = "force-dynamic";

const INTRO = "Come for the wedding, stay for the island. These are the gatherings planned for your weekend.";

export default async function Activities() {
  // Filtering happens on the server, in visibleActivities: events the visitor
  // cannot see never reach the browser, not in the HTML, not in the payload.
  const [held, visible] = await Promise.all([heldGroups(), visibleActivities()]);

  // Days in calendar order around the wedding, and events in clock order
  // within each day; anything still marked TODO sorts to the end of its day.
  const days = [...new Set(visible.map((a) => a.date))].sort(
    (a, b) => (offsetFromWedding(a) ?? 99) - (offsetFromWedding(b) ?? 99),
  );
  const byTime = (a: { time: string }, b: { time: string }) => minutesOf(a.time) - minutesOf(b.time);

  // A guest's own group events carry a pressed plumeria. Only groups this
  // visitor already holds are ever named.
  const forYou = (audience: string) => held.find((g) => g.id === audience)?.forYou;
  const own = visible.filter((a) => forYou(a.audience)).length;
  const intro =
    own === 0
      ? INTRO
      : `${INTRO} ${own === 1 ? "The one marked with a plumeria is" : "The ones marked with a plumeria are"} just for you.`;

  return (
    <>
      <PageHero kicker="Wedding weekend" title="Activities" intro={intro} photo="activities" />
      <Section>
        {days.map((day) => {
          const when = weekendDay(day);
          return (
            <div className="activity-day" key={day}>
              <div className="activity-day-head">
                <h2>{when ? when.label : day}</h2>
                {when ? <p className="activity-sun">Sunset {when.sunset}</p> : null}
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
                      </div>
                    </article>
                  );
                })}
            </div>
          );
        })}
        <PrintButton>Print the weekend</PrintButton>
      </Section>
    </>
  );
}
