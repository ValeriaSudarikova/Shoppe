import { ref, computed } from 'vue'

export interface ShopItem {
  id: number
  image: string
  title: string
  price: number
  sale: boolean
  stock: boolean
  category: string
}

export const useShopList = () => {
  const shopListGlobal = ref<ShopItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentCategory = ref<string>('')

  const shopListMini = computed(() => shopListGlobal.value.slice(0, 6))

  const fetchShopList = async (category?: string) => {
    if (shopListGlobal.value.length && category === currentCategory.value) return

    loading.value = true
    error.value = null
    currentCategory.value = category || ''

    try {
      let url = 'https://fakestoreapi.com/products'
      if (category) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      }
      const response = await fetch(url)
      const data = await response.json()
      shopListGlobal.value = data.map((product: ShopItem) => ({
        ...product,
        sale: Math.random() < 0.3,
        stock: Math.random() < 0.8,
        category: product.category,
      }))
    } catch (e: unknown) {
      error.value = `Error! ${e}`
    } finally {
      loading.value = false
    }
  }

  const notificationId = ref<number | null>(null)

  function addCart(id: number) {
    notificationId.value = id
    setTimeout(() => {
      notificationId.value = null
    }, 5000)
  }

  return {
    fetchShopList,
    shopListGlobal,
    shopListMini,
    loading,
    error,
    addCart,
    notificationId,
    currentCategory,
  }
}
