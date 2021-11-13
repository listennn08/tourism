<script setup lang="ts">
import { useBus } from '@/logic/useBus';
import { City } from '@/types';

const cityOptions = inject<City[]>('cityOptions')!

const {
  selectedCity,
  setSelectedCity,
  selectedRoute,
  setSelectedRoute,
  routeData,
  direction,
  stops,
} = useBus()

const getMinute = (t?: number) => {
  if (typeof t === 'number') {
    const min = Math.floor(t / 60)
    if (min < 3) {
      return '進站中'
    } else {
      return `${min} 分鐘`
    }
  }
  return null
}

const getStatus = (status?: number) => {
  switch (status) {
    case 1: return '尚未發車'
    case 2: return '交管不停靠'
    case 3: return '末班車已過'
    case 4: return '今日未營運'
    default: return null
  }
} 
</script>
<template>
  <section class="header">
    <div class="header-container custom-shadow">
      <div class="header-content">
        <div class="flex items-center justify-center mb-10">
          <VSelect
            :value="selectedCity"
            :options="cityOptions"
            :change="setSelectedCity"
            class="w-1/2 mx-1"
            placeholder="選擇縣市"
            text="CityName"
            keyValue="City"
          />
          <VSelect
            :value="selectedRoute"
            :options="routeData"
            :change="setSelectedRoute"
            class="w-1/2 mx-1"
            placeholder="選擇路線"
            text="TaiwanTripName"
            keyValue="TaiwanTripName"
          />
        </div>
        <div class="flex min-h-13">
          <div 
            v-if="selectedRoute.TaiwanTripName"
            class="route-btn-container"
            :class="{ active: direction === 0 }"
            @click.prevent="direction = 0"
          >
            <a
              href="#"
              class="route-btn"
            >
              往
              <span class="text-primary ml-2">
                {{ selectedRoute.DepartureStopNameZh }}
              </span>
            </a>
          </div>
          <div
            v-if="selectedRoute.TaiwanTripName"
            class="route-btn-container"
            :class="{ active: direction === 1 }"
          >
            <a
              href="#"
              class="route-btn"
              @click.prevent="direction = 1"
            >
              往
              <span class="text-primary ml-2">
                {{ selectedRoute.DestinationStopNameZh }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="pb-20">
    <p class="text-primary mb-3 text-right">
      每隔 15 秒更新一次
    </p>
    <div class="bg-white py-13 px-14">
      <div v-if="selectedRoute.TaiwanTripName">
        <ul class="time-list">
          <li
            v-for="(stop,key) in stops[direction]?.Stops"
            :key="`${stop.StopUID}${key}`"
            class="flex items-center my-5 pl-10"
          >
            <div class="mr-2">
              <template v-if="stop.timeInfo?.[0].StopStatus === 0">
              <span 
                class="w-10 border rounded px-6 py-2"
                :class="{
                  'bg-primary text-white border-transparent': getMinute(stop.timeInfo?.[0].EstimateTime) === '進站中',
                }"
              >
                {{ getMinute(stop.timeInfo?.[0].EstimateTime) }}
              </span>
              </template>
              <template v-else>
                <span class="border rounded border-gray text-gray px-4 py-2">
                  {{ getStatus(stop.timeInfo?.[0].StopStatus) }}
                </span>
              </template>
            </div>
            {{ stop.StopName }}
          </li>
        </ul>
      </div>
      <span v-else class="text-2xl text-gray">請選擇公車路線</span>
    </div>
  </section>
</template>
<style scoped lang="postcss">
.header {
  @apply bg-white mb-15 relative z-3;
}
.header-container {
  @apply
    bg-white
    pt-6
  ;
}

.header-content {
  @apply 
    w-full lg:w-2/5 md:w-3/5 mx-auto
  ;
}

.route-btn-container {
  @apply
    w-1/2
    flex justify-center
    border-b-4 border-transparent
  ;

  &.active {
    @apply border-b-primary;
  }
}

.route-btn {
  @apply
    flex items-center justify-center
    py-3 cursor-pointer
  ;
}

.time-list {
  @apply h-440 ml-20 flex flex-col flex-wrap content-center;
}
</style>