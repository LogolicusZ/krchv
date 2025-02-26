import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import type { Keyboard } from '$lib/types/keyboards';

/**
 * Loads a YAML file from the src/assets directory
 * @param filename - The name of the YAML file (with or without extension)
 * @returns The parsed YAML content as a JavaScript object
 */
export async function loadYamlFile(filename: string): Promise<Keyboard | undefined> {
	// Ensure filename has .yml or .yaml extension
	if (!filename.endsWith('.yml') && !filename.endsWith('.yaml')) {
		filename = `${filename}.yaml`;
	}

	try {
		const __dirname = path.dirname(fileURLToPath(import.meta.url)); // get the directory of the current module

		// construct the absolute path to the assets directory
		const assetsDir = path.resolve(__dirname, '../../assets');
		const filePath = path.join(assetsDir, filename);

		// read the file
		const fileContent = fs.readFileSync(filePath, 'utf8');

		// parse yaml data
		const parsedData = yaml.load(fileContent);
		return parsedData;
	} catch (err) {
		// throw error on failure
		console.error(`Error loading YAML file ${filename}:`, err);
		throw err;
	}
}

/**
 * Gets all keyboard IDs by reading files in the assets directory
 * @returns Array of keyboard IDs (filenames without extensions)
 */
export async function getAllKeyboardIds(): Promise<string[]> {
	try {
		const __dirname = path.dirname(fileURLToPath(import.meta.url)); // get the directory of the current module

		// construct the absolute path to the assets directory
		const assetsDir = path.resolve(__dirname, '../../assets');

		// read all files in the directory
		const files = fs.readdirSync(assetsDir);

		// filter for yaml files and remove extensions to get keyboard IDs
		const keyboardIds = files
			.filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'))
			.map((file) => {
				const extension = path.extname(file);
				return path.basename(file, extension);
			});

		return keyboardIds;
	} catch (err) {
		console.error('Error reading keyboard files:', err);
		throw err;
	}
}
