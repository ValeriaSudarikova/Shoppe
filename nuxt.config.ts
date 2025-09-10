// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt', '@primevue/nuxt-module'],
  primevue: {
    components: {
      include: ['Slider'],
    },
  },
  css: ['@/assets/scss/style.scss'],
  
  // Конфигурация приложения
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico` }
      ]
    }
  },

  // Vite конфигурация
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/scss/variables.scss";`,
        },
      },
    },
  },
})
