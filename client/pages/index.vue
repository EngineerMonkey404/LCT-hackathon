<template>
  <div>{{ userStore.user }}</div>
  <div class="grid grid-cols-4 gap-x-5">
    <button @click="userStore.user.role = Role.CANDIDATE">Кандидат</button>
    <button @click="userStore.user.role = Role.CURATOR">КУратор</button>
    <button @click="userStore.user.role = Role.TRAINEE">Стажер</button>
    <button @click="userStore.user.role = Role.FRAME">Кадр</button>
  </div>

  <Candidate v-if="userStore.user.role === Role.CANDIDATE" />
  <Curators v-if="userStore.user.role === Role.CURATOR" />
  <Interns v-if="userStore.user.role === Role.TRAINEE" />
  <Frames v-if="userStore.user.role == Role.FRAME" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";
import Candidate from "~/pages/candidate.vue";
import Curators from "~/pages/curators.vue";
import Interns from "~/pages/interns.vue";
import Frames from "~/pages/frames.vue";

const userStore = useUserStore();
</script>

<style scoped></style>
