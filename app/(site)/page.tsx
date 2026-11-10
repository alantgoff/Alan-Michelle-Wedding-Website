import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { Logo } from "@/components/Logo";
import { NowAtKualoa } from "@/components/NowAtKualoa";
import { PhotoBackdrop } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { PlumeriaBurst } from "@/components/PlumeriaBurst";
import { Tide } from "@/components/Tide";
import { WelcomeCurtain } from "@/components/WelcomeCurtain";
import { site } from "@/content/site";
import type { PhotoKey } from "@/content/photos";
import { heldGroups, ownEvents } from "@/content/visibleActivities";
import { hawaiiClock, hawaiiNoon, sunTimes } from "@/lib/sun";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

// Greets guests by their invite group, so it reads the cookie per request.
// Arriving from an invite link adds ?aloha, which plays the welcome card once.
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

const EARLY = ["", "a day", "two days", "three days"];

/** "family", "family & wedding party", "college friends, family & wedding party". */
function together(names: string[]) {
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** Sunset at the venue on the wedding day, from the date in content/site.ts. */
function weddingSunset() {
  const [year, month, day] = site.isoDate.slice(0, 10).split("-").map(Number);
  return hawaiiClock(sunTimes(hawaiiNoon(year, month, day), site.coordinates.lat, site.coordinates.lng).sunset);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [held, own] = await Promise.all([heldGroups(), ownEvents()]);
  const arriving = held.length > 0 && "aloha" in (await searchParams);
  const greeting = held.length ? `Aloha, ${together(held.map((g) => g.name.toLowerCase()))}` : null;
  const sunset = weddingSunset();

  // The guest's own first gathering, named in the hero. Only events of groups
  // this visitor's invite links unlocked are read, so nobody else's plans can
  // appear. Locations are left out: several are still placeholders.
  const first = own[0];
  const firstWhen = first ? weekendDay(first.date) : null;
  const firstEarly = first ? -(offsetFromWedding(first.date) ?? 0) : 0;
  const firstLine = first
    ? `${firstEarly > 0 ? `Your weekend begins ${EARLY[firstEarly]} early:` : "Just for you:"} ${first.title}, ${
        firstWhen ? firstWhen.label : first.date
      }${Number.isFinite(minutesOf(first.time)) ? `, at ${first.time}` : ""}.`
    : null;

  return (
    <>
      {arriving && greeting ? <WelcomeCurtain greeting={greeting} /> : null}

      <section className="hero">
        <div className="hero-media">
          <PhotoBackdrop name="hero" priority />
        </div>
        <div className="hero-copy">
          <PlumeriaBurst className="hero-mark">
            <Logo className="hero-logo" sizes="(max-width: 820px) 110px, 160px" priority />
          </PlumeriaBurst>
          {greeting ? <p className="hero-aloha">{greeting}</p> : null}
          {first && firstLine ? (
            <p className="hero-first">
              {/* A plain link on purpose: only a real page load sets :target,
                  which is what makes the event glow when the guest lands on it. */}
              <a href={`/activities#${anchorFor(first.title)}`}>{firstLine}</a>
            </p>
          ) : null}
          <h1>
            Alan
            <br />& Michelle
          </h1>
          <p className="tagline">{site.tagline}</p>
          <div className="hero-meta">
            <span>{site.weddingDate}</span>
            <span>{site.location}</span>
            {held.length > 0 && !first ? (
              <Link className="hero-weekend" href="/activities">
                See your weekend →
              </Link>
            ) : null}
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
