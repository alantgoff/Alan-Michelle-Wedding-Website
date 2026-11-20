# Editing the wedding site

Every word a guest reads lives in this folder. The pages only arrange it.

## What is still to come

Anything not decided yet reads "to come" on the site and has a `TODO:` comment beside it here.
To see them all:

```
grep -rn "TODO" content
```

At the moment: the ceremony time (`site.ts`, `activities.ts`, and the calendar file), RSVP details
(`site.ts`); in `activities.ts`, the days and places for the welcome drinks, the turtle snorkel
charter, the beach meetups and the beach morning, the second thank-you activity, the family dinner's
place, the hike's trailhead, and the friends' boat (written in but switched off until it is
certain); the shuttle's pickup times and stop (`travel.ts`),
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
  Lanikai's parking closures; every restaurant's hours, closed days and booking, Haleiwa
  Seafood's katsu, Green World's free tours, and Foodland's poke flavors and hours (`island.ts`);
  the boat options' prices, capacity and days (`boatVote.ts`).
- **The water:** the box-jellyfish timing; the sea temperature; the
  flash-flood note (`island.ts`).
- **The law on the shore:** sand and coral, the sunscreen ban, distances for turtles, seals and
  dolphins (`island.ts`).
- **The venue:** its layout, pets and drones (`faq.ts`).

If you are not sure of something new, leave it out.

## Where things are

- **`site.ts`**: names, date, ceremony time, venue, the RSVP line, the menu (`nav`), the footer,
  the 404 page, and the guide labels. Update this first, including `isoDate`.
- **`home.ts`**: the home page, the countdown and the welcome card.
- **`activities.ts`**: the Week page. Each event has an `audience`: `everyone`, `family`,
  `college` or `wedding-party`. TypeScript catches invalid values, and a guest never sees an event
  that is not for them. This is the only full schedule on the site. An event's `date` is a day name
  within three days of the wedding ("Thursday") or, earlier in the week, its date ("2028-10-02");
  until it is set, "Days to be confirmed" lists it at the end.
- **`travel.ts`**: getting there, the three roads, the rules of the road, where to stay, the
  weather link, packing, the two-minute version at the top, and the words on the drawn coast map.
- **`island.ts`**: where to eat (`eat.groups`, one line per place), planning free days (with "Plan
  your free days"), in the water, rules worth knowing, and three facts about the venue. Each
  restaurant's `open` lists the days it opens (`daily`, `except("Mon")` or the days by name) for
  the "Open on…" filter; leave it out when the hours aren't known. The words for that filter and
  for "My week" are in `eat.openOn` and `myWeek`. The poke section is `eat.poke`; each kind's
  `id` picks its drawing. Every place has `at`, the point its little island map is dotted at:
  one of the names in `lib/island.ts` (add a new point there if a place isn't near one).
- **`utility.ts`**: the Utility page's chapter names and its few lines of its own. The widgets on
  it keep their words in their own pages' files.
- **`boatVote.ts`**: the friends' boat vote (only that group sees it): the options, the words, and
  an optional closing date. Changing an option's `id` loses the votes cast for it.
- **`faq.ts`**: questions and answers. Keep each answer short; where a fact is told in full on
  another page, add a `link` to it rather than repeating it.
- **`story.ts`**: Our story's chapters. Each has a title and its photos, by name from the `album`
  in `photos.ts` (the first is the main one). A `date`, `text` and margin `notes` can be added to any
  chapter. Captions for single photos are in `photos.ts`.
- **`registry.ts`**: one postcard per registry. Until one has a real link the page shows a single
  "to come" card.
- **`weather.ts`**, **`dressCode.ts`**: the weather panel and the dress code.
- **`photos.ts`**: every image, with its alt text.

Lines with `{name}` in braces have a number or time filled in for you: keep the braces as they are.

Two lines are set in the print stylesheet rather than here, because they exist only on paper:
"A hui hou · Alan & Michelle · page N" at the foot of each printed page, and "Tick as you pack"
over the printed packing list (`app/globals.css`).
