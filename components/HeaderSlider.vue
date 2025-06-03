<template>
    <div>
        <p v-if="loading" class="pictures-loading">Loading...</p>
        <p v-if="error" class="pictures-error">{{ error }}</p>
        <div v-if="picturesArray.length" class="embla" ref="emblaRootNode">
            <div class="embla__container">
                <div
                    v-for="picture in picturesArray"
                    :key="picture.id"
                    class="embla__slide"
                >
                    <div class="embla__slide-wrapper">
                        <img
                            :src="picture.download_url"
                            :alt="picture.alt || `Picture ${picture.id}`"
                            class="embla__slide-wrapper-img"
                        />
                        <HeaderSliderImgContent />
                    </div>
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

<script setup>
import HeaderSliderImgContent from '@/components/HeaderSliderImgContent';
import { usePicturesSlider } from '@/composables/useHeaderSlider';
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const { fetchPicturesApi, picturesArray, loading, error } = usePicturesSlider()

const emblaRootNode = ref(null)
const emblaApi = ref(null)
const selectedDotIndex = ref(0)

const updateSelectedDot = () => {
    if (!emblaApi.value) return
    selectedDotIndex.value = emblaApi.value.selectedScrollSnap()
}

const scrollToDot = (index) => {
    if (!emblaApi.value) return
    emblaApi.value.scrollTo(index)
}

onMounted(() => {
    fetchPicturesApi();
});

watch([emblaRootNode, picturesArray], async ([rootNode, pictures]) => {
    if (rootNode && pictures.length > 0) {
        if (!emblaApi.value) {
            await nextTick();
            if (!document.body.contains(rootNode)) {
                return;
            }
            if (
                rootNode.firstElementChild &&
                rootNode.firstElementChild.children.length === 0 &&
                pictures.length > 0
            ) {
                return;
            }

            const options = { loop: true };
            const plugins = [Autoplay()];

            try {
                const emblaInstance = EmblaCarousel(
                    rootNode,
                    options,
                    plugins
                );
                emblaApi.value = emblaInstance;

                if (emblaApi.value.plugins().autoplay) {
                    emblaApi.value.plugins().autoplay.play();
                }

                emblaApi.value.on('select', updateSelectedDot)
                emblaApi.value.on('reInit', updateSelectedDot)

                updateSelectedDot()
            } catch (e) {
                console.error('Error initializing Embla Carousel:', e);
            }
        } else {
            await nextTick();
            emblaApi.value.reInit();
        }
    } else if (emblaApi.value && pictures.length === 0) {
        emblaApi.value.destroy()
        emblaApi.value = null
        selectedDotIndex.value = 0

    } else if (rootNode && pictures.length === 0) {
        if (emblaApi.value) {
            emblaApi.value.destroy()
            emblaApi.value = null
            selectedDotIndex.value = 0
        }
    }
}, { deep: true })

onUnmounted(() => {
    if (emblaApi.value) {
        emblaApi.value.destroy();
        emblaApi.value = null;
    }
})
</script>

<style lang="scss">
.pictures-loading,
.pictures-error {
    font-family: $ff;
    font-size: 16px;
    margin: 30px 0;
    text-align: center;
}

.pictures-error {
    color: red;
}

.embla {
    overflow: hidden;
    width: 100%;

    &__container {
        display: flex;
    }

    &__slide {
        flex: 0 0 100%;
        min-width: 0;
        display: flex;
        justify-content: center;

        &-wrapper {
            width: 1000px;
            max-width: 100%;
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;

            &-img {
                max-width: 100%;
                max-height: 600px;
                width: 100%;
                opacity: 0.7;
                border-radius: 16px;
            }
        }
    }
}

.embla__dots {
    position: relative;
    margin-top: -38px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;

    .embla__dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;

        &-selected {
            width: 18px;
            height: 18px;
            border: 2px solid #fff;
            border-radius: 50%;
            background-color: transparent;
        }
    }
}
</style>
