<template>
    <ul class="header-top-nav-list">
        <li v-for="(i, index) in navLinkIcons" :key="index" class="header-top-nav-list-item">
            <NuxtLink :to="i.to" class="header-top-nav-list-item-link">
                <img :src="i.src" :alt="i.alt" />
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const navLinkIcons = [
    {to: '/search', src: '/images/icons/search.svg', alt: 'search'},
    {to: '/cart', src: '/images/icons/cart.svg', alt: 'cart'},
    {to: '/account', src: '/images/icons/account.svg', alt: 'account'}
]
</script>

<style lang="scss">
.header-top-nav-list {
    display: flex;
    gap: 40px;

    &-item-link {
        position: relative;
        transition: all 0.3s;

        &:focus::before {
            content: '';
            position: absolute;
            bottom: -27px;
            width: 100%;
            height: 2px;
            display: block;
            background-color: #000;
        }
    }
}
</style>
