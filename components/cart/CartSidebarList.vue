<template>
  <li v-for="item in cartItems" :key="item.product.id" class="sidebar-list-item">
    <img class="sidebar-list-item-img" :src="item.product.image" :alt="item.product.title" />
    <div class="sidebar-list-item-content">
      <CartSidebarListInfo :item="item" :closeSidebar="closeSidebar" />
      <CartSidebarCount :item="item" />
    </div>
  </li>
</template>

<script setup lang="ts">
  import { useCart } from '#imports'
  defineProps<{
    closeSidebar: () => void
  }>()

  const { cartItems } = useCart()
</script>

<style lang="scss">
  .sidebar-list-item {
    display: flex;
    max-height: 136px;
    margin-bottom: 22px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $breakpoints-s) {
      justify-content: space-evenly;
    }

    &-img {
      width: 136px;
      object-fit: contain;
      border-radius: 4px;
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      margin-left: 8px;
    }
  }
</style>
