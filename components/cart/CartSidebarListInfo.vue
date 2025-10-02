<template>
  <div class="info">
    <div class="info-description">
      <NuxtLink to="/" class="info-description-name" @click="closeSidebar()">{{
        item.product.title
      }}</NuxtLink>
      <p class="info-description-property">Black / Medium</p>
      <p class="info-description-prise">$ {{ item.product.price }}</p>
    </div>
    <button class="info-delete" @click="removeItem(props.item.product.id)">
      <img src="@/assets/images/icons/CartItemClose.svg" alt="closeItem" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useCart, type CartItem } from '#imports'
  const { removeItem } = useCart()

  const props = defineProps<{
    item: CartItem
    closeSidebar: () => void
  }>()
</script>

<style lang="scss">
  .info {
    display: flex;

    &-description-name {
      @include t-medium(#000);
      @extend %transition;

      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      line-height: 22px;
      -webkit-box-orient: vertical;

      &:hover {
        transform: scale(1.1);
      }

      @media (max-width: $breakpoints-xs) {
        @include t-small(#000);

        line-height: 20px;
      }
    }

    &-description-property {
      @include t-medium(#707070);

      line-height: 22px;

      @media (max-width: $breakpoints-xs) {
        @include t-small(#707070);

        line-height: 20px;
      }
    }

    &-description-prise {
      @include t-medium(#a18a68);

      line-height: 22px;

      @media (max-width: $breakpoints-xs) {
        @include t-small(#a18a68);

        line-height: 20px;
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
