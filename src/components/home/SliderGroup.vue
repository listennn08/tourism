<script setup lang="ts">

const setSelectedCity = inject<(v: string) => void>('setSelectedCity')!
const fetchRestaurant = inject<() => void>('fetchRestaurant')!
const fetchHotel = inject<() => void>('fetchHotel')!
const fetchActivity = inject<() => void>('fetchActivity')!
const fetchScenicSpot = inject<() => void>('fetchScenicSpot')!

const props = defineProps<{
  data: any
}>()

const {
  data
} = toRefs(props)

const route = useRoute()

const handleClick = async (city: string) => {
  setSelectedCity(city)
  if (route.path.includes('/hotel')) {
    await Promise.all([
      fetchHotel(),
      fetchRestaurant(),
    ])
  } else {
    await Promise.all([
      fetchActivity(),
      fetchScenicSpot(),
    ])
  }
}
</script>
<template>
  <div class="horizontal">
    <div class="item" v-if="data[0]">
      <div class="item-context" :style="`background-image: url('${data[0]?.image}')`">
        <span @click="handleClick(data[0])">
          <heroicons-solid:location-marker class="mb-2" />
          {{ data[0]?.CityName }}
        </span>
      </div>
    </div>
    <div class="vertical">
      <div class="item" v-if="data[1]">
        <div class="item-context" :style="`background-image: url('${data[1]?.image}')`">
          <span @click="handleClick(data[1])">
            <heroicons-solid:location-marker class="mb-2" />
            {{ data[1]?.CityName }}
          </span>
        </div>
      </div>
      <div class="item" v-if="data[2]">
        <div class="item-context" :style="`background-image: url('${data[2]?.image}')`">
          <span @click="handleClick(data[2])">
            <heroicons-solid:location-marker class="mb-2" />
            {{ data[2]?.CityName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.horizontal {
  @apply min-h-50
    flex items-start py-2;
}

.vertical {
  @apply flex flex-col h-full;
}

.vertical > .item {
  height: calc(50% - 4px);
}

.vertical > .item:first-of-type {
  @apply mb-2;
}

.item {
  @apply
    mr-4 px-3 py-3.5
    border-1
    w-50
    shadow-md
    cursor-pointer
    bg-white
  ;
}

.item-context {
  @apply
    bg-center bg-cover
    relative
    h-full
  ;
}

.item-context::before {
  @apply bg-dark-200 opacity-50 absolute inset-0 z-0;
  content: '';
}

.item-context span {
  @apply
    relative
    z-1
    flex flex-col items-center justify-center
    text-white text-lg
    transition-colors
    h-full
  ;
}

.item-context span::before {
  @apply 
    absolute top-31 left-15 right-32
    border border-transparent
    ;
  content: '';
  transition-property: right, border-color;
  transition-duration: .2s, .1s;
  transition-delay: 0, .3s;
  transition-timing-function: ease-in, ease-in-out;
}

.item-context:hover span::before {
  @apply border-white right-15 ;
}

.horizontal > .item:nth-of-type(2n + 1) {
  @apply h-full min-h-55;
}

.vertical > .item .item-context span::before {
  @apply absolute top-16;
  content: '';
}
</style>
