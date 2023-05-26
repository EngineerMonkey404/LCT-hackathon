<template>
  <header>
    <div class="flex py-2 justify-evenly text-xl items-center max-lg:text-base max-md:hidden">
      <div>Главная</div>
      <div>Расписание</div>
      <div>Полезные материалы</div>
      <div>Форум</div>
      <div>Нетворкинг</div>
      <div>События</div>
      <div>Новости</div>
      <div>
        <MenuComp />
      </div>
    </div>
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
import MenuComp from "./headers/MenuComp.vue";
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";

const userStore = useUserStore();
const user = ref(userStore.user);

async function handleLogout() {
  await useApiFetch("auth/login", { method: "DELETE" });
  return navigateTo("/auth");
}
</script>

<style scoped></style>
