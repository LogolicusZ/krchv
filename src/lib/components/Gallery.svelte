<script lang="ts">
  import "photoswipe/dist/photoswipe.css";
  import type { Image } from "$lib/types/keyboards";
  import PhotoSwipe, { type PreparedPhotoSwipeOptions } from "photoswipe";
  import PhotoSwipeLightbox, { type PhotoSwipeOptions } from "photoswipe/lightbox";

  let {
    data,
    individual = false,
    heroFirst = true,
  }: {
    data: { name: string; images?: Image[] };
    individual?: boolean;
    /** Render the first image as a large hero above the masonry (default). Set false for a uniform grid. */
    heroFirst?: boolean;
  } = $props();

  // Images shown in the masonry columns: everything after the hero, or all of them when there is no hero.
  const masonryImages = $derived(
    Array.isArray(data.images) ? (heroFirst ? data.images.slice(1) : data.images) : []
  );

  let gallery: HTMLDivElement | undefined = $state();
  let options: PreparedPhotoSwipeOptions | undefined = $state(undefined);

  /**
   * Reveal an image (fade + rise) once it has decoded. The pre-reveal state is
   * applied from JS so images stay visible without scripting, and cached images
   * that are already complete skip straight to the loaded state.
   */
  function revealOnLoad(node: HTMLImageElement) {
    const reveal = () => {
      node.classList.remove("is-loading");
      node.classList.add("is-loaded");
    };
    if (node.complete && node.naturalWidth > 0) {
      node.classList.add("is-loaded");
    } else {
      node.classList.add("is-loading");
      node.addEventListener("load", reveal, { once: true });
      node.addEventListener("error", reveal, { once: true });
    }
    return {
      destroy() {
        node.removeEventListener("load", reveal);
        node.removeEventListener("error", reveal);
      },
    };
  }

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
    {#if heroFirst && data.images[0]}
      <a
        href={data.images[0].src}
        data-pswp-width={data.images[0].width}
        data-pswp-height={data.images[0].height}
        target="_blank">
        <img
          use:revealOnLoad
          src={data.images[0].src}
          alt={data.images[0].alt || data.name}
          width={data.images[0].width || undefined}
          height={data.images[0].height || undefined}
          decoding="async"
          fetchpriority="high"
          class="gallery-img mb-4 block cursor-zoom-in rounded-sm transition-transform hover:scale-[0.985]" />
      </a>
    {/if}

    {#if masonryImages.length > 0}
      <div class="min-w-[min(calc(3*18rem+4*1rem),100%)] columns-[3_18rem] gap-4">
        {#each masonryImages as image}
          <a href={image.src} data-pswp-width={image.width} data-pswp-height={image.height} target="_blank">
            <img
              use:revealOnLoad
              src={image.src}
              alt={image.alt || data.name}
              width={image.width || undefined}
              height={image.height || undefined}
              loading="lazy"
              decoding="async"
              class="gallery-img mb-4 block cursor-zoom-in rounded-sm transition-transform hover:scale-[0.985]" />
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .gallery-img:global(.is-loading) {
    opacity: 0;
    transform: translateY(8px);
  }

  .gallery-img:global(.is-loaded) {
    opacity: 1;
    transform: none;
    transition:
      opacity 400ms ease,
      transform 400ms ease;
  }
</style>
