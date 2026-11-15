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
        q: "What will the weather be like?",
        a: "Warm and humid, with brief showers possible, and a breeze off the bay in the evening. The Travel page carries a weather panel that turns into the real forecast for the day in the last couple of weeks.",
      },
    ],
  },
  {
    id: "getting-there",
    title: "Getting there",
    items: [
      { q: "Will transportation be provided?", a: "TODO: Add shuttle details. For now, plan on renting a car." },
      {
        q: "Is there parking at the venue?",
        a: "Yes. Parking at the gardens is on three terraced lots that hold about 80 cars between them, so please share a car where you can.",
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
        q: "What is the mark in Oʻahu and Kāneʻohe?",
        a: "The ʻokina. It is a consonant, a quick catch in the throat like the pause in “uh-oh”, so Oʻahu is oh-AH-hoo. The bar over a vowel, as in Kāneʻohe, is a kahakō and stretches it. There is a short guide to the names you will hear on The island page.",
      },
    ],
  },
];
