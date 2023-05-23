<template>
  <div class="flex items-center h-screen bg-purple">
    <AuthForm />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: false,
});
</script>

<style scoped></style>
