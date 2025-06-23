<template>
    <div class="footer">
        <div class="footer-top">
            <FooterForm />
            <FooterListLink />
        </div>
        <div class="footer-bottom">
            <FooterListSocials />
            <FooterPolicy />
        </div>
    </div>
</template>

<style lang="scss">
.footer {
    padding: 40px 0 124px;

    @media (max-width: $breakpoints-s) {
        padding: 0 0 26px 0;
    }

    &-top,
    &-bottom {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;

        @media (max-width: $breakpoints-s) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &-top {
        margin-bottom: 50px;

        @media (max-width: $breakpoints-xl) {
            flex-direction: column;
            gap: 42px;
        }

        @media (max-width: $breakpoints-s) {
            gap: 74px;
            margin-bottom: 32px;
        }
    }
}
</style>
