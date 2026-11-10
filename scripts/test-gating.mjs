/**
 * Privacy test for the invite-link gating.
 *
 * Asserts that the raw HTML of /activities and of the home page contains ONLY
 * the open events plus the private events of the groups the cookie holds.
 * Run against a running server: `npm start` in one shell, `npm run test:gating`
 * in another. Keep the slugs below in step with content/groups.ts.
 */
const base = process.env.BASE_URL || "http://localhost:3000";

const privateEvents = {
  family: "Family dinner",
  college: "College crew ridge hike",
  "wedding-party": "Wedding party rehearsal",
};
const slugs = { family: "family-2a6u46wevkmc", college: "college-4uwudjry68or", "wedding-party": "party-4ln6lu72u2wd" };
const all = Object.values(privateEvents);
const pages = ["/activities", "/"];

// /activities lists every event the visitor may see. The home page names only
// the earliest of the visitor's own events, so there the rule is one-sided:
// nothing outside their groups may appear.
function check(html, allowed, context) {
  const listsAll = context.includes("/activities");
  for (const event of all) {
    const present = html.includes(event);
    const shouldBePresent = allowed.includes(event);
    if (present && !shouldBePresent) throw new Error(`${context}: "${event}" leaked to a visitor who may not see it`);
    if (listsAll && present !== shouldBePresent) {
      throw new Error(
        `${context}: "${event}" was ${present ? "visible" : "missing"} but should have been ${shouldBePresent ? "visible" : "hidden"}`,
      );
    }
  }
  // The "Just for ..." mark only ever appears beside the visitor's own events.
  // Count rendered marks (the streamed payload repeats text, not markup), and
  // separately make sure no label text at all reaches an untagged visitor.
  if (context.includes("/activities")) {
    const marks = (html.match(/class="activity-for"/g) || []).length;
    if (marks !== allowed.length) throw new Error(`${context}: ${marks} "Just for" marks, expected ${allowed.length}`);
    if (!allowed.length && /Just for (family|the college crew|the wedding party)/.test(html)) {
      throw new Error(`${context}: a "Just for" label reached a visitor with no invite`);
    }
  }
}

async function html(path, cookie) {
  return (await fetch(`${base}${path}`, { headers: cookie ? { cookie } : {} })).text();
}

// 1. No cookie at all: open events only.
for (const page of pages) check(await html(page), [], `untagged visitor ${page}`);

// 2. Each invite link grants exactly its own group's event.
let held = "";
for (const [group, slug] of Object.entries(slugs)) {
  const redirect = await fetch(`${base}/i/${slug}`, { redirect: "manual" });
  const cookie = redirect.headers.get("set-cookie")?.split(";")[0];
  if (!cookie) throw new Error(`${group}: invite link set no cookie`);
  for (const page of pages) check(await html(page, cookie), [privateEvents[group]], `${group} ${page}`);
  if (!(await html("/", cookie)).includes(privateEvents[group])) {
    throw new Error(`${group} /: the hero should name the group's own gathering`);
  }

  // 3. Opening a second link keeps the first: links accumulate.
  const stacked = await fetch(`${base}/i/${slug}`, { redirect: "manual", headers: held ? { cookie: held } : {} });
  held = stacked.headers.get("set-cookie")?.split(";")[0] ?? held;
}
const everyone = Object.values(privateEvents);
for (const page of pages) check(await html(page, held), everyone, `all three links ${page}`);
// With every group held, the hero names the earliest: Thursday's family dinner.
if (!(await html("/", held)).includes(privateEvents.family)) throw new Error("all three links /: expected the family dinner");

// 4. Guessable or forged cookies grant nothing, alone or mixed into a real one.
for (const group of Object.keys(privateEvents)) {
  for (const page of pages) {
    check(await html(page, `wedding_group=${group}`), [], `forged cookie "${group}" ${page}`);
    check(
      await html(page, `wedding_group=${slugs.family}.${group}`),
      [privateEvents.family],
      `family plus forged "${group}" ${page}`,
    );
  }
}

console.log("PASS: open events visible to all, private events only via valid invite slugs, links accumulate.");
