<script lang="ts">
  import "photoswipe/dist/photoswipe.css";
  import type { Keyboard } from "$lib/types/keyboards";
  import PhotoSwipe, { type PreparedPhotoSwipeOptions } from "photoswipe";
  import PhotoSwipeLightbox, { type PhotoSwipeOptions } from "photoswipe/lightbox";

  let {
    data,
    individual = false,
  }: {
    data: Keyboard;
    individual?: boolean;
  } = $props();

  let gallery: HTMLDivElement | undefined = $state();
  let options: PreparedPhotoSwipeOptions | undefined = $state(undefined);

  $effect(() => {
    if (!gallery || !Array.isArray(data.images)) return;

    const opts: PhotoSwipeOptions = {
      pswpModule: PhotoSwipe,
      children: "a", // Selector for gallery items
      gallery: gallery, // Container element
    };

    if (individual) {
      opts.children = undefined;
      opts.gallerySelector = gallery;
    }

    options = opts;
  });

  $effect(() => {
    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();

    return () => lightbox.destroy();
  });
</script>

{#if data?.images && data.images.length > 0}
  <div class="mt-6" bind:this={gallery}>
    {#if data.images[0]}
      <a
        href={data.images[0].src}
        data-pswp-width={data.images[0].width}
        data-pswp-height={data.images[0].height}
        target="_blank">
        <img
          src={data.images[0].src}
          alt={data.images[0].alt || data.name}
          class="mb-4 block cursor-zoom-in rounded-sm transition-transform hover:scale-[0.985]" />
      </a>
    {/if}

    {#if data.images.length > 1}
      <div class="w-[min(calc(3*18rem+4*1rem),90%)] columns-[3_18rem] gap-4">
        {#each data.images.slice(1) as image}
          <a href={image.src} data-pswp-width={image.width} data-pswp-height={image.height} target="_blank">
            <img
              src={image.src}
              alt={image.alt || data.name}
              class="mb-4 block cursor-zoom-in rounded-sm transition-transform hover:scale-[0.985]" />
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}
