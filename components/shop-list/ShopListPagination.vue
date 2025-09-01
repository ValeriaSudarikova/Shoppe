<template>
  <ul class="pagination">
    <li v-if="currentPage !== 1" class="pagination-item">
      <button class="pagination-item-button arrow-left" @click="$emit('goToPage', currentPage - 1)">
        <img src="@/assets/images/icons/arrow-pagination.svg" alt="arrow-left" />
      </button>
    </li>
    <li v-if="currentPage > 3" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage - 2)">
        {{ currentPage - 2 }}
      </button>
    </li>
    <li v-if="currentPage > 1" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage - 1)">
        {{ currentPage - 1 }}
      </button>
    </li>
    <li class="pagination-item active">
      <button class="pagination-item-button">
        {{ currentPage }}
      </button>
    </li>
    <li v-if="currentPage < totalPages" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage + 1)">
        {{ currentPage + 1 }}
      </button>
    </li>
    <li v-if="currentPage < totalPages - 2" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage + 2)">
        {{ currentPage + 2 }}
      </button>
    </li>
    <li v-if="currentPage !== totalPages" class="pagination-item">
      <button
        class="pagination-item-button arrow-right"
        @click="$emit('goToPage', currentPage + 1)"
      >
        <img src="@/assets/images/icons/arrow-pagination.svg" alt="arrow-right" />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineProps<{
    currentPage: number
    totalPages: number
  }>()

  defineEmits<{
    (e: 'goToPage', page: number): void
  }>()
</script>

<style lang="scss">
  .pagination {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 60px;

    @media (max-width: $breakpoints-s) {
      gap: 14px;
      margin-top: 40px;
    }

    &-item {
      @extend %transition;

      width: 100%;
      max-width: 44px;
      border: 1px solid #d8d8d8;
      border-radius: 4px;

      &:hover {
        transform: scale(1.1);
      }

      &-button {
        @include t-medium(#000);

        display: flex;
        justify-content: center;
        padding: 10px 18px;
        background-color: transparent;
      }
    }
  }

  .active {
    background-color: #000;
    border: 1px solid #000;

    .pagination-item-button {
      color: #fff;
    }
  }

  .arrow-left {
    padding: 12px 16px;
    transform: rotateY(180deg);
  }

  .arrow-right {
    padding: 12px 18px;
  }
</style>
