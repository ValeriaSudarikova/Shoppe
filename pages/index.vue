<template>
  <main>
    <HeaderSlider />
    <HomeShop />
  </main>
</template>

<script setup lang="ts">
  import { definePageMeta } from '#imports'

  definePageMeta({ showHeaderHorizontalLine: true })
</script>
