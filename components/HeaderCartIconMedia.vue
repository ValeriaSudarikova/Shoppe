<template>
    <div class="header-icons">
        <button class="header-icons-cart" @click="goToCart">
            <img src="@/assets/images/icons/cart.svg" alt="cart" />
        </button>
        <button
            class="burger"
            @click="openNav"
            :class="{ close: toggleNav.nav }"
        >
            <span class="burger-line"></span>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toggleNav = useBurgerNav();

function goToCart() {
    router.push('/cart');
}
function openNav() {
    toggleNav.toggleNav();
}
</script>

<style lang="scss">
.header-icons {
    display: flex;
    align-items: center;

    &-cart {
        margin-right: 20px;
        background-color: transparent;
    }
}

.burger {
    position: relative;
    height: 16px;
    background-color: transparent;

    &-line {
        @extend %trans;
        display: block;
        width: 20px;
        height: 2px;
        background-color: #000;

        &::before,
        &::after {
            content: '';
            position: absolute;
            display: block;
            height: 2px;
            background-color: #000;
        }

        &::before {
            top: 0;
            width: 20px;
        }

        &::after {
            bottom: 0;
            right: 0;
            width: 14px;
        }
    }
}
.close {
    .burger-line {
        @extend %trans;
        transform: rotate(45deg);

        &::before {
            transform: rotate(90deg);
        }

        &::after {
            display: none;
        }
    }
}
</style>
