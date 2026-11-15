import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Page";
import { Postmark, Stamp } from "@/components/Stationery";
import { registries } from "@/content/registry";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Registry" };

/** "KUALOA · OʻAHU" and "6 OCT 2028", from the place and date in content/site.ts. */
const PLACE = site.location.replace(", ", " · ").toUpperCase();
const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
  .format(new Date(`${site.isoDate.slice(0, 10)}T00:00:00Z`))
  .toUpperCase();

export default function Registry() {
  return (
    <>
      <PageHero
        kicker="Gifts"
        title="Registry"
        intro="Flying to an island in the middle of the Pacific is a generous gift on its own. If you would like to do something more, these are the places we are registered."
        photo="registry"
        scene="registry"
      />
      <Section>
        <div className="postcards">
          {registries.map((registry, i) => (
            <article className="postcard" key={registry.name} style={{ rotate: i % 2 ? "0.5deg" : "-0.5deg" }}>
              <div className="postcard-message">
                <p>{registry.text}</p>
              </div>
              <div className="postcard-address">
                <Stamp word={registry.stamp} />
                <Postmark id={`postmark-${i}`} place={PLACE} date={DATE} turn={i % 2 ? 9 : -12} />
                <p className="label">{registry.label}</p>
                <h2>{registry.name}</h2>
                <p className="postcard-rule" aria-hidden="true" />
                <p className="postcard-rule" aria-hidden="true" />
                {registry.url && registry.url !== "#" ? (
                  <a className="button" href={registry.url}>
                    Open
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
