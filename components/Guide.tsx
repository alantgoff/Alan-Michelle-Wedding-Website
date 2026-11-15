import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The long pages (Travel, The island) are set like a small guidebook: a
 * contents strip under the banner, then numbered chapters. Plain anchors and
 * plain sections, so it all works without JavaScript and prints in order.
 */

export type ChapterRef = { id: string; numeral: string; title: string };

/** "In this guide: I Kualoa · II Eating · …", each a link to its chapter. */
export function Contents({ chapters, label = "In this guide" }: { chapters: ChapterRef[]; label?: string }) {
  return (
    <nav className="contents" id="contents" aria-label={label}>
      <p className="contents-label">{label}</p>
      <ol>
        {chapters.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`}>
              <span className="contents-numeral" aria-hidden="true">
                {c.numeral}
              </span>
              {c.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Chapter({
  chapter,
  lede,
  children,
}: {
  chapter: ChapterRef;
  /** One opening paragraph, set larger, with a drop cap. */
  lede?: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section className="chapter" id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
        <header className="chapter-head">
          <span className="chapter-numeral" aria-hidden="true">
            {chapter.numeral}
          </span>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </header>
        {lede ? <p className="chapter-lede">{lede}</p> : null}
        {children}
        {/* These pages are long, on a phone especially: a way back up. */}
        <p className="chapter-back">
          <a href="#contents">Back to the contents</a>
        </p>
      </section>
    </Reveal>
  );
}

/** Short titled passages in two easy columns, ruled like a printed page. */
export function Passages({ items }: { items: readonly { title: string; text: string }[] }) {
  return (
    <div className="passages">
      {items.map((item) => (
        <article className="passage" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
