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

  const updatePriceRange = () => {
    if (!shopList.value.length) return

    const allPrices = shopList.value.map((item) => item.price)
    const newMinPrice = Math.min(...allPrices)
    const newMaxPrice = Math.max(...allPrices)

    initialMinPrice.value = newMinPrice
    initialMaxPrice.value = newMaxPrice

    if (!route.query.minPrice && !route.query.maxPrice) {
      prices.value = [newMinPrice, newMaxPrice]
      filters.minPrice = newMinPrice
      filters.maxPrice = newMaxPrice
    } else {
      if (route.query.minPrice) {
        const minPriceFromURl = Math.max(Number(route.query.minPrice), newMinPrice)
        prices.value[0] = minPriceFromURl
        filters.minPrice = minPriceFromURl
      }
      if (route.query.maxPrice) {
        const maxPriceFromURL = Math.min(Number(route.query.maxPrice), newMaxPrice)
        prices.value[1] = maxPriceFromURL
        filters.maxPrice = maxPriceFromURL
      }
    }
  }

  const initializeFilters = () => {
    if (!shopList.value.length) return

    updatePriceRange()
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
