<script setup lang="ts">
import type { City, IActivityTourismInfo, IRestaurantTourismInfo, IScenicSpotTourismInfo, IType } from '@/types'
import type { Ref } from 'vue'
import VNoData from '@/components/VNoData.vue'

const displayScenicSpot = inject<IScenicSpotTourismInfo[]>('displayScenicSpot')
const displayActivity = inject<IActivityTourismInfo[]>('displayActivity')
const displayRestaurant = inject<IRestaurantTourismInfo[]>('displayRestaurant')
const isLoading = inject<Ref<boolean>>('isLoading')!
const selectedType = inject<IType>('selectedType')!
const setSelectedType = inject<(v: IType) => void>('setSelectedType')!
const selectedCity = inject<City>('selectedCity')!
const setSelectedCity = inject<(v: City) => void>('setSelectedCity')!
const searchKeyword = inject<Ref<string>>('searchKeyword')!

const typeOptions = [
  {
    text: '景點',
    value: 'ScenicSpot',
  },
  {
    text: '活動',
    value: 'Activity',
  },
]

const title = (t: string) => {
  if (selectedCity.City) {
    return `${selectedCity.CityName} ${t}`
  }

  return t
}

onBeforeUnmount(() => {
  setSelectedType({
    text: '',
    value: '',
  })

  setSelectedCity({
    City: '',
    CityCode: '',
    CityID: '',
    CityName: '',
    CountyID: '',
  })
})
</script>
<template>
  <VHeader :typeOptions="typeOptions" />
  <section class="container lg:max-w-screen-lg w-full min-h-full px-5 md:px-10 mx-auto pb-50 md:pb-30 pt-26 md:pt-0">
    <VLoading v-if="isLoading"/>
    <template v-else>
      <template v-if="!selectedType.value && !selectedCity?.City && !searchKeyword">
        <HotCity />
        <HotActivity />
        <SmallCardGroup title="熱門餐飲" type="restaurant" :data="displayRestaurant"/>
      </template>
      <template v-else>
        <template v-if="displayScenicSpot?.length || displayActivity?.length">
          <SmallCardGroup :title="title('景點')" type="scenicSpot" :data="displayScenicSpot" v-if="selectedType.value === 'ScenicSpot' || !selectedType.value" />
          <SmallCardGroup :title="title('活動')" type="activity" :data="displayActivity" v-if="selectedType.value === 'Activity' || !selectedType.value" />
          <VPagination />
        </template>
        <template v-else>
          <VNoData />
        </template>
      </template>
    </template>
  </section>
</template>