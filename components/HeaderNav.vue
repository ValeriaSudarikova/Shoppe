<template>
    <div class="header-top">
        <NuxtLink to="/" class="header-top-logo">
            <img
                class="header-top-logo-img"
                src="@/assets/images/logo.png"
                alt="Shoppe"
            />
        </NuxtLink>
        <nav class="header-top-nav">
            <NavListPages />
            <span class="header-top-nav-line"></span>
            <NavListIcons />
        </nav>
    </div>
</template>

<style lang="scss">
.header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 66px 0 16px;

    &-nav {
        display: none;
        align-items: center;

        &-line {
            width: 1px;
            height: 17px;
            display: block;
            background-color: rgba(112, 112, 112, 1);
            margin: 0 48px;
        }
    }
}
</style>
