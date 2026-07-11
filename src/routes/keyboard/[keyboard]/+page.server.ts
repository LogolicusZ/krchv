import type { Designer, Image, Keyboard } from "$lib/types/keyboards";
import { loadYamlFile, getAllYamlIds } from "$lib/utils/yaml";
import { resolveImageDimensions } from "$lib/server/images";
import { error } from "@sveltejs/kit";

interface Params {
  keyboard: string;
}

export const prerender = true; // force prerendering for this route

// make sure page is prerenderable

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const ids = await getAllYamlIds("keyboards");

  return ids.map((id) => ({ keyboard: id }));
}

// main logic

export async function load({ params }: { params: Params }) {
  const keyboardId = params.keyboard;

  try {
    // load the keyboard data
    const keyboardData = (await loadYamlFile(`keyboards/${keyboardId}`)) as Keyboard;

    if (!keyboardData) {
      throw error(404, `Keyboard ${keyboardId} not found`);
    }

    // process images with dimensions
    const images: Image[] = resolveImageDimensions(keyboardData?.images);

    try {
      // load the designer data
      const designerData = (await loadYamlFile(`designers/${keyboardData.designer}`)) as Designer;

      return {
        // merge processed images into keyboard data
        keyboard: { ...keyboardData, images },
        designer: designerData,
      };
    } catch (designerErr) {
      console.error(`Failed to load designer data:`, designerErr);
      return {
        keyboard: { ...keyboardData, images },
        designer: null,
      };
    }
  } catch (keyboardErr) {
    console.error(`Failed to load keyboard data:`, keyboardErr);
    throw error(404, `Keyboard ${keyboardId} not found`);
  }
}
