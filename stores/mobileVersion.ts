import { defineStore } from 'pinia'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useMobileVersion = defineStore('MobileVersion', () => {
  const isMobile = ref(false)
  const mobileSize = 550

  function findWindowSize() {
    isMobile.value = window.innerWidth < mobileSize
  }

  if (process) {
    onMounted(() => {
      findWindowSize()
      window.addEventListener('resize', findWindowSize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', findWindowSize)
    })
  }

  const isBreakpointXL = ref(false)
  const size1000 = 1000

  function findWindowSize1000() {
    isBreakpointXL.value = window.innerWidth < size1000
  }

  if (process) {
    onMounted(() => {
      findWindowSize1000()
      window.addEventListener('resize', findWindowSize1000)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', findWindowSize1000)
    })
  }

  return { isMobile, isBreakpointXL }
})
