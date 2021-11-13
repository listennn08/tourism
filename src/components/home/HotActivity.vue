<script setup lang="ts">
import { IActivityTourismInfo } from '@/types'

const activity = inject<IActivityTourismInfo[]>('hotActivity')!
</script>
<template>
  <div class="flex items-center mb-2">
    <custom-triangle class="mr-2" />
    熱門活動
  </div>
  <div class="flex flex-wrap -mx-2.5">
    <VLargeCard 
      v-for="(el, i) in activity"
      class="w-card-full md:w-card-half relative z-1"
      :key="`${el.ID}${i}`"
      :data="el"
      type="hotActivity"
    />
  </div>
</template>
