<template>
    <li
        v-for="(link, index) in icons"
        :key="index"
        class="header-top-nav-list-item"
    >
        <button
            class="header-top-nav-list-item-link"
            @click="router.push(link.to)"
        >
            <img :src="link.src" :alt="link.alt" />
            <span
                class="header-top-nav-list-item-span"
                v-if="mobile.isMobile"
                >{{ link.text }}</span
            >
        </button>
    </li>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const mobile = useHeaderMobile();

interface navIcon {
    src: string;
    alt: string;
    to: string;
    text: string;
}

defineProps<{
    icons: navIcon[];
}>();
</script>

<style lang="scss">
.header-top-nav-list-item-link {
    position: relative;
    transition: all 0.3s;
    background-color: transparent;

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
