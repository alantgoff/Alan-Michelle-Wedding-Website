import { PageHero } from "@/components/Page";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { story } from "@/content/story";

/**
 * Our Story, on a spine.
 *
 * Each moment is its own stretch of the page. Its date sits on a rail to the
 * left and stays pinned while the moment scrolls past, then hands off to the
 * next one — so the year you are reading is always beside you. No script:
 * the rail marker is simply position: sticky inside its own section.
 */
export default function Story() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="The road here"
        intro="A few moments from the story that brought us to this island, and to all of you."
        photo="story"
      />
      <div className="story-spine">
        {story.map((moment, i) => (
          <section className="story-moment" key={moment.title} aria-labelledby={`story-${i}`}>
            <div className="story-rail">
              <div className="story-marker">
                <span className="story-marker-when">{moment.date}</span>
                <span className="story-marker-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="story-track">
              <Reveal>
                <div className="story-body">
                  <h2 id={`story-${i}`}>{moment.title}</h2>
                  <p>{moment.text}</p>
                  {moment.photo ? (
                    <PhotoFrame name={moment.photo} shape="portrait" sizes="(max-width: 820px) 100vw, 420px" />
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
            <p className="story-close">
              Which brings us to a lawn at the foot of the Koʻolau, and to you. Thank you for coming
              this far with us.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
