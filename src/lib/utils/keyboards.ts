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
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const assetsDir = path.resolve(__dirname, '../../assets');

	// Check if filename has any extension at all
	if (!path.extname(filename)) {
		const baseName = filename;
		const yamlPath = path.join(assetsDir, `${baseName}.yaml`);
		const ymlPath = path.join(assetsDir, `${baseName}.yml`);

		// Check for existence of both extensions
		const yamlExists = fs.existsSync(yamlPath);
		const ymlExists = fs.existsSync(ymlPath);

		if (yamlExists && ymlExists) {
			throw new Error(`Both ${baseName}.yml and ${baseName}.yaml exist!`);
		}
		filename = ymlExists ? `${baseName}.yml` : `${baseName}.yaml`;
	}

	try {
		const filePath = path.join(assetsDir, filename);
		const fileContent = fs.readFileSync(filePath, 'utf8');
		return yaml.load(fileContent);
	} catch (err) {
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
		const assetsDir = path.resolve(__dirname, '../../assets/keyboards');

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
