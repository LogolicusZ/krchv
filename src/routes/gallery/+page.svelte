<script lang="ts">
  import Gallery from "$lib/components/Gallery.svelte";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Gallery - krchv</title>
  <meta name="description" content="Every keyboard picture in the krchv archive, in one big gallery." />
</svelte:head>

<h1 class="font-daydream text-4xl" in:fly|global={motionSafe({ y: 12, duration: 450, easing: cubicOut })}>Gallery</h1>

<Gallery data={{ name: "Gallery", images: data.images }} heroFirst={false} />
