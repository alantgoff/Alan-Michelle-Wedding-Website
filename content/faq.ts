/**
 * QUESTIONS & ANSWERS, in groups.
 *
 * Answers about the venue, the island and the law were researched and then
 * checked a second time against primary sources; anything that could not be
 * confirmed was left out. Search for TODO to find answers still waiting on
 * a decision from the two of you.
 */

export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "the-day",
    title: "The day",
    items: [
      { q: "When is the wedding?", a: "Friday, October 6, 2028, at Palikū Gardens. TODO: Add the final ceremony time." },
      {
        q: "What is the venue like?",
        a: "Grass, mostly. Palikū Gardens is three lawns, an open-air covered pavilion and a white tent strung with lights, with restrooms on site. Wear shoes that are happy on a lawn, and you will be fine.",
      },
      {
        q: "What should I wear?",
        a: "Island formal or elevated aloha attire. Choose shoes that work on grass; jackets are optional in the heat.",
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
        a: "Warm and humid, with brief showers possible, and a breeze off the water in the evening. The Travel page carries a weather panel that turns into the real forecast for the day in the last couple of weeks.",
      },
    ],
  },
  {
    id: "getting-there",
    title: "Getting there",
    items: [
      {
        q: "Do I need a passport?",
        a: "Not if you are flying from within the United States. Adults need a REAL ID–compliant license or another ID on TSA’s list (a passport works too). TSA does not ask children under 18 for ID; check with your airline. The Travel page has the details.",
      },
      { q: "Will transportation be provided?", a: "TODO: Add shuttle details. For now, plan on renting a car." },
      {
        q: "Is there parking at the venue?",
        a: "The ranch lists three parking tiers at the gardens, with room for about 80 cars between them, so please share a car where you can. We will send the exact way in, and where to park, closer to the day.",
      },
      {
        q: "How long is the drive?",
        a: "Kualoa Ranch puts it at about 45 minutes from Waikīkī, and it is around 40 from the airport on a clear road. Our wedding day is an ordinary Friday on the island and the afternoon traffic flows our way, so please allow a good deal more. The Travel page has the three routes over the mountains.",
      },
      {
        q: "How do I get home afterward?",
        a: "Please settle this before you come: a designated driver or a shared car is safest. Rideshare cars are few on this side of the island at night, and even one reserved ahead is not guaranteed to arrive.",
      },
      {
        q: "What time is it in Hawaiʻi?",
        a: "Hawaiʻi does not change its clocks. On our wedding weekend it is three hours behind the West Coast and six behind the East Coast.",
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
        a: "Yes. Hawaiʻi law keeps children under ten in a car seat or booster unless they are at least seven and taller than 4 feet 9 inches, and babies under two ride rear-facing. Please bring one, or reserve one with your rental car.",
      },
      {
        q: "Can I bring my dog?",
        a: "Kualoa is a working cattle ranch, so pets, comfort animals and emotional support animals are not allowed. Service dogs for guests with a disability are permitted, with some restrictions near livestock; please let us know so we can confirm with the ranch.",
      },
      {
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
        q: "Will there be mosquitoes?",
        a: "In a garden at dusk, a few. Hawaiʻi has the kind of mosquito that can carry dengue, though the disease is not established here, so repellent is simple insurance. Put on sunscreen first and repellent second, and skip lemon-eucalyptus products for children under three.",
      },
      {
        q: "Will my phone work?",
        a: "Mostly. Some beaches, mountains and valleys have no signal, so save the venue address and a screenshot of the weekend’s schedule before you set off.",
      },
      {
        q: "Can I take fruit or my lei home?",
        a: "Your flower lei, yes, as long as it has no berries, hala fruit, jade vine, maunaloa or anything from citrus or mock orange. Fresh pineapple and coconut, yes. Most other fresh fruit, no. Everything goes through a USDA check at the airport before you check in; the Travel page has the full list.",
      },
      {
        q: "What is the mark in Oʻahu and Kāneʻohe?",
        a: "The ʻokina. It is a consonant, a quick catch in the throat like the pause in “uh-oh”, so Oʻahu is oh-AH-hoo. The bar over a vowel, as in Kāneʻohe, is a kahakō and stretches it. There is a short guide to the names you will hear on The island page.",
      },
    ],
  },
];
