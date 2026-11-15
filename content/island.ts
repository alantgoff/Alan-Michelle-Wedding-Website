/**
 * THE ISLAND — the place we are marrying, and this side of Oʻahu.
 *
 * Everything here was researched and then checked a second time against
 * primary sources (Place Names of Hawaiʻi, the Hawaiian Dictionary, the
 * National Register nomination for Kualoa, Kualoa Ranch, the City and the
 * State). Where a detail could not be confirmed it was left out, so please
 * keep that standard when adding to it: if you are not sure, do not print it.
 *
 * Each passage is a `title` and a `text`. Add, remove and reorder freely.
 */

export type Passage = { title: string; text: string };

export const island = {
  /** Chapter I: the ground under the wedding. */
  kualoa: {
    lede:
      "We are marrying at the foot of Kānehoalani, the sheer green ridge at Kualoa, on lawns that look out across Kāneʻohe Bay to the little islet of Mokoliʻi. It is a place with a long memory, and we wanted you to know a little of it before you arrive.",
    passages: [
      {
        title: "A sacred shore",
        text: "Kualoa was counted among the most sacred places on Oʻahu. Children of chiefs were brought here to be raised and taught; it was a puʻuhonua, a place of refuge; and when a chief was in residence, canoes passing offshore lowered their masts in respect. We will be guests on this land for one evening, and we would like to walk on it gently.",
      },
      {
        title: "Palikū",
        text: "The gardens take an old name. Palikū means “vertical cliff”, and it is also an ancient name for this side of the ridge, the land now called Kualoa. The dictionary gives the word a second sense as well: the starting point of a genealogy line. We did not choose the place for that, but we are glad of it.",
      },
      {
        title: "The little lizard",
        text: "The islet in every photograph is Mokoliʻi, “little lizard”. Long ago the goddess Hiʻiaka, sister of Pele, killed a moʻo, a giant lizard, here at Kualoa. Its tail became the islet, and its body the low land at the foot of the cliffs. Look for the tail as you drive in.",
      },
      {
        title: "The mountain behind us",
        text: "The ridge rising behind the lawn is Kānehoalani, named for a god remembered as an ancestor of Pele. His companion, the old story says, is Kapapa, a low islet out in the bay. We like the idea of a mountain and an island keeping each other company across the water.",
      },
      {
        title: "Star of Gladness",
        text: "On March 8, 1975, just below the peak of Kānehoalani, the voyaging canoe Hōkūleʻa slid down a ramp of coconut logs and met the sea for the first time. The place was chosen because Kualoa and neighboring Hakipuʻu were home to voyaging chiefs of old. Hōkūleʻa means “Star of Gladness”, and she has been crossing the Pacific ever since.",
      },
      {
        title: "The fishpond next door",
        text: "Next door in Hakipuʻu, a stone wall some 4,000 feet long curves out from the shore to hold about 125 acres of shallow bay. This is Mōliʻi, an ancient Hawaiian fishpond built before written history, and it is still worked today.",
      },
      {
        title: "A working ranch",
        text: "In 1850 King Kamehameha III sold about 622 acres at Kualoa, with the fishing rights and the islet of Mokoliʻi, to Dr. Gerrit P. Judd, a missionary doctor who advised him. Judd’s descendants still run the ranch, now some 4,000 acres across Kualoa, Hakipuʻu and Kaʻaʻawa. Sugar came and went (the mill ran from 1863 to 1870, until years of thin rainfall ended it), the Army laid an airfield across the flats in the Second World War, and today it is a working cattle ranch again.",
      },
      {
        title: "Seen it somewhere?",
        text: "Kualoa has appeared in more than seventy films since the 1950s, Jurassic Park among them, and many were shot in Kaʻaʻawa Valley, the ranch’s northern half: Kong: Skull Island, Jumanji, Godzilla and, we are delighted to report, Mike & Dave Need Wedding Dates. Our lawn is on the other side of the ridge.",
      },
    ] satisfies Passage[],
  },

  /** Place names guests will hear all weekend, and how to say them. */
  sayIt: [
    { word: "Kualoa", say: "koo-ah-LOH-ah", means: "“long back” — the ridge that rises behind the ranch" },
    { word: "Palikū", say: "pah-lee-KOO", means: "“vertical cliff” — an old name for Kualoa, and our venue" },
    { word: "Kānehoalani", say: "KAH-neh-hoh-ah-LAH-nee", means: "“Kāne, royal (or heavenly) companion” — the ridge behind the lawn" },
    { word: "Mokoliʻi", say: "moh-koh-LEE-ee", means: "“little lizard” — the islet off the point, in every photo" },
    { word: "Koʻolau", say: "koh-oh-LOW (rhymes with “now”)", means: "“windward” — the mountains, and this whole side of the island" },
    { word: "Kāneʻohe", say: "KAH-neh-OH-heh", means: "“bamboo man” — the bay and the town you drive through" },
    { word: "Kaʻaʻawa", say: "kah-ah-AH-vah", means: "named for the ʻaʻawa, a wrasse that lives on the reef — the valley just north of us" },
    { word: "Mōliʻi", say: "MOH-lee-ee", means: "“small section” — the ancient fishpond next door" },
    { word: "Hōkūleʻa", say: "HOH-koo-LEH-ah", means: "“star of gladness” — the voyaging canoe, first launched at Kualoa in 1975" },
    { word: "Mahalo", say: "mah-HAH-loh", means: "thank you — the word you will use most" },
  ],
  /** The ʻokina and the kahakō, explained once. */
  sayItNote:
    "The ʻ in Oʻahu is the ʻokina, a real consonant: a quick catch in the throat, like the middle of “uh-oh”. The bar in Kāneʻohe is a kahakō and simply stretches the vowel. Every vowel is said; nothing is silent.",
};
