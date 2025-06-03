<template>
    <div class="img-content">
        <p class="img-content-heading">Gold big hoops</p>
        <span class="img-content-price">$ 68,00</span>
        <button class="img-content-btn">view product</button>
    </div>
</template>

<script setup></script>

<style lang="scss">
.img-content {
    width: 100%;
    height: 600px;
    margin-top: -600px;
    padding: 20px 40px;
    border-radius: 0 16px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;

    &-heading {
        @extend %h1;
        color: #fff;
    }

    &-price {
        @extend %h2;
        color: #fff;
        margin: 16px 0 48px;
    }

    &-btn {
        @include button-empty(2px solid #fff, 6px, #fff);
        max-width: 193px;
    }
}
</style>
