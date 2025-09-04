<template>
  <div class="footer-list-socials">
    <p v-if="isMobile" class="footer-list-socials-title">
      Follow us <span class="footer-list-socials-title-line"></span>
    </p>
    <ul class="footer-list-socials-list">
      <FooterListSocialsItems />
    </ul>
  </div>
</template>

<script setup>
  import { useMobileVersion } from '@/stores/mobileVersion'
  import { toRefs } from 'vue'

  const { isMobile } = toRefs(useMobileVersion())
</script>

<style lang="scss">
  .footer-list-socials {
    display: flex;
    gap: 8px;
    align-items: center;

    &-title {
      @include t-small(#000);

      display: flex;
      gap: 16px;
      align-items: flex-end;

      &-line {
        display: block;
        width: 47px;
        height: 1px;
        margin-bottom: 6px;
        background-color: #000;
      }
    }

    &-list {
      display: flex;
      gap: 30px;
      align-items: center;

      @media (max-width: $breakpoints-s) {
        gap: 16px;
      }
    }
  }
</style>
