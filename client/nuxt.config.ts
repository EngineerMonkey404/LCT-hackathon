// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/eslint-module', "@nuxtjs/tailwindcss", "nuxt-headlessui",],
    eslint: {
        emitWarning: false,
        emitError: false,
    },
    css: ["~/layouts/global.css"],

})
