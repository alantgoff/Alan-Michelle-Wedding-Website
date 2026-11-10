/**
 * Guest groups and their private invite links.
 *
 * Send each group its own link, e.g. https://your-site.com/i/family-2a6u46wevkmc
 * Opening it once remembers that guest on their device; they then see their
 * group's events on the Activities page alongside the open ones. A guest sent
 * two links (a sister who is also a bridesmaid) keeps both.
 *
 * The random suffix on each slug is the security. Twelve random characters
 * is far too many to guess by trying links, but treat a slug like a password:
 * anyone who has it can see that group's events, and this file is readable
 * by anyone who can read the repository. To revoke a group, change its slug
 * here and send out the new link.
 *
 * `forYou` is the small line shown above a group's own events.
 */

export const groups = [
  { id: "college" as const, name: "College friends", slug: "college-4uwudjry68or", forYou: "Just for the college crew" },
  { id: "family" as const, name: "Family", slug: "family-2a6u46wevkmc", forYou: "Just for family" },
  { id: "wedding-party" as const, name: "Wedding party", slug: "party-4ln6lu72u2wd", forYou: "Just for the wedding party" },
];

export type Group = (typeof groups)[number];
export type GroupId = Group["id"];

/** Cookie that remembers a guest's invite slugs, joined with ".". */
export const COOKIE = "wedding_group";

/**
 * Browsers cap a cookie's life at 400 days, and the wedding is further away
 * than that, so proxy.ts renews it every time a guest comes back.
 */
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 400,
  path: "/",
};

/** Resolve a slug to its group. Unknown slugs return undefined. */
export function groupBySlug(slug: string | undefined) {
  return slug ? groups.find((g) => g.slug === slug) : undefined;
}

/** Every valid group named in the cookie, newest first, without repeats. */
export function groupsFromCookie(value: string | undefined): Group[] {
  const held: Group[] = [];
  for (const slug of (value ?? "").split(".")) {
    const group = groupBySlug(slug);
    if (group && !held.includes(group)) held.push(group);
  }
  return held;
}

/** The cookie value for a set of groups. */
export function cookieValue(held: Group[]): string {
  return held.map((g) => g.slug).join(".");
}
