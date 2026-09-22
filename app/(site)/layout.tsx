import { SiteShell } from "@/components/SiteShell";

/**
 * The site's pages, in a route group so they keep their own URLs (/travel
 * and so on) while the routes outside it — invite links, the calendar file,
 * the not-found page — stay free of this shell.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
