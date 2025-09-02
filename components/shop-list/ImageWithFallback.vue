<template>
  <img :src="currentSrc" :alt="alt" :class="className" @error="checkError" />
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue'
  import Placeholder from '@/assets/images/image-holder.png'

  interface Image {
    src: string
    alt: string
    fallback?: string
    className?: string
  }

  const props = withDefaults(defineProps<Image>(), {
    fallback: Placeholder,
    className: '',
  })

  const currentSrc = ref(props.src)

  watch(
    () => props.src,
    (newSrc) => {
      currentSrc.value = newSrc
    },
  )

  const checkError = () => {
    currentSrc.value = props.fallback
  }
</script>
