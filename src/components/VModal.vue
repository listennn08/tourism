<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type {
  IActivityTourismInfo,
  IHotelTourismInfo,
  IRestaurantTourismInfo,
  IScenicSpotTourismInfo,
} from '@/types';

interface ICombineData extends IActivityTourismInfo, IHotelTourismInfo, IRestaurantTourismInfo, IScenicSpotTourismInfo {
  [key: string]: any
}

interface IData {
  [key: string]: ICombineData[] | undefined
  activity?: IActivityTourismInfo[]
  scenicSpot?: IScenicSpotTourismInfo[]
  restaurant?: IRestaurantTourismInfo[]
  hotel?: IHotelTourismInfo[]
}

const modalOpen = inject<ComputedRef<boolean>>('modalOpen')!
const toggleModal = inject<(v: boolean) => void>('toggleModal')!

const route = useRoute()
const router = useRouter()

const data: IData = {
  hotActivity: inject<IActivityTourismInfo[]>('hotActivity'),
  activity: inject<IActivityTourismInfo[]>('activity'),
  scenicSpot: inject<IScenicSpotTourismInfo[]>('scenicSpot'),
  restaurant: inject<IRestaurantTourismInfo[]>('restaurant'),
  hotel: inject<IHotelTourismInfo[]>('hotel'),
}

const currentData = ref<ICombineData>()
const type = ref('')
onBeforeMount(() => {
  type.value = route.query.type as string;
  const id = route.query.id as string
  console.log(data[type.value])
  const findData = data[type.value]?.find(({ ID }) => id === ID)
  console.log(modalOpen.value, findData)
  if (!findData) {
    toggleModal(false)
    return;
  }

  currentData.value = findData
})

watch(modalOpen, () => {
  if (!modalOpen.value) router.push(route.path)
})

onUnmounted(() => {
  currentData.value = undefined
})

const image = computed(() => Object.keys(currentData.value?.Picture || {})
  .filter((el) => el.includes('PictureUrl'))
  .map((el) => currentData.value?.Picture?.[el])
)
const imageIdx = ref(0)
const decreaseIndex = () => {
  if (imageIdx.value > 0) {
    imageIdx.value -= 1
  }
}
const increaseIndex = () => {
  if (imageIdx.value < image.value.length - 1) {
    imageIdx.value += 1
  }
}

const getClass = computed(() => Object.keys(currentData.value || {}).filter((el) => el.includes('Class')))
const getSpec = computed(() => currentData.value?.Spec?.split(';').filter((el) => el).join('、') )

const formattedTime = (t?: string) => t ? Intl.DateTimeFormat('zh-tw', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',

}).format(new Date(t)).replace(/\//g, '-') : null
</script>
<template>
  <div class="modal-container" :class="{ hidden: !modalOpen }">
    <div class="modal-content">
      <button class="btn" @click="toggleModal(false)"><jam:close /></button>
      <div class="image-container">
        <div
          class="image" 
          :style="`background-image: url('${image[imageIdx]}')`"
        />
      </div>
      <div class="flex justify-end mb-5.5">
        <button
          class="btn-icon left mr-4.5"
          @click="decreaseIndex"
        >
          <ri:arrow-left-s-fill />
        </button>
        <button
          class="btn-icon right"
          @click="increaseIndex"
        >
          <ri:arrow-right-s-fill />
        </button>
      </div>
      <h5 class="mb-2 text-lg">{{ currentData?.Name }}</h5>
      <div class="flex items-center -mx-1 mb-2">
        <VBadge v-for="(cls, key) in getClass" :key="`${cls}${key}`">
          {{ currentData?.[cls] }}
        </VBadge>
      </div>
      <p class="text-sm mb-5.5"> {{ currentData?.Description }}</p>
      <div class="flex flex-wrap">
        <div class="flex w-full md:w-1/2 mb-2 items-center">
          <template v-if="type === 'hotel'">
          <div class="min-w-1 text-primary mr-3"><ic:sharp-local-hotel /></div>
            <span class="text-sm">{{ getSpec }}</span>
          </template>
          <template v-else>
            <div class="min-w-1 text-primary mr-3"><ic:sharp-access-time /></div>
            <span class="text-sm">
              <template v-if="type === 'activity' || type === 'hotActivity'">
                {{ formattedTime(currentData!.StartTime) }} - {{ formattedTime(currentData!.EndTime) }}
              </template>
              <template v-else>
                {{ currentData?.OpenTime }}
              </template>
            </span>
          </template>
        </div>
        <div class="flex w-full md:w-1/2 mb-2 items-center" v-if="type !== 'restaurant'">
          <template v-if="type === 'activity'">
            <div class="min-w-1 text-primary mr-3"><majesticons:ticket-line /></div>
          </template>
          <template v-else-if="type ==='hotel'">
            <div class="min-w-1 text-primary mr-3"><ic:round-local-parking /></div>
            <span class="text-sm">
              {{ currentData?.ParkingInfo?.replace('車位:', '') }}
            </span>
          </template>
          <template v-else>
            <div class="min-w-1 text-primary mr-3"><mdi:web /></div>
            <span class="text-sm">
              {{ currentData?.WebsiteUrl }}
            </span>
          </template>
        </div>
        <div class="flex w-full md:w-1/2 mb-2 items-center">
          <div class="min-w-1 text-primary mr-3"><si-glyph:pin-location /></div>
          <span class="text-sm">
            <template v-if="type === 'activity' || type === 'hotActivity'">
              {{ currentData?.Location }}
            </template>
            <template v-else>
              {{ currentData?.Address }}
            </template>
          </span>
        </div>
        <div class="flex w-full md:w-1/2 mb-2 items-center">
          <div class="min-w-1 text-primary mr-3"><ic:sharp-phone /></div>
          <span class="text-sm">{{ currentData?.Phone || '未提供' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.modal-container {
  @apply
    fixed
    top-0 bottom-0 inset-x-0
    flex items-center justify-center
    z-999
  ;
  background-color: black;
  background-color: rgba(0, 0, 0, .4);
}

.modal-container.hidden {
  @apply hidden;
}

.modal-content {
  @apply
    max-h-screen
    overflow-y-auto md:overflow-visible
    relative
    bg-white
    p-8
    md:w-screen-sm lg:w-screen-md;
}

.image-container {
  @apply flex overflow-hidden mb-5.5 max-h-115 relative;
}

.image {
  /* @apply w-full; */
  @apply
    h-70 md:h-115 w-full
    bg-no-repeat bg-center bg-contain;
  ;
}

.btn {
  @apply
    rounded
    bg-primary
    p-1
    text-white text-lg font-bold
    absolute
    right-5 md:-right-9 top-5 md:top-0
    focus:outline-none
  ;
}
.btn-icon {
  @apply
    transform translate-y-1
    w-8 h-8 rounded-md
    text-white
    flex justify-center items-center
    shadow
    focus:outline-none
  ;
}

.btn-icon.right {
  @apply bg-black;
}

.btn-icon.left {
  @apply text-black;
}
</style>