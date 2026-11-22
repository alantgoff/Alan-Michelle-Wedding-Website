import type { Metadata } from "next";
import { CoastMap } from "@/components/CoastMap";
import { Countdown } from "@/components/Countdown";
import { FlyingFrom } from "@/components/FlyingFrom";
import { Chapter, Contents, type ChapterRef } from "@/components/Guide";
import { PlacesCompact } from "@/components/IslandLists";
import { NowAtKualoa } from "@/components/NowAtKualoa";
import { OpenOn } from "@/components/OpenOn";
import { PackingList } from "@/components/PackingList";
import { PageHero } from "@/components/Page";
import { WeatherPanel } from "@/components/WeatherPanel";
import { PlannerProvider, WeekAgenda, WeekStrip } from "@/components/WeekPlanner";
import { flying } from "@/content/flying";
import { island, type Place } from "@/content/island";
import { myWeek } from "@/content/myWeek";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { utility as copy } from "@/content/utility";
import { heldGroups, visibleActivities } from "@/content/visibleActivities";
import { crossings } from "@/lib/flying";
import { oursByDay } from "@/lib/ours";
import { openNumbers, plannable } from "@/lib/plannable";
import { suggestedWeek } from "@/lib/week";

// The map names the visitor's own events, so this page is rendered per request.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: copy.tab };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const CHAPTERS: ChapterRef[] = (
  [
    ["now", copy.chapters.now],
    ["my-week", copy.chapters.week],
    ["open", copy.chapters.open],
    ["sun", copy.chapters.sun],
    ["flying", copy.chapters.flying],
    ["map", copy.chapters.map],
    ["weather", copy.chapters.weather],
    ["pack", copy.chapters.pack],
  ] as const
).map(([id, title], i) => ({ id, title, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/**
 * Utility: the site's useful widgets on one page. They are the same
 * components as on their own pages and keep their state in the same places,
 * so a restaurant saved here is in My week on The island, a city chosen here
 * is chosen on Travel, and so on.
 */
export default async function Utility() {
  const [activities, held] = await Promise.all([visibleActivities(), heldGroups()]);
  const far = crossings();
  const days = suggestedWeek();
  const places: Place[] = island.eat.groups.flatMap((g): Place[] => g.places);

  return (
    <PlannerProvider days={days} words={myWeek} catalog={plannable()}>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="travel" scene="utility" />
      <Contents chapters={CHAPTERS} />

      <Chapter chapter={chapter("now")}>
        <div className="utility-now">
          <Countdown target={site.isoDate} />
          <NowAtKualoa />
          <a className="button button-quiet" href="/wedding.ics" download>
            {copy.calendar}
          </a>
        </div>
      </Chapter>

      <Chapter chapter={chapter("my-week")}>
        <WeekStrip ours={oursByDay(activities, held)} />
        <WeekAgenda />
      </Chapter>

      <Chapter chapter={chapter("open")} lede={copy.open.lede}>
        <OpenOn days={days} opens={places.map(openNumbers)} words={island.eat.openOn}>
          <PlacesCompact places={places} labels={island.eat.labels} />
        </OpenOn>
      </Chapter>

      <Chapter chapter={chapter("sun")} lede={copy.sun.lede}>
        <table className="sun-table">
          <thead>
            <tr>
              <th scope="col">{copy.sun.day}</th>
              <th scope="col">{copy.sun.sunrise}</th>
              <th scope="col">{copy.sun.sunset}</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.offset} className={d.offset === 0 ? "sun-wedding" : undefined}>
                <th scope="row">
                  {d.medium}
                  {d.offset === 0 ? <span className="sun-mark">{copy.sun.wedding}</span> : null}
                </th>
                <td>{d.sunrise}</td>
                <td>{d.sunset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Chapter>

      <Chapter chapter={chapter("flying")}>
        <FlyingFrom
          rows={far.rows}
          sunset={far.sunset}
          title={flying.title}
          intro={flying.intro}
          prompt={flying.prompt}
          tableLabel={flying.tableLabel}
          words={flying.words}
        />
      </Chapter>

      <Chapter chapter={chapter("map")}>
        <CoastMap activities={activities} />
      </Chapter>

      <Chapter chapter={chapter("weather")}>
        <WeatherPanel />
      </Chapter>

      <Chapter chapter={chapter("pack")}>
        <PackingList items={travel.packing} status={travel.packingStatus} />
      </Chapter>
    </PlannerProvider>
  );
}
