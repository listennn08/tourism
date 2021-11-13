<script setup lang="ts">
import type { IHotCity } from '@/types'

const hotCity = inject<IHotCity[][]>('hotCity')

const sliderConteainer = ref<HTMLDivElement>()
const slider = ref<HTMLDivElement>()
const currentScrollPosition = ref(0)

const showScrollBack = computed(() => currentScrollPosition.value > 0)

const scrollSlider = (direction: boolean) => {
  const scrollMax = slider.value!.scrollWidth - slider.value!.clientWidth;
  if (slider.value!.scrollLeft === scrollMax && direction) {
    slider.value?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    currentScrollPosition.value = 0
    return
  }

  if (!slider.value?.scrollLeft && !direction) return

  const scrollStep = (direction ? 1 : -1) * sliderConteainer.value!.offsetWidth

  slider.value?.scrollTo({
    top: 0,
    left: slider.value!.scrollLeft + scrollStep,
    behavior: 'smooth',
  })
  currentScrollPosition.value = slider.value!.scrollLeft + scrollStep
}
</script>
<template>
  <div class="w-full relative">
    <div class="flex items-center mb-2">
      <custom-triangle class="mr-2" />
      熱門城市
    </div>
    <button
      v-if="showScrollBack"
      class="btn-icon left"
      @click="scrollSlider(false)"
    >
      <ri:arrow-left-s-fill />
    </button>
    <div class="w-full overflow-hidden" ref="sliderConteainer">
      <div class="flex mb-4 overflow-x-scroll scroll-hidden relative" ref="slider">
        <SliderGroup v-for="(el, i) in hotCity" :key="`{city-c-${i}}`" :data="el" />
      </div>
    </div>
    <button class="btn-icon right" @click="scrollSlider(true)">
      <ri:arrow-right-s-fill />
    </button>
  </div>
</template>
<style scoped lang="postcss">
.btn-icon {
  @apply 
    hidden
    absolute inset-y-1/2
    transform translate-y-1
    w-8 h-8 rounded-md
    text-white bg-white
    lg:flex justify-center items-center
    shadow
    focus:outline-none
  ;
}

.btn-icon.right {
  @apply bg-black -right-12;
}

.btn-icon.left {
  @apply text-black -left-12;
}
</style>