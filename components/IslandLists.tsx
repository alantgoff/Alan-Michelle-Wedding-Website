import Image from "next/image";
import type { Place, Spot } from "@/content/island";
import { spotPhotos, type SpotPhoto } from "@/content/photos";
import { openNumbers, placeId } from "@/lib/plannable";
import { IslandDot } from "./IslandDot";
import { AddToWeek } from "./WeekPlanner";

export { openNumbers, placeId };

/**
 * Restaurants, one compact row each: name, where, what to order, when,
 * booking, and "Add to my week". `data-open` lists the weekdays it
 * opens, for the "Open on…" filter; the closed line shows only when the filter
 * fades the place.
 */
export function Places({
  places,
  labels,
}: {
  places: readonly Place[];
  labels: { order: string; closed: string };
}) {
  return (
    <ul className="places">
      {places.map((p) => (
        <li className="place" key={p.name} id={placeId(p)} data-open={openNumbers(p)?.join(" ")}>
          {p.open ? <p className="place-closed">{labels.closed}</p> : null}
          <p className="place-head">
            {p.href ? (
              <a className="place-name" href={p.href} target="_blank" rel="noreferrer">
                {p.name}
              </a>
            ) : (
              <span className="place-name">{p.name}</span>
            )}
            <span className="place-meta">
              <IslandDot at={p.at} label={p.area} />
              {p.price ? <span className="place-price">{p.price}</span> : null}
            </span>
            <AddToWeek id={placeId(p)} />
          </p>
          <p className="place-what">{p.what}</p>
          {p.order ? (
            <p className="place-order">
              <span>{labels.order}</span> {p.order}
            </p>
          ) : null}
          {p.hours || p.book ? (
            <p className="place-when">
              {p.hours}
              {p.hours && p.book ? " · " : ""}
              {p.book}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * The same restaurants as a short list, for the Utility page: name (linking to
 * its full entry on The island), where, hours, and "Add to my week". Carries the same
 * `data-open` and closed line, so the "Open on…" filter works on it too.
 */
export function PlacesCompact({
  places,
  labels,
}: {
  places: readonly Place[];
  labels: { closed: string };
}) {
  return (
    <ul className="places places-compact">
      {places.map((p) => (
        <li className="place" key={p.name} data-open={openNumbers(p)?.join(" ")}>
          {p.open ? <p className="place-closed">{labels.closed}</p> : null}
          <p className="place-head">
            <a className="place-name" href={`/island#${placeId(p)}`}>
              {p.name}
            </a>
            <span className="place-meta">
              <IslandDot at={p.at} label={p.area} />
            </span>
            <AddToWeek id={placeId(p)} />
          </p>
          {p.hours ? <p className="place-when">{p.hours}</p> : null}
        </li>
      ))}
    </ul>
  );
}

/** The best spots: a photograph each, why go, the drive, what to know, and a credit for the photo. */
export function Spots({ spots, labels }: { spots: readonly Spot[]; labels: { drive: string; more: string; photo: string } }) {
  return (
    <div className="spots">
      {spots.map((s) => {
        const photo: SpotPhoto = spotPhotos[s.photo];
        return (
          <article className="spot" key={s.id} id={s.id}>
            <figure className="spot-photo">
              <div className="spot-frame">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 640px" />
              </div>
              <figcaption>
                {labels.photo}{" "}
                <a href={photo.credit.source} target="_blank" rel="noreferrer">
                  {photo.credit.author}
                </a>
                ,{" "}
                <a href={photo.credit.licenseUrl} target="_blank" rel="noreferrer">
                  {photo.credit.license}
                </a>
              </figcaption>
            </figure>
            <div className="spot-text">
              <h3>{s.name}</h3>
              <p className="spot-why">{s.why}</p>
              <p className="spot-drive">
                <span>{labels.drive}</span> {s.drive}
              </p>
              {s.facts.length ? (
                <ul className="spot-facts">
                  {s.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              ) : null}
              {s.href ? (
                <p className="more-link">
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {labels.more} →
                  </a>
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
