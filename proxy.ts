import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, cookieOptions, cookieValue, groupsFromCookie } from "@/content/groups";

/**
 * Keeps a guest's invite alive until the wedding.
 *
 * Browsers cap a cookie at 400 days and the wedding is further off than
 * that, so each visit renews it. Slugs that are no longer valid (a group
 * whose link was changed) drop out as it is rewritten.
 */
export function proxy(req: NextRequest) {
  const response = NextResponse.next();

  // Only on real page loads. Next's prefetches and client-side navigations
  // would write back the value they were sent with, undoing an invite added
  // or removed in another tab meanwhile. Next strips its own "rsc" header
  // before this runs, so ask the browser instead: a page load is a
  // "document" fetch, a prefetch is not. Browsers too old to say renew anyway.
  const dest = req.headers.get("sec-fetch-dest");
  if (dest !== null && dest !== "document") return response;

  const raw = req.cookies.get(COOKIE)?.value;
  if (raw === undefined) return response;

  const held = groupsFromCookie(raw);
  if (held.length) response.cookies.set(COOKIE, cookieValue(held), cookieOptions);
  else response.cookies.delete(COOKIE);
  return response;
}

// Only the pages that read the invite (they are sent private, never cached).
// The other pages are prerendered and cacheable, so a guest's Set-Cookie must
// never ride on them. Invite links set the cookie themselves.
export const config = { matcher: ["/", "/activities", "/travel"] };
