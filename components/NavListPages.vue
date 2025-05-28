<template>
    <ul class="header-top-nav-pages">
        <li v-for="(link, index) in navLinkPages" :key="index" class="header-top-nav-pages-item">
            <NuxtLink :to="link.to" class="header-top-nav-pages-item-link">{{ link.text }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const navLinkPages = [
    {to: '/shop', text: 'Shop'},
    {to: '/blog', text: 'Blog'},
    {to: '/about', text: 'Our Story'}
]
</script>

<style lang="scss">
.header-top-nav-pages {
    display: flex;
    gap: 64px;

    &-item-link {
        @include h5(#000);
        position: relative;
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
