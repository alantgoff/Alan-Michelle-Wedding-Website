/**
 * DRESS CODE. `titleLead` and `titleTail` are the two lines of the page's
 * headline. Each colour has a name and a note of cloths it suits: the notes
 * are suggestions of ours, so change them to taste.
 */
export const dressCode = {
  /** The page's banner kicker and the small words around the swatches. */
  page: {
    tab: "Dress code",
    kicker: "What to wear",
    colorsTitle: "Color, texture, ease",
    /** Before each swatch's number: "No. 01". */
    number: "No.",
    colorsNote: "Take inspiration from ocean, mountain, flowers, and late-afternoon sun. These are ideas, not a uniform.",
    lean: "Lean into this",
    skip: "Maybe skip this",
  },
  title:"Island formal / aloha attire",titleLead:"Island formal",titleTail:"or, aloha attire",intro:"Bright, easy, and comfortable outdoors in the afternoon sun.",lean:["Flowing dresses, jumpsuits, and separates","Linen or lightweight suits","Elevated aloha shirts and rich tropical color","Block heels, wedges, loafers, or flats"],skip:["Stilettos that sink into the lawn","Heavy layers or rigid formalwear","Beachwear, shorts, or flip-flops"],colors:[{name:"Shallows",hex:"#71a7ac",fabric:"linen, cotton voile"},{name:"Sky",hex:"#8db6cb",fabric:"chiffon, seersucker"},{name:"Seagrass",hex:"#4c7055",fabric:"silk crepe, linen"},{name:"Sand",hex:"#f0e6d6",fabric:"raw silk, linen"},{name:"Deep water",hex:"#123c3e",fabric:"light wool, crepe"}],
  /** Short asides under the lists. */
  asides: [
    { title: "The lawn test", text: "Stand on one heel on grass for ten seconds. If it sinks, bring the block heel." },
  ],
  /** Words for the little flower guests can move from ear to ear. */
  flower: {
    left: "Left ear, the side of your heart: spoken for.",
    right: "Right ear: not spoken for. There will be dancing.",
    hint: "Tap the picture to move the flower. It is drawn as you would see it in a mirror.",
    /** Read aloud for the picture, which is a button. */
    moveLeft: "Move the flower to the left ear",
    moveRight: "Move the flower to the right ear",
  },
};
