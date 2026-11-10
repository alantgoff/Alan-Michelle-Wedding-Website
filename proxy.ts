import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, cookieOptions, cookieValue, groupsFromCookie } from "@/content/groups";

/**
 * Keeps a guest's invite alive until the wedding.
 *
 * Browsers cap a cookie at 400 days and the wedding is further off than
 * that, so every page visit renews it. Slugs that are no longer valid (a
 * group whose link was changed) drop out as it is rewritten.
 */
export function proxy(req: NextRequest) {
  const response = NextResponse.next();
  const raw = req.cookies.get(COOKIE)?.value;
  if (raw === undefined) return response;

  const held = groupsFromCookie(raw);
  if (held.length) response.cookies.set(COOKIE, cookieValue(held), cookieOptions);
  else response.cookies.delete(COOKIE);
  return response;
}

// Pages only: not invite links (they set the cookie themselves), Next's own
// files, or anything with a file extension.
export const config = { matcher: ["/((?!i/|_next/|.*\\..*).*)"] };
