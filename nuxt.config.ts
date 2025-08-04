// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@pinia/nuxt',
        '@primevue/nuxt-module',
    ],
    primevue: {
        components: {
            include: ['Slider'],
        },
    },
    css: ['@/assets/scss/style.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/variables.scss" as *;`,
                },
            },
        },
    },
});
