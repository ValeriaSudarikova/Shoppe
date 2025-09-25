<template>
  <NuxtLayout>
    <p class="error-back" :class="{ 'animate-in': isMounted }">Ooops!</p>
    <div class="error">
      <h1 class="error-code">{{ error?.statusCode }} ERROR</h1>
      <p class="error-text">{{ error?.message }};<br />back to home and start again</p>
      <NuxtLink to="/" class="error-button" @click="clearError()">HOMEPAGE</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'
  import { ref, onMounted } from 'vue'

  defineProps<{
    error: NuxtError
  }>()

  const isMounted = ref(false)
  onMounted(() => {
    setTimeout(() => {
      isMounted.value = true
    }, 100)
  })
</script>

<style lang="scss">
  .error-back {
    position: absolute;
    top: 28%;
    left: 50%;
    z-index: -1;
    font-size: 250px;
    color: #a18a68;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
    transition: all 1.2s cubic-bezier(0.34, 1.56, 0.8, 1);

    &.animate-in {
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(1);
    }

    @media (max-width: $breakpoints-l) {
      top: 24%;
      font-size: 200px;
    }

    @media (max-width: $breakpoints-m) {
      top: 28%;
      font-size: 100px;
    }
  }

  div.error {
    margin: 0 auto;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
    background-color: #ffffffd1;
    border-radius: 20px;

    @media (max-width: $breakpoints-m) {
      padding: 10px;
    }

    &-code {
      @extend %h1;

      @media (max-width: $breakpoints-m) {
        font-size: 22px;
      }
    }

    &-text {
      @include h3(#707070);

      margin: 24px 0 64px;

      @media (max-width: $breakpoints-m) {
        margin: 12px 0 32px;
        font-size: 16px;
      }
    }

    &-button {
      @include button-empty(1px solid #000, 4px, #000);
      @extend %transition;

      display: block;
      width: 100%;
      max-width: 188px;
      padding: 16px;

      &:hover {
        color: #fff;
        background-color: #a18a68;
        border: 1px solid #a18a68;
        transform: scale(1.1);
      }

      @media (max-width: $breakpoints-m) {
        max-width: 156px;
        height: 50px;
        font-size: 18px;
      }
    }
  }
</style>
