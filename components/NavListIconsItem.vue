<template>
  <li v-for="(link, index) in icons" :key="index" class="header-top-nav-list-item">
    <button class="header-top-nav-list-item-link" @click="navigate(link.to)">
      <img :src="link.src" :alt="link.alt" />
      <span v-if="isMobile" class="header-top-nav-list-item-link-span">{{ link.text }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useHeaderMobile } from '@/stores/mobileVersion'
  import { toRefs } from 'vue'

  const router = useRouter()
  const { isMobile } = toRefs(useHeaderMobile())
  const emit = defineEmits(['click-btn'])

  interface NavIcon {
    src: string
    alt: string
    to: string
    text: string
  }

  defineProps<{
    icons: NavIcon[]
  }>()

  function navigate(to: string) {
    router.push(to)
    emit('click-btn')
  }
</script>

<style lang="scss">
  .header-top-nav-list-item-link {
    position: relative;
    background-color: transparent;
    transition: all 0.3s;

    @media (max-width: $breakpoints-s) {
      display: flex;
      gap: 10px;
      width: 100%;
    }

    &:focus::before {
      position: absolute;
      bottom: -21px;
      display: block;
      width: 100%;
      height: 2px;
      content: '';
      background-color: #000;

      @media (max-width: $breakpoints-s) {
        display: none;
      }
    }

    &-span {
      @include h3(#000);
    }
  }
</style>
