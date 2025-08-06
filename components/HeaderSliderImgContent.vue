<template>
  <div class="img-content">
    <p class="img-content-heading">Gold big hoops</p>
    <span class="img-content-price">$ 68,00</span>
    <button class="img-content-btn">view product</button>
  </div>
</template>

<style lang="scss">
  .img-content {
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 600px;
    padding: 20px 40px;
    margin-top: -600px;
    color: white;
    border-radius: 0 16px;

    @media (max-width: $breakpoints-l-m) {
      justify-content: flex-end;
      padding: 90px 40px;
    }

    @media (max-width: $breakpoints-s) {
      padding: 26px 8px;
    }

    &-heading {
      @extend %h1;

      color: #fff;

      @media (max-width: $breakpoints-m) {
        @include h4(#fff);
      }
    }

    &-price {
      @extend %h2;

      margin: 16px 0 48px;
      color: #fff;

      @media (max-width: $breakpoints-m) {
        @include t-medium(#fff);

        margin: 4px 0 10px;
      }
    }

    &-btn {
      @include button-empty(2px solid #fff, 6px, #fff);

      max-width: 194px;

      @media (max-width: $breakpoints-m) {
        @include t-small(#fff);

        max-width: 92px;
        height: 32px;
      }
    }
  }
</style>
