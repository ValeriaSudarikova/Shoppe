<template>
    <ul class="header-top-nav-pages">
        <NavListPagesItems v-if="!mobile.isMobile" :items="navLinkPages" />
        <NavListPagesItems v-else :items="navLinkPagesMedia" />
    </ul>
</template>

<script setup>
import NavListPagesItems from './NavListPagesItems.vue';

const mobile = useHeaderMobile();

const navLinkPages = [
    { to: '/shop', text: 'Shop' },
    { to: '/blog', text: 'Blog' },
    { to: '/about', text: 'Our Story' },
];

const navLinkPagesMedia = [
    { to: '/', text: 'Home' },
    { to: '/shop', text: 'Shop' },
    { to: '/about', text: 'About' },
    { to: '/blog', text: 'Blog' },
    { to: '/', text: 'Help' },
    { to: '/', text: 'Contact' },
    { to: '/search', text: 'Search' },
];
</script>

<style lang="scss">
.header-top-nav-pages {
    display: flex;
    gap: 64px;
}
</style>
