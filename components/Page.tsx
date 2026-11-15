import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { PhotoBackdrop } from "./PhotoFrame";
import { Horizon, type Scene } from "./ink/Horizon";
import type { PhotoKey } from "@/content/photos";

/** Interior page banner: a band of water with the title over it. */
export function PageHero({
  kicker,
  title,
  intro,
  photo,
  scene,
}: {
  kicker: string;
  title: string;
  intro: string;
  photo: PhotoKey;
  /** Which stretch of the drawn coast closes the banner. */
  scene: Scene;
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
      <Horizon scene={scene} />
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
