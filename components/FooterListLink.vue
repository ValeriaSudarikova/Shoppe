<template>
    <ul class="footer-top-list">
        <li
            v-for="(item, index) in items"
            :key="index"
            class="footer-top-list-item"
        >
            <NuxtLink :to="item.to" class="footer-top-list-item-link">{{
                item.title
            }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const items = [
    { to: '/', title: 'CONTACT' },
    { to: '/', title: 'TERMS OF SERVICES' },
    { to: '/', title: 'SHIPPING AND RETURNS' },
];
</script>

<style lang="scss">
.footer-top-list {
    display: flex;
    gap: 40px;

    @media (max-width: $breakpoints-s) {
        flex-direction: column;
        gap: 8px;
    }

    &-item-link {
        @include h5(#707070);
        @extend %trans;

        &:hover {
            color: #000;
        }

        @media (max-width: $breakpoints-s) {
            @include t-small(#707070);
        }
    }
}
</style>
