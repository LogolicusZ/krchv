<script lang="ts">
  import { Search } from "lucide-svelte";
  export let keyboards: { id: string; name: string }[] = [];

  let query = "";
  let results: typeof keyboards = [];

  function searchItems(q: string) {
    results = keyboards.filter((kb) => kb.name?.toLowerCase().includes(q.toLowerCase()));
  }

  $: if (query) searchItems(query);
  $: if (!query) results = [];
</script>

<div>
  <div class="relative flex items-center justify-center">
    <input
      id="search"
      name="search"
      type="search"
      bind:value={query}
      placeholder=""
      class="peer focus:border-primary w-full border-b border-gray-200 bg-inherit py-1 transition-colors focus:outline-none" />
    <label
      for="search"
      class="peer-focus:text-primary absolute -top-4 left-0 cursor-text text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:opacity-0">
      <span class="flex items-center gap-2"><Search size="18" /> Search...</span>
    </label>
  </div>

  {#if query}
    <ul class="mt-4 space-y-2 text-sm">
      {#each results as kb}
        <li class="flex border-b border-gray-200 pb-1">
          <a class="text-base-content unset-link w-full no-underline hover:opacity-80" href={`/keyboard/${kb.id}`}>
            {kb.name}
          </a>
        </li>
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
