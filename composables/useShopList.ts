export const useShopList = () => {
    interface ShopItem {
        id: string;
        image: string;
        title: string;
        price: number;
    }

    const shopListGlobal = ref<ShopItem[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const shopListMini = computed(() => shopListGlobal.value.slice(0, 6));

    const fetchShopList = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(
                'https://fakestoreapi.com/products/category/electronics'
            );
            const data = await response.json();
            shopListGlobal.value = data;
        } catch (e: unknown) {
            error.value = `Error! ${e}`;
        } finally {
            loading.value = false;
        }
    };

    const notificationId = ref<number | null>(null);

    function addCart(id: number) {
        notificationId.value = id;
        setTimeout(() => {
            notificationId.value = null;
        }, 5000);
    }

    return {
        fetchShopList,
        shopListGlobal,
        shopListMini,
        loading,
        error,
        addCart,
        notificationId,
    };
};
