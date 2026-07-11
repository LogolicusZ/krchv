import { getAllYamlIds, loadYamlFile } from "$lib/utils/yaml";

export async function load() {
  const keyboardIds = await getAllYamlIds("keyboards");

  const keyboards = await Promise.all(
    keyboardIds.map(async (id) => {
      const keyboardData = await loadYamlFile("keyboards/" + id);
      return {
        id,
        name: keyboardData?.name,
      };
    })
  );

  return {
    keyboards,
  };
}
