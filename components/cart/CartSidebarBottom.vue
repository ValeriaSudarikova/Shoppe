<template>
  <div class="general-info">
    <p class="general-info-subtotal">Subtotal ({{ cartTotals.totalItems }} items)</p>
    <div class="general-info-price">$ {{ cartTotals.totalPrices.toFixed(2) }}</div>
  </div>
  <NuxtLink to="/cart" class="cart" @click="toggleSidebar">VIEW CART</NuxtLink>
</template>

<script setup lang="ts">
  import { NuxtLink } from '#components'
  import { useCart } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  const cartStore = useCart()
  const { cartTotals } = storeToRefs(cartStore)
  const { toggleSidebar } = cartStore
</script>

<style lang="scss">
  .general-info {
    @include h5(#000);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 0;

    @media (max-width: $breakpoints-xs) {
      padding: 24px 0 16px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .cart {
    @include button-empty(1px solid #000, 4px, #000);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    @media (max-width: $breakpoints-xs) {
      height: 32px;
      font-size: 12px;
      font-weight: 500;
    }
  }
</style>
