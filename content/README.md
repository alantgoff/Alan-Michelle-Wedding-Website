# Editing the wedding site

Every word a guest reads lives in this folder. The pages only arrange it.

## What is still to come

Anything not decided yet reads "to come" on the site and has a `TODO:` comment beside it here.
To see them all:

```
grep -rn "TODO" content
```

At the moment: the ceremony time (`site.ts`, `activities.ts`, and the calendar file), RSVP details
(`site.ts`), the welcome drinks' day and place, the beach, the snorkel charter's details, the family
dinner's place and the hike's trailhead (`activities.ts`), shuttle details (`travel.ts`, `faq.ts`),
the registry (`registry.ts`), and our story in words: a year and a few lines for any chapter
(`story.ts`).

## Before the invitations go out

Every fact that can change (a rule, a price, an opening hour, a tax rate, a booking window) was
checked against a primary source in late 2026, and is marked beside it:

```
// VERIFY before invitations: <the claim> — Source: <where to check it>
```

To list them all:

```
grep -rn "VERIFY" content
```

Check each against the source named, fix the text if it has changed, and delete the comment once it
is confirmed. The main ones:

- **Flying:** TSA's REAL ID rule and ID fee; the Akamai Arrival agriculture form; the USDA check
  and which lei and fruit may fly home (`travel.ts`).
- **Staying:** the short-term-rental rule and its NUC/TMK numbers, the City's rental map counts,
  the room tax (18.712%), resort fees, Paradise Bay Resort's sale (`travel.ts`).
- **Driving:** the phone and car-seat laws, the Pali Lookout's hours, the last Route 60 bus, the
  ranch's music curfew and parking (`travel.ts`).
- **A free day:** Hanauma Bay's reservations, fees and closing days; Hoʻomaluhia, Byodo-In and
  Makapuʻu hours; Kāneʻohe Bay's Sunday and holiday boat rule; Kailua's lifeguard hours and
  Lanikai's parking closures; the restaurants' hours (`island.ts`).
- **The water:** the box-jellyfish timing and that month's full moon; the sea temperature; the
  flash-flood note (`island.ts`).
- **The law on the shore:** sand and coral, the sunscreen ban, distances for turtles, seals and
  dolphins (`island.ts`).
- **The venue:** its layout, pets and drones (`faq.ts`).

If you are not sure of something new, leave it out.

## Where things are

- **`site.ts`**: names, date, ceremony time, venue, the RSVP line, the menu (`nav`), the footer,
  the 404 page, and the guide labels. Update this first, including `isoDate`.
- **`home.ts`**: the home page, the countdown and the welcome card.
- **`activities.ts`**: the Weekend page. Each event has an `audience`: `everyone`, `family`,
  `college` or `wedding-party`. TypeScript catches invalid values, and a guest never sees an event
  that is not for them. This is the only full schedule on the site.
- **`travel.ts`**: getting there, the three roads, the rules of the road, where to stay, the
  weather link, packing, the two-minute version at the top, and the words on the drawn coast map.
- **`island.ts`**: Kualoa's story, eating, a free day (with "Plan around the weekend"), in the
  water, manners, and the pronunciation list (`sayIt`).
- **`faq.ts`**: questions and answers. Keep each answer short; where a fact is told in full on
  another page, add a `link` to it rather than repeating it.
- **`story.ts`**: Our story's chapters. Each has a title and its photos, by name from the `album`
  in `photos.ts` (the first is the main one). A `date`, `text` and margin `notes` can be added to any
  chapter. Captions for single photos are in `photos.ts`.
- **`registry.ts`**: one postcard per registry. Until one has a real link the page shows a single
  "to come" card.
- **`sky.ts`** and **`skyChart.ts`**: the sky that night. `skyChart.ts` is computed; do not edit
  it by hand. Both are right for October 6, 2028 at Kualoa only.
- **`flying.ts`**, **`weather.ts`**, **`dressCode.ts`**: the distance picker, the weather panel and
  the dress code.
- **`photos.ts`**: every image, with its alt text.

Lines with `{name}` in braces have a number or time filled in for you: keep the braces as they are.

Two lines are set in the print stylesheet rather than here, because they exist only on paper:
"A hui hou · Alan & Michelle · page N" at the foot of each printed page, and "Tick as you pack"
over the printed packing list (`app/globals.css`).
