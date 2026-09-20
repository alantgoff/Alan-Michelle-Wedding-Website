import { SiteShell } from "@/components/SiteShell";

/**
 * The real site. A route group, so these pages keep their own URLs (/travel
 * and so on) while the design explorations under /designs sit outside this
 * layout and supply their own shell.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
