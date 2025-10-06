<template>
  <div class="sidebar-main">
    <button v-if="isMobile" class="sidebar-main-close-bth" @click="toggleSidebar">
      <img src="@/assets/images/icons/arrow-cart.svg" alt="arrow" />
    </button>
    <h5 class="sidebar-main-heading">Shopping bag</h5>
    <p class="sidebar-main-items-count">{{ cartTotals.totalItems }} items</p>
    <div class="sidebar-main-list">
      <div v-if="cartStore.isLoading" class="sidebar-main-list-loading">Loading cart...</div>
      <div v-else>
        <ul v-if="cartStore.cartItems.length > 0" class="sidebar-main-list-items">
          <CartSidebarItem
            v-for="item in cartStore.cartItems"
            :key="item.product.id"
            :item="item"
          />
        </ul>
        <p v-else class="sidebar-main-list-empty">Your cart is empty</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMobileVersion } from '@/stores/mobileVersion'
  import { storeToRefs } from 'pinia'
  import { useCart } from '@/stores/cart'
  const { isMobile } = storeToRefs(useMobileVersion())

  const cartStore = useCart()
  const { toggleSidebar } = cartStore
  const { cartTotals } = storeToRefs(cartStore)
</script>

<style lang="scss">
  .sidebar-main {
    display: flex;
    flex-direction: column;
    height: 100%;

    &-close-bth {
      position: absolute;
      top: 58px;
      left: 20px;
      padding: 20px;
      background-color: transparent;

      @media (max-width: $breakpoints-xs) {
        top: 0;
        left: 0;
      }
    }

    &-heading {
      @include h5(#000);

      flex-shrink: 0;

      @media (max-width: $breakpoints-s) {
        text-align: center;
      }
    }

    &-items-count {
      @include t-small(#707070);

      flex-shrink: 0;
      margin: 17px 0 3px;
    }

    &-list {
      flex: 1;
      min-height: 0;
      overflow-y: auto;

      &-items {
        margin-bottom: 40px;
      }

      &-empty,
      &-loading {
        @include t-small(#000);

        margin: 20px 0;
        text-align: center;
      }
    }
  }
</style>
