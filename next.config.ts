import type { NextConfig } from "next";

/**
 * Every response says "do not index", including the calendar file, images
 * and the invite redirects. robots.txt lets crawlers in on purpose: a
 * crawler that is shut out never sees this header, and can still list a
 * bare URL it found linked somewhere else.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }] }];
  },
};

export default nextConfig;
