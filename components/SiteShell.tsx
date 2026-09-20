"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/content/site";

/** Sticky header, page body, footer. The header marks the current page. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="nav">
        <Link className="mark" href="/">
          {site.couple}
        </Link>
        <nav aria-label="Sections">
          {site.nav.map((item) => {
            const href = item.href ? `/${item.href}` : "/";
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
