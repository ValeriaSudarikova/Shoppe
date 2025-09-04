<template>
  <div class="embla__slide-wrapper" :picture="picture">
    <img
      :src="picture.download_url"
      :alt="picture.alt || `Picture ${picture.id}`"
      class="embla__slide-wrapper-img"
    />
    <HeaderSliderImgContent />
  </div>
</template>

<script setup lang="ts">
  interface Picture {
    download_url: string
    alt?: string
    id: number | string
  }

  defineProps<{
    picture: Picture
  }>()
</script>

<style lang="scss">
  .embla__slide-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    border-radius: 16px;

    &-img {
      width: 100%;
      border-radius: 16px;
      opacity: 0.8;

      @media (max-width: $breakpoints-s) {
        height: 354px;
        object-fit: cover;
      }
    }
  }
</style>
