<template>
    <p class="footer-bottom-policy">
        <span class="footer-bottom-policy-black">© 2021 Shelly.</span>
        Terms of use
        <span class="footer-bottom-policy-black">and</span>
        privacy policy.
    </p>
</template>

<style lang="scss">
.footer-bottom-policy {
    @include h5(#707070);

    @media (max-width: $breakpoints-s) {
        @include t-small(#707070);
        margin-top: 36px;
    }

    &-black {
        color: #000;

        @media (max-width: $breakpoints-s) {
            color: #707070;
        }
    }
}
</style>
