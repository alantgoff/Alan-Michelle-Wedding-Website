import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { PhotoBackdrop } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <PhotoBackdrop name="hero" priority />
        </div>
        <div className="hero-copy">
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
        <Countdown target={site.isoDate} />
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
          </dl>
          <a className="button" href={site.mapUrl}>
            View map
          </a>
        </div>
      </section>

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
                  <PhotoBackdrop name="card" />
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
