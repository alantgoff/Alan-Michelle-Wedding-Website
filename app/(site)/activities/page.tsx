import { cookies } from "next/headers";
import { PageHero, Section } from "@/components/Page";
import { activities } from "@/content/activities";
import { groupBySlug, COOKIE } from "@/content/groups";
import { minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

export const dynamic = "force-dynamic";

export default async function Activities() {
  // The cookie holds an invite slug. Only a slug that still exists grants access,
  // so revoking a group is as simple as changing its slug in content/groups.ts.
  const slug = (await cookies()).get(COOKIE)?.value;
  const group = groupBySlug(slug);

  // Filtering happens here, on the server. Events the visitor cannot see never
  // reach the browser: not in the HTML, not in the streamed payload.
  const visible = activities.filter(
    (a) => a.audience === "everyone" || (group !== undefined && a.audience === group.id),
  );
  // Days in calendar order around the wedding, and events in clock order
  // within each day; anything still marked TODO sorts to the end of its day.
  const days = [...new Set(visible.map((a) => a.date))].sort(
    (a, b) => (offsetFromWedding(a) ?? 99) - (offsetFromWedding(b) ?? 99),
  );
  const byTime = (a: { time: string }, b: { time: string }) => minutesOf(a.time) - minutesOf(b.time);

  return (
    <>
      <PageHero
        kicker="Wedding weekend"
        title="Activities"
        intro="Come for the wedding, stay for the island. These are the gatherings planned for your weekend."
        photo="activities"
      />
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
                .map((a) => (
                  <article className="activity" key={a.title}>
                    <div>
                      <strong>{a.time}</strong>
                      <br />
                      <small>{a.location}</small>
                    </div>
                    <div>
                      <h3>{a.title}</h3>
                      <p>{a.description}</p>
                    </div>
                  </article>
                ))}
            </div>
          );
        })}
      </Section>
    </>
  );
}
