<script setup lang="ts">

const navLinks = reactive([
  {
    text: '台灣景點',
    url: '/',
    icon: 'attraction',
    class: 'text-gray md:text-primary border-primary'
  },
  {
    text: '美食住宿',
    url: '/hotel',
    icon: 'hotel',
    class: 'text-gray md:text-yellow border-yellow',
  },
  {
    text: '景點交通',
    url: '/bus',
    icon: 'bus',
    class: 'text-gray md:text-green border-green',
  },
])

const openSearch = inject<() => {}>('openSearch')!

</script>
<template>
  <nav class="fixed top-0 inset-x-0 bg-white z-2 md:z-10">
    <div class="navbar">
      <div class="w-full md:w-auto flex items-center justify-end relative px-2">
        <div class="flex-1 flex justify-end">
          <router-link to="/">
            <h1 class="text-primary text-lg mx-18 md:mx-2 md:px-2 md:text-xl font-extrabold">
              <TaiwanIcon class="w-4/5 md:w-2/3" />
            </h1>
          </router-link>
        </div>
        <div class="block md:hidden">
          <button
            class="ml-1 rounded bg-primary text-white p-2 text-base font-bold h-full focus:outline-none"
            @click="() => openSearch()"
          >
            <ic:round-search />
          </button>
        </div>
      </div>
      <ul class="nav">
        <router-link v-for="link in navLinks" :to="link.url" class="nav-link" :class="link.class">
          <div class="svg-container">
            <custom:circle-triangle v-if="link.icon === 'attraction'" class="hidden md:block mr-2 scale-120 transform" />
            <custom:circle-square v-if="link.icon === 'hotel'" class="hidden md:block mr-2 scale-120 transform" />
            <custom:circle-circle v-if="link.icon === 'bus'" class="hidden md:block mr-2 scale-120 transform"/>
          </div>
          <span :class="link.class">{{ link.text }}</span>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<style scoped lang="postcss">
.nav .router-link-active {
  @apply md:bg-current;

  & span {
    @apply text-primary md:text-white;
  }

  &:hover {
    & .svg-container {
      @apply animate-pulse
    }
  }
}
.navbar {
  @apply
    lg:max-w-screen-xl
    mx-auto
    md:pl-10 md:pr-4 mb-2
    flex flex-col md:flex-row
    items-center justify-center
  ;
}
.nav {
  @apply
    md:ml-auto
    flex justify-center
    shadow md:shadow-transparent
    rounded 
    mt-5 px-5 pt-2 pb-3 md:px-2
    min-w-11/12 md:min-w-0
    bg-white
  ;
}

.nav-link {
  @apply
    flex items-center justify-center
    py-1 px-2 rounded-l-full
    mx-2 
    whitespace-nowrap;

  & span {
    @apply text-sm md:border-b-1 border-b-0;
  }

  &:hover:not(.router-link-active) {
    & .svg-container {
      @apply animate-bounce
    }
  }
}

</style>