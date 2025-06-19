<template>
    <li
        v-for="(social, index) in items"
        :key="index"
        class="footer-bottom-list-item"
    >
        <a :href="social.href" class="footer-bottom-list-item-social">
            <svg
                :width="social.width"
                :height="social.height"
                :viewBox="social.viewBox"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="footer-bottom-list-item-social-svg"
            >
                <path
                    :fill-rule="social?.fillrule"
                    :clip-rule="social?.cliprule"
                    :d="social.d"
                    fill="#707070"
                />
            </svg>
        </a>
    </li>
</template>

<script setup lang="ts">
interface socialItems {
    href: string;
    width: number;
    height: number;
    viewBox: string;
    fillrule: 'nonzero' | 'evenodd' | 'inherit' | undefined;
    cliprule: string;
    d: string;
}

defineProps<{
    items: socialItems[];
}>();
</script>

<style lang="scss">
.footer-bottom-list-item-social {
    display: block;
    width: 100%;
    height: 100%;

    &:hover {
        .footer-bottom-list-item-social-svg path {
            @extend %trans;
            fill: #000;
        }
    }
}
</style>
