<script setup lang="ts">

const props = defineProps<{
  title: string
  data: any
  type: string
}>()

const { data } =toRefs(props)

</script>
<template>
  <div class="flex items-center mb-2">
    <custom-square class="mr-2" v-if="title"/>
    {{ title }}
  </div>
  <div class="flex flex-wrap -mx-2.5">
    <template v-if="data">
    <VSmallCard
      v-for="(el, idx) in data"
      class="w-card-1/5"
      :data="el"
      :key="`${el.ID}${idx}`"
      :type="type"
    />
    </template>
  </div>
</template>