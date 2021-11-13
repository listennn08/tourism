<script setup lang="ts">
import { useHome } from '@/logic/useHome'
import { useModal } from './logic/useModal'

const {
  isLoading,
  cityOptions,
  hotCity,
  scenicSpot,
  displayScenicSpot,
  fetchScenicSpot,
  hotActivity,
  activity,
  displayActivity,
  fetchActivity,
  restaurant,
  displayRestaurant,
  fetchRestaurant,
  hotel,
  displayHotel,
  fetchHotel,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  searchKeyword,
  setSearchKeyword,
  fetchData,
  searchByKeyword,
  searchHistory,
  clearSearchHistory,
  reset,
  curPage,
  showNextPage,
} = useHome()

const {
  modalOpen,
  toggleModal,
} = useModal()


const searchOpen = ref(false)

const openSearch = () => searchOpen.value = true
const closeSearch = () => searchOpen.value = false

fetchData()

provide('searchOpen', searchOpen)
provide('openSearch', openSearch)
provide('closeSearch', closeSearch)
provide('reset', reset)
provide('isLoading', isLoading)
provide('cityOptions', cityOptions)
provide('hotCity', hotCity)
provide('hotActivity', hotActivity)
provide('scenicSpot', scenicSpot)
provide('displayScenicSpot', displayScenicSpot)
provide('fetchScenicSpot', fetchScenicSpot)
provide('activity', activity)
provide('displayActivity', displayActivity)
provide('fetchActivity', fetchActivity)
provide('restaurant', restaurant)
provide('displayRestaurant', displayRestaurant)
provide('fetchRestaurant', fetchRestaurant)
provide('hotel', hotel)
provide('displayHotel', displayHotel)
provide('fetchHotel', fetchHotel)
provide('selectedCity', selectedCity)
provide('setSelectedCity', setSelectedCity)
provide('selectedType', selectedType)
provide('setSelectedType', setSelectedType)
provide('searchKeyword', searchKeyword)
provide('setSearchKeyword', setSearchKeyword)
provide('searchByKeyword', searchByKeyword)
provide('searchHistory', searchHistory)
provide('clearSearchHistory', clearSearchHistory)

provide('curPage', curPage)
provide('showNextPage', showNextPage)

provide('modalOpen', modalOpen)
provide('toggleModal', toggleModal)
</script>

<template>
  <main class="main">
    <section class="lg:max-w-screen-xl mx-auto">
      <router-view />
    </section>
    <VFooter />
    <VModal v-if="$route.query.id" />
  </main>
  <VNavbar />
</template>
