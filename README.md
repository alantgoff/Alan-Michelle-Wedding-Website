# Alan & Michelle — wedding website

A photography-led site for our wedding at Palikū Gardens, Kualoa Ranch, on the windward coast of
Oʻahu. Built with Next.js and deployed on Vercel. No database, no CMS, no accounts.

## Running it locally

Node 22 and npm 10.

```
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # TypeScript, no emit
npm run test:gating  # privacy test — needs the server running
npm run screenshots  # every page at phone and desktop width
```

## Editing content

Everything a guest reads lives in `/content`: every sentence, heading, button label and menu item.
The pages and components in `app/` and `components/` only arrange it. (The one exception is the
handful of short labels drawn on the coast map, which stay with the drawing.) Start with `content/site.ts`: the wedding date there drives the countdown.

Anything not decided yet reads **"to come"** on the site, and carries a `TODO:` comment in the
content file saying what is missing. Search `content/` for `TODO` to see them all. No "TODO" ever
reaches a guest.

| File | What it holds |
| --- | --- |
| `site.ts` | Names, date, ceremony time, venue, RSVP line, welcome note, the menu, the footer, the 404 page |
| `home.ts` | The home page: hero lines, "at a glance", the countdown, the welcome card |
| `groups.ts` | Guest groups and their private invite slugs |
| `activities.ts` | The Week page: every event, who can see each one, and the page's words |
| `travel.ts` | Getting there, the three roads over the mountains, where to stay, packing, the coast map's words, the two-minute version |
| `island.ts` | The island guide: where to eat, the best spots, planning free days, the water, rules worth knowing, three facts about the venue |
| `boatVote.ts` | The friends' boat vote: the options and the words (prices as notes for you) |
| `weather.ts` | Typical early-October weather, shown until the real forecast arrives |
| `faq.ts` | Questions and answers, in groups |
| `story.ts` | Our story's chapters (titles, photos, and room for a year, a few lines and margin notes), and the closing |
| `dressCode.ts` | Dress code guidance, the palette's sample cards, the flowers guests will meet |
| `registry.ts` | One postcard per registry. Until one has a link, the page shows a single "to come" card |
| `photos.ts` | **Photo manifest — the only file that points at images**, including the Our story album |

### The pages

Home · Week · Travel · Island · Our story · Dress code · FAQ · Utility are in the menu. Registry is linked
from the footer and the FAQ until it has real links; add it back to `nav` in `site.ts` when it does.
The Week page used to be called Activities, then Weekend: `/activities` and `/weekend` still work and forward to `/week`.

Each fact lives in one place. The Week page is the only full schedule (Travel's map and the home
page point to it); Travel is getting there, staying and getting around; The island is everything
optional, the sea included. The FAQ gives the short answer and links to the full one.

## Facts, and how they were checked

The guide pages (Travel and The island) are full of facts: opening hours, laws, drive times, Hawaiian words and stories. Each one was researched and then checked a second time against
a primary source, and anything a checker could not confirm was left out. Please keep that standard:
if you are not sure of something, do not print it.

Every claim that can go out of date is marked `// VERIFY before invitations:` beside it in the
content files, with the official place to check it. `grep -rn VERIFY content` lists them all; the
checklist is in `content/README.md`. Three kinds of fact go stale:

- **Hours, prices and rules** (restaurants, parks, Hanauma Bay, hotel fees, taxes): as of late 2026.
  Read them again before the invitations go out.
- **Anything about the venue** (parking, when music ends): from Kualoa Ranch's public pages. The
  ranch coordinator's word replaces them.

## Photos

The site is photography-led: ocean images carry the home page hero, the welcome note, and the
banner on every interior page. The palette in `app/globals.css` was sampled from those photographs,
so the type and the imagery agree rather than compete. If you swap in photos with a very different
cast, resample and adjust those variables.

All images are listed in `content/photos.ts`. That is the only file that points at an image.

To change one:

1. Put the file in `public/photos/`, for example `public/photos/us-at-the-beach.jpg`.
2. Point that entry at it and write a real `alt` description of what is in the picture.
3. Commit and push.

Keep the shape noted on each entry — wide, portrait, or square — or the crop changes. Roughly
2000px on the long edge is plenty.

**Our story** is told in chapters, taken from the names of the 25 photos in `public/photos/story/`
(1. the OU trip … 14. Kauaʻi, the proposal). The photos are listed by name as `album` in
`content/photos.ts`, each with its alt text and an optional `caption`; the chapters, their titles and
which photos each one holds are in `content/story.ts`. The first photo in a chapter is its main one
and is set larger. Photos are shown at their own shape, so nothing is cropped. A year or a few lines
of story can be added to any chapter, and show only once they are there.

If an entry is ever pointed back at `public/photos/placeholder/`, those are generated water
textures rather than photographs. Add `standin: true` to such an entry and it will carry a visible
"Placeholder" label, so a guest is never shown a generated image presented as a real photo.

## The logo

`public/logo.png` is the wedding logo with its white paper removed, so it sits on any background in
its own navy ink. It appears in the navigation, at the top of the home page, at the end of Our
Story, and as a seal in the footer of every page. The browser-tab icon (`app/icon.png`), the
home-screen icon (`app/apple-icon.png`) and the link-preview card shown when someone texts or posts
a link to the site (`app/opengraph-image.png`) are all made from it.

To swap in a new version of the artwork, replace `public/logo.png` and update the width and height
in `components/Logo.tsx`. The three images in `app/` are flat files and need regenerating to match.

## Small things guests may notice

- The home page greets guests who arrived through their invite link by group, and shows the
  time and the light at the venue right now. Tapping the countdown turns days into weeks, then
  full moons.
- Sunrise and sunset come from `lib/sun.ts`, computed for the venue's coordinates in
  `content/site.ts`; the wedding-day sunset on the home page needs no editing.
- `/wedding.ics` is the "Add to calendar" file. It is an all-day event until the ceremony time is
  confirmed in `content/site.ts`.
- On a phone the menu folds behind a "Menu" button, so the header is one short row. Without
  JavaScript the links simply show.
- The packing list on Travel remembers ticks in the guest's own browser. Nothing is sent anywhere.
- Travel has a "flying from" picker: choose a city to see the miles, how far to set the watch, and
  what time the wedding-day sunset is back home. It remembers the city on that device.
- On The island, "Open on…" is a row of days from the Saturday before the wedding to the Sunday
  after: tap one and the restaurants closed that day fade, with a line saying so. It reads each
  place's `open` days in `content/island.ts`, so keep those in step with `hours`.
- The long pages (Week, Travel, The island, Our story, FAQ, Utility) have a row of their sections
  that sticks under the header as you scroll, with the one you are reading filled in; tap any to
  jump there (`components/JumpBar.tsx`). Without JavaScript the row still sticks and jumps.
- Utility gathers the useful widgets on one page: the countdown and the time at Kualoa, My week,
  "Open on…" over a short list of every restaurant, sunrise and sunset for each day of the week,
  the flying-from picker, the coast map, the weather and the packing list. They are the same
  widgets, keeping their state in the same places, so a restaurant saved, a box ticked or a city
  chosen on Utility is the same on its own page (on that device). Its words are in
  `content/utility.ts`; it is rendered per request because the map names a guest's own events.
- Wherever the site names a place (a restaurant, an event, a stay, a boat, a day out), a little
  map of Oʻahu sits beside it with a dot where it is (`components/IslandDot.tsx`). The points are
  named in `lib/island.ts`; content files pick one with `at`.
- The places on the site are our picks, and the site says so: a small ink seal (a plumeria in a
  ring, `components/Seal.tsx`) and "Our picks" head each list of places, with one line saying it
  is not a directory (`content/picks.ts`). The same seal marks the days we planned something on.
- The island opens with our picks on a drawn map (`components/PicksMap.tsx`). Choose a part of
  the island and the chart zooms to a close-up of it, a simple drawing of that stretch (Waikīkī
  between the Ala Wai and the sea, Kapahulu Avenue, Lēʻahi...) with each pick a numbered pin. The
  list beside it (below it on a phone) scrolls on its own, so the map stays in view: tap a pin and
  the list brings up its card; point at a card and its pin lights. "Whole island" goes back to the
  overview, with the main roads and each part a pin. "Open on…" fades the pins and cards closed on
  the day you pick. The close-ups are drawn in `components/region-maps.ts` and rendered by
  `components/RegionChart.tsx`: flat water with a lighter band of shallows, roads by kind
  (`highway`, `major`, `street`, `trail`) with their names written along them, landmarks as small
  icons (`components/map-icons.ts`), neighborhood and water names, and `spots` placing each pick
  by its id (a pick without a spot sits at its neighborhood). Positions are stylized, not to
  scale. A road's path must run left to right (or top to bottom) so its name reads upright; on a
  phone the road and landmark names hide and the neighborhood names grow. A Map/List switch shows the full list instead (`components/IslandViews.tsx`); the
  choice is remembered, links into the list (like `/island#hanauma`) switch to it, and without
  JavaScript the list is all there is. The parts are `explorer.regions` in `content/island.ts`;
  a place joins a part by its `at` point. The chart is the same drawing as Travel's coast map
  (`components/IslandChart.tsx`).
- The island has a poke section for Foodland's counter, with a drawing of each kind
  (`components/PokeBowls.tsx`; the drawings' path data is in `components/poke-art.ts`).
- My week is planned by the day. "Add to my week" on any restaurant, day out or Foodland asks
  which day (Sat Sep 30 to Sun Oct 8), with the days the place is closed greyed out; after that
  the button shows the day. The Week page is the planner: every one of the nine days, each with
  our events, the guest's own plans (move to another day, remove, or "Add a plan" from a list
  that greys out what's closed that day) and a note or two about the island that day. The Island
  and Utility pages show the week as a strip of days with a dot per plan. Plans live in the
  guest's browser only (localStorage); anything saved before plans had days waits under "Not on
  a day yet". Code: `components/WeekPlanner.tsx`, `lib/myWeek.ts`; the days come from
  `lib/week.ts` and what can be planned from `lib/plannable.ts`.
- The kōlea on The island walks a few steps when tapped, and stays still for anyone who has asked
  their device for reduced motion.
- A wrong URL lands on a "past the reef" page rather than a bare 404.
- Opening an invite link plays a short welcome: the logo rises out of its own waves, greets the
  guest's group by name, and lifts away to the home page. It plays once, a tap skips it, and anyone
  who has asked their device for reduced motion goes straight to the page.
- Tapping the logo at the top of the home page scatters plumeria down the screen.
- On the Week page, the days we planned something on carry our seal: in the week strip at the top
  (with a pressed plumeria if it is just for the guest's group), in the "Day by day" row, and as
  a lagoon edge and "Planned by us" on the day itself. The marks come only from the events that
  guest may see (`lib/ours.ts`), and `npm run test:gating` checks it.
- The Week page shows all nine days of the week we suggest, each with its real date and that
  evening's sunset, and lists our events in time order; events with no day yet sit under "Dates
  to come" at the end.
- Every page banner closes with a drawing in the logo's navy line (`components/ink/`), and each
  page's drawing is about that page: the venue on Home; a beach umbrella, the snorkel charter and a
  honu on Week; a plane coming in over Waikīkī and Diamond Head on Travel; a waterfall, palms, a
  kayak and the Mokulua on The island; the road here (Vermont, Yosemite, Bali, Iceland, Japan,
  Guatemala, Kauaʻi) with a dotted route to the two boards on Our story; an aloha shirt, a sundress
  and a hat on the line on Dress code; a lifeguard tower and a signpost on FAQ; a mailbox on
  Registry; and a message in a bottle past the reef on the 404 page. Each scene is a list of motifs
  in `components/ink/Horizon.tsx`, with its own phone layout; the motifs are in `InkDefs.tsx`.
  The banner photograph drifts very slowly, with pools of sunlight that come and go. The
  drawings are engraved by hand in SVG: hatched shade on the ridges, a far range behind, trees and
  stipple at the foot. The coast map on Travel draws both ranges as hachured relief, and the three
  road crossings show their tunnels. The fine detail (hatching, stipple) was generated once and
  pasted in as path data, so nothing is computed when a page loads.
- Our story is set like a small book: fourteen chapters on a spine, each with its photographs mounted
  as plates with paper corners. Add `text` to a chapter in `content/story.ts` and it opens with a drop cap; add
  `notes` and they appear in the margin, initialled, one voice each.
- Dress code shows the palette as pinked cloth samples and has a plumeria that moves from ear to ear.
- Each registry is a postcard, postmarked Kualoa on the wedding day.

## The weather panel

Travel carries a weather panel that changes itself. Until the wedding is about two weeks out it
shows what early October typically does on the windward coast, from `content/weather.ts`. Inside
that window it shows the real forecast for the day, fetched hourly from Open-Meteo — a free
service that needs no API key, so there is nothing to configure or keep secret. If the fetch fails
for any reason, the typical panel simply stays up and no guest sees an error.

Nothing has to be switched on closer to the date, and nothing has to be taken down afterwards.

## Invite links

Optional group activities are scoped to guest groups. Each group has its own link,
`https://<your-site>/i/<slug>`, with the slugs kept in `content/groups.ts`. `/i/reset` clears a
device's invites (useful for testing).

Opening a link once stores a cookie holding that invite slug and lands the guest on the home page,
where they are welcomed by group and pointed to their week; from then on they see their group's
events. A guest sent two links (a sister who is also a bridesmaid) keeps both. The cookie is renewed
on every visit by `proxy.ts`, so it lasts until the wedding even though browsers cap cookies at 400
days. Filtering happens **on the server**, so events a guest cannot see never reach their browser
in any form. `npm run test:gating` asserts exactly that, including that a forged cookie grants
nothing.

Treat a slug like a password: anyone who has it can see that group's events, and links can be
forwarded. **Keep this repository private.** Everything in `content/` — the slugs and the private
events themselves — is readable by anyone who can read the repository, whatever the site does. To revoke a group, change its slug in `content/groups.ts` and send out the new link.
This is convenience-grade privacy, not security.

## The friends' boat vote

At the foot of the Week page, guests holding the college and high school friends' invite link
see a short list of boat days and can vote: each types their name and picks one, voting again under
the same name changes it, and the group sees the running count with names. Nobody else sees the
vote, and `/api/boat-vote` answers "not found" to anyone without that link (`npm run test:gating`
checks both). The options, the wording and an optional closing date are in `content/boatVote.ts`.

Votes need somewhere to live, so the vote stays closed ("Voting opens soon") until a free database is
connected. One time, in Vercel:

1. Open the project, then **Storage** → **Create Database** → **Upstash for Redis** (free plan).
2. **Connect** it to this project, for all environments.
3. Redeploy (Deployments → the latest → Redeploy), or push any change.

Vercel adds the address and key as environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`);
nothing goes in the repository. The votes are in one key, `wedding:boat-vote`, which you can read or
clear from the Upstash console.

## Deploying

Connect the repository to Vercel and accept the Next.js preset. No environment variables, database,
or other services are needed. The site is set to `noindex`, so it will not appear in search results,
but anyone with the URL can open it.

Pushing to `main` deploys. Before the invitations go out, work through the TODO and VERIFY lists
(`grep -rn "TODO\|VERIFY" content`).
