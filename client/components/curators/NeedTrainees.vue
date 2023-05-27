<template>
  <div class="text-center text-3xl mt-8">
    <strong>От кадров</strong>
  </div>
  <div class="flex w-full">
    <div class="grid grid-cols-1 mt-3 mx-10 w-full max-sm:mx-3">
      <div
        v-if="!frameApplicationsStore.allFrameApplications.length"
        class="mt-20 text-5xl font-semibold text-center"
      >
        Пока нет заявок
      </div>
      <div class="grid grid-cols-1 mt-5 mr-10 w-full max-lg:mt-5">
        <template
          v-for="application in frameApplicationsStore.allFrameApplications"
        >
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
await frameApplicationsStore.getFrameApplications();
</script>
