/**
 * Fills the {placeholders} in a line from the content files:
 *
 *   fill("{days} days until we celebrate", { days: 412 })  →  "412 days until we celebrate"
 *
 * The words stay in content/, where anyone can edit them; only the numbers
 * and times come from code. A placeholder with no value is left as written,
 * so a typo shows up on the page rather than vanishing.
 */
export function fill(line: string, values: Record<string, string | number>): string {
  return line.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}
