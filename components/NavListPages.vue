<template>
  <ul class="header-top-nav-pages">
    <NavListPagesItems v-if="!isMobile" :items="navLinkPages" />
    <NavListPagesItems v-else :items="navLinkPagesMedia" @click-btn="$emit('click-btn')" />
  </ul>
</template>

<script setup>
  import { useHeaderMobile } from '@/stores/modileVersion'
  import NavListPagesItems from './NavListPagesItems.vue'
  import { toRefs } from 'vue'

  const { isMobile } = toRefs(useHeaderMobile())
  defineEmits(['click-btn'])

  const navLinkPages = [
    { to: '/shop', text: 'Shop' },
    { to: '/blog', text: 'Blog' },
    { to: '/about', text: 'Our Story' },
  ]

  const navLinkPagesMedia = [
    { to: '/', text: 'Home' },
    { to: '/shop', text: 'Shop' },
    { to: '/about', text: 'About' },
    { to: '/blog', text: 'Blog' },
    { to: '/', text: 'Help' },
    { to: '/', text: 'Contact' },
    { to: '/search', text: 'Search' },
  ]
</script>

<style lang="scss">
  .header-top-nav-pages {
    display: flex;
    gap: 64px;

    @media (max-width: $breakpoints-l) {
      gap: 40px;
    }

    @media (max-width: $breakpoints-m) {
      gap: 20px;
    }

    @media (max-width: $breakpoints-s) {
      flex-direction: column;
      gap: 24px;
      width: 100%;
    }
  }
</style>
