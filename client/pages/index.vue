<template>
  <div>{{ userStore.user }}</div>
  <div class="grid grid-cols-4 gap-x-5">
    <!--    <button @click="userStore.user.role = Role.CANDIDATE">Кандидат</button>-->
    <!--    <button @click="userStore.user.role = Role.CURATOR">КУратор</button>-->
    <!--    <button @click="userStore.user.role = Role.TRAINEE">Стажер</button>-->
    <!--    <button @click="userStore.user.role = Role.FRAME">Кадр</button>-->
  </div>

  <!-- <Candidate v-if="userStore.user?.role === Role.CANDIDATE" />
  <Curator v-if="userStore.user?.role === Role.CURATOR" />
    <Interns v-if="userStore.user.role === Role.TRAINEE" />-->
  <Frame v-if="userStore.user?.role == Role.FRAME" />`` -->
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";
import Candidate from "~/pages/candidate.vue";
import Curator from "~/pages/curator.vue";
import Interns from "~/pages/interns.vue";
import Frame from "~/pages/frame.vue";
const userStore = useUserStore();
</script>

<style scoped></style>
