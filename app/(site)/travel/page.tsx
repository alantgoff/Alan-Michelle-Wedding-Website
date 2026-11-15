import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Page";
import { CoastMap } from "@/components/CoastMap";
import { PackingList } from "@/components/PackingList";
import { PrintButton } from "@/components/PrintButton";
import { WeatherPanel } from "@/components/WeatherPanel";
import { travel } from "@/content/travel";
import { visibleActivities } from "@/content/visibleActivities";

// The chart lists what happens at each place, filtered by the visitor's
// invite group, so this page is rendered per request like Activities is.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Travel" };

export default async function Travel() {
  const activities = await visibleActivities();

  return (
    <>
      <PageHero
        kicker="The journey"
        title="Travel well"
        intro="The windward side of Oʻahu rewards a little planning. Here is the honest version of getting there, staying nearby, and making a trip of it."
        photo="travel"
        scene="travel"
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
          {[...travel.gettingThere, travel.crossing].map((item) => (
            <article className="card" key={item.title}>
              <p className="label">Plan ahead</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Where to stay">
        <p className="section-intro">{travel.stayIntro}</p>
        <div className="stays">
          {travel.stays.map((item) => (
            <article className="stay" key={item.id}>
              <p className="stay-minutes">
                <span className="stay-number">{item.minutes}</span>
                <span className="stay-unit">minutes to the gardens</span>
              </p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="passages stay-notes">
          {travel.stayNotes.map((note) => (
            <article className="passage" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
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
        <p className="explore-note">
          <strong>{travel.beachParking.title}.</strong> {travel.beachParking.text}
        </p>
      </Section>

      <Section title="Weather on the day">
        <WeatherPanel />
      </Section>

      <Section title="What to pack">
        <PackingList items={travel.packing} />
        <PrintButton>Print a copy for the glovebox</PrintButton>
      </Section>
    </>
  );
}
