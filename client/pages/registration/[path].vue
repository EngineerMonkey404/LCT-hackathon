<template>
  <div class="flex items-center h-screen bg-purple">
    <RegistrationForm :role="role" />
  </div>
</template>

<script setup lang="ts">
const { data: role } = await useApiFetch();
</script>

<style scoped></style>
