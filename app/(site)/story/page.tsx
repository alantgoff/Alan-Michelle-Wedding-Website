import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { PageHero } from "@/components/Page";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { story, storyClosing } from "@/content/story";

export const metadata: Metadata = { title: "Our story" };

/**
 * Our Story, on a spine.
 *
 * Each moment is its own stretch of the page. Its date sits on a rail to the
 * left and stays pinned while the moment scrolls past, then hands off to the
 * next one — so the year you are reading is always beside you. No script:
 * the rail marker is simply position: sticky inside its own section.
 */
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const WHO = { A: "Alan", M: "Michelle" } as const;

export default function Story() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="The road here"
        intro="A few moments from the story that brought us to this island, and to all of you."
        photo="story"
        scene="story"
      />
      <div className="story-spine">
        {story.map((moment, i) => (
          <section className="story-moment" key={moment.title} aria-labelledby={`story-${i}`}>
            <div className="story-rail">
              <div className="story-marker">
                <span className="story-marker-when">{moment.date}</span>
                <span className="story-marker-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="story-track">
              <Reveal>
                <div className="story-body">
                  <h2 id={`story-${i}`}>{moment.title}</h2>
                  <div className={moment.notes?.length ? "story-text story-text-noted" : "story-text"}>
                    <p>{moment.text}</p>
                    {moment.notes?.length ? (
                      <aside className="story-notes" aria-label="Notes in the margin">
                        {moment.notes.map((note) => (
                          <p className={`story-note story-note-${note.by.toLowerCase()}`} key={note.by + note.text}>
                            <abbr title={WHO[note.by]}>{note.by}.</abbr> {note.text}
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
                          Plate {NUMERALS[i] ?? i + 1} · {moment.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
        <section className="story-moment story-moment-end" aria-label="Closing">
          <div className="story-rail">
            <div className="story-marker">
              <span className="story-marker-when">And now</span>
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
              {storyClosing.colophon} First edition, {site.weddingDate.replace(/^\w+, /, "")}.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
