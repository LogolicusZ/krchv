<script lang="ts">
  import { Search } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";

  let { keyboards = [] }: { keyboards?: { id: string; name: string }[] } = $props();

  let query = $state("");

  const results = $derived(
    query ? keyboards.filter((kb) => kb.name?.toLowerCase().includes(query.toLowerCase())) : []
  );
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
      {#each results as kb, i (kb.id)}
        <li
          class="flex border-b border-gray-200 pb-1"
          in:fly|global={motionSafe({ y: 6, duration: 200, delay: i * 25, easing: cubicOut })}>
          <a class="text-base-content unset-link w-full no-underline hover:opacity-80" href={`/keyboard/${kb.id}`}>
            {kb.name}
          </a>
        </li>
      {/each}
      {#if results.length === 0}
        <li class="text-gray-400" in:fly|global={motionSafe({ y: 6, duration: 200, easing: cubicOut })}>
          No results found.
        </li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
</style>
