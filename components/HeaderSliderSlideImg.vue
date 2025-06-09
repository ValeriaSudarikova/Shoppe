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
    download_url: string;
    alt?: string;
    id: number;
}

defineProps<{
    picture: Picture;
}>();
</script>

<style lang="scss">
.embla__slide-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border-radius: 16px;
    max-width: 1000px;
    width: 100%;

    &-img {
        opacity: 0.8;
        border-radius: 16px;
        max-width: 100%;
        max-height: 600px;
        width: 100%;
    }
}
</style>
