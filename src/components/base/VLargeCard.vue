<script setup lang="ts">
import { useUtils } from '@/logic/utils'

const props = defineProps<{
  data: any
  type: string
}>()

const toggleModal = inject<(v: boolean) => void>('toggleModal')!

const {
  data
} = toRefs(props)

const {
  showPicture,
  getLocation,
} = useUtils()

const route = useRoute()
const router = useRouter()
const openDetail = (id: string) => {
  router.push(`${route.path}?type=${props.type}&id=${id}`)
  toggleModal(true)
}
</script>
<template>
  <div class="large-card">
    <div class="card-content custom-shadow">
      <div class="img-container" :style="`background-image: url('${showPicture(data.Picture)}')`">
      </div>
      <div class="w-2/3 flex flex-col relative">
        <h3 class="lg:mb-3.5 mb-12">
          {{ data?.Name }}
        </h3>
        <p class="description">
          {{ data.Description }}
        </p>
        <div class="flex items-center absolute inset-x-0 bottom-0">
          <div class="pr-4 flex">
            <si-glyph:pin-location class="text-primary mr-3"/>
            <div class="text-sm min-w-20">
              {{ getLocation(data) }}
            </div>
          </div>
          <div class="flex items-center justify-center w-1/2">
            <button
              class="hidden lg:block btn btn-primary outline focus:outline-none text-sm"
              @click="openDetail(data.ID)"
            >
              活動詳情
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.large-card {
  @apply border bg-white relative mx-2.5 mb-4 md:mb-12;
}

.card-content {
  @apply flex bg-white relative p-4;
}

.img-container {
  @apply mr-4 w-1/3 bg-cover bg-center;
}

.description {
  @apply 
    hidden
    text-sm text-gray
    overflow-hidden
    w-full max-w-full
    mb-12
    max-h-28
  ;
  @media (min-width: 1024px) {
    display: -webkit-box;
  }
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>