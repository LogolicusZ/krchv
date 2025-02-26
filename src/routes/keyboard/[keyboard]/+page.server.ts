import { loadYamlFile } from '$lib/utils/keyboards';
import { error } from '@sveltejs/kit';

interface Params {
	keyboard: string;
}

export const prerender = true; // Force prerendering for this route

export async function load({ params }: { params: Params }) {
	const keyboardId = params.keyboard;

	try {
		// Use the loadYamlFile function to load the keyboard data
		const keyboardData = await loadYamlFile(`keyboards/${keyboardId}`);

		return {
			keyboard: keyboardData
		};
	} catch (err) {
		console.error(`Failed to load keyboard data for ${keyboardId}:`, err);
		throw error(404, `Keyboard ${keyboardId} not found`);
	}
}
