<template>
    <p v-if="loading" class="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
defineProps<{
    loading: boolean,
    error: string | null
}>()
</script>

<style lang='scss'>
.loading,
.error {
    margin: 30px 0;
    font-size: 16px;
    font-family: $ff;
    text-align: center;

    @media (max-width: $breakpoints-s) {
        font-size: 14px;
    }
}

.error {
    color: red;
}
</style>