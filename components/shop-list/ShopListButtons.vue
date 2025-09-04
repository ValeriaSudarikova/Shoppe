<template>
  <div class="shop-list-item-btn">
    <template v-for="(button, index) in buttons" :key="index">
      <button
        v-if="button.type === 'button'"
        class="shop-list-item-btn-button"
        @click="button.click"
      >
        <img :src="button.src" :alt="button.alt" class="shop-list-item-btn-button-img" />
      </button>
      <NuxtLink v-else to="/" class="shop-list-item-btn-button">
        <img :src="button.src" :alt="button.alt" class="shop-list-item-btn-button-link" />
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
  import CartIcon from '@/assets/images/icons/cart-mini.svg'
  import ViewIcon from '@/assets/images/icons/view-mini.svg'
  import LikeIcon from '@/assets/images/icons/like-mini.svg'
  const emit = defineEmits(['add-cart'])

  function addCartEmit() {
    emit('add-cart')
  }

  const buttons = [
    {
      type: 'button',
      src: CartIcon,
      alt: 'cart',
      click: addCartEmit,
    },
    {
      type: 'link',
      src: ViewIcon,
      alt: 'view',
    },
    {
      type: 'button',
      src: LikeIcon,
      alt: 'like',
      click: addCartEmit,
    },
  ]
</script>

<style lang="scss">
  .shop-list-item-btn {
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--btn-hover-width, 380px);
    height: 100%;
    max-height: var(--btn-hover-height, 380px);
    background-color: rgb(255 255 255 / 0%);
    transition: all 0.9s;

    &-button {
      display: none;
      background-color: transparent;

      &-img {
        @media (max-width: $breakpoints-m) {
          width: 20px;
        }
      }

      &-link {
        @media (max-width: $breakpoints-m) {
          width: 25px;
        }
      }
    }

    &:hover {
      background-color: rgb(255 255 255 / 60%);
      transition: all 0.9s;

      .shop-list-item-btn-button {
        display: block;
      }
    }

    @media (max-width: $breakpoints-m) {
      max-height: 200px;
    }

    @media (max-width: $breakpoints-s) {
      gap: 15px;
      max-height: 136px;
    }
  }
</style>
