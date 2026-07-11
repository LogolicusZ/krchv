<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";
</script>

<svelte:head>
  <title>Home - krchv</title>
</svelte:head>

<div class="relative flex h-full w-full items-center justify-center">
  <img
    class="absolute top-0 left-0 z-0 h-full w-full object-cover p-0 blur-xs"
    src="/assets/img/banner.avif"
    alt="banner background"
    fetchpriority="high"
    decoding="async" />
  <div class="z-10 flex flex-col items-center space-y-4 px-4 sm:space-y-5 lg:space-y-8">
    <h1
      class="font-daydream text-center text-3xl text-white sm:text-4xl lg:text-5xl"
      in:fly|global={motionSafe({ y: 12, duration: 500, easing: cubicOut })}>
      Keyboard Archive
    </h1>
    <p
      class="mx-auto max-w-xl px-2 text-center text-base text-white sm:text-lg md:text-xl lg:text-2xl"
      in:fly|global={motionSafe({ y: 12, duration: 500, delay: 120, easing: cubicOut })}>
      Discover my collection and also all my keyboard pictures in one space!
    </p>
  </div>
</div>
