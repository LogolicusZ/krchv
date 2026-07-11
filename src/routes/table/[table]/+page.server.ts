import { getAllYamlIds, loadYamlFile } from "$lib/utils/yaml";
import type { Keyboard, Designer, Keycap, Switches } from "$lib/types/keyboards";

interface Params {
  table: string;
}

async function loadReferencedYaml(folder: string, ref: string | string[] | undefined) {
  if (!ref) return undefined;
  if (Array.isArray(ref)) {
    return Promise.all(ref.map((id) => (typeof id === "string" ? loadYamlFile(`${folder}/${id}`) : id)));
  }
  if (typeof ref === "string") {
    return await loadYamlFile(`${folder}/${ref}`);
  }
  return ref; // if it's already an object, just return it
}

export async function load({ params }: { params: Params }) {
  const table = params.table;
  const yamlIds = await getAllYamlIds(table);

  async function normalizeData(
    table: string,
    yaml,
    id: string
  ): Promise<Keyboard | Designer | Keycap | Switches | null> {
    if (table === "keyboards") {
      // load referenced objects
      const designer = yaml?.designer ? await loadYamlFile(`designers/${yaml.designer}`) : undefined;
      const keycaps = yaml?.keycaps?.id
        ? await loadReferencedYaml("keycaps", yaml.keycaps.id)
        : yaml?.keycaps?.name
          ? yaml.keycaps.name
          : undefined;
      const switches = yaml?.switches?.id
        ? await loadReferencedYaml("switches", yaml.switches.id)
        : yaml?.switches?.name
          ? yaml.switches.name
          : undefined;

      return {
        id: yaml?.id,
        name: yaml?.name,
        designer: designer,
        material: yaml?.material,
        keycaps: keycaps,
        switches: switches,
        notes: yaml?.notes ?? "",
        status: yaml?.status ?? "",
      } as Keyboard;
    } else if (table === "designers") {
      return {
        name: yaml?.name,
        url: yaml?.url,
        picture: yaml?.picture,
      } as Designer;
    } else if (table === "keycaps") {
      return {
        name: yaml?.name,
        kits: yaml?.kits,
      } as Keycap;
    } else if (table === "switches") {
      return {
        name: yaml?.name,
        amount: yaml?.amount,
      } as Switches;
    }
    return null;
  }

  // Load and normalize all data in parallel
  const normalized = await Promise.all(
    yamlIds.map(async (id) => {
      const yaml = await loadYamlFile(`${table}/${id}`);
      return normalizeData(table, yaml, id);
    })
  );
  const data = normalized.filter((row) => row != null);

  return {
    tableData: data,
    type: table,
  };
}
