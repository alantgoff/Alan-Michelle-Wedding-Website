import type { MetadataRoute } from "next";

/**
 * Crawlers are let in so they can read the "noindex" that every page and
 * every response header carries (see next.config.ts and app/layout.tsx).
 * Shutting them out here would hide that instruction, and a URL linked from
 * somewhere public could then still be listed in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
