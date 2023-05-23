<template>
  <div>{{ userStore.user }}</div>

  <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
</script>

<style scoped></style>
