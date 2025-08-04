<template>
    <input
        v-model="model"
        :type="type"
        class="base-input"
        :placeholder="placeholder"
        @focus="emit('focus')"
        @blur="emit('blur', $event)"
    />
    <p v-if="error" class="base-error">
        {{ error }}
    </p>
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
    type?: string;
    placeholder: string;
    error?: string;
}>();

const emit = defineEmits<{
    (e: 'focus'): void;
    (e: 'blur', event: Event): void;
}>();
</script>

<style lang="scss">
.base-input {
    @include h5(#707070);
    width: 100%;
    padding-bottom: 14px;
    background-color: transparent;

    @media (max-width: $breakpoints-s) {
        @include t-small(#707070);
        padding-bottom: 6px;
    }
}

.base-error {
    position: absolute;
    bottom: -50px;
    font-size: 12px;
    color: #d82700;

    @media (max-width: $breakpoints-xl) {
        right: -40px;
        bottom: -24px;
    }

    @media (max-width: $breakpoints-s) {
        right: 0;
        left: 0;
        bottom: -50px;
    }
}
</style>
