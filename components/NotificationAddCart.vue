<template>
  <transition>
    <div v-if="notificationId === item.id" class="notification" :style="{ top: notificationTop }">
      <div class="notification-message">
        <img
          src="@/assets/images/icons/checked.svg"
          alt="checked"
          class="notification-message-img"
        />
        <span class="notification-message-text">The item added to your Shopping bag.</span>
      </div>
      <NuxtLink to="/shop" class="notification-link">VIEW CART</NuxtLink>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  interface Props {
    item: {
      id: number
    }
    notificationId: number | null
  }

  defineProps<Props>()

  const notificationTop = ref('20px')
  const isScrolled = ref(false)
  const headerHeight = ref(100)

  const updatePosition = () => {
    const scroll = window.scrollY
    isScrolled.value = scroll > 40

    notificationTop.value = isScrolled.value ? '20px' : `${headerHeight.value}px`
  }

  onMounted(() => {
    setTimeout(() => {
      const header = document.querySelector('.header')
      if (header) {
        headerHeight.value = header.clientHeight
      }
      updatePosition()
    }, 50)

    window.addEventListener('scroll', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updatePosition)
  })
</script>

<style lang="scss">
  .notification {
    @extend %transition;

    position: fixed;
    right: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 60px);
    max-width: 1500px;
    padding: 24px 24px 24px 40px;
    margin: 0 auto;
    background-color: #efefee;
    border-radius: 8px;

    @media (max-width: $breakpoints-m) {
      padding: 14px 14px 14px 30px;
    }

    @media (max-width: $breakpoints-s) {
      width: calc(100% - 30px);
      padding: 10px 10px 10px 15px;
    }

    &-message {
      display: flex;
      align-items: center;

      &-text {
        @include h5(#000);

        margin: 0 16px;

        @media (max-width: $breakpoints-m) {
          font-size: 14px;
        }

        @media (max-width: $breakpoints-s) {
          margin: 0 10px;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

    &-link {
      @include t-large(#a18a68);
      @extend %transition;

      &:hover,
      &:active {
        @extend %transition;

        color: #000;
      }

      @media (max-width: $breakpoints-m) {
        @include t-medium(#a18a68);
      }

      @media (max-width: $breakpoints-s) {
        font-size: 12px;
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .v-enter-from {
    transform: translateY(-100%);
  }

  .v-enter-to {
    transform: translateY(0%);
  }

  .v-leave-to {
    transform: translateY(-100%);
  }
</style>
