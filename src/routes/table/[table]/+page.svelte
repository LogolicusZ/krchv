<script lang="ts">
  let { data }: { data: { tableData: any[]; type: string } } = $props();

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  // get all unique keys from the data array
  let columns: string[] = $state([]);

  if (data.tableData && data.tableData.length > 0) {
    const keySet = new Set<string>();
    data.tableData.forEach((item) => Object.keys(item).forEach((k) => keySet.add(k)));
    columns = Array.from(keySet);
  }
</script>

<svelte:head>
  <title>{capitalize(data.type) + " - krchv" || "krchv"}</title>
</svelte:head>

<h1 class="font-daydream mb-8 text-4xl capitalize">{data.type}</h1>

<div class="overflow-auto">
  {#if data.tableData && data.tableData.length > 0}
    <table class="mt-8 min-w-full table-fixed border-collapse">
      <thead>
        <tr>
          {#each columns as col}
            <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">{col}</th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each data.tableData as row}
          <tr>
            {#each columns as col}
              <td class="p-4 text-left text-sm font-medium">
                {#if row[col] === undefined || row[col] === null}
                  &mdash;
                {:else if typeof row[col] === "string" && row[col].match(/\.(jpg|jpeg|png|gif|webp)$/i)}
                  <img src={row[col]} alt="avatar" class="h-8 w-8 rounded object-cover" />
                {:else if typeof row[col] === "string" && row[col].startsWith("http")}
                  <a href={row[col]} target="_blank" class="text-blue-600 underline">{row[col]}</a>
                {:else if typeof row[col] === "object" && Array.isArray(row[col])}
                  {#each row[col] as item, i (i)}
                    {#if typeof item === "object"}
                      {#if item.name && item.url}
                        <a href={item.url} target="_blank" class="text-blue-600 underline">{item.name}</a>
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
                        <a href={item.url} target="_blank" class="text-blue-600 underline">{item.url}</a>
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
                    <a href={row[col].url} target="_blank" class="text-blue-600 underline">{row[col].name}</a>
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
                    <a href={row[col].url} target="_blank" class="text-blue-600 underline">{row[col].url}</a>
                  {:else}
                    <span>{JSON.stringify(row[col])}</span>
                  {/if}
                {:else if col === "notes"}
                  <span class="prose max-w-none" style="white-space:pre-wrap">
                    {@html row[col]}
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
  {:else}
    <p>No data available.</p>
  {/if}
</div>
