import { NextResponse, type NextRequest } from "next/server";
import { boatVote } from "@/content/boatVote";
import { COOKIE, groupsFromCookie } from "@/content/groups";
import { hawaiiToday } from "@/lib/sun";
import { castVote, VOTER_COOKIE, voteStoreReady } from "@/lib/voteStore";

/**
 * Records a friend's vote for the boat day, from the plain form on the
 * Week page (it works without JavaScript), then sends them back to it.
 *
 * Only a guest holding the group's invite link may vote; anyone else gets
 * the same "not found" as any unknown address, so the vote's existence is
 * never revealed.
 */

function back(req: NextRequest, status: string) {
  return NextResponse.redirect(new URL(`/week?vote=${status}#boat-vote`, req.url), 303);
}

export async function POST(req: NextRequest) {
  const held = groupsFromCookie(req.cookies.get(COOKIE)?.value);
  const origin = req.headers.get("origin");
  if (!held.some((g) => g.id === boatVote.audience) || (origin && origin !== new URL(req.url).origin)) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (boatVote.closes) {
    const { year, month, day } = hawaiiToday(new Date());
    const today = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (today > boatVote.closes) return back(req, "closed");
  }
  if (!voteStoreReady()) return back(req, "unavailable");

  const form = await req.formData().catch(() => null);
  const name = String(form?.get("name") ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 40);
  const option = String(form?.get("option") ?? "");
  if (!name) return back(req, "error-name");
  if (!boatVote.options.some((o) => o.id === option)) return back(req, "error-pick");

  try {
    await castVote({ name, option, at: new Date().toISOString() });
  } catch {
    return back(req, "unavailable");
  }

  const res = back(req, "thanks");
  res.cookies.set(VOTER_COOKIE, name, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 400,
    path: "/",
  });
  return res;
}
