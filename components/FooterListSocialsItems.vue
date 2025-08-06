<template>
  <li v-for="(social, index) in socials" :key="index" class="footer-bottom-list-item">
    <a :href="social.href" class="footer-bottom-list-item-social">
      <component :is="social.img" />
    </a>
  </li>
</template>

<script setup lang="ts">
  import FacebookItem from './FacebookItem.vue'
  import InstItem from './InstItem.vue'
  import TwitterItem from './TwitterItem.vue'

  const socials = [
    { href: '#', img: FacebookItem },
    { href: '#', img: InstItem },
    { href: '#', img: TwitterItem },
  ]
</script>

<style lang="scss">
  .footer-bottom-list-item-social {
    display: block;
    width: 100%;
    height: 100%;

    &:hover {
      .footer-bottom-list-item-social-svg path {
        @extend %transition;

        fill: #000;
      }
    }
  }

  .facebook {
    @media (max-width: $breakpoints-s) {
      width: 8px;
    }
  }

  .inst {
    @media (max-width: $breakpoints-s) {
      width: 12px;
    }
  }

  .twitter {
    @media (max-width: $breakpoints-s) {
      width: 14px;
    }
  }
</style>
