<template>
  <div class="header-icons">
    <button class="header-icons-cart" @click="toggleCartSidebar">
      <img src="@/assets/images/icons/cart.svg" alt="cart" />
    </button>
    <button class="burger" :class="{ close: nav }" @click="toggleNavHeader">
      <span class="burger-line"></span>
    </button>
  </div>
</template>

<script setup>
  import { useCart } from '@/stores/cart'

  const cartStore = useCart()
  const { toggleSidebar: toggleCartSidebar } = cartStore
  const emit = defineEmits(['toggle-nav'])
  defineProps({
    nav: Boolean,
  })

  function toggleNavHeader() {
    emit('toggle-nav')
  }
</script>

<style lang="scss">
  .header-icons {
    display: flex;
    align-items: center;

    &-cart {
      margin-right: 20px;
      background-color: transparent;
    }
  }

  .burger {
    position: relative;
    height: 16px;
    background-color: transparent;

    &-line {
      @extend %transition;

      display: block;
      width: 20px;
      height: 2px;
      background-color: #000;

      &::before,
      &::after {
        position: absolute;
        display: block;
        height: 2px;
        content: '';
        background-color: #000;
      }

      &::before {
        top: 0;
        width: 20px;
      }

      &::after {
        right: 0;
        bottom: 0;
        width: 14px;
      }
    }
  }

  .close {
    .burger-line {
      @extend %transition;

      transform: rotate(45deg);

      &::before {
        transform: rotate(90deg);
      }

      &::after {
        display: none;
      }
    }
  }
</style>
