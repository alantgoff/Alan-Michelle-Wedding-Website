/**
 * THE SITE — the names, the date, the place, and the words that sit on
 * every page: the menu, the footer, the guide labels and the page for a
 * wrong address.
 *
 * Anything not settled yet is written for guests as "to come", with a
 * TODO comment beside it here. Search this folder for TODO to see what is
 * still open.
 */
export const site = {
  couple: "Alan & Michelle",
  weddingDate: "Friday, October 6, 2028",
  // TODO: confirm the ceremony time. Only the date is shown anywhere; the
  // 4 PM here is a placeholder that sets the countdown's target day.
  isoDate: "2028-10-06T16:00:00-10:00",
  // TODO: ceremony time. When it is set, write it as it should read on its
  // own, e.g. "Ceremony at 4:00 PM". It appears on the home page, the Travel
  // chart and in the FAQ. (The Week page's time is in content/activities.ts.)
  ceremonyTime: "Ceremony time to come",
  venue: "Palikū Gardens at Kualoa Ranch",
  // Palikū Gardens is in Kualoa itself. Kaʻaʻawa is the next land division
  // north (the ranch's film valley), so the wedding is not "in Kaʻaʻawa".
  location: "Kualoa, Oʻahu",
  address: "49-560 Kamehameha Hwy, Kāneʻohe, HI 96744",
  mapUrl: "https://maps.google.com/?q=Paliku+Gardens+Kualoa+Ranch",
  /** Where the sun rises and sets from: Palikū Gardens, at the foot of Kānehoalani. */
  coordinates: { lat: 21.5205, lng: -157.8378 },
  tagline: "A celebration where the mountains meet the sea.",
  /** Shown in link previews and to search engines (which are asked not to list the site). */
  description: "Wedding week at Palikū Gardens, Kualoa Ranch, Kualoa, Oʻahu",
  welcome:
    "We cannot wait to gather our favorite people on Oʻahu. This site will hold everything you need for the week; a few details are still to come, and we will add them as they are settled.",

  /**
   * RSVP. The decision so far is that RSVPs are collected somewhere other
   * than this site. TODO: when the details are set, say here how and by when.
   */
  rsvp: "RSVP details are to come. RSVPs won’t be collected on this site.",

  /** The menu at the top of every page, in order. `href` is the page's address without the slash. */
  nav: [
    { href: "", label: "Home" },
    { href: "week", label: "Week" },
    { href: "travel", label: "Travel" },
    { href: "island", label: "Island" },
    { href: "story", label: "Our story" },
    { href: "dress-code", label: "Dress code" },
    { href: "faq", label: "FAQ" },
    { href: "utility", label: "Utility" },
  ],

  /** The frame around every page. */
  shell: {
    skip: "Skip to content",
    navLabel: "Sections",
    /** The button that opens the menu on a phone. */
    menu: "Menu",
    close: "Close",
    madeWith: "Made with love for our favorite people",
    /** Pages kept out of the top menu but linked from the footer. */
    more: [{ href: "registry", label: "Registry" }],
  },

  /**
   * The "Add to calendar" file. An all-day event until the ceremony time is
   * set; then app/wedding.ics/route.ts needs the time added too.
   * TODO: ceremony time.
   */
  calendar: {
    summary: "{couple} — wedding",
    note: "Ceremony time to be confirmed.",
  },

  /** The labels on the long guides (Travel, The island). */
  guide: {
    contents: "In this guide",
    back: "Back to the contents",
  },

  /** A wrong address. */
  notFound: {
    tab: "Past the reef",
    kicker: "Lost at sea",
    title: "Past the reef",
    intro: "There is nothing out here but open water. Whatever you were looking for is back on shore.",
    back: "Back to the beach",
  },
} as const;
