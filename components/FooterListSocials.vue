<template>
    <div class="footer-list-socials">
        <p v-if="isMobile" class="footer-list-socials-title">
            Follow us <span class="footer-list-socials-title-line"></span>
        </p>
        <ul class="footer-list-socials-list">
            <FooterListSocialsItems />
        </ul>
    </div>
</template>

<script setup>
const { isMobile } = toRefs(useHeaderMobile());
</script>

<style lang="scss">
.footer-list-socials {
    display: flex;
    align-items: center;
    gap: 8px;

    &-title {
        @include t-small(#000);
        display: flex;
        align-items: flex-end;
        gap: 16px;

        &-line {
            display: block;
            margin-bottom: 6px;
            width: 47px;
            height: 1px;
            background-color: #000;
        }
    }

    &-list {
        display: flex;
        align-items: center;
        gap: 30px;

        @media (max-width: $breakpoints-s) {
            gap: 16px;
        }
    }
}
</style>
