import { PageHero, Section } from "@/components/Page";
import { CoastMap } from "@/components/CoastMap";
import { PackingList } from "@/components/PackingList";
import { WeatherPanel } from "@/components/WeatherPanel";
import { travel } from "@/content/travel";
import { visibleActivities } from "@/content/visibleActivities";

// The chart lists what happens at each place, filtered by the visitor's
// invite group, so this page is rendered per request like Activities is.
export const dynamic = "force-dynamic";

export default async function Travel() {
  const activities = await visibleActivities();

  return (
    <>
      <PageHero
        kicker="The journey"
        title="Travel well"
        intro="The windward side of Oʻahu rewards a little planning. Here is the honest version of getting there, staying nearby, and making a trip of it."
        photo="travel"
      />

      <Section title="Where everything is">
        <p className="coast-intro">
          An illustration, not a navigational chart. The coastline is drawn by feel and the distances
          are invented, so please do not use it to find your way. Choose a point to read what happens
          there.
        </p>
        <CoastMap activities={activities} />
      </Section>

      <Section title="Getting there">
        <div className="card-grid">
          {travel.gettingThere.map((item) => (
            <article className="card" key={item.title}>
              <p className="label">Plan ahead</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Where to stay">
        <div className="card-grid">
          {travel.stays.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="While you are here">
        <ul className="explore-list">
          {travel.explore.map((item, i) => (
            <li key={item}>
              <span className="explore-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Say it like a local">
        <ul className="say-it">
          {travel.sayIt.map((entry) => (
            <li key={entry.word}>
              <span className="say-word" lang="haw">
                {entry.word}
              </span>
              <span className="say-how">{entry.say}</span>
              <span className="say-means">{entry.means}</span>
            </li>
          ))}
        </ul>
        <p className="say-note">{travel.sayItNote}</p>
      </Section>

      <Section title="Weather on the day">
        <WeatherPanel />
      </Section>

      <Section title="What to pack">
        <PackingList items={travel.packing} />
      </Section>
    </>
  );
}
