<template>
    <div class="shop-list-item-btn">
        <template v-for="(button, index) in buttons" :key="index">
            <button
                v-if="button.type === 'button'"
                class="shop-list-item-btn-button"
                @click="button.click"
            >
                <img
                    :src="button.src"
                    :alt="button.alt"
                    class="shop-list-item-btn-button-img"
                />
            </button>
            <NuxtLink v-else to="/" class="shop-list-item-btn-button">
                <img
                    :src="button.src"
                    :alt="button.alt"
                    class="shop-list-item-btn-button-link"
                />
            </NuxtLink>
        </template>
    </div>
</template>

<script setup>
import CartIcon from '@/assets/images/icons/cart-mini.svg';
import ViewIcon from '@/assets/images/icons/view-mini.svg';
import LikeIcon from '@/assets/images/icons/like-mini.svg';
const emit = defineEmits(['add-cart']);

function addCartEmit() {
    emit('add-cart');
}

const buttons = [
    {
        type: 'button',
        src: CartIcon,
        alt: 'cart',
        click: addCartEmit,
    },
    {
        type: 'link',
        src: ViewIcon,
        alt: 'view',
    },
    {
        type: 'button',
        src: LikeIcon,
        alt: 'like',
        click: addCartEmit,
    },
];
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

    &:hover {
        transition: all 0.9s;
        background-color: rgba(255, 255, 255, 0.6);

        .shop-list-item-btn-button {
            display: block;
        }
    }

    @media (max-width: $breakpoints-m) {
        max-height: 200px;
    }

    @media (max-width: $breakpoints-s) {
        gap: 15px;
        max-height: 136px;
    }

    &-button {
        display: none;
        background-color: transparent;

        &-img {
            @media (max-width: $breakpoints-m) {
                width: 20px;
            }
        }

        &-link {
            @media (max-width: $breakpoints-m) {
                width: 25px;
            }
        }
    }
}
</style>
