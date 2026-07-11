import { getAllYamlIds, loadYamlFile } from "$lib/utils/yaml";
import { resolveImageDimensions } from "$lib/server/images";
import type { Image, Keyboard } from "$lib/types/keyboards";

export async function load() {
  const ids = await getAllYamlIds("keyboards");
  const keyboards = await Promise.all(ids.map((id) => loadYamlFile(`keyboards/${id}`) as Promise<Keyboard>));

  // Flatten every keyboard's images into one pool, tagging alt with the keyboard name.
  const images: Image[] = [];
  for (const kb of keyboards) {
    if (!kb?.images) continue;
    for (const img of resolveImageDimensions(kb.images)) {
      images.push({ ...img, alt: img.alt || kb.name });
    }
  }

  // Fisher-Yates shuffle so the gallery feels unordered / "random".
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  return { images };
}
