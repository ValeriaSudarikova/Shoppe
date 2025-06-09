<template>
    <li
        v-for="(link, index) in items"
        :key="index"
        class="header-top-nav-pages-item"
    >
        <NuxtLink :to="link.to" class="header-top-nav-pages-item-link">{{
            link.text
        }}</NuxtLink>
    </li>
</template>

<script setup lang="ts">
interface navLink {
    text: string;
    to: string;
}

defineProps<{
    items: navLink[];
}>();
</script>

<style lang="scss">
.header-top-nav-pages-item-link {
    @include h5(#000);
    position: relative;
    transition: all 0.3s;

    &:focus::before {
        content: '';
        position: absolute;
        bottom: -21px;
        display: block;
        width: 100%;
        height: 2px;
        background-color: #000;
    }
}
</style>
