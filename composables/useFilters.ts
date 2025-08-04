import debounce from 'lodash/debounce';

export const useFilters = () => {
    const { shopListGlobal, fetchShopList } = useShopList();

    const route = useRoute();
    const router = useRouter();

    const initialMinPrice = ref(0)
    const initialMaxPrice = ref(1000)
    const prices = ref([0, 1000]);
    const minPrice = ref(0);
    const maxPrice = ref(1000);
    const isFirstUrl = ref(false);

    onMounted(async () => {
        try {
            await fetchShopList();

            if (shopListGlobal.value.length > 0) {
                const allPrices = shopListGlobal.value.map(
                    (item) => item.price
                );
                initialMinPrice.value = Math.min(...allPrices);
                initialMaxPrice.value = Math.max(...allPrices);
                minPrice.value = initialMinPrice.value
                maxPrice.value = initialMaxPrice.value

                prices.value = [initialMinPrice.value, initialMaxPrice.value];
            }
            if (route.query.minPrice) {
                prices.value[0] = Number(route.query.minPrice);
                minPrice.value = Number(route.query.minPrice)
            }
            if (route.query.maxPrice) {
                prices.value[1] = Number(route.query.maxPrice);
                maxPrice.value = Number(route.query.maxPrice)
            }
            if (route.query.search) filters.search = route.query.search as string;
            if (route.query.category) filters.category = route.query.category as string;
            if (route.query.sort) filters.sort = route.query.sort as string;
            if (route.query.onSale) filters.onSale = route.query.onSale === 'true';
            if (route.query.inStock)
                filters.inStock = route.query.inStock === 'true';
            setTimeout(() => (isFirstUrl.value = true), 100);
        } catch (e) {
            console.log('Ошибка:', e);
        }
    });

    const filters = reactive({
        search: '',
        category: '',
        sort: '',
        minPrice: minPrice,
        maxPrice: maxPrice,
        onSale: false,
        inStock: false,
    });

    const updateUrl = debounce(() => {
        router.push({
            query: {
                search: filters.search || undefined,
                category: filters.category || undefined,
                sort: filters.sort || undefined,
                minPrice: filters.minPrice > initialMinPrice.value ? filters.minPrice : undefined,
                maxPrice: filters.maxPrice < initialMaxPrice.value ? filters.maxPrice : undefined,
                onSale: filters.onSale ? 'true' : undefined,
                inStock: filters.inStock ? 'true' : undefined,
            },
        });
    }, 300);

    watch(prices, (newPrice) => {
        filters.minPrice = newPrice[0]
        filters.maxPrice = newPrice[1]
    }, { deep: true })

    watch(() => ({...filters}), () => {
        if (!isFirstUrl.value) return
        updateUrl()
    }, { deep: true })

    const filteredProducts = computed(() => {
        if (!shopListGlobal.value) return [];
        let products = shopListGlobal.value;

        products = products.filter(
            (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
        );

        if (filters.onSale) {
            products = products.filter(p => p.sale)
        }
        if (filters.inStock) {
            products = products.filter(p => p.stock)
        }
        if (filters.category) {
            products = products.filter(p => p.category === filters.category)
        }
        if (filters.search) {
            const searchText = filters.search.toLowerCase()
            products = products.filter(p => p.title.toLowerCase().includes(searchText))
        }

        switch (filters.sort) {
            case 'Price: Low to High':
                products.sort((a, b) => a.price - b.price)
                break
            case 'Price: High to Low':
                products.sort((a, b) => b.price - a.price)
                break
            case 'Name: A → Z':
                products.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'Name: Z → A':
                products.sort((a, b) => b.title.localeCompare(a.title))
                break  
        }

        return products;
    });

    return {
        filters,
        filteredProducts,
        prices,
        initialMinPrice,
        initialMaxPrice,
    };
};
