# Alan & Michelle — wedding website

A photography-led site for our wedding at Pālikū Gardens, Kualoa Ranch, on the windward coast of
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
| `travel.ts` | Getting there, where to stay, recommendations |
| `faq.ts` | Questions and answers |
| `story.ts` | Our Story timeline |
| `dressCode.ts` | Dress code guidance and color swatches |
| `registry.ts` | Registry links |
| `photos.ts` | **Photo manifest — the only file that points at images** |

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

## Small things guests may notice

- The home page greets guests who arrived through their invite link by group, and shows the
  time and the light at the venue right now.
- Sunrise and sunset come from `lib/sun.ts`, computed for the venue's coordinates in
  `content/site.ts`; the wedding-day sunset on the home page needs no editing.
- `/wedding.ics` is the "Add to calendar" file. It is an all-day event until the ceremony time is
  confirmed in `content/site.ts`.
- The packing list on Travel remembers ticks in the guest's own browser. Nothing is sent anywhere.
- A wrong URL lands on a "past the reef" page rather than a bare 404.

## The weather panel

Travel carries a weather panel that changes itself. Until the wedding is about two weeks out it
shows what early October typically does on the windward coast, from `content/weather.ts`. Inside
that window it shows the real forecast for the day, fetched hourly from Open-Meteo — a free
service that needs no API key, so there is nothing to configure or keep secret. If the fetch fails
for any reason, the typical panel simply stays up and no guest sees an error.

Nothing has to be switched on closer to the date, and nothing has to be taken down afterwards.

## Invite links

Optional group activities are scoped to guest groups. Send each group its own link:

| Group | Link |
| --- | --- |
| College friends | `/i/college-7k4m` |
| Family | `/i/family-3f2a` |
| Wedding party | `/i/party-9q8v` |
| Reset (for testing) | `/i/reset` |

Opening a link once stores a cookie holding that invite slug, and the guest then sees their group's
events. Filtering happens **on the server**, so events a guest cannot see never reach their browser
in any form. `npm run test:gating` asserts exactly that, including that a forged cookie grants
nothing.

Treat a slug like a password: anyone who has it can see that group's events, and links can be
forwarded. To revoke a group, change its slug in `content/groups.ts` and send out the new link.
This is convenience-grade privacy, not security.

## Deploying

Connect the repository to Vercel and accept the Next.js preset. No environment variables, database,
or other services are needed. The site is set to `noindex`, so it will not appear in search results,
but anyone with the URL can open it.

Do not deploy until the real date, the room block, and the registry links are in.
