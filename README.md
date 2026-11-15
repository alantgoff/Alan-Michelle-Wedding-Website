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

Everything a guest reads lives in `/content`. Search that folder for `TODO:` to find what still
needs real information. Start with `content/site.ts` — the wedding date there drives the countdown.

| File | What it holds |
| --- | --- |
| `site.ts` | Names, date, ceremony time, venue, welcome note, navigation |
| `groups.ts` | Guest groups and their private invite slugs |
| `activities.ts` | Weekend events and who can see each one |
| `travel.ts` | Getting there, the three roads over the mountains, where to stay, packing |
| `island.ts` | The island guide: Kualoa's story, eating, a free day, manners, how to say the names |
| `sky.ts` | Sunset, moonrise, the tide and the moon over the weekend, and the words around them |
| `skyChart.ts` | Where the stars stand over the lawn at nine. **Computed: do not edit by hand** |
| `flying.ts` | The cities in the "How far you are coming" picker on Travel |
| `weather.ts` | Typical early-October weather, shown until the real forecast arrives |
| `faq.ts` | Questions and answers, in groups |
| `story.ts` | Our Story timeline, with optional photo captions and margin notes in each of your voices |
| `dressCode.ts` | Dress code guidance, the palette's sample cards, the flowers guests will meet |
| `registry.ts` | One postcard per registry, each with a note, a link and a stamp word |
| `photos.ts` | **Photo manifest — the only file that points at images** |

## Facts, and how they were checked

The guide pages (Travel and The island) are full of facts: opening hours, laws, drive times, tide
times, Hawaiian words and stories. Each one was researched and then checked a second time against
a primary source, and anything a checker could not confirm was left out. Please keep that standard:
if you are not sure of something, do not print it.

Three kinds of fact go stale and are marked in the content files with the date they were checked:

- **Hours, prices and rules** (restaurants, parks, Hanauma Bay, hotel fees, taxes): as of late 2026.
  Read them again before the invitations go out.
- **Anything about the venue** (parking, when music ends): from Kualoa Ranch's public pages. The
  ranch coordinator's word replaces them.
- **The sky and the tide** for October 6, 2028, in `content/sky.ts` and `content/skyChart.ts`. These
  are right for that date and that place only. If the date or the hour shown ever changes they must
  be worked out again; the site does not compute them.

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

**Still to replace:** the four Our Story photos are ocean images standing in for pictures of the two
of you. They are marked `TODO` in the manifest.

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
  time and the light at the venue right now.
- Sunrise and sunset come from `lib/sun.ts`, computed for the venue's coordinates in
  `content/site.ts`; the wedding-day sunset on the home page needs no editing.
- `/wedding.ics` is the "Add to calendar" file. It is an all-day event until the ceremony time is
  confirmed in `content/site.ts`.
- The packing list on Travel remembers ticks in the guest's own browser. Nothing is sent anywhere.
- A wrong URL lands on a "past the reef" page rather than a bare 404.
- Opening an invite link plays a short welcome: the logo rises out of its own waves, greets the
  guest's group by name, and lifts away to the home page. It plays once, a tap skips it, and anyone
  who has asked their device for reduced motion goes straight to the page.
- Tapping the logo at the top of the home page scatters plumeria down the screen.
- Tapping the countdown counts in weeks, then in full moons, then back to days.
- Activities shows each day's real date and that evening's sunset, and lists events in time order.
- Every page banner closes with a drawing of the coast in the logo's navy line (`components/ink/`),
  and the banner photograph drifts very slowly, with pools of sunlight that come and go.
- The island carries a chart of the sky over the lawn at nine on the wedding night, the day drawn
  as one tide line, and the moon for each night of the weekend.
- Travel's "How far you are coming" draws a guest's crossing from their home city and says what
  their watch will do. The choice is remembered in their own browser only.
- A guest in another time zone sees their own clock beside Kualoa's on the home page.
- Our story is set like a small book: each moment opens with a drop cap, photographs are mounted
  as plates, and if you add `notes` to a moment in `content/story.ts` they appear in the margin,
  initialled, one voice each.
- Dress code shows the palette as pinked cloth samples and has a plumeria that moves from ear to ear.
- On The island, tap the kōlea and it takes a few steps.
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
where they are welcomed by group and pointed to their weekend; from then on they see their group's
events. A guest sent two links (a sister who is also a bridesmaid) keeps both. The cookie is renewed
on every visit by `proxy.ts`, so it lasts until the wedding even though browsers cap cookies at 400
days. Filtering happens **on the server**, so events a guest cannot see never reach their browser
in any form. `npm run test:gating` asserts exactly that, including that a forged cookie grants
nothing.

Treat a slug like a password: anyone who has it can see that group's events, and links can be
forwarded. **Keep this repository private.** Everything in `content/` — the slugs and the private
events themselves — is readable by anyone who can read the repository, whatever the site does. To revoke a group, change its slug in `content/groups.ts` and send out the new link.
This is convenience-grade privacy, not security.

## Deploying

Connect the repository to Vercel and accept the Next.js preset. No environment variables, database,
or other services are needed. The site is set to `noindex`, so it will not appear in search results,
but anyone with the URL can open it.

Do not deploy until the real date, the room block, and the registry links are in.
