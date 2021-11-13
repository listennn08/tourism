<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface ISelectProps<T> {
  value: T
  options: T[]
  placeholder: string
  text: string
  keyValue: string
  change: (d: any) => void
}

const props = defineProps<ISelectProps<any>>()

const {
  value,
  options,
  placeholder,
  text,
  keyValue,
  change,
} = toRefs(props)

const emit = defineEmits<{
  (e: 'update:value', v: any): void
}>()

const select = ref(null)

const handleDropdownClick = (v: any) => {
  change.value(v)
  menuOpen.value = false
}

const menuOpen = ref(false)
onClickOutside(select, () => menuOpen.value = false)

const setValue = (value: { [key: string]: any } | string) => {
  if (typeof value === 'object') {
    if (keyValue.value) {
      return value[keyValue.value]
    }
  }

  return value
}

const setText = (option: { [key: string]: any } | string) => {
  if (typeof option === 'object') {
    if (text.value) {
      return option[text.value]
    }
  }
  return option
}
</script>
<template>
  <div class="relative" ref="select">
    <div class="shadow-md w-full py-2 pl-6 bg-white relative min-h-10 h-full" :class="menuOpen ? 'rounded-t' : 'rounded'">
      <button class="flex items-center w-full h-full focus:outline-none" @click="menuOpen = !menuOpen">
        <span>{{ setText(value) ? setText(value) : placeholder }}</span>
        <octicon:triangle-down-16 class="absolute right-2 inset-y-1/2 transform -translate-y-1/2"/>
      </button>
    </div>
    <ul 
      class="dropdown"
      :class="{ 'hidden': !menuOpen }"
    >
      <li
        v-for="(option, key) in options"
        :key="setValue(option) + key"
        :data-value="options"
        class="dropdown-item"
        @click="handleDropdownClick(option)"
      >
        {{ setText(option) }}
      </li>
    </ul>
  </div>
</template>
<style scoped lang="postcss">
.dropdown {
  @apply
    absolute top-10 inset-x-0
    rounded-b
    shadow 
    bg-white
    max-h-40
    overflow-y-scroll
    z-1;
}

.dropdown::-webkit-scrollbar,
.dropdown::-webkit-scrollbar-thumb {
  @apply w-3;
}

.dropdown-item {
  @apply
    py-2 pl-6
    hover:bg-primary
    hover:text-white
    transform transition-colors
  ;
}

</style>