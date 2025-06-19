<template>
    <div class="container">
        <header>
            <HeaderNav />
            <HorizontalLine v-if="!showLine" />
        </header>
        <slot />
        <footer>
            <HorizontalLine />
            <FooterNav />
        </footer>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const showLine = computed(() => route.meta.showHeaderHorizontalLine);
</script>
