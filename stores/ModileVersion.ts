import { defineStore } from 'pinia';

export const useHeaderMobile = defineStore('HeaderMedia', () => {
    const isMobile = ref(false);

    function WindowSize() {
        isMobile.value = window.innerWidth < 550;
    }

    if(process) {
        onMounted(() => {
            WindowSize();
            window.addEventListener('resize', WindowSize)
        })
    
        onBeforeUnmount(() => {
            window.removeEventListener('resize', WindowSize)
        })
    }

    return { isMobile }
});
