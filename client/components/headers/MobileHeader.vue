<template>
  <footer
    class="fixed bottom-0 w-full flex bg-white justify-between rounded-t-3xl px-10 py-3 shadow-slate-500 shadow-xl border-t border-black items-center lg:hidden"
  >
    <img type="svg" style="height: 25px" src="/mobile-header/menu.svg" />
    <img type="svg" style="height: 25px" src="/mobile-header/help.svg" />
    <img
      type="svg"
      style="height: 25px"
      src="/mobile-header/sentiment_dissatisfied.svg"
    />
    <img
      type="svg"
      style="height: 25px"
      src="/mobile-header/notifications.svg"
    />
    <MenuComp />
  </footer>
</template>

<script setup lang="ts">
import MenuComp from "./MenuComp.vue";
import { useUserStore } from "~/stores/userStore";
</script>

<style scoped></style>
