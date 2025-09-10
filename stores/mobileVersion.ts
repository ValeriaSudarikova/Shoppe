import { defineStore } from 'pinia'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useMobileVersion = defineStore('MobileVersion', () => {
  const isMobile = ref(false)
  const isBreakpointXL = ref(false)
  const mobileSize = 550
  const size1000 = 1000

  function findWindowSize() {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < mobileSize
    }
  }

  function findWindowSize1000() {
    if (typeof window !== 'undefined') {
      isBreakpointXL.value = window.innerWidth < size1000
    }
  }

  // Инициализация только на клиенте
  onMounted(() => {
    findWindowSize()
    findWindowSize1000()
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', findWindowSize)
      window.addEventListener('resize', findWindowSize1000)
    }
  })

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', findWindowSize)
      window.removeEventListener('resize', findWindowSize1000)
    }
  })

  return { isMobile, isBreakpointXL }
})
