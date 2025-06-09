<template>
    <div class="header-top">
        <NuxtLink to="/" class="header-top-logo">
            <img
                class="header-top-logo-img"
                src="@/assets/images/logo.png"
                alt="Shoppe"
            />
        </NuxtLink>
        <HeaderCartIconMedia v-if="mobile.isMobile" />
        <nav class="header-top-nav" :class="{ open: nav.nav }">
            <NavListPages />
            <span class="header-top-nav-line"></span>
            <NavListIcons />
        </nav>
    </div>
    <HorizontalLine />
    <HeaderSearchForm v-if="mobile.isMobile" />
</template>

<script setup>
const mobile = useHeaderMobile();
const nav = useBurgerNav();
</script>

<style lang="scss">
.header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 66px 0 16px;

    &-nav {
        display: flex;
        align-items: center;

        &-line {
            display: block;
            margin: 0 48px;
            width: 1px;
            height: 17px;
            background-color: rgba(112, 112, 112, 1);
        }
    }
}
</style>
