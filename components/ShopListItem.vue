<template>
    <li class="shop-list-item">
        <img :src="item.image" :alt="item.title" class="shop-list-item-img" />
        <NuxtLink to="/" class="shop-list-item-title">{{
            item.title
        }}</NuxtLink>
        <h4 class="shop-list-item-price">$ {{ item.price }}</h4>
        <ShopListButtons @add-cart="addCart(item.id)" />
    </li>
    <NotificationAddCart :item="item" :notification-id="notificationId" />
</template>

<script setup lang="ts">
import { useShopList } from '@/composables/useShopList';

interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
}

defineProps<{
    item: Product;
}>();

const { addCart, notificationId } = useShopList();
</script>

<style lang="scss">
.shop-list-item {
    position: relative;

    @media (max-width: $breakpoints-m) {
        text-align: center;
    }

    &-img {
        border-radius: 8px;
        max-width: 380px;
        max-height: 380px;
        width: 100%;
        height: 100%;
        object-fit: contain;

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
        @extend %trans;
        display: -webkit-box;
        overflow: hidden;
        margin: 24px 0 16px;
        -webkit-line-clamp: 2;
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
</style>
