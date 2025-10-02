import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import type { ShopItem } from '#imports'

export interface CartItem {
  product: ShopItem
  count: number
}

export const useCart = defineStore('PiniaCart', () => {
  const isSidebarOpen = ref(false)
  const isLoading = ref(true)
  const isClient = typeof window !== 'undefined'
  const cartItems = ref<CartItem[]>([])

  const saveToLocalStorage = () => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }
  }

  const loadFromLocalStorage = () => {
    if (isClient) {
      try {
        const saved = localStorage.getItem('cart')
        if (saved) {
          cartItems.value = JSON.parse(saved)
        }
      } catch (error) {
        console.log('Error loading cart from localStorage', error)
        cartItems.value = []
      }
    }
    isLoading.value = false
  }

  if (isClient) {
    onMounted(() => {
      loadFromLocalStorage()
    })
  } else {
    isLoading.value = false
  }

  const sendCartToBackend = async () => {
    if (cartItems.value.length === 0) return
    try {
      const cartData = {
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        products: cartItems.value.map((item) => ({
          productId: item.product.id,
          quantity: item.count,
        })),
      }

      const API_URL = import.meta.env.VITE_APP_URL
      let url = `${API_URL}/carts`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      })

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.log('Error send cart to backend:', error)
      throw error
    }
  }

  const updateCart = () => {
    saveToLocalStorage()
    try {
      sendCartToBackend()
    } catch (error) {
      console.warn('Cart saved to localStorage but failed to sync with backend', error)
    }
  }

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.count, 0)
  })

  const totalPrices = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.count
    }, 0)
  })

  const addItem = (product: ShopItem) => {
    const isItemInCart = cartItems.value.find((item) => item.product.id === product.id)
    if (isItemInCart) {
      isItemInCart.count += 1
    } else {
      cartItems.value.push({
        product: product,
        count: 1,
      })
    }

    updateCart()
  }

  const removeItem = (productId: number) => {
    const index = cartItems.value.findIndex((item) => item.product.id === productId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
      updateCart()
    }
  }

  const updateQuantity = (productId: number, count: number) => {
    if (count === 0) {
      removeItem(productId)
      return
    }
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (item) {
      item.count = count
      updateCart()
    }
  }

  return {
    isSidebarOpen,
    toggleSidebar,
    totalItems,
    totalPrices,
    addItem,
    removeItem,
    updateQuantity,
    cartItems,
    isLoading,
  }
})
