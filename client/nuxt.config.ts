// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets//global.css"],
  modules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss"],
  eslint: {
    emitWarning: false,
    emitError: false,
  },
});
