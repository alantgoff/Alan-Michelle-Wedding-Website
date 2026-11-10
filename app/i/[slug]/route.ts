import { NextRequest, NextResponse } from "next/server";
import { groups, COOKIE } from "@/content/groups";

/**
 * Invite links. Opening /i/<slug> remembers the guest's group on this device.
 *
 * The cookie stores the SLUG, not the group id. That matters: the slug is
 * high-entropy, so forging the cookie by hand is exactly as hard as guessing
 * someone else's invite URL. Storing a guessable id like "family" would let
 * any guest unlock another group's events from their browser's cookie editor.
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
  const group = groups.find((g) => g.slug === slug);
  const response = NextResponse.redirect(new URL(group ? "/?aloha" : "/", req.url));
  if (group) {
    response.cookies.set(COOKIE, group.slug, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
  return response;
}
