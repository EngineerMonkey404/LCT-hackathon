<template>
  <div class="flex items-center min-h-screen bg-purple">
    <RegistrationForm v-if="role" :role="role" :path="path" />
  </div>
</template>

<script setup lang="ts">
import { Role } from "~/types/types";

definePageMeta({
  layout: false,
});

const router = useRouter();
const path = router.currentRoute.value.fullPath.split("/")[2];
const { data: role } = await useApiFetch<Role>(`auth/invite/${path}`, {
  method: "GET",
});
</script>

<style scoped></style>
