import fs from "fs";
import path from "path";
import { readImageDimensions } from "$lib/server/imageDimensions";
import type { Image } from "$lib/types/keyboards";

/**
 * Resolve intrinsic width/height for a set of images by reading them from the
 * static folder at build time. Falls back to 0x0 for any image that can't be
 * read so a single bad path never breaks the page.
 */
export function resolveImageDimensions(images: Image[] | undefined): Image[] {
  if (!images) return [];

  return images.map((img) => {
    const imgPath = path.join(process.cwd(), "static", img.src);

    try {
      const dimensions = readImageDimensions(fs.readFileSync(imgPath));
      return { ...img, width: dimensions.width || 0, height: dimensions.height || 0 };
    } catch (e) {
      console.error(`Error processing image ${img.src}:`, e);
      return { ...img, width: 0, height: 0 };
    }
  });
}
