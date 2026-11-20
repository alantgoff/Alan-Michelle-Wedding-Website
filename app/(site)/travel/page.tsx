import { IslandDot } from "@/components/IslandDot";
import type { Metadata } from "next";
import Link from "next/link";
import { CoastMap } from "@/components/CoastMap";
import { FlyingFrom } from "@/components/FlyingFrom";
import { Chapter, Contents, MoreLink, Passages, type ChapterRef } from "@/components/Guide";
import { CrossingGlyph } from "@/components/ink/CrossingGlyph";
import { PackingList } from "@/components/PackingList";
import { PageHero } from "@/components/Page";
import { PrintButton } from "@/components/PrintButton";
import { WeatherPanel } from "@/components/WeatherPanel";
import { flying } from "@/content/flying";
import { travel } from "@/content/travel";
import { visibleActivities } from "@/content/visibleActivities";
import { fill } from "@/lib/fill";
import { crossings } from "@/lib/flying";

// The chart lists what happens at each place, filtered by the visitor's
// invite group, so this page is rendered per request like the Week is.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: travel.page.tab };

const copy = travel.page;
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const CHAPTERS: ChapterRef[] = [
  { id: "the-coast", title: copy.chapters.coast },
  { id: "getting-there", title: copy.chapters.gettingThere },
  { id: "stay", title: copy.chapters.stay },
  { id: "weather", title: copy.chapters.weather },
  { id: "pack", title: copy.chapters.pack },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/** Minutes to the gardens for each place to stay, as written on its card: {bay}, {laie}, {waikiki}. */
const minutes = Object.fromEntries(travel.stays.map((s) => [s.id, s.minutes]));

export default async function Travel() {
  const activities = await visibleActivities();
  const far = crossings();

  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="travel" scene="travel" />

      {/* The essentials first; each line points down to its chapter. */}
      <section className="two-minute" aria-labelledby="two-minute-title">
        <h2 id="two-minute-title">{travel.twoMinute.title}</h2>
        <ol>
          {travel.twoMinute.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{fill(item.text, minutes)}</p>
              <MoreLink href={item.link.href} label={item.link.label} />
            </li>
          ))}
        </ol>
      </section>

      <Contents chapters={CHAPTERS} />

      <Chapter chapter={chapter("the-coast")}>
        <p className="coast-intro">{travel.map.intro}</p>
        <CoastMap activities={activities} />
      </Chapter>

      <Chapter chapter={chapter("getting-there")}>
        <FlyingFrom
          rows={far.rows}
          sunset={far.sunset}
          title={flying.title}
          intro={flying.intro}
          prompt={flying.prompt}
          tableLabel={flying.tableLabel}
          words={flying.words}
        />

        <Passages items={[...travel.beforeYouFly, ...travel.gettingThere]} />

        <div className="crossings-block" id="crossings">
          <h3>{copy.crossingsTitle}</h3>
          <p>{travel.crossingsIntro}</p>
          <ol className="crossings">
            {travel.crossings.map((c) => (
              <li className="crossing" key={c.id}>
                <CrossingGlyph id={c.id} />
                <p className="label">{c.label}</p>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <Passages items={travel.road} />
      </Chapter>

      <Chapter chapter={chapter("stay")}>
        <p className="section-intro">{travel.stayIntro}</p>
        <div className="stays">
          {travel.stays.map((item) => (
            <article className={item.recommended ? "stay stay-recommended" : "stay"} key={item.id}>
              {item.recommended ? <p className="stay-badge">{copy.recommended}</p> : null}
              <p className="stay-minutes">
                <span className="stay-number">{item.minutes}</span>
                <span className="stay-unit">{copy.minutesUnit}</span>
              </p>
              <div className="stay-head">
                <h3>{item.title}</h3>
                <IslandDot at={item.at} label={item.title} hideLabel />
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="passages stay-notes">
          {travel.stayNotes.map((note) => (
            <article className="passage" key={note.title} id={note.id}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter chapter={chapter("weather")}>
        <WeatherPanel />
        <p className="weather-water">
          {copy.water.text} <Link href="/island#water">{copy.water.link} →</Link>
        </p>
      </Chapter>

      <Chapter chapter={chapter("pack")}>
        <PackingList items={travel.packing} status={travel.packingStatus} />
        <PrintButton>{copy.print}</PrintButton>
      </Chapter>

      <aside className="onward">
        <p className="label">{copy.onward.label}</p>
        <p className="onward-text">{copy.onward.text}</p>
        <Link className="button button-quiet" href="/island#eat">
          {copy.onward.link}
        </Link>
      </aside>
    </>
  );
}
