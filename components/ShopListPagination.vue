<template>
  <ul class="pagination">
    <li v-if="currentPage !== 1" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage - 1)">
        &lt;
      </button>
    </li>
    <li v-if="currentPage > 1" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage - 1)">
        {{ currentPage - 1 }}
      </button>
    </li>
    <li class="pagination-item">
      <button class="pagination-item-button active">
        {{ currentPage }}
      </button>
    </li>
    <li v-if="currentPage < totalPages" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage + 1)">
        {{ currentPage + 1 }}
      </button>
    </li>
    <li v-if="currentPage !== totalPages" class="pagination-item">
      <button class="pagination-item-button" @click="$emit('goToPage', currentPage + 1)">
        &gt;
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
      margin-top: 40px;
    }

    &-item {
      @extend %transition;

      width: 100%;
      max-width: 40px;
      border: 1px solid #a18a68;
      border-radius: 3px;

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
    color: #fff;
    background-color: #a18a68d4;
  }
</style>
