import { defineStore } from 'pinia';

export const useHeaderMobile = defineStore('HeaderMedia', () => {
    const isMobile = ref(false);
    const mobileSize = 550

    function findWindowSize() {
        isMobile.value = window.innerWidth < mobileSize;
    }

    if(process) {
        onMounted(() => {
            findWindowSize();
            window.addEventListener('resize', findWindowSize)
        })
    
        onBeforeUnmount(() => {
            window.removeEventListener('resize', findWindowSize)
        })
    }

    return { isMobile }
});
