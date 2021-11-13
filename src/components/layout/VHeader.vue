<script setup lang="ts">
import { ComputedRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { City, IType } from '@/types'

defineProps<{
  typeOptions: IType[]
}>()

const cityOptions = inject<City[]>('cityOptions')!
const searchByKeyword = inject<() => void>('searchByKeyword')!
const searchKeyword = inject<string>('searchKeyword')!
const setSearchKeyword = inject<(v: string) => void>('setSearchKeyword')!
const selectedType = inject('selectedType')!
const setSelectedType = inject<(v: IType) => void>('setSelectedType')!
const selectedCity = inject('selectedCity')!
const setSelectedCity = inject<(v: City) => void>('setSelectedCity')!
const reset = inject<() => void>('reset')!

const closeSearch = inject<() => void>('closeSearch')!
const searchHistory = inject<string[]>('searchHistory')!
const clearSearchHistory = inject<() => void>('clearSearchHistory')!

const searchOpen = inject<ComputedRef<boolean>>('searchOpen')!
watch(searchOpen, () => searchOpen.value)

const showHistory = () => {
  historyOpen.value = true
}
const historyOpen = ref(false)

const hideHistory = () => {
  historyOpen.value = false
}
const route = useRoute()

const bannerClass = computed(() => {
  if (route.path.includes('hotel')) {
    return 'hotel'
  }
  return ''
})

const getHistory = (history: string) => {
  setSearchKeyword(history)
  hideHistory()
}
const target = ref(null)

onClickOutside(target, () => hideHistory())
</script>
<template>
  <header class="header">
    <div class="header-container custom-shadow">
      <div class="header-content" :class="bannerClass">
        <div class="w-full lg:w-2/5 md:w-3/5 mx-auto">
          <h2 class="hidden lg:block text-5xl font-bold text-white">
            Welcome to 
            <span class="text-primary">Taiwan°</span>
          </h2>
          <p class="hidden lg:block text-white text-sm leading-10">台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
          <div>
            <div
              class="search-container"
              :class="searchOpen ? 'w-full right-0' : 'w-0 -right-5'"
            >
              <div class="w-11/12 md:w-full relative" ref="target">
                <VInput 
                  :value="searchKeyword"
                  @change="(e: any) => setSearchKeyword(e.target.value)"
                  :focus="showHistory"
                  :enterFn="searchByKeyword"
                  placeholder="搜尋關鍵字，請按 Enter 搜尋"
                  class="h-10"/>
                <div
                  class="dropdown"
                  :class="{ hidden: !historyOpen }"
                >
                  <div class="bg-white rounded-b px-6">
                    <button
                      v-for="history in searchHistory"
                      :key="history"
                      class="py-2 text-gray w-full text-left" 
                      @click="getHistory(history)"
                    >
                      {{ history }}
                    </button>
                  </div>
                  <div class="flex justify-end">
                    <a href="#" @click.prevent="clearSearchHistory" class="text-primary">清除搜尋</a>
                  </div>
                </div>
              </div>
              <button
                class="md:hidden ml-1 rounded bg-primary text-white p-2 text-xl font-bold focus:outline-none"
                @click="closeSearch"
              >
                <ic:round-close />
              </button>
            </div>
            <div class="flex w-full">
              <VSelect 
                :value="selectedType"
                :options="typeOptions"
                :change="setSelectedType"
                placeholder="類別"
                class="w-1/3 md:w-1/2 mr-2"
                text="text"
                keyValue="value"
              />
              <VSelect
                :value="selectedCity"
                :options="cityOptions"
                :change="setSelectedCity"
                class="w-1/2"
                placeholder="不分縣市"
                text="CityName"
                keyValue="City"
              />
              <button
                class="ml-1 rounded bg-primary text-white p-2 font-bold h-full focus:outline-none"
                @click="reset"
              >
                <ic:round-close class="hidden md:block text-xl" />
                <span class="block md:hidden text-sm py-0.5">清除</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped lang="postcss">
.header {
  @apply fixed md:relative top-36 md:top-0 inset-x-0 z-4;
}

.header-container {
  @apply
    flex
    flex-col items-center justify-center
    lg:h-140 md:h-40
    bg-white
    p-4 md:p-8
    relative
    mb-10
  ;
}

.header-content {
  @apply 
    w-full h-full
    flex items-center justify-center
    lg:bg-center lg:bg-cover lg:bg-no-repeat
    bg-none bg-white
  ;
}

.header-content {
  @media (min-width: 1024px) {
    background-image: url('/src/assets/banner.jpeg');
  }

}

.header-content.hotel {
  @media (min-width: 1024px) {
    background-image: url('/src/assets/hotel-banner-1.jpeg');
  }
}

.search-container {
  @apply
    max-w-full md:w-full
    flex
    mb-2.5
    py-6 md:py-0 md:p-0
    fixed md:relative
    bg-gray-light 
    transition-all
    top-0 px-1 md:right-0
    rounded
    z-2
  ;
}

.dropdown {
  @apply 
    md:hidden
    absolute inset-x-0 top-10
    bg-warm-gray-200
    shadow
    pt-0
    rounded-b
  ;
}
</style>