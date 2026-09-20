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

Every image on the site is currently a **generated water texture, not a photograph**. Stand-ins are
labelled "Placeholder" on the page so no guest is shown a fake photo presented as real.

To use a real photo:

1. Put the file in `public/photos/`, for example `public/photos/hero.jpg`.
2. In `content/photos.ts`, change that entry's `src` to `/photos/hero.jpg`, write a real `alt`
   description, and delete the `standin: true` line.
3. Commit and push. The label disappears automatically.

Keep the same shape when you swap — wide, portrait, or square — or the crop changes. Roughly 2000px
on the long edge is plenty.

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
