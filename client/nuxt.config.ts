// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/layouts/global.css"],
  modules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-headlessui", '@nuxt/image-edge'],
  eslint: {
    emitWarning: false,
    emitError: false,
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:5000/api/",
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
