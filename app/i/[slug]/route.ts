import { NextRequest, NextResponse } from "next/server";
import { COOKIE, cookieOptions, cookieValue, groupBySlug, groupsFromCookie } from "@/content/groups";

/**
 * Invite links. Opening /i/<slug> remembers the guest's group on this device.
 *
 * The cookie stores SLUGS, not group ids. That matters: a slug is long and
 * random, so forging the cookie by hand is exactly as hard as guessing
 * someone's invite URL. Storing a guessable id like "family" would let any
 * guest unlock another group's events from their browser's cookie editor.
 *
 * A second invite link adds to the first rather than replacing it.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "reset") {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete(COOKIE);
    return response;
  }

  // A real invite lands on the home page with ?aloha, which plays the welcome
  // card once. An unknown slug lands there too, quietly, with nothing set.
  const group = groupBySlug(slug);
  const response = NextResponse.redirect(new URL(group ? "/?aloha" : "/", req.url));
  if (group) {
    const others = groupsFromCookie(req.cookies.get(COOKIE)?.value).filter((g) => g !== group);
    response.cookies.set(COOKIE, cookieValue([group, ...others]), cookieOptions);
  }
  return response;
}
