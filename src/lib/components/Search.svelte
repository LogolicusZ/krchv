<script lang="ts">
  import { Search } from "lucide-svelte";
  import { onMount } from "svelte";

  let query = "";
  let results: string[] = []; // Replace `string` with your real data type

  // Simulated data for demo
  const items = ["SvelteKit Guide", "Tailwind Tips", "Lucide Icons", "Component Patterns"];

  function searchItems(q: string) {
    results = items.filter((item) => item.toLowerCase().includes(q.toLowerCase()));
  }

  $: if (query) searchItems(query); // reactive search
</script>

<div>
  <div class="flex items-center justify-center">
    <div class="relative">
      <input
        id="search"
        name="search"
        type="search"
        bind:value={query}
        placeholder=""
        class="peer focus:border-primary border-b border-gray-200 bg-inherit py-1 transition-colors focus:outline-none" />
      <label
        for="search"
        class="peer-focus:text-primary absolute -top-4 left-0 cursor-text text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:opacity-0">
        <span class="flex items-center gap-2"><Search size="18" /> Search the archives...</span>
      </label>
    </div>
  </div>

  {#if query}
    <ul class="mt-4 space-y-2 text-sm text-gray-700">
      {#each results as result}
        <li class="border-b pb-1">{result}</li>
      {/each}
      {#if results.length === 0}
        <li class="text-gray-400">No results found.</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
</style>
