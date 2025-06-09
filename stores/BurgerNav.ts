import { defineStore } from 'pinia';

export const useBurgerNav = defineStore('nav', () => {
    const nav = ref(false)

    function toggleNav() {
        nav.value = !nav.value
    }

    return { nav, toggleNav }
});
