import Image from "next/image";
import type { Place, Spot, Weekday } from "@/content/island";
import { spotPhotos, type SpotPhoto } from "@/content/photos";
import { IslandDot } from "./IslandDot";
import { SaveToggle, type MyWeekWords } from "./MyWeek";

const WEEKDAY_NUMBER: Record<Weekday, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** A place's open days as weekday numbers (0 = Sunday), or null when its hours aren't known. */
export function openNumbers(p: Place): number[] | null {
  return p.open ? p.open.map((d) => WEEKDAY_NUMBER[d]) : null;
}

/** "Helena’s Hawaiian Food" → "helenas-hawaiian-food", for the anchor My week links to. */
export function placeId(p: Place): string {
  return (
    p.id ??
    p.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f\u02bb\u2019']/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/**
 * Restaurants, one compact row each: name, where, what to order, when,
 * booking, and a Save button for My week. `data-open` lists the weekdays it
 * opens, for the "Open on…" filter; the closed line shows only when the filter
 * fades the place.
 */
export function Places({
  places,
  labels,
  save,
}: {
  places: readonly Place[];
  labels: { order: string; closed: string };
  save: Pick<MyWeekWords, "save" | "saved" | "saveLabel">;
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
            <SaveToggle item={{ id: placeId(p), name: p.name, note: p.area }} words={save} />
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
