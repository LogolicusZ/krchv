<script lang="ts">
  import Gallery from "$lib/components/Gallery.svelte";
  import Status from "$lib/components/Status.svelte";
  import { error } from "@sveltejs/kit";
  import { sanitizeHtml } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";

  let { data } = $props();

  // if artisan data is not available, throw an error
  if (!data?.artisan) {
    error(404, "The requested artisan information could not be loaded");
  }

  const artisan = $derived(data.artisan);
</script>

<svelte:head>
  <title>{artisan?.name ? artisan.name + " - krchv" : "krchv"}</title>
</svelte:head>

<h1 class="font-daydream text-4xl" in:fly|global={motionSafe({ y: 12, duration: 450, easing: cubicOut })}>
  {artisan?.name}
</h1>

<table
  class="mt-4 w-full table-fixed border-collapse lg:w-[32rem]"
  in:fly|global={motionSafe({ y: 12, duration: 450, delay: 100, easing: cubicOut })}>
  <tbody class="divide-y divide-gray-200">
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Maker</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if artisan && artisan.maker}
          <p>{artisan.maker}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Sculpt</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if artisan && artisan.sculpt}
          <p>{artisan.sculpt}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Colorway</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if artisan && artisan.colorway}
          <p>{artisan.colorway}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Status</th>
      <td class="py-4 text-left text-sm font-medium">
        <Status status={artisan.status} />
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Notes</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if artisan && artisan.notes}
          <span class="prose max-w-none whitespace-pre-wrap">
            <!-- eslint-disable-next-line svelte/no-at-html-tags (content is sanitized with DOMPurify) -->
            {@html sanitizeHtml(artisan.notes)}
          </span>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
  </tbody>
</table>

<Gallery data={artisan} />
