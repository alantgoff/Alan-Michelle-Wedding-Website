import type { Metadata } from "next";
import Link from "next/link";
import { BoatVote } from "@/components/BoatVote";
import { MoreLink } from "@/components/Guide";
import { IslandDot } from "@/components/IslandDot";
import { JumpBar, type JumpItem } from "@/components/JumpBar";
import { PageHero, Section } from "@/components/Page";
import { Plumeria } from "@/components/Plumeria";
import { PrintButton } from "@/components/PrintButton";
import { Seal } from "@/components/Seal";
import { DayPlans, PlannerProvider, Unplaced, WeekStrip } from "@/components/WeekPlanner";
import { weekPage as copy, type Activity } from "@/content/activities";
import { boatVote } from "@/content/boatVote";
import { myWeek } from "@/content/myWeek";
import { heldGroups, visibleActivities } from "@/content/visibleActivities";
import { fill } from "@/lib/fill";
import { oursByDay } from "@/lib/ours";
import { plannable } from "@/lib/plannable";
import { suggestedWeek } from "@/lib/week";
import { anchorFor, minutesOf, weekendDay } from "@/lib/weekend";

export const metadata: Metadata = { title: copy.tab };
export const dynamic = "force-dynamic";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type Day = { iso: string; offset: number | null; weekday: number; label: string; short: string; sunset: string };

/**
 * The week, day by day: every day from the Saturday before the wedding to the
 * Sunday after, each with what we have planned, the guest's own plans (My
 * week, kept in their browser) and a note or two about the island that day.
 * The one full schedule on the site; Travel's chart and the home page only
 * point here.
 */
export default async function Week({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Filtering happens on the server, in visibleActivities: events the visitor
  // cannot see never reach the browser, not in the HTML, not in the payload.
  const [held, visible, { vote }] = await Promise.all([heldGroups(), visibleActivities(), searchParams]);
  const week = suggestedWeek();

  // Each event onto its day. A day name or date outside the nine gets a day
  // of its own after them; an event with no day yet goes under "Dates to come".
  const isoOf = (a: Activity) => weekendDay(a.date)?.iso ?? null;
  const days: Day[] = week.map((d) => ({ iso: d.iso, offset: d.offset, weekday: d.weekday, label: d.label, short: `${d.short} ${d.date}`, sunset: d.sunset }));
  for (const a of visible) {
    const when = weekendDay(a.date);
    if (when && !days.some((d) => d.iso === when.iso)) {
      const date = new Date(`${when.iso}T12:00:00Z`);
      days.push({ iso: when.iso, offset: null, weekday: date.getUTCDay(), label: when.label, short: when.label, sunset: when.sunset });
    }
  }
  days.sort((a, b) => a.iso.localeCompare(b.iso));
  const undated = visible.filter((a) => !isoOf(a));
  const byTime = (a: { time: string }, b: { time: string }) => minutesOf(a.time) - minutesOf(b.time);

  // A guest's own group events carry a pressed plumeria. Only groups this
  // visitor already holds are ever named.
  const forYou = (audience: string) => held.find((g) => g.id === audience)?.forYou;
  const own = visible.filter((a) => forYou(a.audience)).length;
  const intro = `${own === 0 ? copy.intro : `${copy.intro} ${own === 1 ? copy.mineOne : copy.mineMany}`} ${copy.planNote}`;
  const voting = held.some((g) => g.id === boatVote.audience);

  // Days we have planned something on, from the events this visitor may see.
  const ours = oursByDay(visible, held);

  const jump: JumpItem[] = days.map((d) => ({ id: `day-${d.iso}`, label: d.short, mark: Boolean(ours[d.iso]), markLabel: copy.plannedByUs }));
  if (undated.length) jump.push({ id: "day-to-come", label: copy.datesToComeShort });
  if (voting) jump.push({ id: "boat-vote", label: boatVote.short });

  const event = (a: Activity) => {
    const mine = forYou(a.audience);
    return (
      <article className={mine ? "activity activity-mine" : "activity"} id={anchorFor(a.title)} key={a.title}>
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
  };

  return (
    <PlannerProvider days={week} words={myWeek} catalog={plannable()}>
      <PageHero kicker={copy.kicker} title={copy.title} intro={intro} photo="activities" scene="week" />
      <JumpBar items={jump} label={copy.contents} />
      <WeekStrip ours={ours} />
      <Section>
        <Unplaced />
        {days.map((d) => {
          const events = visible.filter((a) => isoOf(a) === d.iso).sort(byTime);
          const notes = d.offset === 0 ? [] : myWeek.notes.filter((n) => n.days.includes(WEEKDAYS[d.weekday]));
          return (
            <div
              className={["activity-day", d.offset === 0 ? "activity-day-wedding" : "", events.length ? "activity-day-ours" : "activity-day-free"].join(" ").replace(/\s+/g, " ").trim()}
              key={d.iso}
              id={`day-${d.iso}`}
            >
              <div className="activity-day-head">
                <h2>
                  {d.label}
                  {d.offset === 0 ? <span className="day-badge">{copy.weddingDay}</span> : null}
                </h2>
                <p className="activity-sun">{fill(copy.sunset, { time: d.sunset })}</p>
              </div>
              {events.length ? (
                <p className="day-ours">
                  <Seal />
                  {copy.plannedByUs}
                </p>
              ) : null}
              {events.length ? events.map(event) : <p className="day-free">{copy.free}</p>}
              {notes.length ? (
                <ul className="day-notes">
                  {notes.map((n) => (
                    <li key={n.text}>
                      <a href={n.href}>{n.text}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
              {d.offset !== null ? <DayPlans iso={d.iso} /> : null}
            </div>
          );
        })}
        {undated.length ? (
          <div className="activity-day" id="day-to-come">
            <div className="activity-day-head">
              <h2>{copy.datesToCome}</h2>
            </div>
            {undated.sort(byTime).map(event)}
          </div>
        ) : null}
        <PrintButton>{copy.print}</PrintButton>
      </Section>

      {/* The friends' boat vote: rendered only for guests holding that group's link. */}
      {voting ? (
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
    </PlannerProvider>
  );
}
