import { PageHero, Section } from "@/components/Page";
import { registries } from "@/content/registry";

export default function Registry() {
  return (
    <>
      <PageHero
        kicker="Gifts"
        title="Registry"
        intro="Flying to an island in the middle of the Pacific is a generous gift on its own. If you would like to do something more, these are the places we are registered."
        photo="registry"
      />
      <Section>
        <div className="card-grid">
          {registries.map((registry) => (
            <div className="card" key={registry.name}>
              <p className="label">Registry</p>
              <h3>{registry.name}</h3>
              <p>{registry.text}</p>
              {registry.url && registry.url !== "#" ? (
                <a className="button" href={registry.url}>
                  Open
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
