<template>
    <ul class="header-top-nav-list">
        <li
            v-for="(link, index) in navLinkIcons"
            :key="index"
            class="header-top-nav-list-item">
            <button class="header-top-nav-list-item-link" @click="router.push(link.to)">
                <img :src="link.src" :alt="link.alt" />
            </button>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const navLinkIcons = [
    { to: '/search', src: '/images/icons/search.svg', alt: 'search' },
    { to: '/cart', src: '/images/icons/cart.svg', alt: 'cart' },
    { to: '/account', src: '/images/icons/account.svg', alt: 'account' },
];
</script>

<style lang="scss">
.header-top-nav-list {
    display: flex;
    gap: 40px;

    &-item-link {
        position: relative;
        background-color: transparent;
        transition: all 0.3s;

        &:focus::before {
            content: '';
            position: absolute;
            bottom: -21px;
            width: 100%;
            height: 2px;
            display: block;
            background-color: #000;
        }
    }
}
</style>
