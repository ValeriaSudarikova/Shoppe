<template>
  <button class="shop-page-filters" :class="{ close: form }" @click="toggleForm">
    <img src="@/assets/images/icons/filter.svg" alt="filter" class="shop-page-filters-img" />
    Filters
  </button>
</template>

<script setup lang="ts">
  const emit = defineEmits(['toggleForm'])
  function toggleForm() {
    emit('toggleForm')
  }

  defineProps<{
    form: boolean
  }>()
</script>

<style lang="scss">
  .shop-page-filters {
    @include h3(#a18a68);

    display: flex;
    margin-bottom: 16px;
    background-color: transparent;

    @media (max-width: $breakpoints-s) {
      @include t-small(#a18a68);
    }

    &-img {
      margin-right: 8px;
    }
  }
</style>
