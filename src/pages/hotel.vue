<script setup lang="ts">
import type { Ref } from 'vue'
import type {
  IRestaurantTourismInfo,
  IHotelTourismInfo,
  IType,
  City
} from '@/types'

const isLoading = inject<Ref<boolean>>('isLoading')
const displayRestaurant = inject<IRestaurantTourismInfo[]>('displayRestaurant')
const displayHotel = inject<IHotelTourismInfo[]>('displayHotel')
const selectedType = inject<IType>('selectedType')!
const setSelectedType = inject<(v: IType) => void>('setSelectedType')!
const selectedCity = inject<City>('selectedCity')!
const setSelectedCity = inject<(v: City) => void>('setSelectedCity')!
const searchKeyword = inject<string>('searchKeyword')!
const refetch = inject<() => void>('refetch')!

const typeOptions = [
  {
    text: '美食',
    value: 'Restaurant',
  },
  {
    text: '住宿',
    value: 'Hotel'
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

refetch()

</script>
<template>
  <VHeader :typeOptions="typeOptions" />
  <section class="container lg:max-w-screen-lg w-full px-5 md:px-10 mx-auto pb-50 md:pb-30 pt-26 md:pt-0">
    <VLoading v-if="isLoading"/>
    <template v-else>
      <template v-if="!selectedType.value && !selectedCity?.City && !searchKeyword">
        <SmallCardGroup title="熱門餐飲" :data="displayRestaurant" type="restaurant" />
        <SmallCardGroup title="推薦住宿" :data="displayHotel" type="hotel"/>
      </template>
      <template v-else>
        <template v-if="displayRestaurant?.length || displayHotel?.length">
          <SmallCardGroup :title="title('美食')" type="scenicSpot" :data="displayRestaurant" v-if="selectedType.value === 'Restaurant' || !selectedType.value" />
          <SmallCardGroup :title="title('住宿')" type="activity" :data="displayHotel" v-if="selectedType.value === 'Hotel' || !selectedType.value" />
          <VPagination />
        </template>
        <template v-else>
          <VNoData />
        </template>
      </template>
    </template>
  </section>
</template>