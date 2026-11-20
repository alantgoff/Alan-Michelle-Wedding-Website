/**
 * QUESTIONS & ANSWERS, in groups.
 *
 * Each answer gives the short answer first. Where a fact is told in full
 * elsewhere on the site, the answer stays short and `link` points there, so
 * the details only ever need changing in one place.
 *
 * Answers about the venue, the island and the law were researched and then
 * checked a second time against primary sources in late 2026; the ones that
 * can change are marked VERIFY. Search this folder for TODO to find answers
 * still waiting on a decision from the two of you.
 */

import { site } from "./site";

export type Faq = { q: string; a: string; link?: { href: string; label: string } };
export type FaqGroup = { id: string; title: string; items: Faq[] };

/** The banner on the page. */
export const faqPage = {
  tab: "Q&A",
  kicker: "Questions",
  title: "Q&A",
  intro: "The things people ask us most. If your question is not here, just ask — we would rather answer twice than have you guess.",
  contents: "Topics",
};

export const faqGroups: FaqGroup[] = [
  {
    id: "the-day",
    title: "The day",
    items: [
      {
        q: "When is the wedding?",
        // The date, the place and the time all come from content/site.ts.
        a: `${site.weddingDate}, at ${site.venue}. ${site.ceremonyTime}.`,
        link: { href: "/week", label: "The whole week" },
      },
      {
        q: "How do I RSVP?",
        // TODO: RSVP. The line itself lives in content/site.ts (`rsvp`).
        a: site.rsvp,
      },
      {
        // VERIFY before invitations: the venue's layout (three lawns, a covered pavilion, a tent, restrooms). Source: Kualoa Ranch's Palikū Gardens venue sheet.
        q: "What is the venue like?",
        a: "Grass, mostly. Palikū Gardens is three lawns, an open-air covered pavilion and a white tent strung with lights, with restrooms on site. Wear shoes that are happy on a lawn, and you will be fine.",
      },
      {
        q: "What should I wear?",
        a: "Island formal, or elevated aloha attire: fabrics that breathe, and shoes that work on grass. Jackets are optional in the heat.",
        link: { href: "/dress-code", label: "The dress code" },
      },
      {
        q: "What if it rains?",
        a: "Showers on this coast are usually light and brief, and there is a covered pavilion and a tent on the lawn.",
      },
      {
        q: "Is the venue accessible?",
        a: "The gardens are lawns with a covered pavilion. If you use a wheelchair or find grass difficult, tell us and we will work out the easiest way in with the ranch.",
      },
      {
        q: "What will the weather be like?",
        a: "Warm and humid, with a breeze off the water in the evening and perhaps a brief shower. In the last couple of weeks the Travel page shows the real forecast for the day.",
        link: { href: "/travel#weather", label: "The weather" },
      },
      {
        q: "Is anything planned besides the wedding?",
        a: "Yes. To thank you for coming, we are organizing a few things to do together during the week, a turtle snorkel on us among them, with plenty of time left to enjoy Hawaiʻi your own way.",
        link: { href: "/week", label: "The week, in order" },
      },
      {
        q: "Is there a registry?",
        // TODO: registry. The page itself is content/registry.ts.
        a: "Registry details are to come.",
      },
    ],
  },
  {
    id: "getting-there",
    title: "Getting there",
    items: [
      {
        q: "How long should we come for?",
        a: "A week, if you can. Arrive the weekend before and fly home the Saturday or Sunday after the wedding, and treat it as a vacation.",
        link: { href: "/travel#make-a-week", label: "Make a week of it" },
      },
      {
        q: "Where should we stay?",
        a: "In Waikīkī, where the wedding-day shuttle runs from. It has the most rooms, restaurants and evenings out on the island. Book early, on a rate you can cancel.",
        link: { href: "/travel#stay", label: "Where to stay" },
      },
      {
        // VERIFY before invitations: the REAL ID rule (with the Travel page's version). Source: tsa.gov.
        q: "Do I need a passport?",
        a: "Not if you are flying from within the United States, but every adult needs a REAL ID–compliant license, a passport or another ID on TSA’s list.",
        link: { href: "/travel#getting-there", label: "Bring the right ID" },
      },
      {
        q: "Will transportation be provided?",
        // TODO: shuttle pickup times and stop (on the Travel page).
        a: "On the wedding day, yes: a shuttle runs between Waikīkī and Kualoa Ranch. For the rest of the week, a rental car is the easiest way to see the island.",
        link: { href: "/travel#shuttle", label: "The wedding-day shuttle" },
      },
      {
        q: "Is there parking at the venue?",
        a: "Some, but not a lot, so please take the shuttle or share a car. We will send the way in, and where to park, closer to the day.",
        link: { href: "/travel#last-ten-minutes", label: "The last ten minutes" },
      },
      {
        q: "How long is the drive?",
        a: "Longer than your map will say. On a clear road it is under an hour from Waikīkī or the airport, and the wedding afternoon is a Friday, with the traffic flowing our way. On the wedding day the shuttle does the driving.",
        link: { href: "/travel#crossings", label: "The roads over the mountains" },
      },
      {
        q: "How do I get home afterward?",
        a: "On the shuttle, back to Waikīkī. If you drive instead, please settle it before you come: a designated driver or a shared car is safest, because rideshare cars are few on this side of the island at night.",
        link: { href: "/travel#getting-home", label: "Getting home from the reception" },
      },
      {
        q: "What time is it in Hawaiʻi?",
        a: "During the wedding week, three hours behind the West Coast and six behind the East Coast. Hawaiʻi does not change its clocks.",
        link: { href: "/travel#island-time", label: "Island time, and the jet lag" },
      },
    ],
  },
  {
    id: "guests",
    title: "Who is coming",
    items: [
      {
        q: "Can I bring a guest?",
        a: "Your invitation says who is invited. If you have a plus one, it will be named on it — and if it is not on your invitation, we have had to keep the day to the people already on it. If anything about your invitation is unclear, please ask us.",
      },
      {
        q: "Are children invited?",
        a: "Children of family are very welcome. Babies we are handling case by case — just ask us and we will sort it out together.",
      },
      {
        q: "Do little ones need car seats?",
        a: "Yes. Hawaiʻi law requires a car seat or booster for young children, so please bring one, or reserve one with your rental car.",
        link: { href: "/travel#car-seats", label: "The rule, by age and height" },
      },
      {
        // VERIFY before invitations: the ranch's rules on pets, comfort and service animals. Source: kualoa.com (FAQ / policies).
        q: "Can I bring my dog?",
        a: "Kualoa is a working cattle ranch, so pets, comfort animals and emotional support animals are not allowed. Service dogs for guests with a disability are permitted, with some restrictions near livestock; please let us know so we can confirm with the ranch.",
      },
      {
        // VERIFY before invitations: the ranch's drone rule. Source: kualoa.com (policies).
        q: "Can I bring a drone?",
        a: "Please leave it at home. Kualoa Ranch does not allow drones in, over or around the ranch, for photographs or anything else, without its written permission.",
      },
    ],
  },
  {
    id: "the-island",
    title: "The island",
    items: [
      {
        // VERIFY before invitations: dengue status in Hawaiʻi and the repellent advice. Sources: health.hawaii.gov (dengue); cdc.gov.
        q: "Will there be mosquitoes?",
        a: "In a garden at dusk, a few. Hawaiʻi has the kind of mosquito that can carry dengue, though the disease is not established here, so repellent is simple insurance. Put on sunscreen first and repellent second, and skip lemon-eucalyptus products for children under three.",
      },
      {
        q: "Will my phone work?",
        a: "Mostly. Some beaches, mountains and valleys have no signal, so save the venue address and a screenshot of the week’s schedule before you set off.",
        link: { href: "/week", label: "The week, to screenshot" },
      },
      {
        q: "Can I take fruit or my lei home?",
        a: "Most flower lei, yes; most fresh fruit, no. Pineapple and coconut can fly. Everything is checked at the airport before you reach the airline counter.",
        link: { href: "/travel#flying-home", label: "The full list" },
      },
    ],
  },
];
