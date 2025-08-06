<template>
  <div :class="`filters-select-wrapper-${selectGroup}`">
    <Select
      v-model="model"
      :options="options"
      showClear
      :optionLabel="optionLabel"
      :placeholder="placeholder"
      :class="`filters-select ${selectGroup}`"
    />
  </div>
</template>

<script setup lang="ts">
  interface Option {
    name: string
  }

  defineProps<{
    selectGroup: string
    options: Option[]
    optionLabel: string
    placeholder: string
  }>()

  const model = defineModel({
    required: true,
  })
</script>

<style lang="scss">
  .filters-select {
    @include t-medium(#000);

    width: 100%;

    --p-select-border-color: #d8d8d8;
    --p-select-border-radius: 4px;

    padding: 16px 12px;
  }

  .category {
    margin: 40px 0 16px;
  }

  .sort {
    margin-bottom: 40px;
  }

  .p-select-overlay {
    @include t-medium(#000);

    --p-select-overlay-shadow: 2px 2px 10px 0px #707070;
    --p-select-overlay-border-color: #d8d8d8;
    --p-select-overlay-border-radius: 4px;
    --p-select-overlay-background: #efefee;

    padding: 10px;
  }

  .p-select-option {
    --p-select-option-border-radius: 4px;
    --p-select-option-padding: 10px 6px;

    &-selected {
      --p-select-option-selected-background: #a18a68;
      --p-select-option-selected-focus-background: #a18a68;
    }
  }

  .p-select-clear-icon {
    --p-select-dropdown-width: 14%;

    @media (max-width: $breakpoints-l-m) {
      --p-select-dropdown-width: 20%;
    }
  }
</style>
