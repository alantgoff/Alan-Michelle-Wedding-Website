/**
 * Privacy test for the invite-link gating.
 *
 * Asserts that the raw HTML of /week, /travel and the home page contains
 * ONLY the open events plus the private events of the groups the cookie holds.
 * Run against a running server: `npm start` in one shell, `npm run test:gating`
 * in another. Keep the slugs below in step with content/groups.ts.
 */
const base = process.env.BASE_URL || "http://localhost:3000";

const privateEvents = {
  family: "Family dinner",
  college: "Friends’ ridge hike",
  "wedding-party": "Wedding party rehearsal",
};
const slugs = { family: "family-2a6u46wevkmc", college: "college-4uwudjry68or", "wedding-party": "party-4ln6lu72u2wd" };
const all = Object.values(privateEvents);
const pages = ["/week", "/travel", "/"];

// /week lists every event the visitor may see. The home page names only
// the earliest of the visitor's own events, and the Travel chart only those
// tied to a place on it, so there the rule is one-sided: nothing outside the
// visitor's groups may appear.
function check(html, allowed, context) {
  const listsAll = context.includes("/week");
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
  if (context.includes("/week")) {
    const marks = (html.match(/class="activity-for"/g) || []).length;
    if (marks !== allowed.length) throw new Error(`${context}: ${marks} "Just for" marks, expected ${allowed.length}`);
    if (!allowed.length && /Just for (family|our college and high school friends|the wedding party)/.test(html)) {
      throw new Error(`${context}: a "Just for" label reached a visitor with no invite`);
    }
  }
}

async function html(path, cookie) {
  return (await fetch(`${base}${path}`, { headers: cookie ? { cookie } : {} })).text();
}

// 0. The page's old address still lands on it.
const old = await fetch(`${base}/activities`, { redirect: "manual" });
if (old.status !== 308 || !old.headers.get("location")?.endsWith("/week")) {
  throw new Error(`/activities should redirect permanently to /week, got ${old.status} ${old.headers.get("location")}`);
}
const older = await fetch(`${base}/weekend`, { redirect: "manual" });
if (older.status !== 308 || !older.headers.get("location")?.endsWith("/week")) {
  throw new Error(`/weekend should redirect permanently to /week, got ${older.status} ${older.headers.get("location")}`);
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

// 5. The friends' boat vote is shown, and takes votes, only with that group's own link.
const voteTitle = "Help choose our boat day";
const cookieFor = async (slug) =>
  (await fetch(`${base}/i/${slug}`, { redirect: "manual" })).headers.get("set-cookie").split(";")[0];
const vote = (cookie) =>
  fetch(`${base}/api/boat-vote`, {
    method: "POST",
    headers: cookie ? { cookie } : {},
    body: new URLSearchParams({ name: "Test", option: "none" }),
    redirect: "manual",
  });
for (const [who, cookie] of [
  ["untagged", null],
  ["family", await cookieFor(slugs.family)],
  ["wedding party", await cookieFor(slugs["wedding-party"])],
  ["forged", "wedding_group=college"],
]) {
  if ((await html("/week", cookie)).includes(voteTitle)) throw new Error(`${who}: saw the friends' boat vote`);
  const res = await vote(cookie);
  if (res.status !== 404) throw new Error(`${who}: the vote answered ${res.status}, expected 404`);
}
const friends = await cookieFor(slugs.college);
if (!(await html("/week", friends)).includes(voteTitle)) throw new Error("college: the boat vote is missing");
if ((await vote(friends)).status !== 303) throw new Error("college: a vote should be answered with a redirect back");

console.log("PASS: open events visible to all, private events only via valid invite slugs, links accumulate, the boat vote only for its group.");
