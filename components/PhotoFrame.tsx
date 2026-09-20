import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";

type Shape = "wide" | "portrait" | "square";

/**
 * Renders a photo from the manifest in content/photos.ts.
 *
 * While an entry is still a generated stand-in it carries a small visible
 * label, so nobody mistakes the placeholder water for a real photograph.
 */
export function PhotoFrame({
  name,
  shape = "wide",
  sizes = "100vw",
  priority = false,
}: {
  name: PhotoKey;
  shape?: Shape;
  sizes?: string;
  priority?: boolean;
}) {
  const photo = photos[name];
  return (
    <figure className={`frame ${shape}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} />
      {"standin" in photo && photo.standin ? <figcaption className="standin">Placeholder</figcaption> : null}
    </figure>
  );
}

/** Bare image for full-bleed backgrounds, where a frame and label would intrude. */
export function PhotoBackdrop({ name, priority = false }: { name: PhotoKey; priority?: boolean }) {
  const photo = photos[name];
  return <Image src={photo.src} alt="" fill sizes="100vw" priority={priority} aria-hidden />;
}
