import type { Metadata } from "next";
import Link from "next/link";
import { CoastMap } from "@/components/CoastMap";
import { FlyingFrom } from "@/components/FlyingFrom";
import { Chapter, Contents, Passages, type ChapterRef } from "@/components/Guide";
import { CrossingGlyph } from "@/components/ink/CrossingGlyph";
import { PackingList } from "@/components/PackingList";
import { PageHero } from "@/components/Page";
import { PrintButton } from "@/components/PrintButton";
import { WeatherPanel } from "@/components/WeatherPanel";
import { flying } from "@/content/flying";
import { travel } from "@/content/travel";
import { visibleActivities } from "@/content/visibleActivities";
import { crossings } from "@/lib/flying";

// The chart lists what happens at each place, filtered by the visitor's
// invite group, so this page is rendered per request like Activities is.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Travel" };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const CHAPTERS: ChapterRef[] = [
  { id: "the-coast", title: "Where everything is" },
  { id: "getting-there", title: "Getting there" },
  { id: "stay", title: "Where to stay" },
  { id: "weather", title: "Weather and water" },
  { id: "pack", title: "What to pack" },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

export default async function Travel() {
  const activities = await visibleActivities();
  const far = crossings();

  return (
    <>
      <PageHero
        kicker="The journey"
        title="Travel well"
        intro="The windward side of Oʻahu rewards a little planning. Here is the honest version of getting there, staying nearby, and making a trip of it."
        photo="travel"
        scene="travel"
      />
      <Contents chapters={CHAPTERS} />

      <Chapter chapter={chapter("the-coast")}>
        <p className="coast-intro">
          An illustration, not a navigational chart. The coastline is drawn by feel and the distances
          are invented, so please do not use it to find your way. Choose a point to read what happens
          there.
        </p>
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
        />

        <Passages items={travel.gettingThere} />

        <div className="crossings-block">
          <h3>Choose your crossing</h3>
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
          <p className="crossing-lore">
            <strong>{travel.crossingLore.title}.</strong> {travel.crossingLore.text}
          </p>
        </div>

        <Passages items={travel.road} />
      </Chapter>

      <Chapter chapter={chapter("stay")}>
        <p className="section-intro">{travel.stayIntro}</p>
        <div className="stays">
          {travel.stays.map((item) => (
            <article className="stay" key={item.id}>
              <p className="stay-minutes">
                <span className="stay-number">{item.minutes}</span>
                <span className="stay-unit">minutes to the gardens</span>
              </p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="passages stay-notes">
          {travel.stayNotes.map((note) => (
            <article className="passage" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter chapter={chapter("weather")}>
        <WeatherPanel />
        <div className="water-notes">
          <Passages items={travel.water} />
        </div>
      </Chapter>

      <Chapter chapter={chapter("pack")}>
        <PackingList items={travel.packing} />
        <PrintButton>Print a copy for the glovebox</PrintButton>
      </Chapter>

      <aside className="onward">
        <p className="label">With a free day</p>
        <p className="onward-text">
          Where to eat, what to see and how to be a good guest are in a short guide of their own.
        </p>
        <Link className="button button-quiet" href="/island#eat">
          Open The island
        </Link>
      </aside>
    </>
  );
}
