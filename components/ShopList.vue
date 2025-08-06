<template>
  <div>
    <LoadingError :loading="loading" :error="error" />
    <ul v-if="showShopList.length > 0" :data-mobile="updateShopListMobile" class="shop-list">
      <ShopListItem v-for="item in showShopList" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup>
  import { onMounted, toRefs, computed } from 'vue'
  import { useShopList } from '@/composables/useShopList'
  import { useHeaderMobile } from '@/stores/mobileVersion'

  const { fetchShopList, loading, error, shopListMini } = useShopList()
  const { isMobile } = toRefs(useHeaderMobile())

  onMounted(() => {
    fetchShopList()
  })

  function updateShopListMobile() {
    if (isMobile.value === true) {
      const shopListMini = shopListMini.value.slice(0, 4)
    }
  }

  const showShopList = computed(() => {
    return isMobile.value ? shopListMini.value.slice(0, 4) : shopListMini.value
  })
</script>

<style lang="scss">
  .shop-list {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(3, minmax(auto, 1fr));
    gap: 86px 56px;

    @media (max-width: $breakpoints-xl) {
      grid-template: repeat(3, 1fr) / repeat(2, minmax(auto, 1fr));
    }

    @media (max-width: $breakpoints-s) {
      grid-template: repeat(2, 1fr) / repeat(2, minmax(auto, 1fr));
      gap: 24px 16px;
    }
  }
</style>
