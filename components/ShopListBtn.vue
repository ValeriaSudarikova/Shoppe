<template>
    <div class="shop-list-item-btn">
        <button class="shop-list-item-btn-button" @click="addCartEmit">
            <img src="@/assets/images/icons/cart-mini.svg" alt="cart" />
        </button>
        <NuxtLink to="/" class="shop-list-item-btn-button">
            <img src="@/assets/images/icons/view-mini.svg" alt="view" />
        </NuxtLink>
        <button class="shop-list-item-btn-button" @click="addCartEmit">
            <img src="@/assets/images/icons/like-mini.svg" alt="like" />
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['add-cart']);

function addCartEmit() {
    emit('add-cart');
}
</script>

<style lang="scss">
.shop-list-item-btn {
    position: absolute;
    z-index: 3;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    transition: all 0.9s;
    max-width: 380px;
    max-height: 380px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);

    &-button {
        display: none;
        background-color: transparent;
    }

    &:hover {
        transition: all 0.9s;
        background-color: rgba(255, 255, 255, 0.6);

        .shop-list-item-btn-button {
            display: block;
        }
    }
}
</style>
