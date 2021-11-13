<script setup lang="ts">
import { ComputedRef, Ref } from 'vue'

const curPage = inject<Ref<number>>('curPage')!
const showNextPage = inject<ComputedRef<boolean>>('showNextPage')!

const increseCurPage = () => curPage.value += 1
  const decreaseCurPage = () => curPage.value -= 1

const pageNumber = computed(() => {
  if (curPage.value > 5) {
    return Array.from({ length: 5 }).map((_, i) => {
      const value = curPage.value - i
      return value
    }).reverse()
  }

  return curPage.value
})
</script>
<template>
  <ul class="pagination">
    <li class="pagination-next" v-if="curPage !== 1">
      <a herf="#" @click.prevent="decreaseCurPage">
        <ri:arrow-left-s-fill />
      </a>
    </li>
    <li 
      v-for="(number, key) in pageNumber"
      :key="number + key"
      class="pagination-item"
      :class="{ active: number === curPage }"
    >
      <a href="#" @click.prevent="curPage = number">
        {{ number }}
      </a>
    </li>
    <li class="pagination-next" v-if="showNextPage">
      <a herf="#" @click.prevent="increseCurPage">
        <ri:arrow-right-s-fill />
      </a>
    </li>
  </ul>
</template>