import { PageHero, Section } from "@/components/Page";
import { PhotoFrame } from "@/components/PhotoFrame";
import { story } from "@/content/story";

export default function Story() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="The road here"
        intro="A few moments from the story that brought us to this island, and to all of you."
        photo="story"
      />
      <Section>
        <div className="timeline">
          {story.map((moment) => (
            <article className="moment" key={moment.title}>
              <span className="when">{moment.date}</span>
              <div>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
                {moment.photo ? (
                  <PhotoFrame
                    name={moment.photo}
                    shape="portrait"
                    sizes="(max-width: 820px) 100vw, 420px"
                  />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
