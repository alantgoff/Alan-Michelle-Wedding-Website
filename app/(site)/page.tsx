import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { Horizon } from "@/components/ink/Horizon";
import { MoonGlyph } from "@/components/ink/MoonGlyph";
import { Logo } from "@/components/Logo";
import { NowAtKualoa } from "@/components/NowAtKualoa";
import { PhotoBackdrop } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { PlumeriaBurst } from "@/components/PlumeriaBurst";
import { Tide } from "@/components/Tide";
import { WelcomeCurtain } from "@/components/WelcomeCurtain";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { sky } from "@/content/sky";
import type { PhotoKey } from "@/content/photos";
import { heldGroups, ownEvents } from "@/content/visibleActivities";
import { fill } from "@/lib/fill";
import { hawaiiClock, hawaiiNoon, sunTimes } from "@/lib/sun";
import { anchorFor, minutesOf, offsetFromWedding, weekendDay } from "@/lib/weekend";

// Greets guests by their invite group, so it reads the cookie per request.
// Arriving from an invite link adds ?aloha, which plays the welcome card once.
export const dynamic = "force-dynamic";

// Each card previews the photo from the page it links to.
const cardPhoto: Record<string, PhotoKey> = {
  travel: "travel",
  weekend: "activities",
  island: "island",
  story: "story",
  "dress-code": "dressCode",
  faq: "faq",
  registry: "registry",
};

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
  const greeting = held.length ? fill(home.greeting, { groups: together(held.map((g) => g.name.toLowerCase())) }) : null;
  const sunset = weddingSunset();

  // The guest's own first gathering, named in the hero. Only events of groups
  // this visitor's invite links unlocked are read, so nobody else's plans can
  // appear. Locations are left out: several are still placeholders.
  const first = own[0];
  const firstWhen = first ? weekendDay(first.date) : null;
  const firstEarly = first ? -(offsetFromWedding(first.date) ?? 0) : 0;
  const firstLine = first
    ? `${firstEarly > 0 && home.first.early[firstEarly] ? fill(home.first.beginsEarly, { early: home.first.early[firstEarly] }) : home.first.justForYou} ${
        first.title
      }, ${firstWhen ? firstWhen.label : first.date}${
        Number.isFinite(minutesOf(first.time)) ? `, ${fill(home.first.at, { time: first.time })}` : ""
      }.`
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
              <a href={`/weekend#${anchorFor(first.title)}`}>{firstLine}</a>
            </p>
          ) : null}
          <h1>
            {home.names[0]}
            <br />
            {home.names[1]}
          </h1>
          <p className="tagline">{site.tagline}</p>
          <div className="hero-meta">
            <span>{site.weddingDate}</span>
            <span>{site.location}</span>
            {held.length > 0 && !first ? (
              <Link className="hero-weekend" href="/weekend">
                {home.seeWeekend}
              </Link>
            ) : null}
          </div>
        </div>
        <Horizon scene="home" draw />
      </section>

      {/* The four things to know first: when, where, what to book, what comes next. */}
      <section className="glance" aria-label={home.glance.label}>
        <dl>
          <div>
            <dt>{home.glance.when}</dt>
            <dd>
              {site.weddingDate}
              <span>{site.ceremonyTime}</span>
            </dd>
          </div>
          <div>
            <dt>{home.glance.where}</dt>
            <dd>
              {site.venue}
              <span>{site.location}</span>
              <Link href="/travel#shuttle">{home.glance.shuttle} →</Link>
            </dd>
          </div>
          <div>
            <dt>{home.glance.stay.label}</dt>
            <dd>
              {home.glance.stay.text}
              <Link href="/travel#stay">{home.glance.stay.link} →</Link>
            </dd>
          </div>
          <div>
            <dt>{home.glance.rsvp}</dt>
            <dd>{site.rsvp}</dd>
          </div>
        </dl>
      </section>

      <section className="facts">
        <div>
          <Countdown target={site.isoDate} />
          <NowAtKualoa />
        </div>
        <div>
          <p className="kicker">{home.facts.kicker}</p>
          <h2>{home.facts.title}</h2>
          <p className="facts-place">
            {home.facts.place} <Link href="/island#kualoa">{home.facts.placeLink}</Link>
          </p>
          <dl>
            <dt>{home.facts.sunset}</dt>
            <dd>
              {fill(home.facts.sunsetValue, { time: sunset })}
              <br />
              <span className="aside">{home.facts.ridge}</span>
            </dd>
            <dt>{home.facts.moonrise}</dt>
            <dd>
              {fill(home.facts.moonriseValue, { time: sky.moonrise })}
              <MoonGlyph lit={sky.moonLit} className="moon-glyph moon-inline" />
            </dd>
          </dl>
          <div className="facts-actions">
            <a className="button" href={site.mapUrl}>
              {home.facts.map}
            </a>
            <a className="button button-quiet" href="/wedding.ics" download>
              {home.facts.calendar}
            </a>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="night" aria-labelledby="night-title">
          <div className="night-art" aria-hidden="true">
            <MoonGlyph lit={sky.moonLit} className="moon-glyph moon-large" />
            <svg className="night-sea" viewBox="0 0 320 44" focusable="false">
              <g filter="url(#ink)">
                <path className="ink" d="M4 14 C70 12 130 16 200 13 M216 13 C250 12 290 15 316 13" />
                <path className="ink fine" d="M40 30 c12 -7 24 7 36 0 c12 -7 24 7 36 0 M190 34 c12 -7 24 7 36 0" />
              </g>
            </svg>
          </div>
          <div className="night-words">
            <p className="kicker">{home.night.kicker}</p>
            <h2 id="night-title">{sky.heading}</h2>
            <p>
              {sky.text} <Link href="/island#sky">{home.night.link}</Link>
            </p>
            <figure className="saying">
              <blockquote lang="haw">{sky.saying}</blockquote>
              <figcaption>
                <span className="saying-means">{sky.sayingMeans}</span> {sky.sayingNote}
              </figcaption>
            </figure>
          </div>
        </section>
      </Reveal>

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
                <span className="go">{home.cardGo}</span>
              </Link>
            ))}
        </div>
      </Reveal>
    </>
  );
}
