<template>
    <div class="container">
        <header>
            <HeaderNav />
            <HorizontalLine v-if="!showLine" />
        </header>
        <slot />
    </div>
</template>

<script setup>
const route = useRoute()
const showLine = computed(() => route.meta.showHeaderHorizontalLine)
</script>
