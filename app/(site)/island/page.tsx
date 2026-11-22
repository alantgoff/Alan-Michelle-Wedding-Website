import type { Metadata } from "next";
import { Chapter, Contents, Passages, type ChapterRef } from "@/components/Guide";
import { Places } from "@/components/IslandLists";
import { IslandViews } from "@/components/IslandViews";
import { Kolea } from "@/components/Kolea";
import { OpenOn } from "@/components/OpenOn";
import { OurPicks } from "@/components/OurPicks";
import { PageHero } from "@/components/Page";
import { PicksMap } from "@/components/PicksMap";
import { PokeBowls } from "@/components/PokeBowls";
import { PlannerProvider, WeekStrip } from "@/components/WeekPlanner";
import { island, type Place } from "@/content/island";
import { myWeek } from "@/content/myWeek";
import { picks } from "@/content/picks";
import { picksByRegion } from "@/lib/picks";
import { openNumbers, plannable } from "@/lib/plannable";
import { suggestedWeek } from "@/lib/week";

const copy = island.page;
export const metadata: Metadata = { title: copy.tab };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const CHAPTERS: ChapterRef[] = [
  { id: "picks", title: copy.chapters.picks },
  { id: "poke-chapter", title: copy.chapters.poke },
  { id: "water", title: copy.chapters.water },
  { id: "rules", title: copy.chapters.rules },
  { id: "venue", title: copy.chapters.venue },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/**
 * The island: our picks first, on a drawn map by default (or as the full
 * list), then Foodland's poke, the water, the rules and the venue.
 */
export default function Island() {
  const days = suggestedWeek();
  const { regions, dots } = picksByRegion();
  const places: Place[] = island.eat.groups.flatMap((g): Place[] => g.places);
  return (
    <PlannerProvider days={days} words={myWeek} catalog={plannable()}>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="island" scene="island" />
      <Contents chapters={CHAPTERS} />
      <WeekStrip />

      <Chapter chapter={chapter("picks")}>
        <OurPicks line={picks.line} />
        <OpenOn days={days} opens={places.map(openNumbers)} words={island.eat.openOn}>
          <IslandViews
            words={island.explorer.views}
            map={<PicksMap regions={regions} dots={dots} words={island.explorer} labels={island.eat.labels} />}
            list={
              <>
                <section className="views-section" id="eat" aria-labelledby="eat-title">
                  <h3 className="views-title" id="eat-title">
                    {copy.chapters.eat}
                  </h3>
                  <p className="views-lede">{island.eat.lede}</p>
                  {island.eat.groups.map((g) => (
                    <div className="eat-group" key={g.title}>
                      <h3>{g.title}</h3>
                      <Places places={g.places} labels={island.eat.labels} />
                    </div>
                  ))}
                </section>
                <section className="views-section" id="explore" aria-labelledby="explore-title">
                  <h3 className="views-title" id="explore-title">
                    {copy.chapters.explore}
                  </h3>
                  <p className="views-lede">{picks.outLine} {island.explore.lede}</p>
                  {/* What is open on which day; each line points to its passage. */}
                  <div className="by-day">
                    <h3>{island.explore.byDay.title}</h3>
                    <p>{island.explore.byDay.intro}</p>
                    <dl className="own-time">
                      {island.explore.byDay.days.map((d) => (
                        <div key={d.when}>
                          <dt>{d.when}</dt>
                          <dd>
                            <a href={d.href}>{d.text}</a>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <Passages items={island.explore.passages} plan />
                </section>
              </>
            }
          />
        </OpenOn>
      </Chapter>

      <Chapter chapter={chapter("poke-chapter")}>
        <PokeBowls poke={island.eat.poke} />
        <div className="menu-words">
          <h3>{island.eat.menuTitle}</h3>
          <dl>
            {island.eat.menu.map((entry) => (
              <div key={entry.word}>
                <dt>{entry.word}</dt>
                <dd>{entry.means}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Chapter>

      <Chapter chapter={chapter("water")} lede={island.water.lede}>
        <Passages items={island.water.passages} />
      </Chapter>

      <Chapter chapter={chapter("rules")} lede={island.rules.lede}>
        <Passages items={island.rules.passages} />
      </Chapter>

      <Kolea title={island.kolea.title} text={island.kolea.text} watch={island.kolea.watch} />

      <Chapter chapter={chapter("venue")}>
        <Passages items={island.venue.passages} />
      </Chapter>
    </PlannerProvider>
  );
}
