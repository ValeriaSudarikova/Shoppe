<template>
    <button class="shop-page-filters" :class="{close: form}" @click="toggleForm">
        <img src="@/assets/images/icons/filter.svg" alt="filter" class="shop-page-filters-img" />
        Filters
    </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleForm'])
function toggleForm() {
    emit('toggleForm')
}
defineProps({
    form: Boolean
})
</script>

<style lang="scss">
.shop-page-filters {
    @include t-small(#a18a68);
    margin-bottom: 16px;
    background-color: transparent;

    &-img {
        margin-right: 8px;
    }
}
</style>
