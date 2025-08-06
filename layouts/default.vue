<template>
  <div class="container">
    <header>
      <HeaderNav />
      <HorizontalLine v-if="!showLine && !isMobile" />
    </header>
    <slot />
    <footer>
      <HorizontalLine v-if="!isMobile" />
      <FooterNav />
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useHeaderMobile } from '@/stores/mobileVersion'

  const route = useRoute()
  const showLine = computed(() => route.meta.showHeaderHorizontalLine)
  const { isMobile } = toRefs(useHeaderMobile())
</script>
