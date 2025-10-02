<template>
  <div class="count">
    <button class="count-minus" @click="decreaseCount">-</button>
    <p class="count-number">{{ item.count }}</p>
    <button class="count-plus" @click="increaseCount">+</button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import { type CartItem, useCart } from '@/stores/cart'

  const props = defineProps<{
    item: CartItem
  }>()

  const { updateQuantity, removeItem } = useCart()

  const decreaseCount = () => {
    if (props.item.count > 1) {
      updateQuantity(props.item.product.id, props.item.count - 1)
    } else {
      removeItem(props.item.product.id)
    }
  }

  const increaseCount = () => {
    updateQuantity(props.item.product.id, props.item.count + 1)
  }
</script>

<style lang="scss">
  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #efefef;
    border-radius: 4px;

    &-minus,
    &-number,
    &-plus {
      @include h5(#707070);

      border-radius: 4px;

      @media (max-width: $breakpoints-xs) {
        @include t-medium(#707070);
      }
    }

    &-plus {
      padding: 4px 12px 4px 20px;

      @media (max-width: $breakpoints-xs) {
        padding: 0 14px;
      }
    }

    &-minus {
      padding: 4px 20px 4px 12px;

      @media (max-width: $breakpoints-xs) {
        padding: 0 14px;
      }
    }
  }
</style>
