<template>
  <label :class="`filters-toggle-${type}`">
    {{ label }}
    <ToggleSwitch v-model="model" />
  </label>
</template>

<script setup lang="ts">
  defineProps<{
    type: string
    label: string
  }>()

  const model = defineModel<boolean>({
    required: true,
  })
</script>

<style lang="scss">
  .filters-toggle-sale,
  .filters-toggle-stock {
    @include h5(#000);

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filters-toggle-sale {
    margin-bottom: 42px;
  }

  .p-toggleswitch {
    --p-toggleswitch-width: 34px;
    --p-toggleswitch-height: 20px;

    &-slider {
      --p-toggleswitch-border-radius: 10px;
      --p-toggleswitch-border-color: transparent;
      --p-toggleswitch-hover-border-color: transparent;
      --p-toggleswitch-checked-hover-border-color: transparent;
      --p-toggleswitch-checked-border-color: transparent;
      --p-toggleswitch-background: #707070;
      --p-toggleswitch-hover-background: #707070;
      --p-toggleswitch-checked-background: #a18a68;
      --p-toggleswitch-checked-hover-background: #a18a68;
    }

    &-handle {
      --p-toggleswitch-gap: 4px;
      --p-toggleswitch-handle-border-radius: 50%;
      --p-toggleswitch-handle-size: 14px;
      --p-toggleswitch-handle-background: white;
      --p-toggleswitch-handle-hover-background: white;
      --p-toggleswitch-handle-checked-background: white;
      --p-toggleswitch-handle-checked-hover-background: white;
    }
  }
</style>
