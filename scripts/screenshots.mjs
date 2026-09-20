/**
 * Capture home + activities screenshots for every design variant.
 *
 * CHROMIUM_PATH lets a sandboxed environment point at a preinstalled browser
 * instead of downloading one. Locally you can ignore it: Playwright finds its
 * own browser after `npx playwright install chromium`.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";

const base = process.env.BASE_URL || "http://localhost:3000";
const pages = ["", "travel", "activities", "story", "dress-code", "faq", "registry"];
const viewports = [
  ["mobile", 390, 844],
  ["desktop", 1440, 1000],
];

// Prefer an explicitly provided browser, then a known preinstalled location.
const candidates = [
  process.env.CHROMIUM_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));

await fs.mkdir("screenshots", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const page of pages) {
  for (const [label, width, height] of viewports) {
    const tab = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await tab.goto(`${base}/${page}`, { waitUntil: "networkidle" });
    await tab.screenshot({ path: `screenshots/${page || "home"}-${label}.png`, fullPage: true });
    await tab.close();
  }
}

await browser.close();
console.log(`Captured ${pages.length * viewports.length} screenshots in screenshots/`);
