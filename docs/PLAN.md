# Alan & Michelle — Wedding Website

## Context

Alan and Michelle are getting married at Paliku Gardens, Kualoa Ranch, on Oʻahu. They need a
wedding website to host on Vercel. The repository is currently empty — no commits, no scaffolding —
so this is a greenfield build.

The site has to do two jobs. First, it is the guest-facing source of truth: how to get to Oʻahu,
where to stay, what to wear, what to expect, and where they are registered. Second, it has to
handle a piece of logic most wedding sites cannot: **optional group activities are audience-scoped**.
A college friend should see the college-friends hike; they should not see the family welcome
dinner, and should not be able to discover that it exists.

The intended outcome is a finished, deployable site with every page built and styled, populated
with clearly-marked placeholder copy that Alan and Michelle replace by editing typed content files
in the repo. No CMS, no database, no RSVP.

### Decisions already made (from questions asked)

| Question | Decision |
| --- | --- |
| RSVP | **Not on this site.** Collected elsewhere. |
| Guest tagging | **Unique invite link per group** (`/i/<slug>`), cookie-persisted. |
| Content editing | **Typed files in the repo**, `git push` → Vercel redeploys. |
| Structure | **Multi-page** with top nav, one route per section. |
| Monet influence | **Impressionist wash backgrounds** — CSS/SVG gradient fields + grain, not paintings. |
| Palette | **Water Lilies** — pond teal, sage, lilac, warm cream. |
| Typography | **Display serif headings + humanist sans body.** |
| Motion | **Gentle** — reveal on scroll, drifting hero, honors reduced-motion. |
| Privacy | **noindex, public URL.** No password. |
| Registry | **Link out** to registry sites. |
| Content readiness | **Placeholders**, specific to Kualoa/Oʻahu, marked TODO. |
| Tag groups | College friends, Family, Wedding party. |
| Untagged guests | See **open events only**, with no hint that other events exist. |
| Our Story | **Timeline** of dated moments with photos. |
| Travel scope | Getting there + car, hotels/where to stay, food-beaches-hikes, weather/packing/etiquette. |
| Photos | **Placeholders now**, documented drop-in folder for real photos later. |
| Dress code | **Island formal / aloha attire**, with heat and grass guidance. |
| Home hero | **Painted wash** carries it, names and date over it, photo below. |
| Home extras | Countdown, key-details card, welcome note, weather/travel teaser. |

## Stack

- **Next.js 16 App Router + React 19 + TypeScript** — Vercel-native, zero deploy config.
- **Tailwind CSS 4** for styling, with the palette defined once as design tokens in CSS.
- **`next/font/google`** for self-hosted fonts (no render-blocking third-party request).
- **No runtime dependencies beyond these.** No CMS, no database, no auth, no animation library.
  Scroll reveal is a ~20-line IntersectionObserver hook.

Node 22 and npm 10 are available in this environment; Chromium is available for screenshot
verification.

## Architecture

### Content layer — everything editable lives in `/content`

Every word and photo reference on the site comes from a typed module in `/content`, so Alan and
Michelle edit content without touching layout code. TypeScript types mean a typo in an activity's
audience tag is a build error, not a silently-broken page.

| File | Holds |
| --- | --- |
| `content/site.ts` | Names, wedding date, venue, hero tagline, nav labels. |
| `content/groups.ts` | Guest group definitions: id, display name, invite slug. |
| `content/activities.ts` | Optional group events, each with an `audience` field. |
| `content/travel.ts` | Getting there, where to stay, recommendations, know-before-you-go. |
| `content/faq.ts` | Q&A entries, grouped by category. |
| `content/story.ts` | Timeline entries: date, title, blurb, photo. |
| `content/dressCode.ts` | Dress code guidance + palette swatches + do/don't notes. |
| `content/registry.ts` | Registry cards: name, blurb, URL. |
| `content/photos.ts` | Photo manifest — maps logical names to `/public/photos/*` files. |

`content/README.md` explains, in plain language for a non-engineer, how to edit each file, add a
photo, and add a new activity.

### Audience gating — the one piece of real logic

**Mechanism.** Each group in `content/groups.ts` has a non-obvious invite slug (e.g.
`family-3f2a`, not `family`) so group URLs are not casually guessable. A route at `app/i/[slug]`
validates the slug against the group list, sets a long-lived cookie holding the group id, and
redirects to `/activities`. The cookie persists across pages and return visits, so a guest opens
their link once from a text message and the site remembers them.

**Privacy guarantee.** `/activities` renders **server-side** and reads the cookie before rendering.
Events the visitor's group cannot see are filtered out *on the server* and never reach the browser —
not in the HTML, not in the JS payload. This is why the page is server-rendered rather than
filtered in the browser: client-side filtering would ship every event to every guest, where
view-source would reveal the family dinner. Given the "no hint that other events exist" decision,
server-side filtering is the only approach that actually delivers it.

**Untagged visitors** see exactly the events marked `audience: "everyone"`, presented as the
complete list, with no unlock prompt and no indication that anything is filtered.

**Edge cases handled:** an unknown slug redirects to `/activities` and sets nothing, rather than
erroring; a `/i/reset` path clears the cookie (useful for testing); a group whose events are all
past still renders cleanly.

### Routes

| Route | Page |
| --- | --- |
| `/` | Home — painted hero, countdown, key details, welcome note, weather teaser, section links. |
| `/travel` | Getting there, where to stay, recommendations, what to know. |
| `/activities` | Audience-filtered optional group activities. Server-rendered. |
| `/faq` | Q&A accordion. |
| `/story` | Our Story timeline. |
| `/dress-code` | Dress code with palette swatches and guidance. |
| `/registry` | Registry link cards. |
| `/i/[slug]` | Invite link — sets group cookie, redirects. No UI. |

Every route except `/activities` and `/i/[slug]` is statically generated.

## Page notes

**Home.** The painted wash *is* the hero — names in large display serif, date and venue beneath —
so the page is beautiful on day one with no photography. Below it: a live countdown, a key-details
card (date, time, venue, address, map link), a short welcome note, a weather-and-travel teaser
strip, and cards linking to each section. A `PhotoFrame` sits below the hero for the couple's
photo when they have one.

The countdown is a client component that renders a neutral placeholder on the server and computes
the real figure after mount. Rendering a live time on the server would produce a hydration
mismatch, so this is deliberate rather than incidental.

**Dress code.** Island formal / aloha attire. The page carries palette swatches drawn from the
site's own colors, a two-column "lean into this / maybe skip this" layout, and practical guidance
the venue actually demands: the ceremony is on grass, so stilettos will sink; it is warm and humid,
so jackets are genuinely optional; evenings by the bay can turn breezy. `PhotoFrame` slots are in
place for example outfit photos.

**Activities.** Events render as cards grouped by day, each with time, location, a short
description, and an optional link. The audience filter runs on the server before anything renders.

## Design system

**Concept.** Monet's *Water Lilies* read as fields of broken color with no hard edges. The site
reproduces that feeling with layered radial gradients plus a fine grain overlay — soft painted
color behind crisp, modern type. It never uses a literal painting, so the couple's own photos are
always the most vivid thing on the page.

**Palette** — Water Lilies meets the Koʻolau range, defined once as CSS custom properties consumed
by Tailwind:

| Token | Role |
| --- | --- |
| `ink` | Deep pond green-black — body text, headings. |
| `pond` | Saturated teal — primary accent, links, buttons. |
| `sage` | Muted green — secondary surfaces, borders. |
| `lilac` | Soft violet — highlights, the Monet signature note. |
| `blush` | Warm pink — used sparingly, for emphasis only. |
| `cream` | Warm off-white — page background. |

Exact hex values are set in `app/globals.css` and every pair used for text is checked against
WCAG AA contrast.

**Key components** (`components/`):

- `PaintWash` — the impressionist background. Layered radial gradients plus an SVG grain filter,
  with per-page color variants so Travel feels different from Our Story while staying one family.
  Pure CSS/SVG, no images to download.
- `SiteNav` — sticky top nav, mobile drawer, current-page indicator.
- `SiteFooter` — names, date, venue.
- `Reveal` — client component wrapping the IntersectionObserver hook; fades and rises children on
  entry, and renders them immediately visible when `prefers-reduced-motion: reduce` is set.
- `SectionHeading`, `Card`, `Prose` — shared primitives so pages stay consistent.
- `PhotoFrame` — renders a real photo when present, and a painterly gradient placeholder at the
  correct aspect ratio when not, so the layout is never broken by a missing image.

**Typography.** A high-contrast display serif for headings and names, a quiet humanist sans for
body copy, both self-hosted via `next/font/google` and exposed as CSS variables.

**Motion.** Sections fade and rise as they enter view. The home hero's gradient drifts slowly.
Both are disabled under reduced-motion. No parallax, no scroll-jacking.

## Verified facts for the placeholder copy

Placeholder content will be *accurate* rather than invented, so most of it survives review. These
were confirmed during planning:

- **Venue.** Paliku Gardens sits in Kaʻaʻawa at the base of the Kānehoalani peak, with views of
  Kāneʻohe Bay, the Koʻolau range, and Mokoliʻi island. Open-air pavilion plus two lawns.
- **Getting there.** Roughly 40–60 minutes from Honolulu airport depending on traffic, via H-1 to
  H-3 then Kamehameha Highway along the coast. About 24 miles from Waikīkī.
- **Cars.** A rental car is effectively required; the windward coast has little transit and few
  rideshare drivers. Worth flagging a shuttle as an option for guests staying together.
- **Where to stay.** The windward side has very limited legal lodging — Waikīkī (45–60 min),
  Turtle Bay and the Lāʻie area on the North Shore (~30–45 min), and a small number of Kāneʻohe
  bayfront options. This trade-off is worth explaining to guests directly.

Anything not verifiable — the date, the room block and code, dress code specifics, registry links,
and the story blurb — is written as an obvious `TODO` placeholder rather than a plausible-looking
invention, so nothing false ships by accident.

## Photos

`public/photos/` is created with a `README.md` explaining the drop-in workflow: add a JPG, add one
line to `content/photos.ts`. Until then `PhotoFrame` renders gradient placeholders sized to the
exact final aspect ratios, so the design is already correct when real photos arrive. Images render
through `next/image` for automatic sizing and lazy loading.

## Privacy

Site-wide `noindex, nofollow` via App Router metadata, plus a `robots` file disallowing all
crawlers. No guest names, addresses, or phone numbers appear anywhere in the content scaffolding.

## Verification

1. `npm run build` — must complete with no type errors. Confirm in the build output that `/` and
   the content pages are static and `/activities` is dynamic.
2. `npm run dev`, then drive Chromium via Playwright to capture every page at mobile (390px) and
   desktop (1440px) widths, and review the screenshots for layout breaks and contrast problems.
3. **Gating test, the critical one:** request `/activities` with no cookie and confirm the HTML
   contains only the `everyone` events and no trace of group-only event text. Then visit
   `/i/<family-slug>`, confirm the redirect and cookie, reload `/activities`, and confirm family
   events now appear. Repeat for college friends and wedding party, and confirm each group sees
   its own events and not the others'. Verify by inspecting the raw HTML response, not just the
   rendered page.
4. Confirm `noindex` is present in the response of every page.
5. Toggle `prefers-reduced-motion` and confirm animations are suppressed.
6. Commit to `claude/practical-hopper-cidtvr` and push.

A `README.md` at the repo root covers local development, the Vercel deploy steps, how to share
invite links with each group, and where to edit content.

## What you'll need to supply later

None of this blocks the build — each has a marked placeholder — but the site is not guest-ready
until you fill in: the wedding date and ceremony time (the countdown needs it), the hotel room
block and booking code with its deadline, your registry links, the Our Story timeline text, your
Q&A answers, and photos. Every one of these is a single edit in `/content`.

## Out of scope

RSVP collection, a CMS, guest-list management, password protection, and email sending. The
invite-link mechanism is convenience-grade privacy, not security — anyone who is sent a link can
forward it. This is noted in the README.
