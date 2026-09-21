/**
 * Typefaces for the ten design explorations.
 *
 * All serifs — nothing geometric or blocky. Each design picks a pair in
 * designs.css by pointing --display and --body at two of these variables.
 *
 * `preload: false` matters here: ten families are declared, but a browser
 * only downloads the two a given design actually renders with. Preloading
 * would fetch all ten on every page.
 *
 * Every call is spelled out in full because next/font reads these arguments
 * at build time and rejects anything it cannot statically analyse, including
 * a spread of shared options.
 */
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Crimson_Pro,
  EB_Garamond,
  Libre_Baskerville,
  Lora,
  Playfair_Display,
  Spectral,
} from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--f-cormorant",
});
export const lora = Lora({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-lora" });
export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--f-ebgaramond",
});
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--f-playfair",
});
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--f-bodoni",
});
export const crimson = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--f-crimson",
});

// These two ship no variable build, so explicit weights are required.
export const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["300", "400", "600"],
  variable: "--f-spectral",
});
export const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "700"],
  variable: "--f-baskerville",
});

/** Every font variable, for the wrapper element around a design. */
export const allFontVariables = [
  cormorant.variable,
  lora.variable,
  ebGaramond.variable,
  playfair.variable,
  bodoni.variable,
  crimson.variable,
  spectral.variable,
  baskerville.variable,
].join(" ");
