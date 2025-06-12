<template>
    <li
        v-for="(link, index) in items"
        :key="index"
        class="header-top-nav-pages-item"
    >
        <NuxtLink :to="link.to" class="header-top-nav-pages-item-link" @click="navigate">{{
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

const emit = defineEmits(['click-btn'])

function navigate() {
    emit('click-btn')
}
</script>

<style lang="scss">
.header-top-nav-pages-item-link {
    @include h5(#000);
    position: relative;
    transition: all 0.3s;

    @media (max-width: $breakpoints-m) {
        font-size: 14px;
    }

    @media (max-width: $breakpoints-s) {
        @include h3(#000);
        display: block;
        width: 100%;
    }

    &:focus::before {
        content: '';
        position: absolute;
        bottom: -21px;
        display: block;
        width: 100%;
        height: 2px;
        background-color: #000;

        @media (max-width: $breakpoints-s) {
            display: none;
        }
    }
}
</style>
