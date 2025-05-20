<template>
    <div class="header-top">
        <NuxtLink to="/" class="header-top-logo">
            <img class="header-top-logo-img" src="./assets/images/logo.png" alt="Shoppe">
        </NuxtLink>
        <nav class="header-top-nav">
            <ul class="header-top-nav-pages">
                <li class="header-top-pages-item">
                    <NuxtLink to="/shop">Shop</NuxtLink>
                </li>
                <li class="header-top-pages-item">
                    <NuxtLink to="/blog">Blog</NuxtLink>
                </li>
                <li class="header-top-pages-item">
                    <NuxtLink to="/about">Our Story</NuxtLink>
                </li>
            </ul>
            <span class="header-top-nav-line"></span>
            <ul class="header-top-nav-list">
                <li class="header-top-nav-list-item">
                    <NuxtLink to="/search">
                        <img src="./assets/images/icons/search.svg" alt="search">
                    </NuxtLink>
                </li>
                <li class="header-top-nav-list-item">
                    <NuxtLink to="/cart">
                        <img src="./assets/images/icons/cart.svg" alt="cart">
                    </NuxtLink>
                </li>
                <li class="header-top-nav-list-item">
                    <NuxtLink to="/account">
                        <img src="./assets/images/icons/account.svg" alt="account">
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup></script>

<style lang="scss">
.header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 66px 0 16px;

    &-nav {
        display: flex;
        align-items: center;

        &-pages {
            display: flex;
            gap: 64px;
        }

        &-line {
            width: 1px;
            height: 17px;
            display: block;
            background-color: rgba(112, 112, 112, 1);
            margin: 0 48px;
        }

        &-list {
            display: flex;
            gap: 40px;
        }
    }
}
</style>
