import Link from "next/link";
import { cookies } from "next/headers";
import { Countdown } from "@/components/Countdown";
import { NowAtKualoa } from "@/components/NowAtKualoa";
import { PhotoBackdrop } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { Tide } from "@/components/Tide";
import { site } from "@/content/site";
import { groupBySlug, COOKIE } from "@/content/groups";
import type { PhotoKey } from "@/content/photos";
import { hawaiiClock, hawaiiNoon, sunTimes } from "@/lib/sun";

// Greets guests by their invite group, so it reads the cookie per request.
export const dynamic = "force-dynamic";

// Each card previews the photo from the page it links to.
const cardPhoto: Record<string, PhotoKey> = {
  travel: "travel",
  activities: "activities",
  story: "story",
  "dress-code": "dressCode",
  faq: "faq",
  registry: "registry",
};

/** Sunset at the venue on the wedding day, from the date in content/site.ts. */
function weddingSunset() {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  return hawaiiClock(sunTimes(hawaiiNoon(year, month, day), site.coordinates.lat, site.coordinates.lng).sunset);
}

export default async function Home() {
  const group = groupBySlug((await cookies()).get(COOKIE)?.value);
  const sunset = weddingSunset();

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <PhotoBackdrop name="hero" priority />
        </div>
        <div className="hero-copy">
          {group ? <p className="hero-aloha">Aloha, {group.name.toLowerCase()}</p> : null}
          <p className="kicker">Where the mountains meet the sea</p>
          <h1>
            Alan
            <br />& Michelle
          </h1>
          <p className="tagline">{site.tagline}</p>
          <div className="hero-meta">
            <span>{site.weddingDate}</span>
            <span>{site.location}</span>
          </div>
        </div>
      </section>

      <section className="facts">
        <div>
          <Countdown target={site.isoDate} />
          <NowAtKualoa />
        </div>
        <div>
          <p className="kicker">The celebration</p>
          <h2>Pālikū Gardens</h2>
          <dl>
            <dt>When</dt>
            <dd>
              {site.weddingDate}
              <br />
              {site.ceremonyTime}
            </dd>
            <dt>Where</dt>
            <dd>
              {site.venue}
              <br />
              {site.location}
            </dd>
            <dt>Sunset</dt>
            <dd>
              About {sunset}
              <br />
              <span className="aside">It slips behind the Koʻolau a little before that.</span>
            </dd>
          </dl>
          <div className="facts-actions">
            <a className="button" href={site.mapUrl}>
              View map
            </a>
            <a className="button button-quiet" href="/wedding.ics" download>
              Add to calendar
            </a>
          </div>
        </div>
      </section>

      <Tide />

      <section className="welcome">
        <div className="welcome-media">
          <PhotoBackdrop name="welcome" />
        </div>
        <p>{site.welcome}</p>
      </section>

      <Reveal>
        <div className="link-grid">
          {site.nav
            .filter((item) => item.href)
            .map((item, i) => (
              <Link className="link-card" href={`/${item.href}`} key={item.href}>
                <div className="card-media">
                  <PhotoBackdrop name={cardPhoto[item.href] ?? "card"} />
                </div>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.label}</h3>
                <span className="go">Explore →</span>
              </Link>
            ))}
        </div>
      </Reveal>
    </>
  );
}
