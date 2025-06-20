<template>
    <div class="shop">
        <div class="shop-head">
            <h2 class="shop-head-title">Shop The Latest</h2>
            <NuxtLink to="/shop" class="shop-head-view">View All</NuxtLink>
        </div>
        <ShopList />
    </div>
</template>

<style lang="scss">
.shop {
    padding: 102px 0 220px;

    @media (max-width: $breakpoints-s) {
        padding: 22px 0 94px;
    }

    &-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;

        @media (max-width: $breakpoints-s) {
            margin-bottom: 14px;
        }

        &-title {
            @extend %h1;

            @media (max-width: $breakpoints-m) {
                font-size: 25px;
            }

            @media (max-width: $breakpoints-s) {
                @include h5(#000);
            }
        }

        &-view {
            @include h4(#a18a68);
            @extend %trans;

            @media (max-width: $breakpoints-m) {
                font-size: 16px;
            }

            @media (max-width: $breakpoints-s) {
                @include t-medium(#a18a68);
            }

            &:hover,
            &:active {
                @extend %trans;
                font-weight: 700;
                color: #000;
            }
        }
    }
}
</style>
