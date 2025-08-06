<template>
  <p class="successful-notification">Data successfully sent</p>
</template>

<style lang="scss">
  .successful-notification {
    @include t-small(green);

    position: absolute;
    bottom: -28px;

    @media (max-width: $breakpoints-s) {
      bottom: -50px;
    }
  }
</style>
