<template>
  <label class="filters-input">
    <BaseInput v-model="modelValue" placeholder="Search..." />
    <button class="filters-input-button">
      <img src="@/assets/images/icons/search.svg" alt="search" class="filters-input-button-img" />
    </button>
  </label>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/base/BaseInput.vue'
  const modelValue = defineModel<string>()
</script>

<style lang="scss">
  .filters-input {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #d8d8d8;

    .base-input {
      padding-bottom: 0;

      @media (max-width: $breakpoints-s) {
        @include t-medium(#707070);
      }
    }

    &-button {
      background-color: transparent;
    }
  }
</style>
