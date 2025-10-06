<template>
  <div class="info">
    <div class="info-description">
      <NuxtLink to="/" class="info-description-name" @click="toggleSidebar">{{
        item.product.title
      }}</NuxtLink>
      <p class="info-description-property">Black / Medium</p>
      <p class="info-description-prise">$ {{ item.product.price }}</p>
    </div>
    <button class="info-delete" @click="removeItem(props.item.product.id)">
      <img src="@/assets/images/icons/cart-close.svg" alt="closeItem" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useCart, type CartItem } from '@/stores/cart'

  const cartStore = useCart()
  const { removeItem, toggleSidebar } = cartStore

  const props = defineProps<{
    item: CartItem
  }>()
</script>

<style lang="scss">
  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &-description {
      flex: 1;

      &-name {
        @include t-medium(#000);
        @extend %transition;

        display: block;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px;
        white-space: nowrap;

        &:hover {
          transform: scale(1.1);
        }

        @media (max-width: $breakpoints-xs) {
          @include t-small(#000);

          line-height: 20px;
        }
      }

      &-property {
        @include t-medium(#707070);

        line-height: 22px;

        @media (max-width: $breakpoints-xs) {
          @include t-small(#707070);

          line-height: 20px;
        }
      }

      &-prise {
        @include t-medium(#a18a68);

        line-height: 22px;

        @media (max-width: $breakpoints-xs) {
          @include t-small(#a18a68);

          line-height: 20px;
        }
      }
    }

    &-delete {
      width: 22px;
      height: 22px;
      padding: 6px;
      background-color: transparent;
    }
  }
</style>
