import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { PageHero } from "@/components/Page";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { album, type AlbumPhoto } from "@/content/photos";
import { site } from "@/content/site";
import { story, storyClosing, storyPage as copy } from "@/content/story";
import { fill } from "@/lib/fill";
import { slug } from "@/lib/slug";
import { JumpBar } from "@/components/JumpBar";

export const metadata: Metadata = { title: copy.tab };

/** A chapter still holding template text never reaches a guest. */
const ready = story.filter((m) => !/TODO/.test(`${m.date ?? ""} ${m.title} ${m.text ?? ""}`));

/**
 * Our Story, on a spine.
 *
 * Each chapter is its own stretch of the page. Its number (and its year,
 * once there is one) sits on a rail to the left and stays pinned while the
 * chapter scrolls past, then hands off to the next one. No script: the rail
 * marker is simply position: sticky inside its own section.
 */
export default function Story() {
  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} photo="story" scene="story" />
      <JumpBar items={ready.map((m) => ({ id: slug(m.short ?? m.title), label: m.short ?? m.title }))} label={copy.contents} />
      <div className="story-spine">
        {ready.map((moment, i) => (
          <section className="story-moment" key={moment.title} id={slug(moment.short ?? moment.title)} aria-labelledby={`story-${i}`}>
            <div className="story-rail">
              <div className="story-marker">
                {moment.date ? <span className="story-marker-when">{moment.date}</span> : null}
                <span className="story-marker-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="story-track">
              <Reveal>
                <div className="story-body">
                  <h2 id={`story-${i}`}>{moment.title}</h2>
                  {moment.text ? (
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
                  ) : null}

                  {moment.photos?.length ? (
                    // Tipped-in plates at each photograph's own shape: the main one first and larger.
                    <div className="story-plates">
                      {moment.photos.map((key, j) => {
                        const photo: AlbumPhoto = album[key];
                        return (
                          <figure
                            key={key}
                            className={j === 0 ? "plate" : "plate plate-sub"}
                            data-tall={photo.height > photo.width * 1.1 ? "" : undefined}
                            style={{ rotate: (i + j) % 2 ? "-0.8deg" : "0.7deg" }}
                          >
                            <div className="plate-photo">
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={photo.width}
                                height={photo.height}
                                sizes={j === 0 ? "(max-width: 820px) 92vw, 440px" : "(max-width: 820px) 92vw, 300px"}
                              />
                            </div>
                            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
                          </figure>
                        );
                      })}
                    </div>
                  ) : null}

                  {moment.photo ? (
                    // A single tipped-in plate from the main photo manifest.
                    <figure className="plate" style={{ rotate: i % 2 ? "0.8deg" : "-1deg" }}>
                      <div className="plate-photo">
                        <PhotoFrame name={moment.photo} shape="portrait" sizes="(max-width: 820px) 100vw, 420px" />
                      </div>
                      {moment.caption ? <figcaption>{moment.caption}</figcaption> : null}
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
