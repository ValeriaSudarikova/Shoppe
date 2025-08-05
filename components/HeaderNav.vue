<template>
  <div class="header-top">
    <NuxtLink to="/" class="header-top-logo">
      <img class="header-top-logo-img" src="@/assets/images/logo.png" alt="Shoppe" />
    </NuxtLink>
    <HeaderCartIconMedia v-if="isMobile" :nav="nav" @toggle-nav="toggleNav" />
    <nav class="header-top-nav" :class="{ open: nav }">
      <NavListPages @click-btn="closeNav" />
      <span class="header-top-nav-line"></span>
      <NavListIcons @click-btn="closeNav" />
    </nav>
  </div>
  <HeaderSearchForm v-if="isMobile" />
</template>

<script setup>
  import { useHeaderMobile } from '@/stores/modileVersion'
  import { toRefs, ref } from 'vue'

  const { isMobile } = toRefs(useHeaderMobile())
  const nav = ref(false)

  function toggleNav() {
    nav.value = !nav.value
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
      display: flex;
      align-items: center;

      @media (max-width: $breakpoints-s) {
        position: fixed;
        inset: 100px 0 0;
        z-index: 100;
        flex-direction: column;
        align-items: flex-start;
        padding: 40px 16px 0;
        background-color: #fff;
        transform: translateX(100%);
        transition: all 0.3s;
      }

      &-line {
        display: block;
        width: 1px;
        height: 17px;
        margin: 0 48px;
        background-color: rgb(112 112 112 / 100%);

        @media (max-width: $breakpoints-l) {
          margin: 0 30px;
        }

        @media (max-width: $breakpoints-m) {
          margin: 0 20px;
        }

        @media (max-width: $breakpoints-s) {
          width: 100%;
          height: 2px;
          margin: 40px 0 24px;
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
