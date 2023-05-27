<template>
  <div v-for="application of frameApplicationsStore.mentorApplications">
    <div class="relative w-full mb-10 card-style">
      <div class="flex flex-col">
        <div v-if="application.position" class="text-2xl font-bold mb-4">
          {{ application.position }}
        </div>
        <div class="text-xl text-height" style="line-height: 1.2; height: 3.6em; text-overflow: clip;">{{ application.organization.name }}</div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="category mt-10 mb-3">Описание</div>
      <p class="text-2xl break-all text-height">{{ application.description }}</p>
      <div class="category mt-10 mb-5">Опыт работы</div>
      <div class="mb-10 flex gap-x-5 flex-wrap">
        <div
          v-for="(exp, index) of application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-base">{{ exp.value }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <NuxtLink :to="`/mentor/invites/${application.applicationId}`">
          <div class="black-btn">Назначить стажера</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FrameApplicationStatus, IFrameApplication } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useUserStore } from "~/stores/userStore";

const frameApplicationsStore = useFrameApplicationsStore();
const userStore = useUserStore();

await frameApplicationsStore.getMentorApplications(userStore.user!.userId!);

await frameApplicationsStore.getApprovedFrameApplications();
</script>

<style scoped></style>
