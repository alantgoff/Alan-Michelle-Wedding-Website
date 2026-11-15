/**
 * TRAVEL — getting here, staying, packing, and going home.
 *
 * Every fact on this page was researched and then checked a second time
 * against primary sources (the State, the City and County of Honolulu, Kualoa
 * Ranch, the hotels themselves). Prices, counts and tax rates are marked with
 * the date they were checked: please look at them again before the
 * invitations go out, and keep the same standard when adding anything.
 */

export type Stay = {
  id: "waikiki" | "laie" | "turtle-bay" | "bay" | "ko-olina";
  title: string;
  /** Minutes to the gardens without traffic, shown large on the card. */
  minutes: string;
  text: string;
};

export const travel = {
 gettingThere:[{title:"Fly into Honolulu",text:"Daniel K. Inouye International Airport (HNL) is roughly 40–⁠60 minutes from Palikū Gardens, depending on traffic."},{title:"Plan on a car",text:"The windward coast has limited transit and rideshare availability. A rental car is the most flexible option. TODO: Add shuttle details if arranged."}],

 /** Where to stay, nearest first. Drive times are without traffic, from two routing services. */
 stayIntro:
  "There is no hotel at Kualoa itself, so all of us will be driving in on the day. This is the honest version: where the beds are, what is legal to rent, and how long the road is from each. Drive times are without traffic. On a Friday afternoon, give yourself more.",
 stays: [
  {
   // Recheck before the invitations go out: in late 2026 Paradise Bay Resort
   // was listed for sale, and the licence counts are a snapshot of that date.
   id: "bay",
   title: "Kāneʻohe Bay and Kailua",
   minutes: "15–⁠35",
   text: "On this side of the mountains, homes are kept for neighbors. A stay of fewer than 30 nights is legal here only in a home the City has licensed, and there are very few: about four dozen in Kailua and a single one in Kāneʻohe when we checked the City’s map in late 2026. A small, long-established hotel on the bay is Paradise Bay Resort in Kahaluʻu, ten to fifteen minutes from the gardens, with kayaks and paddleboards at its docks. Kailua is a little over half an hour away.",
  },
  {
   id: "laie",
   title: "Lāʻie",
   minutes: "25",
   text: "The nearest full-size hotel is the Courtyard by Marriott Oahu North Shore in Lāʻie, next door to the Polynesian Cultural Center. It is about 12 miles up the coast road, 20 to 30 minutes from the gardens, with no mountains to cross.",
  },
  {
   id: "turtle-bay",
   title: "Turtle Bay",
   minutes: "40",
   text: "Further around the North Shore, the old Turtle Bay Resort is now The Ritz-Carlton Oʻahu, Turtle Bay. It is about 19 miles from us, 35 to 45 minutes, a little shorter than the drive from Waikīkī and far quieter. The hotel opened in 1972 as the Kuilima, “joining hands,” and the point it stands on is still Kuilima Point. The condominiums around the resort are also among the few places on Oʻahu licensed for short stays.",
  },
  {
   id: "waikiki",
   title: "Waikīkī",
   minutes: "45",
   text: "“Spouting water.” Waikīkī has the most rooms, restaurants and evenings out on the island. Kualoa Ranch puts the drive at about 45 minutes, over the Likelike Highway and through the Wilson Tunnel. Allow an hour on the wedding afternoon. Most hotels add a nightly resort fee and parking on top of the room; at one we checked in late 2026, each was $45 before tax.",
  },
  {
   id: "ko-olina",
   title: "Ko Olina",
   minutes: "60",
   text: "On the far western shore, Ko Olina (the resort calls it “place of joy”) has Aulani, the Four Seasons and Marriott’s Ko Olina Beach Club, set around protected lagoons. It is the longest drive to us: about 38 miles, around an hour with clear roads and a good deal more in weekday traffic. We would save it for the days before or after the wedding.",
  },
 ] satisfies Stay[],
 stayNotes: [
  {
   title: "Before you book a rental",
   text: "A legal listing for fewer than 30 nights shows two numbers: its City registration or NUC number, and its tax map key (TMK). If a listing for a home in Kailua or Kāneʻohe doesn’t show both, assume it can’t legally be rented for our weekend. You can look up any TMK on the City’s Short-Term Rental Compliance Map. A licensed bed-and-breakfast is a room or two in a home where the host lives. Hotels don’t appear on the map, and don’t need to.",
  },
  {
   title: "What the bill will say",
   text: "As of 2026, taxes add 18.712% to every room night on Oʻahu: the state’s 11% Transient Accommodations Tax, Oʻahu’s own 3%, and 4.712% general excise. Resort fees are taxed too. Since 2025, hotels and rentals have had to show their required fees in the first price you see. The newest part of the tax, added in 2026, is meant to pay for protecting Hawaiʻi’s forests and shores, preparing the islands for a changing climate, and easing tourism’s footprint.",
  },
  {
   title: "Book early, and keep it refundable",
   text: "Oʻahu is never empty: even in October 2025, one of its quieter months, the island’s hotels were more than three-quarters full. The Monday after the wedding, October 9, 2028, is a federal holiday (Columbus Day; in Hawaiʻi it is Indigenous Peoples’ Day), so some of you, and plenty of other travelers, will have a long weekend. We would book as soon as you know you are coming, on a rate you can cancel.",
  },
 ],

 explore:["Swim at Lanikai or Kailua Beach","Drive the windward coast","Try local plate lunches and shave ice"],

 /**
  * Two practical notes that also appear on the coast chart. Kept here so the
  * page can print them as plain text too: the chart needs JavaScript to open
  * a place, and these are worth knowing whether or not it runs.
  */
 crossing:{title:"Allow for the crossing",text:"The H-3, the Likelike and the Pali Highway are the only quick ways over the mountains. Traffic stacks up on weekday mornings and again at the end of the afternoon."},
 beachParking:{title:"Go early",text:"Parking around Lanikai is residential and fills by mid-morning. Kailua Beach Park has a proper lot and the same water."},

 /** The packing list. Ticks are remembered on each guest’s own device. */
 packing:["Sunscreen without oxybenzone or octinoxate, which Hawaiʻi no longer sells","A light rain layer; showers pass in minutes","Shoes that like grass, for the ceremony lawn","Swimsuit, and a sarong or towel for the beach morning","A hat and sunglasses","Something light and warm for the breeze off the bay at night","Insect repellent for the lawn at dusk; mosquitoes are busiest around sunrise and sunset","Your outfit for the wedding, something that breathes","Your invite link, saved on your phone"]
};
