<template>
  <main>
    <HeaderSlider />
    <HomeShop />
  </main>
</template>

<script setup lang="ts">
  import HeaderSlider from '@/components/header-slider/HeaderSlider.vue'
  import { definePageMeta } from '#imports'

  definePageMeta({ showHeaderHorizontalLine: true })
</script>
