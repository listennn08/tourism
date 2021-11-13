<script setup lang="ts">
import { useUtils } from '@/logic/utils'

const toggleModal = inject<(v: boolean) => void>('toggleModal')!
const props = defineProps<{
  data: any
  type: string
}>()

const {
  data
} = toRefs(props)

const {
  showPicture,
  getLocation,
} = useUtils()

const router = useRouter()
const route = useRoute()

const openDetail = (id: string) => {
  router.push(`${route.path}?type=${props.type}&id=${id}`)
  toggleModal(true)
}
</script>
<template>
  <div class="border w-card-half md:w-card-1/4 lg:w-card-1/5 mx-2 mb-4 md:mb-12 cursor-pointer z-1">
    <div
      class="bg-white p-3 relative custom-shadow"
      @click="openDetail(data.ID)"
    >
      <div class="img-container" :style="`background-image: url('${showPicture(data.Picture)}')`"></div>
      <h4 class="text-sm mb-10">{{ data.Name }}</h4>
      <div class="flex items-center absolute bottom-3">
        <si-glyph:pin-location class="text-primary mr-3"/>
        <span class="text-green text-sm font-light">{{ getLocation(data) }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.img-container {
  @apply w-full mb-2.5 bg-cover bg-center bg-no-repeat;
  padding-top: 100%;
}
</style>