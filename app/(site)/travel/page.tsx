import { PageHero, Section } from "@/components/Page";
import { travel } from "@/content/travel";

export default function Travel() {
  return (
    <>
      <PageHero
        kicker="The journey"
        title="Travel well"
        intro="The windward side of Oʻahu rewards a little planning. Here is the honest version of getting there, staying nearby, and making a trip of it."
        photo="travel"
      />
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
        <div className="card">
          <ul>
            {travel.explore.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
