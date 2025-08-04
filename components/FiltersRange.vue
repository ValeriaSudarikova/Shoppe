<template>
    <label class="filters-range">
        <Slider
            v-model="model"
            :min="initialMinPrice"
            :max="initialMaxPrice"
            :step="step"
            range
            class="filter-range-input"
        />
        <div class="filters-range-content">
            <p class="filters-range-content-price">{{ veiwPrices }}</p>
            <p class="filters-range-content-text">Filter</p>
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    step: number,
    veiwPrices: string;
}>();

const { initialMinPrice, initialMaxPrice } = useFilters()

const model = defineModel<number[]>({
    required: true
});
</script>

<style lang="scss">
.filters-range {
    display: block;
    margin-bottom: 40px;
    width: 100%;

    &-content {
        display: flex;
        justify-content: space-between;

        @media (max-width: $breakpoints-l-m) {
            flex-direction: column;
            gap: 10px;
        }

        @media (max-width: $breakpoints-s) {
            flex-direction: row;
        }

        &-price {
            @include t-medium(#707070);

            @media (max-width: $breakpoints-l-m) {
                font-size: 12px;
            }

            @media (max-width: $breakpoints-s) {
                @include t-medium(#707070);
            }
        }

        &-text {
            @include t-medium(#a18a68);
        }
    }
}

.p-slider {
    margin-bottom: 8px;
    --p-slider-track-size: 2px;
    --slider-range-bg: #000;
    --slider-handle-bg: #000;
    --p-slider-handle-hover-background: #000;
    --slider-bg: grey;
}

.p-slider.p-slider-horizontal {
    background-color: #d8d8d8;
}

.p-slider .p-slider-range {
    background: var(--slider-range-bg);
}

.p-slider .p-slider-handle {
    width: 2px;
    height: 10px;
    background: var(--slider-handle-bg);
    cursor: pointer;
}

.filter-range-input.p-slider-horizontal .p-slider-handle {
    inset-block-start: -148%;
}
</style>
