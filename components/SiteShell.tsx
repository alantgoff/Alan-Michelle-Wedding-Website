"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/content/site";

/**
 * Sticky header, page body, footer.
 *
 * Navigation is written relative to wherever the shell is mounted. On the
 * real site that is the root, so links read /travel. Inside a design
 * exploration it is /designs/<slug>, so links stay within that design
 * instead of dropping the viewer back onto the live site.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const inDesign = pathname.match(/^\/designs\/([^/]+)/);
  const base = inDesign ? `/designs/${inDesign[1]}` : "";

  const home = base || "/";
  const hrefFor = (segment: string) => (segment ? `${base}/${segment}` : home);

  return (
    <>
      <header className="nav">
        <Link className="mark" href={home}>
          {site.couple}
        </Link>
        <nav aria-label="Sections">
          {site.nav.map((item) => {
            const href = hrefFor(item.href);
            return (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <div>
          <strong>{site.couple}</strong>
          <span>{site.weddingDate}</span>
        </div>
        <p>
          {site.venue}
          <br />
          {site.location}
        </p>
        <small>Made with love for our favorite people</small>
      </footer>
    </>
  );
}
