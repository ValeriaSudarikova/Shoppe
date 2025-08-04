<template>
    <ul class="pagination">
        <li v-if="currentPage !== 1" class="pagination-item">
            <button
                class="pagination-item-button"
                @click="$emit('goToPage', currentPage - 1)"
            >
                &lt;
            </button>
        </li>
        <li v-if="currentPage > 1" class="pagination-item">
            <button
                class="pagination-item-button"
                @click="$emit('goToPage', currentPage - 1)"
            >
                {{ currentPage - 1 }}
            </button>
        </li>
        <li class="pagination-item">
            <button class="pagination-item-button active">
                {{ currentPage }}
            </button>
        </li>
        <li v-if="currentPage < totalPages" class="pagination-item">
            <button
                class="pagination-item-button"
                @click="$emit('goToPage', currentPage + 1)"
            >
                {{ currentPage + 1 }}
            </button>
        </li>
        <li v-if="currentPage !== totalPages" class="pagination-item">
            <button
                class="pagination-item-button"
                @click="$emit('goToPage', currentPage + 1)"
            >
                &gt;
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    currentPage: number;
    totalPages: number;
}>();

defineEmits<{
    (e: 'goToPage', page: number): void;
}>();
</script>

<style lang="scss">
.pagination {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 60px;

    @media (max-width: $breakpoints-s) {
        margin-top: 40px;
    }

    &-item {
        @extend %transition;
        border: 1px solid #a18a68;
        border-radius: 3px;
        max-width: 40px;
        width: 100%;

        &:hover {
            transform: scale(1.1);
        }

        @media (max-width: $breakpoints-s) {
            max-width: 30px;
        }

        &-button {
            @include h3(#000);
            width: 100%;
            background-color: transparent;

            @media (max-width: $breakpoints-s) {
                @include t-medium(#000);
            }
        }
    }
}

.active {
    background-color: #a18a68d4;
    color: #fff;
}
</style>
