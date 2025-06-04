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
    margin-top: -600px;
    border-radius: 0 16px;
    width: 100%;
    height: 600px;
    padding: 20px 40px;
    color: white;

    &-heading {
        @extend %h1;
        color: #fff;
    }

    &-price {
        @extend %h2;
        margin: 16px 0 48px;
        color: #fff;
    }

    &-btn {
        @include button-empty(2px solid #fff, 6px, #fff);
        max-width: 194px;
    }
}
</style>
