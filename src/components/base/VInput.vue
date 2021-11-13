<script setup lang="ts">

withDefaults(defineProps<{
  value: string,
  placeholder: string
  focus?: () => void
  blur?: () => void
  enterFn: () => void
}>(), {
  value: '',
})

const emit = defineEmits<{
  (e: 'update:value', v: string): void
}>()

const handlerKeydown = (e: any) => {
  emit('update:value', e.target.value)
}

</script>
<template>
  <div class="input-field">
    <input 
      :value="value"
      :placeholder="placeholder"
      @keydown="handlerKeydown"
      @keypress.enter="enterFn"
      @focus="focus"
      @blur="blur"
    />
  </div>
</template>
<style scoped lang="postcss">
.input-field {
  @apply rounded shadow-md w-full;
  ;
}

.input-field input {
  @apply w-full pl-6 h-full outline-none rounded focus:shadow-lg;
}
</style>