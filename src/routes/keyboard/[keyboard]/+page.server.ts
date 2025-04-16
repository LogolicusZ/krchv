import type { Designer, Images, Keyboard } from "$lib/types/keyboards";
import { loadYamlFile } from "$lib/utils/keyboards";
import { error } from "@sveltejs/kit";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";

interface Params {
  keyboard: string;
}

export const prerender = true; // force prerendering for this route

export async function load({ params }: { params: Params }) {
  const keyboardId = params.keyboard;

  try {
    // load the keyboard data
    const keyboardData = (await loadYamlFile(`keyboards/${keyboardId}`)) as Keyboard;
    let images: Images[] = [];

    if (!keyboardData) {
      throw error(404, `Keyboard ${keyboardId} not found`);
    }

    // process images with dimensions
    if (keyboardData?.images) {
      images = keyboardData.images.map((img) => {
        const imgPath = path.join(process.cwd(), "static", img.src);

        try {
          const imgBuffer = fs.readFileSync(imgPath);
          const dimensions = sizeOf(imgBuffer);

          return {
            ...img,
            width: dimensions.width || 0,
            height: dimensions.height || 0,
          };
        } catch (e) {
          console.error(`Error processing image ${img.src}:`, e);
          return { ...img, width: 0, height: 0 };
        }
      });
    }

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
