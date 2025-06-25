<template>
    <div class="header-top">
        <NuxtLink to="/" class="header-top-logo">
            <img
                class="header-top-logo-img"
                src="@/assets/images/logo.png"
                alt="Shoppe"
            />
        </NuxtLink>
        <HeaderCartIconMedia
            v-if="isMobile"
            :nav="nav"
            @toggle-nav="toggleNav"
        />
        <nav class="header-top-nav" :class="{ open: nav }">
            <NavListPages @click-btn="closeNav"/>
            <span class="header-top-nav-line"></span>
            <NavListIcons @click-btn="closeNav" />
        </nav>
    </div>
    <HeaderSearchForm v-if="isMobile" />
</template>

<script setup>
const { isMobile } = toRefs(useHeaderMobile())
const nav = ref(false);

function toggleNav() {
    nav.value = !nav.value;
}

function closeNav() {
    nav.value = false
}
</script>

<style lang="scss">
.header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 66px 0 16px;

    @media (max-width: $breakpoints-s) {
        padding: 15px 0;
    }

    &-nav {
        align-items: center;

        @media (max-width: $breakpoints-s) {
            position: fixed;
            z-index: 100;
            top: 100px;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: flex-start;
            transform: translateX(100%);
            transition: all 0.3s;
            padding: 40px 16px 0;
            background-color: #fff;
        }

        &-line {
            display: block;
            margin: 0 48px;
            width: 1px;
            height: 17px;
            background-color: rgba(112, 112, 112, 1);

            @media (max-width: $breakpoints-l) {
                margin: 0 30px;
            }

            @media (max-width: $breakpoints-m) {
                margin: 0 20px;
            }

            @media (max-width: $breakpoints-s) {
                margin: 40px 0 24px;
                height: 2px;
                width: 100%;
                background-color: #d8d8d8;
            }
        }
    }

    &-logo-img {
        
        @media (max-width: $breakpoints-s) {
            width: 99px;
        }
    }

    .open {
        transform: translateX(0%);
        transition: all 0.3s;
    }
}
</style>
