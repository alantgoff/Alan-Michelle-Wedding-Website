import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { PageHero } from "@/components/Page";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { album } from "@/content/photos";
import { site } from "@/content/site";
import { story, storyClosing, storyPage as copy } from "@/content/story";
import { fill } from "@/lib/fill";

export const metadata: Metadata = { title: copy.tab };

/** 1 → I, 26 → XXVI: plates are numbered like the plates in a book. */
function roman(n: number): string {
  const table: [number, string][] = [
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [value, letters] of table) {
    while (n >= value) {
      out += letters;
      n -= value;
    }
  }
  return out;
}

/** A moment still holding template text never reaches a guest. */
const ready = story.filter((m) => !/TODO/.test(`${m.date} ${m.title} ${m.text}`));

/**
 * Our Story, on a spine.
 *
 * The album comes first, then each moment in words. Every stretch has its
 * marker on a rail to the left that stays pinned while it scrolls past, then
 * hands off to the next one. No script: the rail marker is simply
 * position: sticky inside its own section.
 */
export default function Story() {
  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="story" scene="story" />
      <div className="story-spine">
        <section className="story-moment" aria-label={copy.albumLabel}>
          <div className="story-rail">
            <div className="story-marker">
              <span className="story-marker-when">{copy.albumMarker}</span>
              <span className="story-marker-index" aria-hidden="true">
                01
              </span>
            </div>
          </div>
          <div className="story-track">
            {/* Tipped-in plates at each photograph's own shape, in the order it happened. */}
            <ol className="album">
              {album.map((photo, i) => (
                <li key={photo.src}>
                  <figure
                    className="plate"
                    data-tall={photo.height > photo.width * 1.1 ? "" : undefined}
                    style={{ rotate: i % 2 ? "0.7deg" : "-0.8deg" }}
                  >
                    <div className="plate-photo">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(max-width: 820px) 92vw, (max-width: 1400px) 40vw, 520px"
                      />
                    </div>
                    <figcaption>
                      {copy.plate} {roman(i + 1)}
                      {photo.caption ? ` · ${photo.caption}` : ""}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {ready.map((moment, i) => (
          <section className="story-moment" key={moment.title} aria-labelledby={`story-${i}`}>
            <div className="story-rail">
              <div className="story-marker">
                <span className="story-marker-when">{moment.date}</span>
                <span className="story-marker-index" aria-hidden="true">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="story-track">
              <Reveal>
                <div className="story-body">
                  <h2 id={`story-${i}`}>{moment.title}</h2>
                  <div className={moment.notes?.length ? "story-text story-text-noted" : "story-text"}>
                    <p>{moment.text}</p>
                    {moment.notes?.length ? (
                      <aside className="story-notes" aria-label={copy.notesLabel}>
                        {moment.notes.map((note) => (
                          <p className={`story-note story-note-${note.by.toLowerCase()}`} key={note.by + note.text}>
                            <abbr title={copy.who[note.by]}>{note.by}.</abbr> {note.text}
                          </p>
                        ))}
                      </aside>
                    ) : null}
                  </div>
                  {moment.photo ? (
                    // A tipped-in plate: a cream mount, four paper corners, a degree off square.
                    <figure className="plate" style={{ rotate: i % 2 ? "0.8deg" : "-1deg" }}>
                      <div className="plate-photo">
                        <PhotoFrame name={moment.photo} shape="portrait" sizes="(max-width: 820px) 100vw, 420px" />
                      </div>
                      {moment.caption ? (
                        <figcaption>
                          {copy.plate} {roman(album.length + i + 1)} · {moment.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
        <section className="story-moment story-moment-end" aria-label={copy.closingLabel}>
          <div className="story-rail">
            <div className="story-marker">
              <span className="story-marker-when">{copy.closingMarker}</span>
            </div>
          </div>
          <div className="story-track">
            <p className="story-close">{storyClosing.thanks}</p>
            <Reveal>
              <div className="story-we">
                <ol>
                  {storyClosing.words.map((w) => (
                    <li key={w.word}>
                      <span className="story-we-word" lang="haw">
                        {w.word}
                      </span>
                      <span className="story-we-means">{w.means}</span>
                    </li>
                  ))}
                </ol>
                <p>{storyClosing.line}</p>
              </div>
            </Reveal>
            <Logo className="story-sign" sizes="130px" />
            <p className="colophon">
              {storyClosing.colophon} {fill(copy.edition, { date: site.weddingDate.replace(/^\w+, /, "") })}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
