<template>
  <div class="container mx-auto">
    <div>{{ userStore.firstName }}</div>
    <div>{{ userStore.secondName }}</div>
    <div>{{ userStore.role }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
</script>

<style scoped></style>
