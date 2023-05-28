// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/layouts/global.css"],

  ssr: false,
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-headlessui",
    
  ],

  eslint: {
    emitWarning: false,
    emitError: false,
  },

  runtimeConfig: {
    public: {
      baseURL: "http://localhost:5000/api/",
    },
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  devtools: {
    enabled: true,
  },
});
