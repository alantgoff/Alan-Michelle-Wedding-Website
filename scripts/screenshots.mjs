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
const variants = ["v1", "v2", "v3", "v4", "v5"];
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

for (const variant of variants) {
  for (const [label, width, height] of viewports) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    await page.goto(`${base}/${variant}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `screenshots/${variant}-home-${label}.png`, fullPage: true });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  await page.goto(`${base}/${variant}/activities`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `screenshots/${variant}-activities-desktop.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log(`Captured ${variants.length * 3} screenshots in screenshots/`);
