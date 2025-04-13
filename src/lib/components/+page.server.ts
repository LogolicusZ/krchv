import { getAllKeyboardIds, loadYamlFile } from "$lib/utils/keyboards";

export async function load() {
  const keyboardIds = await getAllKeyboardIds();
  const keyboards = [];

  for (let i = 0; i < keyboardIds.length; i++) {
    const id = keyboardIds[i];
    const keyboardData = await loadYamlFile("keyboards/" + id);
    keyboards.push({
      id: id,
      name: keyboardData?.name,
    });
  }

  return {
    keyboards,
  };
}

export const load: PageServerLoad = async ({ url }) => {
  const query = url.searchParams.get("q")?.toLowerCase() || "";
  const dataDir = path.resolve("src/lib/data/keyboards");
  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".yaml"));

  const keyboards: Keyboard[] = files.map((file) => {
    const content = fs.readFileSync(path.join(dataDir, file), "utf8");
    return yaml.load(content) as Keyboard;
  });

  const results = query ? keyboards.filter((kb) => kb.name.toLowerCase().includes(query)) : [];

  return { results, query };
};
