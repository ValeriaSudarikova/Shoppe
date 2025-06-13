<template>
    <div>
        <p v-if="loading" class="shop-loading">Loading...</p>
        <p v-if="error" class="shop-error">{{ error }}</p>
        <ul
            v-if="showShopList.length > 0"
            :mobile="updateShopListMobile"
            class="shop-list"
        >
            <ShopListItem
                v-for="item in showShopList"
                :key="item.id"
                :item="item"
            />
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const { fetchShopList } = useShopList();
const { loading, error, ShopListMini } = toRefs(useShopList());
const { isMobile } = toRefs(useHeaderMobile());

onMounted(() => {
    fetchShopList();
});

function updateShopListMobile() {
    if (isMobile.value === true) {
        const ShopListMini = ShopListMini.value.slice(0, 4);
    }
}

const showShopList = computed(() => {
    return isMobile.value ? ShopListMini.value.slice(0, 4) : ShopListMini.value;
});
</script>

<style lang="scss">
.shop-loading,
.shop-error {
    margin: 30px 0;
    font-size: 16px;
    font-family: $ff;
    text-align: center;

    @media (max-width: $breakpoints-s) {
        font-size: 14px;
    }
}

.shop-error {
    color: red;
}

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
