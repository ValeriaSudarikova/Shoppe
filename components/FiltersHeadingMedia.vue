<template>
    <div class="filters-heading">
        <img
            src="@/assets/images/Filters.png"
            alt="Filters-heading"
            class="filters-heading-img"
        />
        <button
            type="button"
            class="filters-heading-close"
            @click="$emit('close')"
        >
            <span class="filters-heading-close-line"></span>
        </button>
    </div>
</template>

<script setup>
defineEmits(['close']);
</script>

<style lang="scss">
.filters-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    &-close {
        position: relative;
        height: 16px;
        background-color: transparent;

        &-line {
            @extend %transition;
            display: block;
            transform: rotate(45deg);
            width: 20px;
            height: 2px;
            background-color: #000;

            &::after {
                content: '';
                position: absolute;
                display: block;
                transform: rotate(90deg);
                width: 20px;
                height: 2px;
                background-color: #000;
            }
        }
    }
}
</style>
