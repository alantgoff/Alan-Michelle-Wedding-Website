import Link from "next/link";
import type { ReactNode } from "react";
import type { Passage } from "@/content/island";
import { site } from "@/content/site";
import { IslandDot } from "./IslandDot";
import { JumpBar, type JumpItem } from "./JumpBar";
import { AddToWeek } from "./WeekPlanner";
import { Reveal } from "./Reveal";

/**
 * The long pages (Travel, The island) are set like a small guidebook: a
 * contents strip under the banner, then numbered chapters. Plain anchors and
 * plain sections, so it all works without JavaScript and prints in order.
 */

export type ChapterRef = { id: string; numeral: string; title: string };

export type PassageItem = Passage;

/**
 * The chapters as a row that sticks under the header ("In this guide"), with
 * the one being read highlighted. `extra` adds further stops, each placed
 * after the chapter whose id it names in `after` (or first, with no `after`).
 */
export function Contents({
  chapters,
  label = site.guide.contents,
  extra = [],
}: {
  chapters: ChapterRef[];
  label?: string;
  extra?: (JumpItem & { after?: string })[];
}) {
  const items: JumpItem[] = extra.filter((e) => !e.after).map(({ id, label: l }) => ({ id, label: l }));
  for (const c of chapters) {
    items.push({ id: c.id, label: c.title, numeral: c.numeral });
    for (const e of extra.filter((x) => x.after === c.id)) items.push({ id: e.id, label: e.label });
  }
  return <JumpBar items={items} label={label} />;
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
          <a href="#contents">{site.guide.back}</a>
        </p>
      </section>
    </Reveal>
  );
}

/**
 * Short titled passages in two easy columns, ruled like a printed page. With
 * `plan`, each passage that has an id gets "Add to my week".
 */
export function Passages({
  items,
  plan = false,
  heading: H = "h3",
}: {
  items: readonly PassageItem[];
  plan?: boolean;
  /** "h4" when the passages sit under a heading of their own. */
  heading?: "h3" | "h4";
}) {
  return (
    <div className="passages">
      {items.map((item) => (
        <article className="passage" key={item.title} id={item.id}>
          {(plan && item.id) || item.at ? (
            <div className="passage-head">
              <H>{item.title}</H>
              {item.at ? <IslandDot at={item.at} label={item.title} hideLabel /> : null}
              {plan && item.id ? <AddToWeek id={item.id} /> : null}
            </div>
          ) : (
            <H>{item.title}</H>
          )}
          <p>{item.text}</p>
          {item.link ? <MoreLink href={item.link.href} label={item.link.label} /> : null}
        </article>
      ))}
    </div>
  );
}

/** "Where to stay →": a quiet pointer to the place a fact is told in full. */
export function MoreLink({ href, label }: { href: string; label: string }) {
  // A page anchor or another page; both are plain links, so :target works.
  const internal = href.startsWith("/") || href.startsWith("#");
  return (
    <p className="more-link">
      {internal ? <Link href={href}>{label} →</Link> : <a href={href}>{label} →</a>}
    </p>
  );
}
