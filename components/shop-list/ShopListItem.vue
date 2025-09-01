<template>
  <li class="shop-list-item">
    <SmartImage
      :src="item.image"
      :alt="item.title"
      class="shop-list-item-img"
      :fallback="Placeholder"
    />
    <NuxtLink to="/" class="shop-list-item-title">{{ item.title }}</NuxtLink>
    <h4 class="shop-list-item-price">$ {{ item.price }}</h4>
    <span v-if="item.sale" class="badge">{{ saleDiscount(item) }}</span>
    <span v-if="!item.stock" class="badge">Sold out</span>
    <ShopListButtons @add-cart="addCart(item.id)" />
  </li>
  <NotificationAddCart :item="item" :notification-id="notificationId" />
</template>

<script setup lang="ts">
  import NotificationAddCart from '@/components/shop-list/NotificationAddCart.vue'
  import { useShopList, type ShopItem } from '@/composables/useShopList'
  import SmartImage from '@/components/shop-list/SmartImage.vue'
  import Placeholder from '@/assets/images/image-holder.png'

  defineProps<{
    item: ShopItem
  }>()

  const { addCart, notificationId } = useShopList()

  const saleDiscount = (item: ShopItem) => {
    const discount = 5 + (item.id.toString().charCodeAt(0) % 50)
    return `- ${discount}%`
  }
</script>

<style lang="scss">
  .shop-list-item {
    position: relative;

    @media (max-width: $breakpoints-m) {
      text-align: center;
    }

    &-img {
      width: 100%;
      max-width: var(--img-width, 380px);
      height: 100%;
      max-height: var(--img-height, 380px);
      object-fit: contain;
      border-radius: 8px;

      @media (max-width: $breakpoints-m) {
        max-width: 200px;
        max-height: 200px;
      }

      @media (max-width: $breakpoints-s) {
        max-width: 136px;
        max-height: 136px;
      }
    }

    &-title {
      @include h3(#000);
      @extend %transition;

      display: -webkit-box;
      margin: 24px 0 16px;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      @media (max-width: $breakpoints-m) {
        font-size: 16px;
        text-align: left;
      }

      @media (max-width: $breakpoints-s) {
        @include t-medium(#000);

        margin: 6px 0 4px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    &-price {
      @include h4(#a18a68);

      @media (max-width: $breakpoints-m) {
        font-size: 16px;
        text-align: left;
      }

      @media (max-width: $breakpoints-s) {
        @include t-small(#a18a68);
      }
    }
  }

  .badge {
    @include t-small(#fff);

    position: absolute;
    top: 16px;
    left: 16px;
    padding: 2px 8px;
    background-color: #a18a68;
    border-radius: 4px;

    @media (max-width: $breakpoints-s) {
      top: 10px;
      left: 10px;
      font-size: 10px;
      line-height: 15px;
    }
  }
</style>
