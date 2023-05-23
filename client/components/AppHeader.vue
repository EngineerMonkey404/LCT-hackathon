<template>
  <header>
    <div v-if="userStore.user">
      <CandidateHeader v-if="userStore.user.role === Role.CANDIDATE" />
      <CuratorHeader v-else-if="userStore.user.role === Role.CURATOR" />
      <FrameHeader v-else-if="userStore.user.role === Role.FRAME" />
      <MentorHeader v-else-if="userStore.user.role === Role.MENTOR" />
      <TraineeHeader v-else />
    </div>
  </header>
</template>

<script setup lang="ts">
import CandidateHeader from "~/components/headers/CandidateHeader.vue";
import MentorHeader from "~/components/headers/MentorHeader.vue";
import TraineeHeader from "~/components/headers/TraineeHeader.vue";
import CuratorHeader from "~/components/headers/CuratorHeader.vue";
import FrameHeader from "~/components/headers/FrameHeader.vue";
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";

const userStore = useUserStore();
const user = ref(userStore.user);
</script>

<style scoped></style>
