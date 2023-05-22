<template>
  <h1 class="text-center text-3xl mt-8">
    <strong>От кадров</strong>
    | От стажеров
  </h1>
  <div class="flex w-full">
    <div class="grid grid-cols-1 mt-20 mx-10 w-full">
      <div
        v-if="!frameApplicationsStore.allFrameApplications.length"
        class="mt-20 text-5xl font-semibold text-center"
      >
        Пока нет заявок
      </div>
      <div
        class="grid grid-cols-1 mt-20 mr-10 w-full"
      >
      <template v-for="application in frameApplicationsStore.personalFrameApplications">
        <CuratorApplicationCard
          v-if="application.status === FrameApplicationStatus.PENDING"
          :application="application"
        ></CuratorApplicationCard>
      </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { FrameApplicationStatus } from "~/types/types";
import CuratorApplicationCard from "./CuratorApplicationCard.vue";

const frameApplicationsStore = useFrameApplicationsStore();
onMounted(async () => {
  await frameApplicationsStore.getApplicationsByFrameId(
    3
  );
});

onUpdated(async () => {
  await frameApplicationsStore.getApplicationsByFrameId(
    3
  );
});
</script>
