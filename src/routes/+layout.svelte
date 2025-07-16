<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import "../app.css";
  let { children, data } = $props();
</script>

<svelte:head>
  <title>krchv</title>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://krchv.logolicusz.com/" />
  <meta property="og:title" content="Home - krchv" />
  <meta property="og:description" content="Discover my collection and also all my keyboard pictures in one space!" />
  <meta property="og:image" content="/assets/img/preview.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://krchv.logolicusz.com/" />
  <meta property="twitter:title" content="Home - krchv" />
  <meta property="twitter:description" content="Discover my collection and also all my keyboard pictures in one space!" />
  <meta property="twitter:image" content="/assets/img/Preview.png" />
</svelte:head>

<main class="flex h-dvh w-full overflow-hidden">
  <Navbar {data} />
  <div class="h-full w-full overflow-auto p-12 pl-12 md:pl-0 lg:pl-0">
    {@render children()}
  </div>
</main>
