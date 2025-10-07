<template>
  <transition name="slide">
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="toggleSidebar">
      <div class="sidebar" @click.stop>
        <div class="sidebar-content">
          <CartSidebarMain />
        </div>
        <HorizontalLine class="sidebar-line" />
        <div class="sidebar-bottom">
          <CartSidebarBottom />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import HorizontalLine from '@/components/base/HorizontalLine.vue'
  import { useCart } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  const cartStore = useCart()
  const { toggleSidebar } = cartStore
  const { isSidebarOpen } = storeToRefs(cartStore)
</script>

<style lang="scss">
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: #3d3d3d69;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 100vh;
    padding: 72px 36px 28px;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    transform: translateX(0);

    @media (max-width: $breakpoints-s) {
      left: 0;
      width: 100%;
    }

    @media (max-width: $breakpoints-xs) {
      padding: 14px 16px 36px;
    }

    &-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
    }

    &-line {
      flex-shrink: 0;
      width: calc(100% + 72px);
      margin-left: -36px;
    }

    &-bottom {
      flex-shrink: 0;
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
  }

  .slide-enter-active .sidebar,
  .slide-leave-active .sidebar {
    transition: all 0.5s ease;
  }

  .slide-enter-from .sidebar,
  .slide-leave-to .sidebar {
    opacity: 0;
    transform: translateX(100%);
  }

  .slide-enter-to .sidebar,
  .slide-leave-from .sidebar {
    opacity: 1;
    transform: translateX(0);
  }
</style>
