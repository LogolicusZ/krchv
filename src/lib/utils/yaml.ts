import fs from "fs";
import path from "path";
import yaml from "js-yaml";
// import type { Designer, Keyboard } from "$lib/types/keyboards";

/**
 * Loads a YAML file from the static/assets/data directory
 * @param filename - The name of the YAML file (with or without extension)
 * @returns The parsed YAML content as a JavaScript object
 */
export async function loadYamlFile(filename: string): Promise<any> {
  // Point to the top-level static folder, regardless of file
  const assetsDir = path.resolve(process.cwd(), "src/assets");

  // Add extension if missing
  if (!path.extname(filename)) {
    const baseName = filename;
    const yamlPath = path.join(assetsDir, `${baseName}.yaml`);
    const ymlPath = path.join(assetsDir, `${baseName}.yml`);

    const yamlExists = fs.existsSync(yamlPath);
    const ymlExists = fs.existsSync(ymlPath);

    if (yamlExists && ymlExists) {
      throw new Error(`Both ${baseName}.yml and ${baseName}.yaml exist!`);
    }

    filename = ymlExists ? `${baseName}.yml` : `${baseName}.yaml`;
  }

  try {
    const filePath = path.join(assetsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContent);
  } catch (err) {
    console.error(`Error loading YAML file ${filename}:`, err);
    throw err;
  }
}

/**
 * Gets all YAML file IDs (filenames without extension) from static/assets/data/<dir>
 * @param dir - Subdirectory inside static/assets/data (e.g., "keyboards", "designers")
 * @returns Array of file base names without extension
 */
export async function getAllYamlIds(dir: string): Promise<string[]> {
  try {
    const assetsDir = path.resolve(process.cwd(), `src/assets/${dir}`);

    const files = fs.readdirSync(assetsDir);

    return files
      .filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"))
      .map((file) => path.basename(file, path.extname(file)));
  } catch (err) {
    console.error("Error reading YAML files from:", dir, err);
    throw err;
  }
}
