<template>
  <div v-for="application of frameApplicationsStore.approvedFrameApplications">
    <div class="relative w-full mb-20 card-style">
      <div class="text-3xl font-bold ">
        <div v-if="application.position">
          {{ application.position }}
        </div>
        <div class="text-2xl font-semibold">{{ application.organization.name }}</div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="font-semibold text-3xl mt-10 mb-3 max-md:text-xl">Описание</div>
      <p class="text-2xl max-md:text-xl">{{ application.description }}</p>
      <div class="font-semibold text-3xl mt-10 mb-5 max-md:text-xl">Опыт работы</div>
      <div class="mb-10 flex gap-x-5">
        <div
          v-for="(exp, index) of application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-xl">{{ exp.value }}</span>
        </div>
      </div>
      <div class="flex justify-between max-sm:adaptive-flex-col max-sm:text-center md:max-lg:adaptive-flex-col md:max-lg:text-center">
        <NuxtLink class="max-sm:w-full max-sm:mb-3 md:max-lg:w-full md:max-lg:mb-3" :to="`/frame/invites/${application.applicationId}`">
          <div class="black-btn ">Назначить стажера</div>
        </NuxtLink>
        <div class="flex max-sm:adaptive-flex-col max-sm:text-center max-sm:w-full max-sm:gap-y-3
                    md:max-lg:adaptive-flex-col md:max-lg:text-center md:max-lg:w-full md:max-lg:gap-y-3">
          <NuxtLink class="max-sm:w-full md:max-lg:w-full" :to="`/frame/edit/${application.applicationId}`">
            <div class="black-btn me-5 max-sm:me-0 md:max-lg:me-0">Редактировать</div>
          </NuxtLink>
          <div
            class="black-btn max-sm:w-full md:max-lg:w-full"
            @click="
              frameApplicationsStore.deleteApplication(
                application.applicationId!
              )
            "
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FrameApplicationStatus, IFrameApplication } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const frameApplicationsStore = useFrameApplicationsStore();
import { useTraineeStore } from "~/stores/traineeStore";
</script>

<style scoped></style>
