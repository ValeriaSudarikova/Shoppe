<template>
  <div>
    <LoadingError :loading="loading" :error="error" />
    <ul v-if="paginatedPages.length > 0" class="shop-page-list">
      <ShopListItem v-for="item in paginatedPages" :key="item.id" :item="item" />
    </ul>
    <ShopListPagination
      v-if="products.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @go-to-page="goToPage"
    />
  </div>
</template>

<script setup lang="ts">
  import LoadingError from '@/components/base/LoadingError.vue'
  import { useShopList, type ShopItem } from '@/composables/useShopList'
  import { watch, ref, computed } from 'vue'

  const props = defineProps<{
    products: ShopItem[]
  }>()

  const { loading, error } = useShopList()

  watch(
    () => props.products,
    () => {
      currentPage.value = 1
    },
  )

  const currentPage = ref(1)
  const maxItemsCart = ref(6)

  const paginatedPages = computed(() => {
    const start = (currentPage.value - 1) * maxItemsCart.value
    const end = start + maxItemsCart.value
    return props.products.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(props.products.length / maxItemsCart.value)
  })

  const goToPage = (page: number) => {
    currentPage.value = page
  }
</script>

<style lang="scss">
  .shop-page-list {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(3, minmax(auto, 1fr));
    gap: 70px 24px;

    --img-width: 300px;
    --img-height: 300px;
    --btn-hover-width: 300px;
    --btn-hover-height: 300px;

    @media (max-width: $breakpoints-l-m) {
      grid-template: repeat(2, 1fr) / repeat(2, minmax(auto, 1fr));
      gap: 24px 16px;

      --img-width: 200px;
      --img-height: 200px;
      --btn-hover-width: 200px;
      --btn-hover-height: 200px;
    }
  }
</style>
