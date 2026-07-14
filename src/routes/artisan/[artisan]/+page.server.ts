import type { Artisan, Image } from "$lib/types/keyboards";
import { loadYamlFile, getAllYamlIds } from "$lib/utils/yaml";
import { resolveImageDimensions } from "$lib/server/images";
import { error } from "@sveltejs/kit";

interface Params {
  artisan: string;
}

export const prerender = true; // force prerendering for this route

// make sure page is prerenderable

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const ids = await getAllYamlIds("artisans");

  return ids.map((id) => ({ artisan: id }));
}

// main logic

export async function load({ params }: { params: Params }) {
  const artisanId = params.artisan;

  try {
    // load the artisan data
    const artisanData = (await loadYamlFile(`artisans/${artisanId}`)) as Artisan;

    if (!artisanData) {
      throw error(404, `Artisan ${artisanId} not found`);
    }

    // process images with dimensions
    const images: Image[] = resolveImageDimensions(artisanData?.images);

    return {
      // merge processed images into artisan data
      artisan: { ...artisanData, images },
    };
  } catch (artisanErr) {
    console.error(`Failed to load artisan data:`, artisanErr);
    throw error(404, `Artisan ${artisanId} not found`);
  }
}
