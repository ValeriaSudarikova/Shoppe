<template>
    <ul class="header-top-nav-list">
        <NavListIconsItem v-if="!mobile.isMobile" :icons="navLinkIcons" />
        <NavListIconsItem v-else :icons="navLinkIconsMedia" />
    </ul>
</template>

<script setup>
import SearchIcon from '@/assets/images/icons/search.svg';
import CartIcon from '@/assets/images/icons/cart.svg';
import AccountIcon from '@/assets/images/icons/account.svg';
import LogoutIcon from '@/assets/images/icons/logout.svg';

const mobile = useHeaderMobile();

const navLinkIcons = [
    { to: '/search', src: SearchIcon, alt: 'search' },
    { to: '/cart', src: CartIcon, alt: 'cart' },
    { to: '/account', src: AccountIcon, alt: 'account' },
];

const navLinkIconsMedia = [
    { to: '/account', src: AccountIcon, alt: 'account', text: 'My account' },
    { to: '/', src: LogoutIcon, alt: 'logout', text: 'Logout' },
];
</script>

<style lang="scss">
.header-top-nav-list {
    display: flex;
    gap: 40px;
}
</style>
