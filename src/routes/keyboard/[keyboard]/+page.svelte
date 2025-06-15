<script lang="ts">
  import Gallery from "$lib/components/Gallery.svelte";
  import { error } from "@sveltejs/kit";
  import DOMPurify from "isomorphic-dompurify";

  let { data } = $props();

  // if keyboard data is not available, throw an error
  if (!data?.keyboard) {
    error(404, "The requested keyboard information could not be loaded");
  }

  const keyboard = $derived(data.keyboard);
  const designer = $derived(data.designer);

  // sanitize html
  function sanitizeHtml(html: string) {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["br", "b", "strong", "i", "em", "mark", "a", "span", "u"],
      ALLOWED_ATTR: ["href", "target", "class", "style"],
    });
  }
</script>

<svelte:head>
  <title>{keyboard?.name + " - krchv" || "krchv"}</title>
</svelte:head>

<h1 class="font-daydream text-4xl">{keyboard?.name}</h1>

<table class="mt-4 w-full table-fixed border-collapse lg:w-[32rem]">
  <tbody class="divide-y divide-gray-200">
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Designer</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if designer && designer.url && designer.name}
          <a href={designer.url}>{designer.name}</a>
        {:else if designer && designer.name}
          <p>{designer.name}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Material</th>
      <td class="flex flex-row items-center gap-2 py-4 text-left text-sm font-medium">
        {#if keyboard && keyboard.material.finish && keyboard.material.color}
          <div class="min-h-4 min-w-4 rounded-full" style:background-color={keyboard.material.color}></div>
          <p>{keyboard.material.finish}</p>
        {:else if keyboard && keyboard.material.finish}
          <p>{keyboard.material.finish}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Keycaps</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if keyboard && keyboard.keycaps && keyboard.keycaps.url && keyboard.keycaps.name}
          <a href={keyboard.keycaps.url}>{keyboard.keycaps.name}</a>
        {:else if keyboard && keyboard.keycaps && keyboard.keycaps.name}
          <p>{keyboard.keycaps.name}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Switches</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if keyboard && keyboard.switches && keyboard.switches.url && keyboard.switches.name}
          <a href={keyboard.switches.url}>{keyboard.switches.name}</a>
        {:else if keyboard && keyboard.switches && keyboard.switches.name}
          <p>{keyboard.switches.name}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Status</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if keyboard.status}
          <p>{keyboard.status}</p>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Notes</th>
      <td class="py-4 text-left text-sm font-medium">
        {#if keyboard && keyboard.notes}
          <!-- eslint-disable-next-line svelte/no-at-html-tags (content is sanitized with DOMPurify) -->
          <span class="prose max-w-none whitespace-pre-wrap">
            {@html sanitizeHtml(keyboard.notes)}
          </span>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="p-4 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">Soundtest</th>
      <td class="py-4 text-left text-sm font-medium">
        <!-- eslint-disable-next-line svelte/no-at-html-tags (content is sanitized with DOMPurify) -->
        {#if keyboard.soundtest}
          <iframe
            width="280"
            height="156"
            src="https://youtube.com/embed/{keyboard.soundtest}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            class="hidden rounded-sm md:block lg:block"
            allowfullscreen>
          </iframe>
          <a class="inline md:hidden lg:hidden" href="https://www.youtube.com/watch?v={keyboard.soundtest}">
            Watch on YouTube
          </a>
        {:else}
          <p>&mdash;</p>
        {/if}
      </td>
    </tr>
  </tbody>
</table>

<Gallery data={keyboard} />
