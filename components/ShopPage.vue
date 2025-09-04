<template>
  <div class="shop-page">
    <h1 v-if="isBreakpointXL" class="shop-page-heading">Shop</h1>
    <h1 v-else class="shop-page-heading">Shop The Latest</h1>
    <OpenFiltersButton v-if="isBreakpointXL" :form="form" @toggleForm="toggleForm" />
    <div class="shop-page-body">
      <transition name="fade">
        <ShopListFilters
          v-if="form || !isBreakpointXL"
          v-model="prices"
          :form="form"
          :filters="filters"
          :initialMinPrice="initialMinPrice"
          :initialMaxPrice="initialMaxPrice"
          @click-btn="closeForm()"
          @update:filters="updateFilters"
        />
      </transition>
      <ShopPageList v-if="filteredProducts.length > 0" :products="filteredProducts" />
      <ShopPageListError v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import OpenFiltersButton from '@/components/filters/OpenFiltersButton.vue'
  import ShopListFilters from '@/components/filters/ShopListFilters.vue'
  import ShopPageList from '@/components/shop-list/ShopPageList.vue'
  import ShopPageListError from '@/components/shop-list/ShopPageListError.vue'
  import { useFilters } from '@/composables/useFilters'
  import { useShopList } from '@/composables/useShopList'
  import { useMobileVersion } from '@/stores/mobileVersion'
  import debounce from 'lodash/debounce'
  import { toRefs, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const { isBreakpointXL } = toRefs(useMobileVersion())
  const shopList = useShopList()
  const { filters, prices, filteredProducts, initializeFilters, initialMinPrice, initialMaxPrice } =
    useFilters(shopList.shopListGlobal, shopList.fetchShopList)

  const form = ref(false)

  function toggleForm() {
    form.value = !form.value
  }

  function closeForm() {
    form.value = false
  }

  const debouncedUpdateFilters = debounce((newFilters: object) => {
    Object.assign(filters, newFilters)
  }, 500)

  function updateFilters(newFilters: object) {
    debouncedUpdateFilters(newFilters)
  }

  onMounted(async () => {
    const initialCategory =
      typeof route.query.category === 'string' ? route.query.category : undefined
    await shopList.fetchShopList(initialCategory)
    initializeFilters()
  })
</script>

<style lang="scss">
  @import '@/assets/scss/variables';

  .shop-page {
    padding: 96px 0 250px;

    @media (max-width: $breakpoints-s) {
      padding: 24px 0 72px;
    }

    &-heading {
      @extend %h1;

      margin-bottom: 40px;

      @media (max-width: $breakpoints-l-m) {
        font-size: 25px;
      }

      @media (max-width: $breakpoints-s) {
        @include h3(#000);

        margin-bottom: 16px;
      }
    }

    &-body {
      display: flex;
      justify-content: space-between;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-102%);
  }
</style>
