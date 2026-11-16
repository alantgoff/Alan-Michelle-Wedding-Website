import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/Page";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";

export const metadata: Metadata = { title: { absolute: site.notFound.tab } };

/** Wrong URL. Sits outside the (site) group, so it brings its own shell. */
export default function NotFound() {
  return (
    <SiteShell>
      <PageHero
        kicker={site.notFound.kicker}
        title={site.notFound.title}
        intro={site.notFound.intro}
        photo="hero"
        scene="reef"
      />
      <Section>
        <Link className="button" href="/">
          {site.notFound.back}
        </Link>
      </Section>
    </SiteShell>
  );
}
