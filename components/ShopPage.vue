<template>
    <div class="shop-page">
        <h1 v-if="isMobile" class="shop-page-heading">Shop</h1>
        <h1 v-else class="shop-page-heading">Shop The Latest</h1>
        <OpenFiltersButton v-if="isMobile" :form="form" @toggleForm="toggleForm"/>
        <div class="shop-page-body">
            <ShopListFilters :class="{open: form}" :filters="filters" v-model="prices" @click-btn="closeForm()" @update:filters="updateFilters"/>
            <ShopPageList v-if="filteredProducts.length > 0" :products="filteredProducts" />
            <ShopPageListError v-else/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFilters } from '@/composables/useFilters'

const { isMobile } = toRefs(useHeaderMobile())
const { filters, prices, filteredProducts } = useFilters()

const form = ref(false)

function toggleForm() {
    form.value = !form.value
}

function closeForm() {
    form.value = false
}

function updateFilters(newFilters: object) {
    Object.assign(filters, newFilters)
}
</script>

<style lang="scss">
.shop-page {
    padding: 96px 0 250px;

    @media(max-width: $breakpoints-s) {
        padding: 24px 0 72px;
    }

    &-heading {
        @extend %h1;
        margin-bottom: 40px;

        @media(max-width: $breakpoints-l-m) {
            font-size: 25px;
        }

        @media(max-width: $breakpoints-s) {
            @include h3(#000);
            margin-bottom: 16px;
        }
    }

    &-body {
        display: flex;
        justify-content: space-between;
    }
}

.open {
    @extend %transition;
    transform: translateX(0%);
}
</style>
