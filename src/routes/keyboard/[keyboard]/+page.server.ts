import { loadYamlFile } from '$lib/utils/keyboards';
import { error } from '@sveltejs/kit';

interface Params {
	keyboard: string;
}

export const prerender = true; // Force prerendering for this route

export async function load({ params }: { params: Params }) {
	const keyboardId = params.keyboard;

	try {
		// Load the keyboard data
		const keyboardData = await loadYamlFile(`keyboards/${keyboardId}`);

		if (!keyboardData) {
			throw error(404, `Keyboard ${keyboardId} not found`);
		}

		try {
			// Load the designer data
			const designerData = await loadYamlFile(`designers/${keyboardData.designer}`);

			return {
				keyboard: keyboardData,
				designer: designerData
			};
		} catch (designerErr) {
			console.error(`Failed to load designer data for ${keyboardData.designer}:`, designerErr);

			// Return keyboard data even if designer data is missing
			return {
				keyboard: keyboardData,
				designer: null
			};
		}
	} catch (keyboardErr) {
		console.error(`Failed to load keyboard data for ${keyboardId}:`, keyboardErr);
		throw error(404, `Keyboard ${keyboardId} not found`);
	}
}
