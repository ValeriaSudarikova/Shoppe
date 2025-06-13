import { defineStore } from "pinia";

export const useShopList = defineStore('ShopList', () => {

    interface ShopListArray {
        id: string,
        image: string,
        title: string,
        price: number
    }

    const ShopListGlobal = ref<ShopListArray[]>([])
    const ShopListMini = ref<ShopListArray[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchShopList = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch('https://fakestoreapi.com/products/category/electronics')
            const data = await response.json()
            ShopListGlobal.value = data
            ShopListMini.value = data.slice(0, 6)
        } catch (e: unknown) {
            error.value = `Error! ${e}`
        } finally {
            loading.value = false
        }
    }

    return { fetchShopList, ShopListGlobal, ShopListMini, loading, error }
})