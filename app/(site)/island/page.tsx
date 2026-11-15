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
import { minutesOf } from "@/lib/weekend";

export const metadata: Metadata = { title: "The island" };

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const CHAPTERS: ChapterRef[] = [
  { id: "kualoa", title: "Kualoa" },
  { id: "sky", title: "Sun, moon and tide" },
  { id: "eat", title: "Eating" },
  { id: "explore", title: "A free day" },
  { id: "manners", title: "A few manners" },
  { id: "say-it", title: "Say it like a local" },
].map((c, i) => ({ ...c, numeral: NUMERALS[i] }));
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

/** Everything the day's sky and sea do, in the order it happens. */
const DAY: { time: string; what: string; about?: boolean }[] = [
  ...sky.tides.map((t) => ({ time: t.time, what: `${t.kind === "high" ? "High" : "Low"} tide, ${t.feet.toFixed(1)} ft` })),
  { time: sky.sunrise, what: "Sunrise, out of the sea" },
  { time: sky.ridgeShade, what: "The sun slips behind the ridge, by our estimate, and the lawn is in shade", about: true },
  { time: sky.sunset, what: "Sunset" },
  { time: sky.lastLight, what: "The last light goes" },
  { time: skyChart.events.saturnRise, what: "Saturn rises" },
  { time: sky.moonrise, what: `Moonrise, ${sky.moonPhrase}` },
].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));

export default function Island() {
  return (
    <>
      <PageHero
        kicker="Where we are"
        title="The island"
        intro="A short guide to the place we are marrying and to the windward side of Oʻahu: its stories, its names, and how to be a good guest on it."
        photo="island"
        scene="island"
      />
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
                  {e.about ? "About " : ""}
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
                <span className="moon-rise">rises {m.moonrise}</span>
                <span className="moon-lit">
                  {Math.round(m.lit * 100)}% lit{m.ours ? " · our night" : ""}
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
        <Passages items={island.explore.passages} />
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

      <Kolea title={island.kolea.title} text={island.kolea.text} />

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
