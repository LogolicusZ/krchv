<script lang="ts">
  import { capitalize } from "$lib/utils";
  import Status from "$lib/components/Status.svelte";
  import { ChevronUp, ChevronDown } from "lucide-svelte";
  import { sanitizeHtml } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";

  // props
  let { data } = $props<{ data: { tableData: any[]; type: string } }>();

  // all columns and filtered columns
  let allColumns = $state<string[]>([]);
  let columns = $state<string[]>([]);

  // sorting state, kept per table so each table sorts on its own
  type Sort = { column: string | null; direction: "asc" | "desc" | null };
  let sorts = $state<Record<string, Sort>>({});

  // data buffers
  let originalData = $state<any[]>([]);

  // set up originalData + columns on data change
  $effect(() => {
    const rows = data.tableData || [];
    originalData = rows.slice();

    const keys = new Set<string>();
    for (const row of rows) {
      Object.keys(row).forEach((k) => keys.add(k));
    }

    const colArray = Array.from(keys);
    allColumns = colArray;
    columns =
      data.type === "keyboards" || data.type === "artisans"
        ? colArray.filter((c) => c !== "id")
        : colArray;
  });

  /**
   * Extract a primitive sort key (string or number) from any cell value.
   */
  function getSortKey(val: any): string | number | null {
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") return val.toLowerCase();

    if (Array.isArray(val)) {
      const parts = val.map((item) => {
        if (item == null) return "";
        if (typeof item === "object") {
          return (item.name as string) || (item.finish as string) || JSON.stringify(item);
        }
        return String(item);
      });
      return parts.join(", ").toLowerCase();
    }

    if (typeof val === "object") {
      const o = val as Record<string, any>;
      const pick = (o.name as string) || (o.finish as string) || JSON.stringify(o);
      return pick.toLowerCase();
    }

    return String(val).toLowerCase();
  }

  /**
   * Sort rows by the current sort state of the given table.
   */
  function sortRows(rows: any[], table: string): any[] {
    const column = sorts[table]?.column;
    const direction = sorts[table]?.direction;
    if (!column || !direction) return rows;

    return rows.slice().sort((a, b) => {
      const aRaw = a[column],
        bRaw = b[column];
      const aKey = getSortKey(aRaw),
        bKey = getSortKey(bRaw);

      if (aKey == null && bKey == null) return 0;
      if (aKey == null) return 1;
      if (bKey == null) return -1;

      if (typeof aKey === "number" && typeof bKey === "number") {
        return direction === "asc" ? aKey - bKey : bKey - aKey;
      }

      const aStr = String(aKey),
        bStr = String(bKey);
      return direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }

  // keyboards are split into the current collection and those sold / traded away
  const splitByStatus = $derived(data.type === "keyboards");

  function isGone(row: any): boolean {
    const s = String(row?.status ?? "")
      .trim()
      .toLowerCase();
    return s.startsWith("sold") || s.startsWith("traded");
  }

  const allData = $derived(sortRows(originalData, "all"));
  const collectionData = $derived(sortRows(originalData.filter((row) => !isGone(row)), "collection"));
  const goneData = $derived(sortRows(originalData.filter((row) => isGone(row)), "gone"));

  // onclick cycle: default → asc → desc
  function toggleSort(table: string, col: string) {
    const sort = sorts[table];
    if (sort?.column !== col) {
      sorts[table] = { column: col, direction: "asc" };
    } else if (sort.direction === "asc") {
      sorts[table] = { column: col, direction: "desc" };
    } else {
      sorts[table] = { column: null, direction: null };
    }
  }
</script>

<svelte:head>
  <title>{data.type ? capitalize(data.type) + " - krchv" : "krchv"}</title>
</svelte:head>

<h1 class="font-daydream mb-8 text-4xl capitalize">{data.type}</h1>

{#snippet dataTable(table: string, rows: any[])}
  <div class="overflow-auto">
    <table class="mt-8 min-w-full table-fixed border-collapse">
      <thead>
        <tr>
          {#each columns as col}
            <th
              class="cursor-pointer p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50 select-none"
              onclick={() => toggleSort(table, col)}>
              <span class="flex items-center space-x-1">
                <span>{col}</span>
                {#if sorts[table]?.column === col && sorts[table]?.direction === "asc"}
                  <span in:fly|global={motionSafe({ y: -4, duration: 180, easing: cubicOut })}>
                    <ChevronUp size="16" />
                  </span>
                {:else if sorts[table]?.column === col && sorts[table]?.direction === "desc"}
                  <span in:fly|global={motionSafe({ y: 4, duration: 180, easing: cubicOut })}>
                    <ChevronDown size="16" />
                  </span>
                {/if}
              </span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each rows as row}
          <tr class="hover:bg-primary/5 transition-colors duration-150">
            {#each columns as col}
              <td class="p-4 text-left text-sm font-medium">
                {#if row[col] === undefined || row[col] === null || row[col] === ""}
                  &mdash;
                {:else if data.type === "keyboards" && col === "name" && row[col] != null}
                  <a href="/keyboard/{row.id}">
                    {row[col]}
                  </a>
                {:else if data.type === "artisans" && col === "name" && row[col] != null}
                  <a href="/artisan/{row.id}">
                    {row[col]}
                  </a>
                {:else if col === "status" && typeof row[col] === "string"}
                  <Status status={row[col]} />
                {:else if typeof row[col] === "string" && row[col].match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)}
                  <img src={row[col]} alt="avatar" class="h-8 w-8 rounded object-cover" />
                {:else if typeof row[col] === "string" && row[col].startsWith("http")}
                  <a href={row[col]} target="_blank">{row[col]}</a>
                {:else if typeof row[col] === "object" && Array.isArray(row[col])}
                  {#each row[col] as item, i (i)}
                    {#if typeof item === "object"}
                      {#if item.name && item.url}
                        <a href={item.url} target="_blank">{item.name}</a>
                        {i < row[col].length - 1 ? ", " : ""}
                      {:else if item.finish && item.color}
                        <span class="inline-flex items-center">
                          <span
                            class="mr-1 min-h-4 min-w-4 rounded-full"
                            style="background-color: {item.color}; display:inline-block; width:16px; height:16px;">
                          </span>
                          <span>{item.finish}</span>
                        </span>
                        {i < row[col].length - 1 ? ", " : ""}
                      {:else if item.finish}
                        <span>{item.finish}</span>
                        {i < row[col].length - 1 ? ", " : ""}
                      {:else if item.name}
                        <span>{item.name}</span>
                        {i < row[col].length - 1 ? ", " : ""}
                      {:else if item.url}
                        <a href={item.url} target="_blank">{item.url}</a>
                        {i < row[col].length - 1 ? ", " : ""}
                      {:else}
                        <span>{JSON.stringify(item)}</span>
                        {i < row[col].length - 1 ? ", " : ""}
                      {/if}
                    {:else}
                      <span>{item}</span>
                      {i < row[col].length - 1 ? ", " : ""}
                    {/if}
                  {/each}
                {:else if typeof row[col] === "object" && row[col] !== null}
                  {#if row[col].name && row[col].url}
                    <a href={row[col].url} target="_blank">{row[col].name}</a>
                  {:else if row[col].finish && row[col].color}
                    <span class="inline-flex items-center">
                      <span
                        class="mr-1 min-h-4 min-w-4 rounded-full"
                        style="background-color: {row[col].color}; display:inline-block; width:16px; height:16px;">
                      </span>
                      <span>{row[col].finish}</span>
                    </span>
                  {:else if row[col].finish}
                    <span>{row[col].finish}</span>
                  {:else if row[col].name}
                    <span>{row[col].name}</span>
                  {:else if row[col].url}
                    <a href={row[col].url} target="_blank">{row[col].url}</a>
                  {:else}
                    <span>{JSON.stringify(row[col])}</span>
                  {/if}
                {:else if col === "notes"}
                  <span class="prose max-w-none whitespace-pre-wrap">
                    <!-- eslint-disable-next-line svelte/no-at-html-tags (content is sanitized with DOMPurify) -->
                    {@html sanitizeHtml(row[col])}
                  </span>
                {:else}
                  {row[col]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/snippet}

{#if originalData.length > 0}
  {#if splitByStatus}
    {#if collectionData.length > 0}
      {@render dataTable("collection", collectionData)}
    {/if}
    {#if goneData.length > 0}
      {@render dataTable("gone", goneData)}
    {/if}
  {:else}
    {@render dataTable("all", allData)}
  {/if}
{:else}
  <p>No data available.</p>
{/if}
