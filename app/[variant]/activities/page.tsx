import { cookies } from "next/headers";
import { PageHero, Section } from "@/components/Page";
import { activities } from "@/content/activities";
import { groupBySlug, COOKIE } from "@/content/groups";

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
  const days = [...new Set(visible.map((a) => a.date))];

  return (
    <>
      <PageHero
        kicker="Wedding weekend"
        title="Activities"
        intro="Come for the wedding, stay for the island. These are the gatherings planned for your weekend."
      />
      <Section>
        {days.map((day) => (
          <div className="activity-day" key={day}>
            <h2>{day}</h2>
            {visible
              .filter((a) => a.date === day)
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
        ))}
      </Section>
    </>
  );
}
