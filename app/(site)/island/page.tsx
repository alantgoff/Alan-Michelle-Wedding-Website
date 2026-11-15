import type { Metadata } from "next";
import { Chapter, Contents, Passages, type ChapterRef } from "@/components/Guide";
import { PageHero } from "@/components/Page";
import { island } from "@/content/island";

export const metadata: Metadata = { title: "The island" };

const CHAPTERS: ChapterRef[] = [
  { id: "kualoa", numeral: "I", title: "Kualoa" },
  { id: "say-it", numeral: "II", title: "Say it like a local" },
];
const chapter = (id: string) => CHAPTERS.find((c) => c.id === id)!;

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
      </Chapter>
    </>
  );
}
