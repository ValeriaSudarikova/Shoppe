<template>
    <div class="shop">
        <h1 class="shop-heading">Shop The Latest</h1>
        <div class="shop-body">
            <div class="shop-body-filters"></div>
            <ShopPageList />
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss">
.shop {
    padding: 96px 0 250px;

    &-heading {
        @extend %h1;
        margin-bottom: 40px;
    }
}
</style>
