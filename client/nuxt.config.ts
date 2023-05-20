// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/layouts/global.css"],
<<<<<<< HEAD
  modules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-headlessui", '@nuxt/image-edge'],
=======
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-headlessui",
  ],
>>>>>>> 9fb621d0979c41b3014cd092841a6c2bc893f9b3
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
