<template>
  <img :src="currentSrc" :alt="alt" :class="className" @error="isError" />
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue'
  import Placeholder from '@/assets/images/image-holder.png'

  const props = withDefaults(
    defineProps<{
      src: string
      alt: string
      fallback?: string
      className?: string
    }>(),
    {
      fallback: Placeholder,
      className: '',
    },
  )

  const currentSrc = ref(props.src)
  const hasError = ref(false)

  watch(
    () => props.src,
    (newSrc) => {
      hasError.value = false
      currentSrc.value = newSrc
    },
  )

  const isError = () => {
    if (!hasError.value) {
      hasError.value = true
      currentSrc.value = props.fallback
    }
  }
</script>
