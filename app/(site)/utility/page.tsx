import type { Metadata } from "next";
import { CoastMap } from "@/components/CoastMap";
import { Countdown } from "@/components/Countdown";
import { FlyingFrom } from "@/components/FlyingFrom";
import { Chapter, Contents, type ChapterRef } from "@/components/Guide";
import { PlacesCompact, openNumbers } from "@/components/IslandLists";
import { MyWeek } from "@/components/MyWeek";
import { NowAtKualoa } from "@/components/NowAtKualoa";
import { OpenOn, type OpenOnDay } from "@/components/OpenOn";
import { PackingList } from "@/components/PackingList";
import { PageHero } from "@/components/Page";
import { WeatherPanel } from "@/components/WeatherPanel";
import { flying } from "@/content/flying";
import { island, type Place } from "@/content/island";
import { site } from "@/content/site";
import { travel } from "@/content/travel";
import { utility as copy } from "@/content/utility";
import { visibleActivities } from "@/content/visibleActivities";
import { crossings } from "@/lib/flying";
import { hawaiiClock, hawaiiNoon, sunTimes } from "@/lib/sun";

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

/** The week we suggest: from the Saturday before the wedding to the Sunday after. */
const WEEK_FROM = -6;
const WEEK_TO = 2;
function week() {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  const short = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });
  const long = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" });
  const days = [];
  for (let offset = WEEK_FROM; offset <= WEEK_TO; offset += 1) {
    const date = new Date(Date.UTC(year, month - 1, day + offset));
    const { sunrise, sunset } = sunTimes(
      hawaiiNoon(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()),
      site.coordinates.lat,
      site.coordinates.lng,
    );
    days.push({
      offset,
      weekday: date.getUTCDay(),
      short: short.format(date),
      date: date.getUTCDate(),
      label: long.format(date),
      sunrise: hawaiiClock(sunrise),
      sunset: hawaiiClock(sunset),
    });
  }
  return days;
}

/**
 * Utility: the site's useful widgets on one page. They are the same
 * components as on their own pages and keep their state in the same places,
 * so a restaurant saved here is in My week on The island, a city chosen here
 * is chosen on Travel, and so on.
 */
export default async function Utility() {
  const activities = await visibleActivities();
  const far = crossings();
  const days = week();
  const openDays: OpenOnDay[] = days.map(({ offset, weekday, short, date }) => ({ offset, weekday, short, date }));
  const places: Place[] = island.eat.groups.flatMap((g): Place[] => g.places);

  return (
    <>
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
        <MyWeek words={island.myWeek} base="/island" inline />
      </Chapter>

      <Chapter chapter={chapter("open")} lede={copy.open.lede}>
        <OpenOn days={openDays} opens={places.map(openNumbers)} words={island.eat.openOn}>
          <PlacesCompact places={places} labels={island.eat.labels} save={island.myWeek} />
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
                  {d.label}
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
    </>
  );
}
