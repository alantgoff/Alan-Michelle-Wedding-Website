import Image from "next/image";

/**
 * The wedding logo: two surfboards, plumeria, waves, "M & A".
 *
 * public/logo.png is the artwork with its white paper removed, so it sits on
 * any background in its own navy ink. To replace it, keep the file name and
 * update the width and height below to the new file's pixel size.
 *
 * Decorative by default (empty alt): everywhere it appears, the names are
 * already written out beside it.
 */
export function Logo({
  className,
  sizes = "160px",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image src="/logo.png" width={985} height={1328} alt="" className={className} sizes={sizes} priority={priority} />
  );
}
