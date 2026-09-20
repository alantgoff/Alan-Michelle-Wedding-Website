# Alan & Michelle wedding website
Five visual directions on one shared Next.js system. Visit `/v1` through `/v5`; all routes share typed content from `/content` and the same server-side activity gating.

## Local development
Use Node 22 and npm 10. Run `npm install`, then `npm run dev`. Production check: `npm run build && npm start`. Screenshots: `npm run screenshots`. Gating test (requires the server on port 3000): `npm run test:gating`.

## Content
Search `/content` for `TODO:`. Start with the actual wedding date/time in `content/site.ts`. Photos go in `public/photos` and are mapped in `content/photos.ts`.

## Invite links
- College friends: `/i/college-7k4m`
- Family: `/i/family-3f2a`
- Wedding party: `/i/party-9q8v`
- Reset for testing: `/i/reset`
Opening a link stores a group cookie. Activities are filtered on the server; hidden event text is not shipped in HTML. These links are convenience-grade privacy and may be forwarded.

## Deploy
Connect this repo to Vercel with the standard Next.js preset. No environment variables, database, or CMS are required. Do not deploy until final content, invite slugs, and the chosen design are reviewed.
