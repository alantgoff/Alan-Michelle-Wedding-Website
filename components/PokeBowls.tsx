import { POKE_ART, type PokeKind } from "./poke-art";
import { IslandDot } from "./IslandDot";
import { picks } from "@/content/picks";
import { OurPicks } from "./OurPicks";
import { AddToWeek } from "./WeekPlanner";
import type { PointKey } from "@/lib/island";

/** Sixteen ticks round the rim, like the brushed band on a rice bowl. */
const RIM = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return `M${(60 + c * 49.5).toFixed(1)} ${(60 + s * 49.5).toFixed(1)} L${(60 + c * 53.5).toFixed(1)} ${(60 + s * 53.5).toFixed(1)}`;
}).join(" ");

/** One bowl, seen from above, in the site's ink with a little colour. Decorative. */
function Bowl({ kind }: { kind: PokeKind }) {
  const a: Record<string, string | boolean> = POKE_ART[kind];
  const p = (key: string, className: string) => (typeof a[key] === "string" ? <path className={className} d={a[key] as string} /> : null);
  return (
    <svg className="poke-art" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle className="poke-bowl" cx="60" cy="60" r="56" />
      <path className="poke-shade" d="M104 60 A44 44 0 0 1 16 60 A46 40 0 0 0 104 60 Z" />
      {a.sauce ? <circle className={a.sauce === "hot" ? "poke-sauce poke-sauce-hot" : "poke-sauce"} cx="60" cy="60" r="41" /> : null}
      {p("cubes", kind === "spicy" ? "poke-cubes poke-cubes-spicy" : "poke-cubes")}
      {p("tako", "poke-tako")}
      {p("cups", "poke-cups")}
      {p("sheen", "poke-sheen")}
      {p("drizzle", "poke-drizzle")}
      {p("limu", "poke-limu")}
      {p("onion", "poke-onion")}
      {p("chili", "poke-chili")}
      {p("chiliSeeds", "poke-chili-seeds")}
      {p("inamona", "poke-inamona")}
      {p("salt", "poke-salt")}
      {p("masago", "poke-masago")}
      {p("sesame", "poke-sesame")}
      {p("green", "poke-green")}
      <g filter="url(#ink)">
        <circle className="poke-rim" cx="60" cy="60" r="56" />
        <circle className="poke-rim-in" cx="60" cy="60" r="47" />
        <path className="poke-rim-ticks" d={RIM} />
      </g>
    </svg>
  );
}

type Poke = {
  title: string;
  short: string;
  lede: string;
  store: { id: string; name: string; area: string; at: PointKey; hours: string; href: string };
  also: string;
  tip: string;
  kinds: readonly { id: PokeKind; name: string; what: string }[];
};

/** The poke section on The island: where to buy it, then a drawing of each kind. */
export function PokeBowls({ poke }: { poke: Poke }) {
  return (
    <section className="poke" aria-labelledby="poke-title">
      <OurPicks label={picks.poke} />
      <h3 id="poke-title">{poke.title}</h3>
      <p className="poke-lede">{poke.lede}</p>
      <div className="poke-store" id={poke.store.id}>
        <p className="place-head">
          <a className="place-name" href={poke.store.href} target="_blank" rel="noreferrer">
            {poke.store.name}
          </a>
          <span className="place-meta">
            <IslandDot at={poke.store.at} label={poke.store.area} />
          </span>
          <AddToWeek id={poke.store.id} />
        </p>
        <p className="place-when">
          {poke.store.hours} · {poke.also}
        </p>
      </div>
      <ul className="poke-kinds">
        {poke.kinds.map((k) => (
          <li key={k.id}>
            <Bowl kind={k.id} />
            <div>
              <h4>{k.name}</h4>
              <p>{k.what}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="poke-tip">{poke.tip}</p>
    </section>
  );
}
