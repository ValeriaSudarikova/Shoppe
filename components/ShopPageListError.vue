<template>
  <div class="errors-message">
    <p class="errors-message-red">Nothing was found for your request :(</p>
    <p class="errors-message-italic">Please change your search parameters</p>
  </div>
</template>

<style lang="scss">
  .errors-message {
    @include h4(#000);

    align-self: center;
    width: 100%;
    text-align: center;

    @media (max-width: $breakpoints-l-m) {
      font-size: 14px;
    }

    &-red {
      margin-bottom: 14px;
      color: red;
    }

    &-italic {
      font-style: italic;
    }
  }
</style>
