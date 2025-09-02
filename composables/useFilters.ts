import debounce from 'lodash/debounce'
import { ref, reactive, watch, computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type ShopItem } from '@/composables/useShopList'

export const useFilters = (
  shopList: Ref<ShopItem[]>,
  fetchShopList?: (category?: string) => Promise<void>,
) => {
  const route = useRoute()
  const router = useRouter()

  const initialMinPrice = ref(0)
  const initialMaxPrice = ref(1000)
  const prices = ref<[number, number]>([0, 1000])

  const isFirstUrl = ref(false)

  const filters = reactive({
    search: route.query.search?.toString() || '',
    category: route.query.category?.toString() || '',
    sort: route.query.sort?.toString() || '',
    minPrice: initialMinPrice.value,
    maxPrice: initialMaxPrice.value,
    onSale: route.query.onSale === 'true',
    inStock: route.query.inStock === 'true',
  })

  const deleteInvalidPrices = () => {
    const query = { ...route.query }
    let checkValid = false

    if (query.minPrice && isNaN(Number(query.minPrice))) {
      delete query.minPrice
      checkValid = true
    }
    if (query.maxPrice && isNaN(Number(query.maxPrice))) {
      delete query.maxPrice
      checkValid = true
    }
    if (checkValid) {
      router.replace({ query })
      return true
    }

    return false
  }

  const updatePriceRange = () => {
    if (!shopList.value.length) return

    const allPrices = shopList.value.map((item) => item.price)
    const newMinPrice = Math.min(...allPrices)
    const newMaxPrice = Math.max(...allPrices)

    initialMinPrice.value = newMinPrice
    initialMaxPrice.value = newMaxPrice

    const minPriceFromURl =
      route.query.minPrice && !isNaN(Number(route.query.minPrice))
        ? Math.max(Number(route.query.minPrice), newMinPrice)
        : newMinPrice

    const maxPriceFromURL =
      route.query.maxPrice && !isNaN(Number(route.query.maxPrice))
        ? Math.min(Number(route.query.maxPrice), newMaxPrice)
        : newMaxPrice

    prices.value = [minPriceFromURl, maxPriceFromURL]
    filters.minPrice = minPriceFromURl
    filters.maxPrice = maxPriceFromURL
  }

  const initializeFilters = () => {
    if (!shopList.value.length) return

    if (deleteInvalidPrices()) {
      setTimeout(updatePriceRange, 100)
    } else {
      updatePriceRange()
    }

    setTimeout(() => (isFirstUrl.value = true), 100)
  }

  const updateUrl = debounce(() => {
    if (!isFirstUrl.value) return

    router.replace({
      query: {
        search: filters.search || undefined,
        category: filters.category || undefined,
        sort: filters.sort || undefined,
        minPrice: filters.minPrice > initialMinPrice.value ? filters.minPrice : undefined,
        maxPrice: filters.maxPrice < initialMaxPrice.value ? filters.maxPrice : undefined,
        onSale: filters.onSale ? 'true' : undefined,
        inStock: filters.inStock ? 'true' : undefined,
      },
    })
  }, 500)

  watch(
    shopList,
    () => {
      updatePriceRange()
    },
    { deep: true },
  )

  watch(
    () => filters.category,
    async (newCategory, oldCategory) => {
      if (newCategory !== oldCategory && fetchShopList) {
        try {
          await fetchShopList(newCategory)
        } catch (error) {
          console.error('Error fetching shop list:', error)
        }
      }
      updateUrl()
    },
  )

  watch(
    () => ({
      search: filters.search,
      sort: filters.sort,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      onSale: filters.onSale,
      inStock: filters.inStock,
    }),
    updateUrl,
    { deep: true },
  )

  const filteredProducts = computed(() => {
    if (!shopList.value) return []

    return shopList.value
      .filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
      .filter((p) => !filters.onSale || p.sale)
      .filter((p) => !filters.inStock || p.stock)
      .filter((p) => !filters.category || p.category === filters.category)
      .filter(
        (p) =>
          !filters.search ||
          p.title.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase()),
      )
      .sort((a, b) => {
        switch (filters.sort) {
          case 'Price: Low to High':
            return a.price - b.price
          case 'Price: High to Low':
            return b.price - a.price
          case 'Name: A → Z':
            return a.title.localeCompare(b.title)
          case 'Name: Z → A':
            return b.title.localeCompare(a.title)
          default:
            return 0
        }
      })
  })

  return {
    filters,
    filteredProducts,
    prices,
    initialMinPrice,
    initialMaxPrice,
    initializeFilters,
  }
}
