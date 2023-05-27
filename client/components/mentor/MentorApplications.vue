<template>
  <!-- поменять на заявки по ментору -->
  <div v-for="application of frameApplicationsStore.mentorApplications">
    <div class="relative w-full mb-20 card-style">
      <div class="flex flex-col">
        <div v-if="application.position" class="text-3xl font-bold mb-4">
          {{ application.position }}
        </div>
        <div class="text-xl">{{ application.organization.name }}</div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="font-semibold text-3xl mt-10 mb-3">Описание</div>
      <p class="text-2xl break-all">{{ application.description }}</p>
      <div class="font-semibold text-3xl mt-10 mb-5">Опыт работы</div>
      <div class="mb-10 flex gap-x-5">
        <div
          v-for="(exp, index) of application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-xl">{{ exp.value }}</span>
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
