/** "Helena’s Hawaiian Food" → "helenas-hawaiian-food", "Kauaʻi" → "kauai": for anchors. */
export function slug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯʻ’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
