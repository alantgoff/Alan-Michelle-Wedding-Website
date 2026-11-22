import { picks } from "@/content/picks";
import { Seal } from "./Seal";

/** "Our picks", with the seal, and an optional line under it. */
export function OurPicks({ label = picks.label, line }: { label?: string; line?: string }) {
  return (
    <div className="our-picks">
      <p className="our-picks-label">
        <Seal />
        {label}
      </p>
      {line ? <p className="our-picks-line">{line}</p> : null}
    </div>
  );
}
