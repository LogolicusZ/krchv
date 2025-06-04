<script lang="ts">
  import Search from "./Search.svelte";
  import { ChevronDown, Menu, X } from "lucide-svelte";

  let { data } = $props();
  const keyboards = data.keyboards;

  const databases = [
    { name: "Keyboards", path: "keyboards" },
    { name: "Keycaps", path: "keycaps" },
    { name: "Switches", path: "switches" },
    { name: "Accessories", path: "accessories" },
  ];

  // Add state to track if sidebar is open
  let sidebarOpen = $state(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };

  const toggleOffSidebar = () => {
    sidebarOpen = false;
  };
</script>

<button
  onclick={toggleSidebar}
  class="bg-base-100 absolute top-12 left-0 z-40 cursor-pointer rounded-r-full rounded-br-full border-[1px] border-l-0 border-dashed border-gray-400 p-2 pl-3 md:hidden lg:hidden">
  <Menu />
</button>

<div
  class="bg-base-100 fixed top-0 left-0 z-50 flex h-full w-64 min-w-64 flex-col gap-6 overflow-x-visible overflow-y-clip p-12 shadow-lg transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none lg:static lg:translate-x-0 lg:shadow-none {sidebarOpen
    ? 'translate-x-0'
    : '-translate-x-full'}">
  <button onclick={toggleOffSidebar} class="absolute top-12 left-2 cursor-pointer p-1 md:hidden lg:hidden">
    <X />
  </button>
  <a href="/" onclick={toggleOffSidebar}>
    <img class="w-34" alt="krchv" src="/assets/svg/logo.svg" />
  </a>
  <Search {keyboards} />
  <div>
    <p class="text-sm uppercase opacity-50">Keyboards</p>
    <ul>
      {#each keyboards as k}
        <li>
          <a
            class="text-base-content unset-link no-underline hover:opacity-80"
            href="/keyboard/{k.id}"
            onclick={toggleOffSidebar}>
            {k.name}
          </a>
        </li>
      {/each}
      <li>
        <a
          class="unset-link flex items-center gap-1 opacity-65 hover:opacity-80"
          href="/table/keyboards"
          onclick={toggleOffSidebar}>
          <ChevronDown size="18" /> more...
        </a>
      </li>
    </ul>
  </div>
  <div>
    <p class="text-sm uppercase opacity-50">Database</p>
    <ul>
      {#each databases as db}
        <li>
          <a
            class="text-base-content unset-link no-underline hover:opacity-80"
            href="/table/{db.path}"
            onclick={toggleOffSidebar}>
            {db.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="mt-auto flex flex-col">
    <p class="text-sm uppercase opacity-50">Legal</p>
    <!-- <a class="text-base-content unset-link no-underline hover:opacity-80" href="/">Home</a> -->
    <a class="text-base-content unset-link no-underline hover:opacity-80" href="/" onclick={toggleOffSidebar}>
      Imprint
    </a>
    <a class="text-base-content unset-link mb-6 no-underline hover:opacity-80" href="/" onclick={toggleOffSidebar}>
      Privacy Policy
    </a>
    <p>&copy; 2025 LogolicusZ</p>
    <a href="//logolicusz.com">&larr; logolicusz.com</a>
  </div>
</div>
