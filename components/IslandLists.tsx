import Image from "next/image";
import type { Place, Spot } from "@/content/island";
import { spotPhotos, type SpotPhoto } from "@/content/photos";

/** Restaurants, one compact row each: name, where, what to order, when, booking. */
export function Places({ places, labels }: { places: readonly Place[]; labels: { order: string; book: string } }) {
  return (
    <ul className="places">
      {places.map((p) => (
        <li className="place" key={p.name} id={p.id}>
          <p className="place-head">
            {p.href ? (
              <a className="place-name" href={p.href} target="_blank" rel="noreferrer">
                {p.name}
              </a>
            ) : (
              <span className="place-name">{p.name}</span>
            )}
            <span className="place-meta">
              {p.area}
              {p.price ? ` · ${p.price}` : ""}
            </span>
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
