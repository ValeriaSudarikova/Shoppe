<template>
    <div>
        <LoadingError :loading="loading" :error="error" />
        <div v-if="picturesArray.length" class="embla" ref="emblaRootNode">
            <div class="embla__container">
                <div
                    v-for="picture in picturesArray"
                    :key="picture.id"
                    class="embla__slide"
                >
                    <HeaderSliderSlideImg :picture="picture" />
                </div>
            </div>
        </div>
        <div v-if="picturesArray.length > 0" class="embla__dots">
            <button
                v-for="(picture, index) in picturesArray"
                :key="`dot-${picture.id}`"
                class="embla__dot"
                :class="{ 'embla__dot-selected': index === selectedDotIndex }"
                @click="scrollToDot(index)"
            ></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePicturesSlider } from '@/composables/useHeaderSlider';
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel'

const { fetchPicturesApi, picturesArray, loading, error } = usePicturesSlider();

const emblaRootNode = ref(null);
const emblaApi = ref<EmblaCarouselType | null>(null);
const selectedDotIndex = ref(0);

const updateSelectedDot = () => {
    if (!emblaApi.value) return;
    selectedDotIndex.value = emblaApi.value.selectedScrollSnap();
};

const scrollToDot = (index: number) => {
    if (!emblaApi.value) return;
    emblaApi.value.scrollTo(index);
};

onMounted(() => {
    fetchPicturesApi();
});

watch(
    [emblaRootNode, picturesArray],
    async ([rootNode, pictures]) => {
        if (rootNode && pictures.length > 0) {
            await nextTick();

            const options = { loop: true };
            const plugins = [Autoplay()];
            const emblaInstance = EmblaCarousel(rootNode, options, plugins);

            emblaApi.value = emblaInstance;
            emblaApi.value.plugins().autoplay.play();
            emblaApi.value.on('select', updateSelectedDot);
            emblaApi.value.on('reInit', updateSelectedDot);

            updateSelectedDot();
        }
    },
    { deep: true }
);

onUnmounted(() => {
    if (emblaApi.value) {
        emblaApi.value.destroy();
    }
});
</script>

<style lang="scss">
.embla {
    overflow: hidden;
    width: 100%;

    &__container {
        display: flex;
    }

    &__slide {
        display: flex;
        flex: 0 0 100%;
        justify-content: center;
        min-width: 0;
    }
}

.embla__dots {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-top: -38px;

    @media(max-width: $breakpoints-m) {
        gap: 6px;
    }

    @media(max-width: $breakpoints-s) {
        margin-top: -16px;
    }

    .embla__dot {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-color: #fff;

        @media(max-width: $breakpoints-m) {
            width: 4px;
            height: 4px;
        }

        &-selected {
            border: 2px solid #fff;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            background-color: transparent;

            @media(max-width: $breakpoints-m) {
                width: 8px;
                height: 8px;
            }
        }
    }
}
</style>
