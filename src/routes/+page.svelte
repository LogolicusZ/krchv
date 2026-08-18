<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { motionSafe } from "$lib/utils/motion.svelte";
  import Asciify from "$lib/components/canvasui/Asciify.svelte";
</script>

<svelte:head>
  <title>Home - krchv</title>
</svelte:head>
<Asciify
  class="-m-12 h-[calc(100%+6rem)] w-[calc(100%+6rem)] md:ml-0 md:w-[calc(100%+3rem)]"
  radius={0.4}
  softness={1}
  scale={2}
  spacing={1}
  backgroundOpacity={0}
  contrast={1}
  brightness={0}
  invert={0}
  glow={0.75}
  aberration={0.75}
  strength={1}
  baseStrength={0}
  followSpeed={3}
  charset="ascii"
  background={[0, 0, 0]}>
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
    <a
      href="/table/keyboards"
      class="unset-link font-daydream bg-base-100 inline-block px-7 py-4 text-xs tracking-[0.15em] text-black uppercase no-underline
        [clip-path:polygon(0_8px,8px_8px,8px_0,calc(100%_-_8px)_0,calc(100%_-_8px)_8px,100%_8px,100%_calc(100%_-_8px),calc(100%_-_8px)_calc(100%_-_8px),calc(100%_-_8px)_100%,8px_100%,8px_calc(100%_-_8px),0_calc(100%_-_8px))]
        drop-shadow-[6px_6px_0_#000] transition-[transform,filter] duration-75
        hover:translate-x-[3px] hover:translate-y-[3px] hover:drop-shadow-[3px_3px_0_#000]
        active:translate-x-[6px] active:translate-y-[6px] active:drop-shadow-[0_0_0_#000]
        focus-visible:drop-shadow-[3px_3px_0_#fff] focus-visible:outline-none sm:text-sm"
      in:fly|global={motionSafe({ y: 12, duration: 500, delay: 240, easing: cubicOut })}>
      Browse keyboards
    </a>
  </div>
</div>
</Asciify>
