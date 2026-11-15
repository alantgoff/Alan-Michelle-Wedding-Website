# Editing the wedding site

All guest-facing words live in this folder. Search for `TODO:` to find items that still need Alan
and Michelle's details. Update `site.ts` first, including `isoDate`; then travel, FAQ, story, dress
code and registry.

- **Activities** use an `audience`: `everyone`, `family`, `college` or `wedding-party`. TypeScript
  catches invalid values, and a guest never sees an event that is not for them.
- **Photos**: add JPG or WebP files under `public/photos`, then point to them in `photos.ts`.
- **Travel** (`travel.ts`) holds getting there, the three roads over the mountains, where to stay,
  the sea in October and the packing list. Add or reorder lines freely.
- **The island** (`island.ts`) is the guide: Kualoa's story, eating, a free day, a few manners, and
  the pronunciation list (`sayIt`).
- **The sky** (`sky.ts`) holds the sunset, the moonrise, the day's tides and the moon over the
  weekend. `skyChart.ts` holds the star chart's numbers, which are computed and must not be edited
  by hand. Both are right for October 6, 2028 at Kualoa only.
- **Flying from** (`flying.ts`) lists the cities in Travel's distance picker. Add your guests'
  home airports in the mainland United States and Canada; the miles and hours are worked out for you.
- **Weather** (`weather.ts`) holds the typical-October figures shown until the real forecast takes
  over about two weeks before the day.
- **Dress code** colours in `dressCode.ts` each carry the name shown under their swatch.

Every fact on the guide pages was checked against a primary source before it went in. Hours, prices
and rules are as they stood in late 2026: read them again before the invitations go out, and if you
are not sure of something new, leave it out.
