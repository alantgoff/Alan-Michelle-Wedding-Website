import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { PhotoBackdrop } from "./PhotoFrame";
import type { PhotoKey } from "@/content/photos";

/** Interior page banner: a band of water with the title over it. */
export function PageHero({
  kicker,
  title,
  intro,
  photo,
}: {
  kicker: string;
  title: string;
  intro: string;
  photo: PhotoKey;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-media">
        <PhotoBackdrop name={photo} priority />
      </div>
      <div>
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <section className={`section ${className}`}>
        {title ? <h2>{title}</h2> : null}
        {children}
      </section>
    </Reveal>
  );
}
