// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/eslint-module'],
    eslint: {
        emitWarning: false,
        emitError: false,
    }

})
