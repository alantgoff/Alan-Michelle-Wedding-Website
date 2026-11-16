import type { Metadata } from "next";
import { Chapter, Contents, Passages, type ChapterRef } from "@/components/Guide";
import { Almanac } from "@/components/ink/Almanac";
import { MoonGlyph } from "@/components/ink/MoonGlyph";
import { Kolea } from "@/components/Kolea";
import { SkyDisc } from "@/components/ink/SkyDisc";
import { PageHero } from "@/components/Page";
import { island } from "@/content/island";
import { sky } from "@/content/sky";
import { skyChart } from "@/content/skyChart";
import { fill } from "@/lib/fill";
import { minutesOf } from "@/lib/weekend";

const copy = island.page;
export const metadata: Metadata = { title: copy.tab };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const CHAPTERS: ChapterRef[] = [
  { id: "kualoa", title: copy.chapters.kualoa },
  { id: "sky", title: copy.chapters.sky },
  { id: "eat", title: copy.chapters.eat },
  { id: "explore", title: copy.chapters.explore },
  { id: "water", title: copy.chapters.water },
  { id: "manners", title: copy.chapters.manners },
  { id: "say-it", title: copy.chapters.sayIt },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/** Everything the day's sky and sea do, in the order it happens. */
const A = copy.almanac;
const DAY: { time: string; what: string; about?: boolean }[] = [
  ...sky.tides.map((t) => ({ time: t.time, what: fill(t.kind === "high" ? A.high : A.low, { feet: t.feet.toFixed(1) }) })),
  { time: sky.sunrise, what: A.sunrise },
  { time: sky.ridgeShade, what: A.ridge, about: true },
  { time: sky.sunset, what: A.sunset },
  { time: sky.lastLight, what: A.lastLight },
  { time: skyChart.events.saturnRise, what: A.saturn },
  { time: sky.moonrise, what: fill(A.moonrise, { phrase: sky.moonPhrase }) },
].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));

export default function Island() {
  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="island" scene="island" />
      <Contents chapters={CHAPTERS} />

      <Chapter chapter={chapter("kualoa")} lede={island.kualoa.lede}>
        <Passages items={island.kualoa.passages} />
      </Chapter>

      <Chapter chapter={chapter("sky")} lede={sky.chapter.lede}>
        <div className="almanac">
          <h3>{sky.chapter.dayTitle}</h3>
          <p>{sky.chapter.dayText}</p>
          <Almanac />
          <ol className="almanac-list">
            {DAY.map((e) => (
              <li key={e.time + e.what}>
                <span className="almanac-time">
                  {e.about ? `${A.about} ` : ""}
                  {e.time}
                </span>
                <span>{e.what}</span>
              </li>
            ))}
          </ol>
          <p className="fine-print">{sky.chapter.tideCredit}</p>
        </div>

        <div className="moons">
          <h3>{sky.chapter.moonsTitle}</h3>
          <p>{sky.chapter.moonsText}</p>
          <ol className="moon-row">
            {sky.moons.map((m) => (
              <li key={m.day} className={m.ours ? "moon-ours" : undefined}>
                <MoonGlyph lit={m.lit} />
                <span className="moon-day">{m.day}</span>
                <span className="moon-rise">{fill(copy.moons.rises, { time: m.moonrise })}</span>
                <span className="moon-lit">
                  {fill(copy.moons.lit, { percent: Math.round(m.lit * 100) })}
                  {m.ours ? ` · ${copy.moons.ours}` : ""}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="sky-chart">
          <SkyDisc />
          <div className="sky-chart-text">
            <h3>{sky.chapter.chartTitle}</h3>
            <p>{sky.chapter.chartText}</p>
            <dl className="look-for">
              {sky.chapter.lookFor.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className="fine-print">{sky.chapter.namesCredit}</p>
          </div>
        </div>
        <div className="sky-passages">
          <Passages items={sky.chapter.passages} />
        </div>
      </Chapter>

      <Chapter chapter={chapter("eat")} lede={island.eat.lede}>
        <Passages items={island.eat.passages} />
        <div className="menu-words">
          <h3>{island.eat.menuTitle}</h3>
          <dl>
            {island.eat.menu.map((entry) => (
              <div key={entry.word}>
                <dt lang={"haw" in entry && entry.haw ? "haw" : undefined}>{entry.word}</dt>
                <dd>{entry.means}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Chapter>

      <Chapter chapter={chapter("explore")} lede={island.explore.lede}>
        {/* The weekend's own timetable for a free day; each line points to its passage. */}
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

      <Chapter chapter={chapter("manners")} lede={island.manners.lede}>
        <div className="aloha-five">
          <h3>{island.manners.aloha.title}</h3>
          <p>{island.manners.aloha.text}</p>
          <ol>
            {island.manners.aloha.words.map((w) => (
              <li key={w.word}>
                <span className="aloha-word" lang="haw">
                  {w.word}
                </span>
                <span className="aloha-means">{w.means}</span>
              </li>
            ))}
          </ol>
        </div>
        <Passages items={island.manners.passages} />
      </Chapter>

      <Kolea title={island.kolea.title} text={island.kolea.text} watch={island.kolea.watch} />

      <Chapter chapter={chapter("say-it")}>
        <ul className="say-it">
          {island.sayIt.map((entry) => (
            <li key={entry.word}>
              <span className="say-word" lang="haw">
                {entry.word}
              </span>
              <span className="say-how">{entry.say}</span>
              <span className="say-means">{entry.means}</span>
            </li>
          ))}
        </ul>
        <p className="say-note">{island.sayItNote}</p>
        <p className="say-note">{island.whyMarks}</p>

        <div className="menu-words">
          <h3>{island.wordsTitle}</h3>
          <dl>
            {island.words.map((entry) => (
              <div key={entry.word}>
                <dt lang="haw">{entry.word}</dt>
                <dd>{entry.means}</dd>
              </div>
            ))}
          </dl>
          <p className="fine-print">{island.wordsNote}</p>
        </div>
      </Chapter>
    </>
  );
}
