import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/Page";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = { title: "Past the reef" };

/** Wrong URL. Sits outside the (site) group, so it brings its own shell. */
export default function NotFound() {
  return (
    <SiteShell>
      <PageHero
        kicker="Lost at sea"
        title="Past the reef"
        intro="There is nothing out here but open water. Whatever you were looking for is back on shore."
        photo="hero"
      />
      <Section>
        <Link className="button" href="/">
          Back to the beach
        </Link>
      </Section>
    </SiteShell>
  );
}
