import type { Metadata } from "next";
import { Chapter, Contents, Passages, type ChapterRef } from "@/components/Guide";
import { Places } from "@/components/IslandLists";
import { PageHero } from "@/components/Page";
import { island } from "@/content/island";

const copy = island.page;
export const metadata: Metadata = { title: copy.tab };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const CHAPTERS: ChapterRef[] = [
  { id: "eat", title: copy.chapters.eat },
  { id: "explore", title: copy.chapters.explore },
  { id: "water", title: copy.chapters.water },
  { id: "rules", title: copy.chapters.rules },
  { id: "venue", title: copy.chapters.venue },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

export default function Island() {
  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="island" scene="island" />
      <Contents chapters={CHAPTERS} />

      <Chapter chapter={chapter("eat")} lede={island.eat.lede}>
        {island.eat.groups.map((g) => (
          <div className="eat-group" key={g.title}>
            <h3>{g.title}</h3>
            <Places places={g.places} labels={island.eat.labels} />
          </div>
        ))}
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

      <Chapter chapter={chapter("explore")} lede={island.explore.lede}>
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
        <Passages items={island.explore.passages} />
      </Chapter>

      <Chapter chapter={chapter("water")} lede={island.water.lede}>
        <Passages items={island.water.passages} />
      </Chapter>

      <Chapter chapter={chapter("rules")} lede={island.rules.lede}>
        <Passages items={island.rules.passages} />
      </Chapter>

      <Chapter chapter={chapter("venue")}>
        <Passages items={island.venue.passages} />
      </Chapter>
    </>
  );
}
