/**
 * Privacy test for the invite-link gating.
 *
 * Asserts that the raw HTML of /activities contains ONLY the open events plus
 * the one private event belonging to the cookie's group. Run against a running
 * server: `npm start` in one shell, `npm run test:gating` in another.
 */
const base = process.env.BASE_URL || "http://localhost:3000";

const privateEvents = {
  family: "Family dinner",
  college: "College crew ridge hike",
  "wedding-party": "Wedding party rehearsal",
};
const slugs = { family: "family-3f2a", college: "college-7k4m", "wedding-party": "party-9q8v" };
const all = Object.values(privateEvents);

function check(html, allowed, context) {
  for (const event of all) {
    const present = html.includes(event);
    const shouldBePresent = event === allowed;
    if (present !== shouldBePresent) {
      throw new Error(
        `${context}: "${event}" was ${present ? "visible" : "missing"} but should have been ${shouldBePresent ? "visible" : "hidden"}`,
      );
    }
  }
}

// 1. No cookie at all: open events only.
check(await (await fetch(`${base}/activities`)).text(), null, "untagged visitor");

// 2. Each invite link grants exactly its own group's event.
for (const [group, slug] of Object.entries(slugs)) {
  const redirect = await fetch(`${base}/i/${slug}`, { redirect: "manual" });
  const cookie = redirect.headers.get("set-cookie")?.split(";")[0];
  if (!cookie) throw new Error(`${group}: invite link set no cookie`);
  const html = await (await fetch(`${base}/activities`, { headers: { cookie } })).text();
  check(html, privateEvents[group], group);
}

// 3. A guessable forged cookie grants nothing.
for (const group of Object.keys(privateEvents)) {
  const html = await (
    await fetch(`${base}/activities`, { headers: { cookie: `wedding_group=${group}` } })
  ).text();
  check(html, null, `forged cookie "${group}"`);
}

console.log("PASS: open events visible to all, private events only via a valid invite slug.");
